import anywidget
import traitlets
from typing import Dict, Union, List, Optional
import anywidget
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TabsWidget")

class TabContainer:
    """A container widget for a single tab."""
    def __init__(self, element_id: str):
        self.element_id = element_id

class Tabs(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    tabs = traitlets.List().tag(sync=True)
    content_updated = traitlets.Bool(default_value=False).tag(sync=True)
    active_tab = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS
    initial_tab = None

    def __init__(
        self,
        tabs: List[str],
        label: str = "",
        tooltip: str = None,
        default: str = None,
    ):
        # Get the initial active tab
        if not self.initial_tab:
            self.initial_tab = default or tabs[0]
        
       
        
        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=self.initial_tab,
            tabs=tabs,
            content_updated=False,
            active_tab=self.initial_tab,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, List[str]]]) -> "TabsWidget":
        """Creates a TabsWidget instance from a configuration dictionary."""
        return Tabs(
            label=config["ui_label"],
            tooltip=config["ui_tooltip"],
            default=config["default"],
            parent=config.get("parent"),
        )

    @property
    def selected_value(self) -> str:
        """Returns the currently selected tab."""
        return self.active_tab
    
def tabs_active_page_content(tabs: Tabs, content_pages: List[str|anywidget.AnyWidget]) -> str:

    content = content_pages[tabs.tabs.index(tabs.active_tab)]


    return content

    