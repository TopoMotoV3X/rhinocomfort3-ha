"""Serialized BLE mode, operating state and sanitization access."""
from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from datetime import timedelta
import logging

from bleak import BleakClient, BleakError
from bleak_retry_connector import establish_connection
from homeassistant.components import bluetooth
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    MODE_CHAR_UUID,
    POLL_SECONDS,
    SANITIZATION_CHAR_UUID,
    STATE_CHAR_UUID,
)
from .protocol import encode_mode

_LOGGER = logging.getLogger(__name__)


@asynccontextmanager
async def _connected_client(device):
    client = await establish_connection(
        BleakClient,
        device,
        "Rhinocomfort 3",
        max_attempts=2,
        timeout=12.0,
    )
    try:
        yield client
    finally:
        await client.disconnect()


class RhinoCoordinator(DataUpdateCoordinator[bytes]):
    """Preserve the existing 2-byte coordinator.data contract for the fan.

    Operating state and sanitization are optional, separately cached values.
    One BLE lock and one connection per transaction; no pairing changes.
    """

    def __init__(self, hass: HomeAssistant, address: str) -> None:
        super().__init__(
            hass, _LOGGER, name=f"Rhinocomfort 3 {address}",
            update_interval=timedelta(seconds=POLL_SECONDS),
        )
        self.address = address
        self._ble_lock = asyncio.Lock()
        self._command_pending = asyncio.Event()
        self._command_waiters = 0
        self.operating_state: bytes | None = None
        self.sanitization_on: bool | None = None

    @staticmethod
    async def _optional_read(client: BleakClient, uuid: str) -> bytes | None:
        characteristic = client.services.get_characteristic(uuid)
        if characteristic is None:
            _LOGGER.debug("Caratteristica BLE opzionale assente: %s", uuid)
            return None
        try:
            return bytes(await asyncio.wait_for(
                client.read_gatt_char(characteristic), timeout=6.0
            ))
        except (BleakError, TimeoutError, OSError) as exc:
            # A single auxiliary read must not break the verified fan entity.
            _LOGGER.debug("Lettura BLE opzionale %s fallita: %s", uuid, exc)
            return None

    async def _transaction(
        self, mode: str | None = None, sanitization: bool | None = None
    ) -> bytes:
        async with self._ble_lock:
            device = bluetooth.async_ble_device_from_address(
                self.hass, self.address, connectable=True
            )
            if device is None:
                raise UpdateFailed("Rhinocomfort non visibile tramite scanner HA")

            # Short-lived BLE connection, consistent with existing integration.
            async with _connected_client(device) as client:
                connected_at = asyncio.get_running_loop().time()
                characteristic = client.services.get_characteristic(MODE_CHAR_UUID)
                if characteristic is None:
                    raise UpdateFailed("UUID GATT di controllo non trovato")

                if mode is not None:
                    await client.write_gatt_char(
                        characteristic, encode_mode(mode), response=True
                    )

                if sanitization is not None:
                    sani_char = client.services.get_characteristic(
                        SANITIZATION_CHAR_UUID
                    )
                    if sani_char is None:
                        raise UpdateFailed("UUID sanificazione non trovato")
                    await client.write_gatt_char(
                        sani_char, b"\x01" if sanitization else b"\x00", response=True
                    )

                value = bytes(await asyncio.wait_for(
                    client.read_gatt_char(characteristic),
                    timeout=10.0,
                ))
                if len(value) != 2:
                    raise UpdateFailed(f"Lunghezza modalità inattesa: {len(value)}")

                # Give priority to a waiting manual command.
                if mode is None and sanitization is None and self._command_pending.is_set():
                    return value

                # Best effort: independent fields, not required by fan.py.
                operating = await self._optional_read(client, STATE_CHAR_UUID)
                self.operating_state = (
                    operating if operating is not None and len(operating) >= 3
                    else None
                )

                if mode is None and sanitization is None and self._command_pending.is_set():
                    return value

                sanitation = await self._optional_read(client, SANITIZATION_CHAR_UUID)
                self.sanitization_on = (
                    sanitation[0] == 1 if sanitation is not None
                    and len(sanitation) == 1 and sanitation[0] in (0, 1)
                    else None
                )
                # Minimum 6 seconds of connected time for polling only.
                if mode is None and sanitization is None:
                    elapsed = asyncio.get_running_loop().time() - connected_at
                    remaining = 6.0 - elapsed
                    if remaining > 0:
                        try:
                            await asyncio.wait_for(
                                self._command_pending.wait(),
                                timeout=remaining,
                            )
                        except TimeoutError:
                            pass
                return value

    async def _async_update_data(self) -> bytes:
        try:
            return await self._transaction()
        except (BleakError, TimeoutError, OSError) as exc:
            raise UpdateFailed(f"Lettura BLE fallita: {exc}") from exc

    async def _priority_command(
        self, mode: str | None = None, sanitization: bool | None = None
    ) -> bytes:
        """Wake polling and serialize manual commands safely."""
        self._command_waiters += 1
        self._command_pending.set()
        try:
            return await self._transaction(
                mode=mode, sanitization=sanitization
            )
        finally:
            self._command_waiters -= 1
            if self._command_waiters == 0:
                self._command_pending.clear()

    async def async_set_mode(self, mode: str) -> None:
        encode_mode(mode)  # Reject unverified commands before connecting.
        value = await self._priority_command(mode=mode)
        _LOGGER.debug("Modalità Rhinocomfort dopo comando: %s", value.hex())
        self.async_set_updated_data(value)

    async def async_set_sanitization(self, enabled: bool) -> None:
        if not isinstance(enabled, bool):
            raise ValueError("La sanificazione richiede un valore booleano")
        value = await self._priority_command(sanitization=enabled)
        # Only the actual BLE read updates the switch, never an assumed value.
        self.async_set_updated_data(value)
