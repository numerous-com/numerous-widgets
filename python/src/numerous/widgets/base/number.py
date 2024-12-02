import anywidget
import traitlets
from typing import Dict, Union
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("NumberInputWidget")

class Number(anywidget.AnyWidget):
    """
    A widget for selecting a numeric value.

    The selected value can be accessed via the `selected_value` property.

    Args:
        label: The label of the number input.
        tooltip: The tooltip of the number input.
        default: The default value of the number input.
    """
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Float().tag(sync=True)
    start = traitlets.Float().tag(sync=True)
    stop = traitlets.Float().tag(sync=True)
    step = traitlets.Float().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str = None,
        default: float = 0.0,
        start: float = 0.0,
        stop: float = 100.0,
        step: float = 1.0,
    ):
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
            start=start,
            stop=stop,
            step=step,
        )

    @property
    def selected_value(self) -> float:
        """Returns the currently selected numeric value.
        
        Returns:
            float: The currently selected numeric value.
        """
        return self.value
    
    @property
    def val(self) -> float:
        """Returns the currently selected numeric value.
        
        Returns:
            float: The currently selected numeric value.
        """
        return self.value
    
    @val.setter
    def val(self, value: float):
        """Sets the currently selected numeric value.
        
        Args:
            value: The new value to set.
        """
        self.value = value
