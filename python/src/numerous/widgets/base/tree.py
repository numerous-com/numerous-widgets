"""Module providing a tree browser widget for the numerous library."""

from collections.abc import Callable
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
        validate_label: Optional callback to validate label changes. Should return True\
            if valid.
            Signature: (item_id: str, new_label: str) -> bool
            Default accepts all changes.
        validate_move: Optional callback to validate item moves. Should return True \
            if valid.
            Signature: (item_id: str, new_parent_id: str | None) -> bool
            Default accepts all moves.

    """

    # Define traitlets for the widget properties
    items = traitlets.Dict().tag(sync=True)
    selected_ids = traitlets.List(trait=traitlets.Unicode(), default_value=[]).tag(
        sync=True
    )
    selection_mode = traitlets.Enum(
        ["none", "single", "multiple"], default_value="single"
    ).tag(sync=True)
    disabled = traitlets.Bool(default_value=False).tag(sync=True)
    label_update = traitlets.Dict().tag(sync=True)
    move_update = traitlets.Dict().tag(sync=True)  # New trait for move operations

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        items: dict[str, dict[str, str | None | bool]],
        selection_mode: Literal["none", "single", "multiple"] = "single",
        expanded_ids: list[str] | None = None,
        disabled: bool = False,  # noqa: ARG002
        validate_label: Callable[[str, str], bool] | None = None,
        validate_move: Callable[[str, str | None], bool] | None = None,
    ) -> None:
        """Initialize the tree browser widget."""
        super().__init__(
            items={},
            selection_mode=selection_mode,
            selected_ids=[],
            label_update={},
            move_update={},
        )
        self._validate_label = validate_label or (lambda _id, _label: True)
        self._validate_move = validate_move or (lambda _id, _parent: True)
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

    @traitlets.observe("label_update")  # type: ignore[misc]
    def _handle_label_update(self, change: traitlets.Dict) -> None:
        """Handle label updates from the frontend."""
        new_labels = change["new"]

        if new_labels:
            for item_id, new_label in new_labels.items():
                if item_id in self.items and self._validate_label(item_id, new_label):
                    self.update_label(item_id, new_label)
            # Don't clear the _label_update dict - let the frontend handle that
            # after it sees the items update

    def update_label(self, item_id: str, new_label: str) -> None:
        """Update the label of a specific tree item."""
        if item_id in self.items:
            items = dict(self.items)  # Create a new copy
            items[item_id] = dict(items[item_id])  # Create a new copy of the item
            items[item_id]["label"] = new_label
            self.items = items  # Assign the new copy to trigger update

    @traitlets.observe("move_update")  # type: ignore[misc]
    def _handle_move_update(self, change: traitlets.Dict) -> None:
        """Handle move updates from the frontend."""
        move_info = change["new"]
        if move_info:
            item_id = move_info.get("item_id")
            new_parent_id = move_info.get("parent_id")

            if (
                item_id
                and item_id in self.items
                and self._validate_move(item_id, new_parent_id)
            ):
                # Update the item's parent
                items = dict(self.items)
                items[item_id] = dict(items[item_id])
                items[item_id]["parent_id"] = new_parent_id
                self.items = items

    def move_item(self, item_id: str, new_parent_id: str | None) -> bool:
        """Move an item to a new parent."""
        if (
            item_id in self.items
            and (new_parent_id is None or new_parent_id in self.items)
            and self._validate_move(item_id, new_parent_id)
        ):
            items = dict(self.items)
            items[item_id] = dict(items[item_id])
            items[item_id]["parent_id"] = new_parent_id
            self.items = items
            return True
        return False
