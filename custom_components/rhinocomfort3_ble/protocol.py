"""Testable Rhinocomfort 3 GATT protocol mapping. No BLE access here.

Actual writes seen in Intelliclima+ HCI capture: 0000, 0401, 0402,
0403, 0404, 0410. Direct writes of AUTO and OFF tested on real device.
04 05 was rejected on the device and MUST NEVER be sent by this module.
"""

OFF = b"\x00\x00"
SLEEP = b"\x04\x01"
SPEED_1 = b"\x04\x02"
SPEED_2 = b"\x04\x03"
SPEED_3 = b"\x04\x04"
AUTO = b"\x04\x10"

CODE_TO_MODE = {
    OFF: "off",
    SLEEP: "sleep",
    SPEED_1: "speed_1",
    SPEED_2: "speed_2",
    SPEED_3: "speed_3",
    AUTO: "auto",
}
MODE_TO_CODE = {v: k for k, v in CODE_TO_MODE.items()}
PERCENTAGE_TO_SPEED = {33: "speed_1", 67: "speed_2", 100: "speed_3"}
SPEED_TO_PERCENTAGE = {v: k for k, v in PERCENTAGE_TO_SPEED.items()}


def decode_mode(value: bytes | bytearray) -> str | None:
    """Return known mode, or None for unsupported/undecoded device state."""
    return CODE_TO_MODE.get(bytes(value))


def encode_mode(mode: str) -> bytes:
    """Reject arbitrary raw values: only observed commands are allowed."""
    if mode not in MODE_TO_CODE:
        raise ValueError(f"Modalità non supportata: {mode}")
    return MODE_TO_CODE[mode]


def percent_to_mode(percent: int) -> str:
    """Convert HA fan percentage to one of three discrete manual speeds."""
    if not 0 <= percent <= 100:
        raise ValueError(f"Percentuale non valida: {percent}")
    if percent == 0:
        return "off"
    if percent <= 33:
        return "speed_1"
    if percent <= 67:
        return "speed_2"
    return "speed_3"
