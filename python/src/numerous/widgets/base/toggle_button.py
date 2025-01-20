"""Module providing a toggle button widget for the numerous library."""

from collections.abc import Callable

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ToggleButtonWidget")


class ToggleButton(anywidget.AnyWidget):  # type: ignore[misc]
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Bool().tag(sync=True)
    disabled = traitlets.Bool().tag(sync=True)
    on_change = None

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        value: bool = False,
        on_change: Callable[[traitlets.BaseDescriptor], None] | None = None,
        disabled: bool = False,
    ) -> None:
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=value,
            disabled=disabled,
        )

        self.on_change = on_change

    @traitlets.observe("value")  # type: ignore[misc]
    def _handle_change(self, change: traitlets.BaseDescriptor) -> None:
        if self.on_change is not None:
            self.on_change(change)

    @property
    def val(self) -> bool:
        """Return the value of the toggle button."""
        return bool(self.value)
