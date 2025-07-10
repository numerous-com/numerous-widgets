"""Module providing a copy to clipboard button widget for the numerous library."""

from collections.abc import Callable

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CopyToClipboardWidget")


class CopyToClipboard(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A button widget that copies a string value to the clipboard when clicked.

    Args:
        value: The string value to copy to clipboard
        label: The button text (default: "Copy")
        tooltip: Optional tooltip text
        success_message: Message to show when copied (default: "Copied!")
        disabled: Whether the button is disabled (default: False)
        show_value: Whether to show the value being copied (default: False)
        timeout: How long to show success message in milliseconds (default: 2000)
        variant: Button style variant (default: "default")
        on_copy: Optional callback function called when copied
        class_name: Optional CSS class name for styling

    Example:
        ```python
        import numerous.widgets as wi

        # Basic usage
        copy_btn = wi.CopyToClipboard(
            value="Hello, World!",
            label="Copy Text"
        )

        # With callback
        def on_copied(change):
            print(f"Copied: {copy_btn.value}")

        copy_btn = wi.CopyToClipboard(
            value="https://example.com",
            label="Copy URL",
            success_message="URL copied!",
            show_value=True,
            on_copy=on_copied
        )
        ```

    """

    # Define traitlets for the widget properties
    value = traitlets.Unicode().tag(sync=True)
    label = traitlets.Unicode().tag(sync=True)
    tooltip = traitlets.Unicode().tag(sync=True)
    success_message = traitlets.Unicode().tag(sync=True)
    disabled = traitlets.Bool(default_value=False).tag(sync=True)
    show_value = traitlets.Bool(default_value=False).tag(sync=True)
    timeout = traitlets.Int(default_value=2000).tag(sync=True)
    variant = traitlets.Unicode().tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)

    # Internal state
    copied = traitlets.Int(default_value=0).tag(sync=True)
    is_copying = traitlets.Bool(default_value=False).tag(sync=True)
    copy_success = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        value: str,
        label: str = "Copy",
        tooltip: str = "",
        success_message: str = "Copied!",
        disabled: bool = False,
        show_value: bool = False,
        timeout: int = 2000,
        variant: str = "default",
        on_copy: Callable[[traitlets.BaseDescriptor], None] | None = None,
        class_name: str = "",
    ) -> None:
        # Store callback before calling super().__init__
        self.on_copy = on_copy

        super().__init__(
            value=value,
            label=label,
            tooltip=tooltip,
            success_message=success_message,
            disabled=disabled,
            show_value=show_value,
            timeout=timeout,
            variant=variant,
            class_name=class_name,
            copied=0,
            is_copying=False,
            copy_success=False,
        )

    @traitlets.observe("copied")  # type: ignore[misc]
    def _handle_copy(self, change: traitlets.BaseDescriptor) -> None:
        """Handle copy action."""
        if self.on_copy is not None:
            self.on_copy(change)

    def update_value(self, value: str) -> None:
        """Update the value to be copied."""
        self.value = value

    @property
    def val(self) -> str:
        """
        Return the current value to be copied.

        Returns:
            str: The current value.

        """
        return str(self.value)

    @val.setter
    def val(self, value: str) -> None:
        """
        Set the current value to be copied.

        Args:
            value: The new value to set.

        """
        self.value = value
