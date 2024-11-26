import anywidget
import traitlets
from typing import Dict, Union
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("CardWidget")

class CardWidget(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    title = traitlets.Unicode().tag(sync=True)
    content = traitlets.Unicode().tag(sync=True)
    element_id = traitlets.Unicode(allow_none=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        content: str,
        title: str = None,
        element_id: str = None,
    ):
        # Initialize with keyword arguments
        super().__init__(
            content=content,
            title=title if title is not None else "",
            element_id=element_id,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, None]]) -> "CardWidget":
        """Creates a CardWidget instance from a configuration dictionary.
        
        Args:
            config: Dictionary containing widget configuration parameters
        
        Returns:
            CardWidget: A new widget instance
        """
        return CardWidget(
            content=config["content"],
            title=config.get("title"),
            element_id=config.get("element_id"),
        )
