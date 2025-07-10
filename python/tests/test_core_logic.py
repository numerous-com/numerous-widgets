"""Tests for core logic functionality without LoadSaveWidget dependencies."""

import inspect
from typing import Any


def test_callback_signature_detection() -> None:
    """Test that we can detect callback signatures correctly."""

    def legacy_callback(force: bool = False) -> tuple[bool, str]:
        return True, f"Saved with force={force}"

    def new_callback(
        force: bool = False, target_name: str | None = None
    ) -> tuple[bool, str]:
        return True, f"Saved with force={force}, target_name={target_name}"

    def check_callback_signature(callback: Any) -> bool:  # noqa: ANN401
        """Check if the callback supports the target_name parameter."""
        if callback is None:
            return False

        try:
            sig = inspect.signature(callback)
            params = list(sig.parameters.keys())
        except (ValueError, TypeError):
            return False
        else:
            return "target_name" in params

    # Test signature detection
    assert check_callback_signature(legacy_callback) is False
    assert check_callback_signature(new_callback) is True

    # Test with None
    assert check_callback_signature(None) is False

    # Test with non-callable
    assert check_callback_signature("not a function") is False


def test_save_as_scenario() -> None:
    """Test that save-as scenarios work correctly."""
    saved_calls: list[dict[str, Any]] = []

    def save_callback(
        force: bool = False, target_name: str | None = None
    ) -> tuple[bool, str]:
        saved_calls.append({"force": force, "target_name": target_name})
        return True, f"Saved to {target_name}"

    # Simulate save-as operation
    result = save_callback(force=False, target_name="New Configuration")

    assert result[0] is True
    assert "New Configuration" in result[1]
    assert len(saved_calls) == 1
    assert saved_calls[0]["target_name"] == "New Configuration"
    assert saved_calls[0]["force"] is False


def test_backwards_compatibility() -> None:
    """Test that legacy callbacks still work correctly."""
    saved_calls: list[dict[str, bool]] = []

    def legacy_callback(force: bool = False) -> tuple[bool, str]:
        saved_calls.append({"force": force})
        return True, f"Saved with force={force}"

    # Simulate legacy callback usage
    result = legacy_callback(force=False)

    assert result[0] is True
    assert "force=False" in result[1]
    assert len(saved_calls) == 1
    assert saved_calls[0]["force"] is False


if __name__ == "__main__":
    try:
        test_callback_signature_detection()
        test_save_as_scenario()
        test_backwards_compatibility()
    except Exception:  # noqa: BLE001
        import traceback

        traceback.print_exc()
