"""Module providing a slider widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("SliderWidget")


class Slider(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a numeric value within a range using a slider.

    The selected value can be accessed via the `selected_value` property.

    Args:
        label: The label of the slider.
        min_value: The minimum value of the slider.
        max_value: The maximum value of the slider.
        step: The step size between values.
        default: The default value of the slider.
        tooltip: The tooltip of the slider.

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Float().tag(sync=True)
    min_value = traitlets.Float().tag(sync=True)
    max_value = traitlets.Float().tag(sync=True)
    step = traitlets.Float().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        min_value: float,
        max_value: float,
        step: float = 1.0,
        default: float | None = None,
        tooltip: str | None = None,
    ) -> None:
        if min_value >= max_value:
            raise ValueError("min_value must be less than max_value")
        if step <= 0:
            raise ValueError("step must be positive")

        # Use min_value as default if none provided
        if default is None:
            default = min_value
        elif not (min_value <= default <= max_value):
            raise ValueError("default value must be between min_value and max_value")

        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
            min_value=min_value,
            max_value=max_value,
            step=step,
        )

    @property
    def selected_value(self) -> float:
        """Returns the current slider value."""
        return float(self.value)

    @property
    def val(self) -> float:
        """Return the current slider value."""
        return float(self.value)

    @val.setter
    def val(self, value: float) -> None:
        if not (self.min_value <= value <= self.max_value):
            raise ValueError("Value must be between min_value and max_value")
        self.value = value
