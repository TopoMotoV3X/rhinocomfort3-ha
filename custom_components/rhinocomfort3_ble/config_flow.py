"""Guided discovery, pairing and read-only verification for Rhinocomfort 3.

Do not pair until the user explicitly starts the dedicated pairing step.
Never remove BlueZ bonds as a side-effect of setup or cancellation.
"""
from __future__ import annotations

import asyncio
import logging

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.components import bluetooth
from homeassistant.components.bluetooth import BluetoothServiceInfoBleak
from homeassistant.const import CONF_ADDRESS

from .const import DOMAIN, SCAN_PREFIX
from .ubuntu_pairing import get_bond, pair_ubuntu_style

_LOGGER = logging.getLogger(__name__)


class RhinocomfortFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Step-by-step BLE onboarding; user can retry instead of reinstalling."""

    VERSION = 1

    def __init__(self) -> None:
        self._address: str | None = None
        self._name = "Rhinocomfort 3"
        self._pairing_attempts = 0
        self._pair_task = None

    def _candidates(self) -> dict[str, str]:
        """Use HA's shared Bluetooth scanner; include only connectable devices."""
        return {
            info.address: f"{info.name} ({info.address})"
            for info in bluetooth.async_discovered_service_info(self.hass, True)
            if info.name
            and info.name.upper().startswith(SCAN_PREFIX)
            and info.address not in self._async_current_ids()
        }

    async def async_step_bluetooth(self, discovery_info: BluetoothServiceInfoBleak):
        """Handle a device advertised to HA by its BLE scanner."""
        if not discovery_info.name or not discovery_info.name.upper().startswith(SCAN_PREFIX):
            return self.async_abort(reason="not_supported")
        self._address = discovery_info.address
        self._name = discovery_info.name
        self.context["title_placeholders"] = {"name": self._name}
        await self.async_set_unique_id(self._address)
        self._abort_if_unique_id_configured()
        return await self.async_step_prepare()

    async def async_step_user(self, user_input=None):
        """Refresh discovery each time; never abort just because it is empty."""
        candidates = self._candidates()
        if user_input is not None and candidates:
            address = user_input.get(CONF_ADDRESS)
            if address in candidates:
                self._address = address
                # Avoid extracting a name from the display label.
                self._name = candidates[address].removesuffix(f" ({address})")
                self.context["title_placeholders"] = {"name": self._name}
                await self.async_set_unique_id(address)
                self._abort_if_unique_id_configured()
                return await self.async_step_prepare()
        if not candidates:
            return self.async_show_form(
                step_id="user", data_schema=vol.Schema({}),
                errors={"base": "no_devices_found"},
            )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required(CONF_ADDRESS): vol.In(candidates)}),
            errors={"base": "device_not_found"} if user_input is not None else {},
        )

    async def async_step_prepare(self, user_input=None):
        """Check Ubuntu BlueZ bond without initiating a BLE connection.

        Deliberately no HA progress spinner: a pre-existing valid bond moves
        to the placement screen without a GATT read potentially hanging.
        """
        if user_input is None:
            return self.async_show_form(step_id="prepare", data_schema=vol.Schema({}))
        assert self._address is not None
        try:
            bond = await asyncio.wait_for(get_bond(self._address), timeout=8)
        except TimeoutError:
            bond = None
        if bond == (True, True):
            _LOGGER.info("Rhinocomfort setup: existing Ubuntu BlueZ bond confirmed")
            return self.async_create_entry(title=self._name, data={CONF_ADDRESS: self._address})
        if bond is None:
            return self.async_show_form(step_id="prepare", data_schema=vol.Schema({}),
                                        errors={"base": "pairing_status_unavailable"})
        return await self.async_step_pairing()

    async def async_step_pairing(self, user_input=None):
        if user_input is None:
            return self.async_show_form(
                step_id="pairing", data_schema=vol.Schema({})
            )
        return await self.async_step_pairing_progress()

    async def async_step_pairing_retry(self, user_input=None):
        if user_input is None:
            return self.async_show_form(
                step_id="pairing_retry",
                data_schema=vol.Schema({}),
                description_placeholders={
                    "attempt": str(self._pairing_attempts)
                },
            )
        return await self.async_step_pairing_progress()

    async def async_step_pairing_progress(self, user_input=None):
        if self._pair_task is None:
            self._pairing_attempts += 1
            self._pair_task = self.hass.async_create_task(
                self._pairing_window()
            )

        if not self._pair_task.done():
            return self.async_show_progress(
                step_id="pairing_progress",
                progress_action="pairing",
                progress_task=self._pair_task,
            )

        return self.async_show_progress_done(
            next_step_id="pairing_result"
        )

    async def async_step_pairing_result(self, user_input=None):
        if self._pair_task is None:
            return await self.async_step_pairing_retry()

        try:
            error = self._pair_task.result()
        except (OSError, RuntimeError, ValueError) as exc:
            _LOGGER.warning(
                "Rhinocomfort pairing task failed: %s",
                type(exc).__name__,
            )
            error = "pairing_request_failed"
        finally:
            self._pair_task = None

        if error is None:
            return self.async_create_entry(
                title=self._name,
                data={CONF_ADDRESS: self._address},
            )

        return self.async_show_form(
            step_id="pairing_retry",
            data_schema=vol.Schema({}),
            errors={"base": error},
            description_placeholders={
                "attempt": str(self._pairing_attempts)
            },
        )

    async def _pairing_window(self):
        """Retry temporary BlueZ failures within a 60-second window."""
        assert self._address is not None
        loop = asyncio.get_running_loop()
        deadline = loop.time() + 60.0
        automatic_attempts = 0
        last_error = "pairing_request_failed"

        while loop.time() < deadline:
            automatic_attempts += 1
            remaining = deadline - loop.time()

            try:
                error = await asyncio.wait_for(
                    pair_ubuntu_style(self._address),
                    timeout=remaining,
                )
            except TimeoutError:
                error = "pairing_request_timeout"
            except (OSError, RuntimeError, ImportError, ValueError) as exc:
                _LOGGER.warning(
                    "Rhinocomfort automatic attempt %d: %s",
                    automatic_attempts, type(exc).__name__,
                )
                error = "pairing_request_failed"

            if error is None:
                _LOGGER.warning(
                    "Rhinocomfort pairing succeeded after %d automatic attempts",
                    automatic_attempts,
                )
                return None

            last_error = error

            # Check actual bond even when Device1.Pair returned an error.
            remaining = deadline - loop.time()
            if remaining > 0:
                try:
                    bond = await asyncio.wait_for(
                        get_bond(self._address),
                        timeout=min(5.0, remaining),
                    )
                except TimeoutError:
                    bond = None

                if bond == (True, True):
                    _LOGGER.warning(
                        "Rhinocomfort bond confirmed after BlueZ error, attempt %d",
                        automatic_attempts,
                    )
                    return None

            _LOGGER.warning(
                "Rhinocomfort automatic attempt %d incomplete: %s",
                automatic_attempts, error,
            )

            if error == "pairing_agent_unavailable":
                break

            remaining = deadline - loop.time()
            if remaining > 0:
                await asyncio.sleep(min(3.0, remaining))

        _LOGGER.warning(
            "Rhinocomfort pairing window ended: %d attempts, last error %s",
            automatic_attempts, last_error,
        )
        return last_error

    async def async_step_recovery(self, user_input=None):
        return self.async_show_menu(
            step_id="recovery", menu_options=["prepare", "pairing", "user"]
        )
