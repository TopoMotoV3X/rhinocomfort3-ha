"""Sanitization switch for the verified Rhinocomfort 3 BLE characteristic."""
from __future__ import annotations

from homeassistant.components.switch import SwitchEntity
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import RhinoCoordinator


async def async_setup_entry(hass, entry, async_add_entities):
    coordinator: RhinoCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([RhinoSanitizationSwitch(coordinator)])


class RhinoSanitizationSwitch(CoordinatorEntity[RhinoCoordinator], SwitchEntity):
    """Independent sanitization feature; never changes fan mode."""

    _attr_has_entity_name = True
    _attr_name = "Sanificazione"
    _attr_icon = "mdi:shield-check"

    def __init__(self, coordinator: RhinoCoordinator) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{coordinator.address}_sanitization"
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
    def available(self) -> bool:
        return (super().available and self.coordinator.sanitization_on is not None)

    @property
    def is_on(self) -> bool | None:
        return self.coordinator.sanitization_on

    async def async_turn_on(self, **kwargs) -> None:
        await self.coordinator.async_set_sanitization(True)

    async def async_turn_off(self, **kwargs) -> None:
        await self.coordinator.async_set_sanitization(False)
