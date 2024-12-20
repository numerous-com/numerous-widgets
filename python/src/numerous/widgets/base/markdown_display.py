import anywidget
import traitlets
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("MarkdownDisplayWidget")

class MarkdownDisplay(anywidget.AnyWidget):
    """
    A widget that displays markdown content.

    Args:
        content: The markdown content to display
        className: Optional CSS class name for styling (default: "")
    """
    # Define traitlets for the widget properties
    content = traitlets.Unicode().tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        content: str,
        className: str = "",
    ):
        super().__init__(
            content=content,
            class_name=className,
        )

    def update_content(self, content: str):
        """Update the markdown content."""
        self.content = content 