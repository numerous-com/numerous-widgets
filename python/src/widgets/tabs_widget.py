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
    tabs = traitlets.List().tag(sync=True)
    tab_ids = traitlets.Dict().tag(sync=True)
    tab_refs = traitlets.Dict().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tabs: List[str],
        tooltip: str = None,
        default: str = None,
        parent: Optional[PortalWidget] = None,
    ):
        # Use a more predictable ID format
        tab_ids = {
            tab: f"marimo-tab-{tab.lower().replace(' ', '-')}" 
            for tab in tabs
        }
        
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default if default is not None else tabs[0],
            tabs=tabs,
            tab_ids=tab_ids,
            parent=parent,
        )
        
        # Create tab containers
        self._tab_containers = {
            tab: TabContainer(element_id=tab_ids[tab])
            for tab in tabs
        }

    def get(self, tab: str) -> TabContainer:
        """Get a container widget for a specific tab that can be used as a parent."""
        if tab not in self.tab_ids:
            raise KeyError(f"Tab '{tab}' not found. Available tabs: {', '.join(self.tab_ids.keys())}")
        return self._tab_containers[tab]

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

    @property
    def tab_elements(self) -> Dict[str, str]:
        """Returns a dictionary mapping tab names to their corresponding HTML element IDs."""
        return self.tab_ids
    
    def add_widget(self, widget: anywidget.AnyWidget, tab: str):
        if hasattr(widget, "element_id"):
            print(f"Adding widget to tab {tab} with ID: {self.tab_ids[tab]}")  # Debug log
            widget.element_id = self.tab_ids[tab]
        else:
            raise ValueError("Widget does not support 'element_id' attribute")

