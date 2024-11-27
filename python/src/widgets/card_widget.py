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
    content = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str = None,
        content: Union[str, anywidget.AnyWidget] = None,
        parent: Optional[PortalWidget] = None,
    ):        
        # Initialize with empty content first
        super().__init__(
            title=title if title is not None else "",
            content=content.text if hasattr(content, "text") else str(content)
        )
        

    @staticmethod
    def from_dict(config: Dict[str, Union[str, None, anywidget.AnyWidget]]) -> "CardWidget":
        """Creates a CardWidget instance from a configuration dictionary."""
        return CardWidget(
            title=config.get("title"),
            parent=config.get("parent"),
        )
