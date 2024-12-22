"""Module providing a radio buttons widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("RadioButtonsWidget")


class RadioButtons(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a single option from multiple choices.

    The selected value can be accessed via the `selected_value` property.

    Args:
        options: List of options to choose from.
        label: The label of the radio button group.
        tooltip: The tooltip of the radio button group.
        default: The default selected option.

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    options = traitlets.List(traitlets.Unicode()).tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        options: list[str],
        label: str,
        tooltip: str | None = None,
        default: str | None = None,
    ) -> None:
        if not options:
            raise ValueError("Options list cannot be empty")

        # Use first option as default if none provided
        if default is None:
            default = options[0]
        elif default not in options:
            raise ValueError("Default value must be one of the options")

        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            options=options,
            value=default,
        )

    @property
    def selected_value(self) -> str:
        """Return the currently selected option."""
        return str(self.value)

    @property
    def val(self) -> str:
        """Return the currently selected option."""
        return str(self.value)

    @val.setter
    def val(self, value: str) -> None:
        if value not in self.options:
            raise ValueError("Value must be one of the options")
        self.value = value
