"""Module providing a markdown drawer widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("MarkdownDrawerWidget")


class MarkdownDrawer(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A collapsible drawer widget that displays markdown content.

    Args:
        title: The title shown in the drawer header
        content: The markdown content to display
        open: Whether the drawer starts open (default: False)

    """

    # Define traitlets for the widget properties
    title = traitlets.Unicode().tag(sync=True)
    content = traitlets.Unicode().tag(sync=True)
    is_open = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str,
        content: str,
        is_open: bool = False,
    ) -> None:
        super().__init__(
            title=title,
            content=content,
            is_open=is_open,
        )
