import anywidget
import traitlets
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("HTMLWidget")

class HTMLWidget(anywidget.AnyWidget):
    # Define traitlet for the HTML content
    html_content = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(self, html: str = ""):
        # Initialize with HTML content
        super().__init__(html_content=html)

    def update_content(self, html: str):
        """Updates the HTML content of the widget.
        
        Args:
            html: New HTML content to display
        """
        self.html_content = html
