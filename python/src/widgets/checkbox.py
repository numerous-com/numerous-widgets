import anywidget
import traitlets
from typing import Dict, Union
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CheckBoxWidget")

class CheckBox(anywidget.AnyWidget):
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

    @staticmethod
    def from_dict(config: Dict[str, Union[str, bool]]) -> "CheckBox":
        """Creates a CheckBox instance from a configuration dictionary.
        
        Args:
            config: Dictionary containing widget configuration parameters
        
        Returns:
            CheckBox: A new widget instance
        """
        return CheckBox(
            label=config["label"],
            tooltip=config.get("tooltip", ""),
            default=config.get("default", False),
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
