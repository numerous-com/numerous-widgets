"""Module providing a text display widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TextWidget")


class Text(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for displaying text content.

    Args:
        value: The text content to display
        disabled: Whether the widget is disabled (default: True for display-only)
        multiline: Whether to display as multiline text (default: False)
        height: The height of the widget in pixels (default: None)
        class_name: Optional CSS class name for styling (default: "")

    """

    # Define traitlets for the widget properties
    value = traitlets.Unicode().tag(sync=True)
    disabled = traitlets.Bool(default_value=True).tag(sync=True)
    multiline = traitlets.Bool(default_value=False).tag(sync=True)
    height = traitlets.Int(allow_none=True).tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        value: str = "",
        disabled: bool = True,
        multiline: bool = False,
        height: int | None = None,
        class_name: str = "",
    ) -> None:
        super().__init__(
            value=value,
            disabled=disabled,
            multiline=multiline,
            height=height,
            class_name=class_name,
        )

    def update_value(self, value: str) -> None:
        """Update the text content."""
        self.value = value

    @property
    def val(self) -> str:
        """
        Return the current text value.

        Returns:
            str: The current text value.

        """
        return str(self.value)

    @val.setter
    def val(self, value: str) -> None:
        """
        Set the current text value.

        Args:
            value: The new value to set.

        """
        self.value = value
