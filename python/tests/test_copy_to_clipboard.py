"""Tests for CopyToClipboard widget functionality."""

import sys
import traceback
from typing import Any

from numerous.widgets import CopyToClipboard


# Constants for timeout values
DEFAULT_TIMEOUT = 2000
CUSTOM_TIMEOUT = 3000


def test_copy_to_clipboard_creation() -> None:
    """Test basic CopyToClipboard widget creation."""
    widget = CopyToClipboard(value="Hello, World!", label="Copy Text")

    assert widget.value == "Hello, World!"
    assert widget.label == "Copy Text"
    assert widget.success_message == "Copied!"
    assert widget.disabled is False
    assert widget.show_value is False
    assert widget.timeout == DEFAULT_TIMEOUT
    assert widget.variant == "default"
    assert widget.class_name == ""
    assert widget.copied == 0
    assert widget.is_copying is False
    assert widget.copy_success is False


def test_copy_to_clipboard_with_custom_options() -> None:
    """Test CopyToClipboard widget with custom options."""
    widget = CopyToClipboard(
        value="https://example.com",
        label="Copy URL",
        tooltip="Click to copy URL",
        success_message="URL copied!",
        disabled=True,
        show_value=True,
        timeout=CUSTOM_TIMEOUT,
        variant="primary",
        class_name="custom-class",
    )

    assert widget.value == "https://example.com"
    assert widget.label == "Copy URL"
    assert widget.tooltip == "Click to copy URL"
    assert widget.success_message == "URL copied!"
    assert widget.disabled is True
    assert widget.show_value is True
    assert widget.timeout == CUSTOM_TIMEOUT
    assert widget.variant == "primary"
    assert widget.class_name == "custom-class"


def test_copy_to_clipboard_val_property() -> None:
    """Test the val property getter and setter."""
    widget = CopyToClipboard(value="Initial value")

    # Test getter
    assert widget.val == "Initial value"

    # Test setter
    widget.val = "Updated value"
    assert widget.value == "Updated value"
    assert widget.val == "Updated value"


def test_copy_to_clipboard_update_value_method() -> None:
    """Test the update_value method."""
    widget = CopyToClipboard(value="Initial value")

    widget.update_value("New value")
    assert widget.value == "New value"
    assert widget.val == "New value"


def test_copy_to_clipboard_callback() -> None:
    """Test the copy callback functionality."""
    callback_calls: list[dict[str, Any]] = []

    def on_copy_callback(change: dict[str, Any]) -> None:
        callback_calls.append(change)

    widget = CopyToClipboard(value="Test value", on_copy=on_copy_callback)

    # Clear initial calls (initialization triggers the observer)
    callback_calls.clear()

    # Simulate a copy action by manually triggering the observer
    widget.copied = 1

    assert len(callback_calls) == 1
    assert callback_calls[0]["new"] == 1
    assert callback_calls[0]["name"] == "copied"


def test_copy_to_clipboard_callback_none() -> None:
    """Test that widget works correctly with no callback."""
    widget = CopyToClipboard(value="Test value")

    # This should not raise an error
    widget.copied = 1

    assert widget.copied == 1


def test_copy_to_clipboard_configurations() -> None:
    """Test various widget configurations."""
    configs: list[dict[str, Any]] = [
        {"value": "Short text", "label": "Copy"},
        {
            "value": "This is a longer text that might be truncated in the display",
            "label": "Copy Long Text",
            "show_value": True,
        },
        {"value": "Disabled widget text", "label": "Copy", "disabled": True},
        {
            "value": "Custom success message",
            "label": "Copy",
            "success_message": "Successfully copied!",
            "timeout": 5000,
        },
    ]

    for config in configs:
        widget = CopyToClipboard(**config)
        assert widget.value == config["value"]
        assert widget.label == config["label"]

        # Check specific options if provided
        if "show_value" in config:
            assert widget.show_value == config["show_value"]
        if "disabled" in config:
            assert widget.disabled == config["disabled"]
        if "success_message" in config:
            assert widget.success_message == config["success_message"]
        if "timeout" in config:
            assert widget.timeout == config["timeout"]


def test_copy_to_clipboard_empty_value() -> None:
    """Test widget with empty value."""
    widget = CopyToClipboard(value="")

    assert widget.value == ""
    assert widget.val == ""


def test_copy_to_clipboard_unicode_value() -> None:
    """Test widget with unicode characters."""
    unicode_text = "Hello 🌍! Unicode test: αβγ δεζ"
    widget = CopyToClipboard(value=unicode_text)

    assert widget.value == unicode_text
    assert widget.val == unicode_text


if __name__ == "__main__":
    # Run tests directly
    test_functions = [
        test_copy_to_clipboard_creation,
        test_copy_to_clipboard_with_custom_options,
        test_copy_to_clipboard_val_property,
        test_copy_to_clipboard_update_value_method,
        test_copy_to_clipboard_callback,
        test_copy_to_clipboard_callback_none,
        test_copy_to_clipboard_configurations,
        test_copy_to_clipboard_empty_value,
        test_copy_to_clipboard_unicode_value,
    ]

    passed = 0
    failed = 0

    for test_func in test_functions:
        try:
            test_func()
            passed += 1
        except Exception:  # noqa: BLE001
            traceback.print_exc()
            failed += 1

    if failed > 0:
        sys.exit(1)
