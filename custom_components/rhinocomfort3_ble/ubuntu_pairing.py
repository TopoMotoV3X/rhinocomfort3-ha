"""Fresh BlueZ Device1.Pair onboarding inspired by a successful Ubuntu bluetoothctl run.

This does not invoke bluetoothctl, remove bonds, or change adapter settings.
Device confirmation is handled by a scoped temporary D-Bus agent; the user
must also press the Rhinocomfort's physical button while its LED is blue.
"""
from __future__ import annotations

import asyncio
import logging
import re

_LOGGER = logging.getLogger(__name__)
_DEVICE_RE = re.compile(r"^[0-9a-fA-F]{2}(?::[0-9a-fA-F]{2}){5}$")
_AGENT_PATH = "/com/rhinocomfort3/PairingAgentB33"


async def device_path(bus, address: str) -> str | None:
    """Find the selected device through BlueZ, without assuming hci0."""
    from dbus_fast import Message, MessageType

    if not _DEVICE_RE.fullmatch(address):
        raise ValueError("Invalid Bluetooth address")

    reply = await asyncio.wait_for(bus.call(Message(
        destination="org.bluez",
        path="/",
        interface="org.freedesktop.DBus.ObjectManager",
        member="GetManagedObjects",
    )), timeout=5)

    if reply.message_type == MessageType.ERROR or not reply.body:
        return None

    matches = []
    for path, interfaces in reply.body[0].items():
        props = interfaces.get("org.bluez.Device1")
        if props and props.get("Address"):
            if props["Address"].value.upper() == address.upper():
                matches.append(path)

    if len(matches) != 1:
        if len(matches) > 1:
            _LOGGER.warning(
                "Rhinocomfort detected on multiple local BlueZ adapters"
            )
        return None

    return matches[0]


async def _session():
    from dbus_fast import BusType
    from dbus_fast.aio import MessageBus
    return await MessageBus(bus_type=BusType.SYSTEM).connect()


async def _properties(bus, path: str) -> tuple[bool, bool] | None:
    from dbus_fast import Message, MessageType
    reply = await asyncio.wait_for(bus.call(Message(
        destination="org.bluez", path=path,
        interface="org.freedesktop.DBus.Properties", member="GetAll",
        signature="s", body=["org.bluez.Device1"],
    )), timeout=5)
    if reply.message_type == MessageType.ERROR or not reply.body:
        return None
    values = reply.body[0]
    return (bool(values.get("Paired") and values["Paired"].value),
            bool(values.get("Bonded") and values["Bonded"].value))


async def get_bond(address: str) -> tuple[bool, bool] | None:
    """A read-only local BlueZ check; no BLE/GATT connection necessary."""
    try:
        bus = await _session()
        try:
            path = await device_path(bus, address)
            return await _properties(bus, path) if path else None
        finally:
            bus.disconnect()
    except (OSError, TimeoutError, ValueError, ImportError, RuntimeError) as exc:
        _LOGGER.warning("Rhinocomfort pairing: local bond check unavailable (%s)", type(exc).__name__)
        return None


def _agent(expected_path: str):
    from dbus_fast.service import ServiceInterface, method
    from dbus_fast.errors import DBusError

    class PairingAgent(ServiceInterface):
        def __init__(self):
            super().__init__("org.bluez.Agent1")

        def _check(self, device):
            if device != expected_path:
                raise DBusError("org.bluez.Error.Rejected", "Unrelated device")

        @method()
        def Release(self):
            pass

        @method()
        def RequestConfirmation(self, device: 'o', passkey: 'u'):
            self._check(device)
            # BlueZ handles the local numeric-confirmation exchange; the
            # physical button on the Rhinocomfort is still required.
            _LOGGER.info("Rhinocomfort pairing: confirmation request accepted for selected device")

        @method()
        def RequestAuthorization(self, device: 'o'):
            self._check(device)

        @method()
        def AuthorizeService(self, device: 'o', uuid: 's'):
            self._check(device)
            from .const import SERVICE_UUID
            if uuid.lower() != SERVICE_UUID.lower():
                raise DBusError("org.bluez.Error.Rejected", "Unrelated service")

        @method()
        def RequestPinCode(self, device: 'o') -> 's':
            self._check(device)
            raise DBusError("org.bluez.Error.Rejected", "PIN pairing not supported")

        @method()
        def RequestPasskey(self, device: 'o') -> 'u':
            self._check(device)
            raise DBusError("org.bluez.Error.Rejected", "Passkey pairing not supported")

        @method()
        def DisplayPinCode(self, device: 'o', pincode: 's'):
            self._check(device)
            raise DBusError("org.bluez.Error.Rejected", "PIN pairing not supported")

        @method()
        def DisplayPasskey(self, device: 'o', passkey: 'u', entered: 'q'):
            self._check(device)

        @method()
        def Cancel(self):
            _LOGGER.info("Rhinocomfort pairing: BlueZ agent cancelled")

    return PairingAgent()


async def pair_ubuntu_style(address: str) -> str | None:
    """Call the same BlueZ Device1.Pair operation as bluetoothctl pair.

    Return None only when BlueZ confirms Paired AND Bonded. Preserve any
    existing bond; never call Device1.RemoveDevice or reset the adapter.
    """
    from dbus_fast import Message, MessageType
    bus = await _session()
    registered = False
    try:
        path = await device_path(bus, address)
        if path is None:
            return "device_not_found"
        state = await _properties(bus, path)
        if state == (True, True):
            return None
        if state is None:
            return "device_not_found"
        agent = _agent(path)
        bus.export(_AGENT_PATH, agent)
        response = await asyncio.wait_for(bus.call(Message(
            destination="org.bluez", path="/org/bluez",
            interface="org.bluez.AgentManager1", member="RegisterAgent",
            signature="os", body=[_AGENT_PATH, "DisplayYesNo"],
        )), timeout=6)
        if response.message_type == MessageType.ERROR:
            return "pairing_agent_unavailable"
        registered = True
        _LOGGER.info("Rhinocomfort pairing: requesting BlueZ Device1.Pair")
        response = await asyncio.wait_for(bus.call(Message(
            destination="org.bluez", path=path,
            interface="org.bluez.Device1", member="Pair",
        )), timeout=85)
        if response.message_type == MessageType.ERROR:
            short = (response.error_name or "Unknown").rsplit(".", 1)[-1]
            _LOGGER.warning("Rhinocomfort pairing: Device1.Pair returned %s", short)
            if short != "AlreadyExists":
                return "pairing_request_failed"
        for _ in range(10):
            if await _properties(bus, path) == (True, True):
                _LOGGER.info("Rhinocomfort pairing: paired and bonded verified")
                return None
            await asyncio.sleep(0.4)
        return "pairing_not_confirmed"
    except TimeoutError:
        return "pairing_request_timeout"
    finally:
        if registered:
            try:
                await asyncio.wait_for(bus.call(Message(
                    destination="org.bluez", path="/org/bluez",
                    interface="org.bluez.AgentManager1", member="UnregisterAgent",
                    signature="o", body=[_AGENT_PATH],
                )), timeout=5)
            except (TimeoutError, OSError, RuntimeError):
                _LOGGER.debug("Rhinocomfort pairing: agent unregister not confirmed")
        bus.disconnect()
