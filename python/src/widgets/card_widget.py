from typing import Dict, Union, Optional
import traitlets
import anywidget
from .base import PortalWidget
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CardWidget")

class CardWidget(PortalWidget):
    # Define traitlets for the widget properties
    title = traitlets.Unicode().tag(sync=True)
    element_id = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str = None,
        parent: Optional[PortalWidget] = None,
    ):
        parent_id = f"marimo-card-{title.lower().replace(' ', '-')}" if title else None
        # Initialize with keyword arguments
        super().__init__(
            title=title if title is not None else "",
            parent=parent,
            parent_id=parent_id,
        )
        
    @staticmethod
    def from_dict(config: Dict[str, Union[str, None, anywidget.AnyWidget]]) -> "CardWidget":
        """Creates a CardWidget instance from a configuration dictionary."""
        return CardWidget(
            title=config.get("title"),
            parent=config.get("parent"),
        )

    def add_widget(self, widget: anywidget.AnyWidget):
        """Add a widget as a child of this card."""
        if hasattr(widget, "element_id"):
            widget.element_id = self.element_id
        else:
            raise ValueError("Widget does not support 'element_id' attribute")
