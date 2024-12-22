"""Module providing a markdown display widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("MarkdownDisplayWidget")


class MarkdownDisplay(anywidget.AnyWidget):  # type: ignore[misc]
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
        class_name: str = "",
    ) -> None:
        super().__init__(
            content=content,
            class_name=class_name,
        )

    def update_content(self, content: str) -> None:
        """Update the markdown content."""
        self.content = content
