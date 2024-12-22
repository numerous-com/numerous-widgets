"""Module providing a checkbox widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CheckBoxWidget")


class CheckBox(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a boolean value.

    The selected value can be accessed via the `selected_value` property.

    Args:
        label: The label of the checkbox.
        tooltip: The tooltip of the checkbox.
        default: The default value of the checkbox.

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Bool().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        default: bool = False,
    ) -> None:
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
        )

    @property
    def selected_value(self) -> bool:
        """Returns the current checkbox state."""
        return bool(self.value)

    @property
    def val(self) -> bool:
        """Return the current checkbox state."""
        return bool(self.value)

    @val.setter
    def val(self, value: bool) -> None:
        self.value = value
