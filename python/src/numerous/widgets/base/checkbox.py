"""Module providing a checkbox widget for the numerous library."""

from collections.abc import Callable

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
        label_inline: Whether the label should be displayed inline with the checkbox.
        on_change: Optional callback function that is called when the checkbox value\
        changes.

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Bool().tag(sync=True)
    label_inline = traitlets.Bool(default_value=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        default: bool = False,
        label_inline: bool = True,
        on_change: Callable[[bool], None] | None = None,
    ) -> None:
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
            label_inline=label_inline,
        )
        self._on_change = on_change
        if on_change is not None and self._on_change is not None:
            self.observe(lambda change: self._on_change(change.new), names=["value"])

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
