"""Module providing an accordion widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("AccordionWidget")


class Accordion(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for creating an accordion.

    Args:
        title: The title of the accordion.
        label: The label of the accordion.
        tooltip: The tooltip of the accordion.
        expanded: Whether the accordion is expanded.

    """

    # Define traitlets for the widget properties
    title = traitlets.Unicode().tag(sync=True)
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    is_expanded = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str,
        label: str = "",
        tooltip: str | None = None,
        expanded: bool = False,
    ) -> None:
        # Initialize with keyword arguments
        super().__init__(
            title=title,
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            is_expanded=expanded,
        )

    @property
    def expanded(self) -> bool:
        """Returns whether the accordion is expanded."""
        return bool(self.is_expanded)
