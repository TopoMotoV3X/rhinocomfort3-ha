"""Fan entity for the confirmed Rhinocomfort BLE command characteristic."""
from __future__ import annotations

from homeassistant.components.fan import FanEntity, FanEntityFeature
from homeassistant.core import callback
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.const import CONF_ADDRESS

from .const import DOMAIN
from .coordinator import RhinoCoordinator
from .protocol import decode_mode, percent_to_mode, SPEED_TO_PERCENTAGE


async def async_setup_entry(hass, entry, async_add_entities):
    coordinator: RhinoCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([RhinoFan(coordinator)])


class RhinoFan(CoordinatorEntity[RhinoCoordinator], FanEntity):
    """Three manual speeds, AUTO and SLEEP presets."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_supported_features = (
        FanEntityFeature.SET_SPEED
        | FanEntityFeature.PRESET_MODE
        | FanEntityFeature.TURN_ON
        | FanEntityFeature.TURN_OFF
    )
    _attr_preset_modes = ["auto", "sleep"]
    _attr_speed_count = 3

    def __init__(self, coordinator: RhinoCoordinator) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{coordinator.address}_fan"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, coordinator.address)},
            configuration_url=(
                "homeassistant://rhinocomfort3-panel/"
                + coordinator.address.replace(":", "").lower()
            ),
            name="Rhinocomfort 3",
            manufacturer="Fantini Cosmi",
            model="Rhinocomfort 3 (Bluetooth)",
        )

    @property
    def is_on(self) -> bool | None:
        if self.coordinator.data is None:
            return None
        mode = decode_mode(self.coordinator.data)
        return None if mode is None else mode != "off"

    @property
    def percentage(self) -> int | None:
        if self.coordinator.data is None:
            return None
        mode = decode_mode(self.coordinator.data)
        if mode == "off":
            return 0
        return SPEED_TO_PERCENTAGE.get(mode)

    @property
    def preset_mode(self) -> str | None:
        if self.coordinator.data is None:
            return None
        mode = decode_mode(self.coordinator.data)
        return mode if mode in ("auto", "sleep") else None

    @property
    def extra_state_attributes(self):
        value = self.coordinator.data
        operating = self.coordinator.operating_state
        return {
            "ble_mode_hex": value.hex() if value is not None else None,
            "ble_operating_state": (
                operating.hex() if operating is not None else None
            ),
        }

    async def async_turn_on(self, percentage=None, preset_mode=None, **kwargs):
        if preset_mode is not None:
            await self.async_set_preset_mode(preset_mode)
        elif percentage is not None:
            await self.async_set_percentage(percentage)
        else:
            await self.coordinator.async_set_mode("auto")

    async def async_turn_off(self, **kwargs):
        await self.coordinator.async_set_mode("off")

    async def async_set_percentage(self, percentage: int):
        await self.coordinator.async_set_mode(percent_to_mode(percentage))

    async def async_set_preset_mode(self, preset_mode: str):
        if preset_mode not in ("auto", "sleep"):
            raise ValueError("Preset non supportato")
        await self.coordinator.async_set_mode(preset_mode)
