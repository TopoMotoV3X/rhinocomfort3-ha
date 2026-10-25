"""Local Bluetooth integration for the Fantini Cosmi Rhinocomfort 3."""

import asyncio
import json
import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_ADDRESS, Platform
from homeassistant.core import HomeAssistant

from homeassistant.components.lovelace.const import LOVELACE_DATA
from homeassistant.components.lovelace.resources import ResourceStorageCollection

from .const import DOMAIN
from .coordinator import RhinoCoordinator

_LOGGER = logging.getLogger(__name__)
PLATFORMS = [Platform.FAN, Platform.SWITCH]
PANEL_URL = "rhinocomfort3-panel"
PANEL_COMPONENT = "rhinocomfort3-device-panel"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Serve the bundled card, without modifying any Lovelace resources."""
    await hass.http.async_register_static_paths([
        StaticPathConfig(
            "/rhinocomfort3_ble/rhinocomfort3-card.js",
            str(Path(__file__).parent / "frontend" / "rhinocomfort3-card.js"),
            False,
        ),
        StaticPathConfig(
            "/rhinocomfort3_ble/rhinocomfort3-panel.js",
            str(Path(__file__).parent / "frontend" / "rhinocomfort3-panel.js"),
            False,
        ),
    ])
    return True


async def _async_ensure_card_resource(hass: HomeAssistant, version: str) -> None:
    """Register the bundled Lovelace card, without duplicates."""
    lovelace_data = hass.data.get(LOVELACE_DATA)
    if lovelace_data is None:
        _LOGGER.warning("Rhinocomfort: Lovelace not ready")
        return

    resources = lovelace_data.resources
    if not isinstance(resources, ResourceStorageCollection):
        _LOGGER.info("Rhinocomfort: YAML resources, no automatic changes")
        return

    lock = hass.data.setdefault(f"{DOMAIN}_card_lock", asyncio.Lock())
    async with lock:
        await resources.async_get_info()
        items = resources.async_items() or []
        bundled_path = "/rhinocomfort3_ble/rhinocomfort3-card.js"
        legacy_path = "/local/rhinocomfort3-card.js"

        def same_path(item, path):
            return str(item.get("url", "")).split("?", 1)[0] == path

        bundled = [item for item in items if same_path(item, bundled_path)]
        legacy = [item for item in items if same_path(item, legacy_path)]

        if len(bundled) + len(legacy) > 1:
            _LOGGER.warning(
                "Rhinocomfort: multiple card resources exist; manual review required"
            )
            return

        url = f"{bundled_path}?v={version}"
        target = (bundled or legacy or [None])[0]

        if target is None:
            await resources.async_create_item(
                {"url": url, "res_type": "module"}
            )
            _LOGGER.info("Rhinocomfort: Lovelace card registered")

        elif target.get("url") != url or target.get("type") != "module":
            await resources.async_update_item(
                target["id"],
                {"url": url, "res_type": "module"}
            )
            _LOGGER.info("Rhinocomfort: Lovelace card updated")


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration with a read-only first refresh."""
    coordinator = RhinoCoordinator(hass, entry.data[CONF_ADDRESS])
    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    version = await hass.async_add_executor_job(
        lambda: json.loads(
            (Path(__file__).parent / "manifest.json").read_text(encoding="utf-8")
        )["version"]
    )
    if not frontend.async_panel_exists(hass, PANEL_URL):
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_URL,
            webcomponent_name=PANEL_COMPONENT,
            module_url=f"/rhinocomfort3_ble/rhinocomfort3-panel.js?v={version}",
            # Hidden from sidebar; accessible via the device configuration link.
            sidebar_title=None,
            require_admin=False,
        )
    try:
        await _async_ensure_card_resource(hass, version)
    except Exception:
        _LOGGER.exception("Rhinocomfort: Lovelace registration failed")
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove HA entities, but NEVER remove the system's BLE bonding."""
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        # Unregister the optional panel when the last device is unloaded.
        if not hass.data[DOMAIN] and frontend.async_panel_exists(hass, PANEL_URL):
            frontend.async_remove_panel(hass, PANEL_URL)
    return ok
