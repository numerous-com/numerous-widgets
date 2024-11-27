from typing import Dict, Union, List, Optional
import traitlets
from .base import PortalWidget
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DropDownWidget")

class DropDownWidget(PortalWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    options = traitlets.List().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        options: List[str],
        tooltip: str = None,
        default: str = None,
        parent: Optional[PortalWidget] = None,
    ):
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default if default is not None else options[0],
            options=options,
            parent=parent,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, List[str]]]) -> "DropDownWidget":
        """Creates a DropDownWidget instance from a configuration dictionary."""
        return DropDownWidget(
            label=config["ui_label"],
            tooltip=config["ui_tooltip"],
            default=config["default"],
            options=config["options"],
            parent=config.get("parent"),
        )

    @property
    def selected_value(self) -> str:
        """Returns the currently selected option."""
        return self.value
