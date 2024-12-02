import anywidget
import traitlets
from typing import Dict, Union
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CheckBoxWidget")

class CheckBox(anywidget.AnyWidget):
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
        tooltip: str = None,
        default: bool = False,
    ):
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
        )

    @property
    def selected_value(self) -> bool:
        """Returns the current checkbox state."""
        return self.value
    
    @property
    def val(self):
        return self.value
    
    @val.setter
    def val(self, value):
        self.value = value

    def get_value(self):
        return self.value
    
    def set_value(self, value):
        self.value = value
