import anywidget
import traitlets
from typing import Dict, Union, List, Optional
from .base import PortalWidget
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TabsWidget")

class TabContainer:
    """A container widget for a single tab."""
    def __init__(self, element_id: str):
        self.element_id = element_id

class TabsWidget(PortalWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    tabs = traitlets.Dict().tag(sync=True)
    content_updated = traitlets.Bool(default_value=False).tag(sync=True)
    active_tab = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS
    initial_tab = None

    def __init__(
        self,
        label: str,
        tabs: Dict[str, str],
        tooltip: str = None,
        default: str = None,
        parent: Optional[PortalWidget] = None,
    ):
        # Get the initial active tab
        if not self.initial_tab:
            self.initial_tab = default or list(tabs.keys())[0]
        
        # Process tabs content
        processed_tabs = {}
        for key, content in tabs.items():
            if hasattr(content, "text"):
                processed_tabs[key] = content.text
            else:
                processed_tabs[key] = content
        
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=self.initial_tab,
            tabs=processed_tabs,
            parent=parent,
            content_updated=False,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, List[str]]]) -> "TabsWidget":
        """Creates a TabsWidget instance from a configuration dictionary."""
        return TabsWidget(
            label=config["ui_label"],
            tooltip=config["ui_tooltip"],
            default=config["default"],
            tabs=config["tabs"],
            parent=config.get("parent"),
        )

    @property
    def selected_value(self) -> str:
        """Returns the currently selected tab."""
        return self.value
        
