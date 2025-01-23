"""Module providing a tabs widget for the numerous library."""

import re
from typing import Any, NamedTuple

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


class TabsWithVisibility(NamedTuple):
    """Container for a Tabs widget and its visibility controllers."""

    tabs: Tabs
    visibility: list[bool]


def _sanitize_id(name: str) -> str:
    """
    Sanitize a name for use in widget IDs.

    Args:
        name: The name to sanitize

    Returns:
        Sanitized name: lowercase, spaces to underscore, \
            only alphanumeric and underscore

    """
    # Convert to lowercase
    name = name.lower()
    # Replace spaces and hyphens with underscore
    name = re.sub(r"[\s-]+", "_", name)
    # Remove any characters that aren't alphanumeric or underscore
    return re.sub(r"[^\w]", "", name)


def create_tabs_with_visibility(
    tabs: list[str],
    widget_id: str,
    label: str = "",
    tooltip: str | None = None,
    default: str | None = None,
) -> dict[str, Tabs]:
    r"""
    Create a Tabs widget with associated visibility booleans.

    Args:
        tabs: List of tab names
        widget_id: Unique identifier for this tab group
        label: Label for the tabs widget
        tooltip: Optional tooltip text
        default: Default active tab (defaults to first tab if None)

    Returns:
        Dictionary containing the tabs widget and
        \visibility booleans keyed by widget_id:
        - {widget_id}: Tabs widget
        - {widget_id}_{tab_name}: bool indicating if tab should be hidden

    """
    # Sanitize widget_id
    widget_id = _sanitize_id(widget_id)

    # Create the tabs widget
    tabs_widget = Tabs(tabs=tabs, label=label, tooltip=tooltip, default=default)

    # Create result dictionary with tabs widget
    result = {widget_id: tabs_widget}

    # Create visibility booleans for each tab
    visibility_states = [tab != tabs_widget.active_tab for tab in tabs_widget.tabs]

    # Add visibility states to result with sanitized widget_id keys
    for tab, hidden in zip(tabs_widget.tabs, visibility_states, strict=False):
        result[f"{widget_id}_{_sanitize_id(tab)}"] = hidden

    # Set up visibility changes on tab changes
    def on_tab_change(event: Any) -> None:  # noqa: ANN401
        for tab in tabs_widget.tabs:
            key = f"{widget_id}_{_sanitize_id(tab)}"
            result[key] = tab != event.new

    tabs_widget.observe(on_tab_change, names="active_tab")

    return result
