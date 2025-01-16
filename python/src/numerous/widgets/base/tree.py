"""Module providing a tree browser widget for the numerous library."""

from typing import Literal

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TreeBrowserWidget")


class TreeItem(traitlets.HasTraits):  # type: ignore[misc]
    """Data structure for tree items."""

    id = traitlets.Unicode()
    label = traitlets.Unicode()
    parent_id = traitlets.Unicode(allow_none=True)
    is_expanded = traitlets.Bool(default_value=False)

    def to_dict(self) -> dict[str, str | None | bool]:
        """Convert the TreeItem to a dictionary."""
        return {
            "id": self.id,
            "label": self.label,
            "parent_id": self.parent_id,
            "is_expanded": self.is_expanded,
        }

    def __json__(self) -> dict[str, str | None | bool]:
        """Make the class JSON serializable."""
        return self.to_dict()


class TreeBrowser(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for creating a tree browser.

    Args:
        items: Dictionary of items with their IDs as keys
        selection_mode: Type of selection allowed ('none', 'single', 'multiple')
        expanded_ids: List of IDs that should be initially expanded
        disabled: Whether the tree browser is disabled

    """

    # Define traitlets for the widget properties
    items = traitlets.Dict().tag(sync=True)  # This will hold the serialized version
    selected_ids = traitlets.List(trait=traitlets.Unicode(), default_value=[]).tag(
        sync=True
    )
    selection_mode = traitlets.Enum(
        ["none", "single", "multiple"], default_value="single"
    ).tag(sync=True)
    disabled = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        items: dict[str, dict[str, str | None | bool]],
        selection_mode: Literal["none", "single", "multiple"] = "single",
        expanded_ids: list[str] | None = None,
        disabled: bool = False,  # noqa: ARG002
    ) -> None:
        """Initialize the tree browser widget."""
        super().__init__(
            items={},  # Start with empty items
            selection_mode=selection_mode,
            selected_ids=[],
        )
        # Set items after initialization to trigger the observer
        self.update_items(items, expanded_ids)

    def update_items(
        self,
        items: dict[str, dict[str, str | None | bool]],
        expanded_ids: list[str] | None = None,
    ) -> None:
        """Update the items in the tree."""
        serialized_items = {}
        for _id, item_data in items.items():
            tree_item = TreeItem(
                id=_id,
                label=str(item_data.get("label", _id)),
                parent_id=item_data.get("parent_id", None),
                is_expanded=bool(
                    item_data.get("is_expanded", _id in (expanded_ids or []))
                ),
            )
            serialized_items[_id] = tree_item.to_dict()

        # Create a new dictionary to ensure the change is detected
        self.items = dict(serialized_items)

    @property
    def selected(self) -> list[str]:
        """Returns the currently selected item IDs."""
        return list(self.selected_ids)  # Explicitly convert to list to ensure type

    @selected.setter
    def selected(self, value: list[str]) -> None:
        """Set the selected item IDs."""
        self.selected_ids = value

    def expand_item(self, item_id: str, expand: bool = True) -> None:
        """
        Expand or collapse a specific tree item.

        Args:
            item_id: The ID of the item to expand/collapse
            expand: True to expand, False to collapse

        """
        if item_id in self.items:
            items = dict(self.items)  # Create a new copy
            items[item_id]["is_expanded"] = expand
            self.items = items  # Assign the new copy to trigger update

    def get_children(self, item_id: str) -> list[str]:
        """Get the child IDs for a given item ID."""
        return [
            child_id
            for child_id, item in self.items.items()
            if item["parent_id"] == item_id
        ]

    def add_item(
        self,
        id: str,  # noqa: A002
        label: str,
        parent_id: str | None = None,
        is_expanded: bool = False,
    ) -> None:
        """Add a new item to the tree."""
        items = dict(self.items)  # Create a new copy
        items[id] = {
            "id": id,
            "label": label,
            "parent_id": parent_id,
            "is_expanded": is_expanded,
        }
        self.items = items  # Assign the new copy to trigger update

    def remove_item(self, item_id: str) -> None:
        """Remove an item from the tree."""
        if item_id in self.items:
            items = dict(self.items)  # Create a new copy
            del items[item_id]
            self.items = items  # Assign the new copy to trigger update
