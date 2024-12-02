from typing import Dict, Union, List, Optional
import traitlets
from ._config import get_widget_paths
import anywidget

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DropDownWidget")

class DropDown(anywidget.AnyWidget):
    """
    A widget for selecting an option from a list of options.

    The selected option can be accessed via the `selected_value` property.

    Args:
        options: A list of options to select from.
        label: The label of the dropdown.
        tooltip: The tooltip of the dropdown.
    """
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    selected_key = traitlets.Unicode().tag(sync=True)
    selected_value = traitlets.Unicode().tag(sync=True)
    options = traitlets.List().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        
        options: List[str],
        label: str = None,
        tooltip: str = None,
        default: str = None,
    ):
        # Initialize with keyword arguments
        default_key = default if default is not None else options[0]
        super().__init__(
            ui_label="" if label is None else label,
            ui_tooltip=tooltip if tooltip is not None else "",
            selected_key=default_key,
            selected_value=default_key,
            options=options,
        )

    @property
    def selected_value(self) -> str:
        """Returns the currently selected option."""
        return self.selected_key
    
    @property
    def val(self) -> str:
        """Returns the currently selected option."""
        return self.selected_value
    
    def get_value(self):
        return self.selected_value
    
    def set_value(self, value):
        self.selected_key = value
        self.selected_value = value

    @property
    def name(self):
        return self.ui_label
