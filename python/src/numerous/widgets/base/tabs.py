"""Module providing a tabs widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TabsWidget")


class TabContainer:
    """A container widget for a single tab."""

    def __init__(self, element_id: str) -> None:
        self.element_id = element_id


class Tabs(anywidget.AnyWidget):  # type: ignore[misc]
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    tabs = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    content_updated = traitlets.Bool(default_value=False).tag(sync=True)
    active_tab = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS
    initial_tab = None

    def __init__(
        self,
        tabs: list[str],
        label: str = "",
        tooltip: str | None = None,
        default: str | None = None,
    ) -> None:
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

    @property
    def selected_value(self) -> str:
        """Returns the currently selected tab."""
        return str(self.active_tab)
