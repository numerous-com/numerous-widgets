import anywidget
import traitlets
from typing import Dict, Union
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("AccordionWidget")

class Accordion(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    title = traitlets.Unicode().tag(sync=True)
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    is_expanded = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str,
        label: str = "",
        tooltip: str = None,
        expanded: bool = False,
    ):
        # Initialize with keyword arguments
        super().__init__(
            title=title,
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            is_expanded=expanded,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, bool]]) -> "Accordion":
        """Creates an AccordionWidget instance from a configuration dictionary."""
        return Accordion(
            title=config["title"],
            label=config.get("ui_label", ""),
            tooltip=config.get("ui_tooltip"),
            expanded=config.get("expanded", False),
        )

    @property
    def expanded(self) -> bool:
        """Returns whether the accordion is expanded."""
        return self.is_expanded