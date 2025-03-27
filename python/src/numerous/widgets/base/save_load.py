"""Module providing a Save & Load widget for the numerous library."""

import logging
from collections.abc import Callable
from typing import Any, cast

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("SaveLoadWidget")

logger = logging.getLogger(__name__)

# Constants
DEFAULT_NEW_ITEM_NAME = "New Item"
TUPLE_ITEM_LENGTH = 2
MAX_DEBUG_ITEMS = 5
ERROR_SAVE_DISABLED = "Saving is currently disabled"
ERROR_LOAD_DISABLED = "Loading is currently disabled"


class SaveLoad(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for managing items with save, load, and search functionality.

    Args:
        items: List of items to display. Each item can be a tuple of (id, label)
            or just a label.
        default_new_name: Default name for new items.
        can_save: Whether saving is enabled.
        can_load: Whether loading is enabled.
        disable_save_reason: Reason why saving is disabled.
        disable_load_reason: Reason why loading is disabled.

    """

    # Define traitlets for the widget properties
    items = traitlets.List([]).tag(
        sync=True
    )  # List of items (id, label) or just labels
    filtered_items = traitlets.List([]).tag(sync=True)  # Filtered list of items
    search_query = traitlets.Unicode("").tag(sync=True)  # Current search query
    current_item = traitlets.Dict(
        key_trait=traitlets.Unicode(), value_trait=traitlets.Any(), allow_none=True
    ).tag(sync=True)  # Currently loaded item
    modified = traitlets.Bool(default_value=False).tag(
        sync=True
    )  # Whether the current item is modified
    change_note = traitlets.Unicode("").tag(sync=True)  # Note about the current change
    can_save = traitlets.Bool(default_value=True).tag(
        sync=True
    )  # Whether saving is enabled
    can_load = traitlets.Bool(default_value=True).tag(
        sync=True
    )  # Whether loading is enabled
    default_new_name = traitlets.Unicode(DEFAULT_NEW_ITEM_NAME).tag(
        sync=True
    )  # Default name for new items
    class_name = traitlets.Unicode("").tag(sync=True)  # CSS class name

    # Action triggers from UI to Python
    load_request = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Request to load an item
    save_request = traitlets.Dict(
        key_trait=traitlets.Unicode(), value_trait=traitlets.Any(), allow_none=True
    ).tag(sync=True)  # Request to save the current item
    reset_request = traitlets.Bool(default_value=False).tag(
        sync=True
    )  # Request to reset the current state
    new_request = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Request to create a new item

    # Responses from Python to UI
    load_response = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Response to load request
    save_response = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Response to save request
    reset_response = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Response to reset request
    new_response = traitlets.Dict({}, allow_none=True).tag(
        sync=True
    )  # Response to new request

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        items: list[dict[str, str] | tuple[str, str] | str],
        default_new_name: str = DEFAULT_NEW_ITEM_NAME,
        can_save: bool = True,
        can_load: bool = True,
        disable_save_reason: str = "",
        disable_load_reason: str = "",
        on_search: Callable[[str, list[dict[str, str]]], list[dict[str, str]]]
        | None = None,
        on_load: Callable[[dict[str, str]], tuple[bool, str]] | None = None,
        on_save: Callable[[dict[str, str]], tuple[bool, str]] | None = None,
        on_reset: Callable[[], tuple[bool, str]] | None = None,
        on_new: Callable[[dict[str, str]], tuple[bool, str]] | None = None,
        class_name: str = "",
    ) -> None:
        """
        Initialize the Save & Load widget.

        Args:
            items: List of items to display. Each item can be a tuple of (id, label)
                or just a label.
            default_new_name: Default name for new items.
            can_save: Whether saving is enabled.
            can_load: Whether loading is enabled.
            disable_save_reason: Reason why saving is disabled.
            disable_load_reason: Reason why loading is disabled.
            on_search: Optional callback for custom search functionality.
            on_load: Optional callback for loading items.
            on_save: Optional callback for saving items.
            on_reset: Optional callback for resetting state.
            on_new: Optional callback for creating new items.
            class_name: Optional CSS class name for styling.

        """
        # Initialize the traitlets with default values to ensure they're not undefined
        super().__init__()

        # Validate inputs
        if not isinstance(items, list):
            logger.warning("Items is not a list, converting to empty list")
            items = []

        # Convert items to the expected format
        formatted_items = self._format_items(items)

        # Log the formatted items for debugging
        logger.info(f"Initialized SaveLoad widget with {len(formatted_items)} items")
        for item in formatted_items[:MAX_DEBUG_ITEMS]:
            logger.debug("Item: %r", item)
        if len(formatted_items) > MAX_DEBUG_ITEMS:
            logger.debug(
                "... and %d more items", len(formatted_items) - MAX_DEBUG_ITEMS
            )

        # Ensure default_new_name is a string
        if not isinstance(default_new_name, str):
            logger.warning(
                "default_new_name is not a string: %r, using 'New Item'",
                default_new_name,
            )
            default_new_name = DEFAULT_NEW_ITEM_NAME

        # Set the traitlets *after* initializing the widget
        self.items = formatted_items
        self.filtered_items = (
            formatted_items.copy()
        )  # Make a copy to ensure it's a new list
        self.search_query = ""
        self.current_item = None
        self.modified = False
        self.change_note = ""
        self.can_save = can_save
        self.can_load = can_load
        self.disable_save_reason = disable_save_reason
        self.disable_load_reason = disable_load_reason
        self.default_new_name = default_new_name
        self.class_name = class_name
        self.load_request = None
        self.save_request = None
        self.reset_request = False
        self.new_request = None
        self.load_response = None
        self.save_response = None
        self.reset_response = None
        self.new_response = None

        # Force a sync of the traitlet values
        self.send_state()

        # Store callbacks
        self._on_search = on_search
        self._on_load = on_load
        self._on_save = on_save
        self._on_reset = on_reset
        self._on_new = on_new

        # Set up observers for UI actions
        self.observe(self._handle_search, names=["search_query"])
        self.observe(self._handle_load_request, names=["load_request"])
        self.observe(self._handle_save_request, names=["save_request"])
        self.observe(self._handle_reset_request, names=["reset_request"])
        self.observe(self._handle_new_request, names=["new_request"])

    def _format_items(
        self, items: list[dict[str, str] | tuple[str, str] | str]
    ) -> list[dict[str, str]]:
        """
        Format items into a consistent dictionary format.

        Args:
            items: List of items to format.

        Returns:
            List of formatted items.

        """
        formatted_items = []
        for item in items:
            try:
                if isinstance(item, tuple) and len(item) == TUPLE_ITEM_LENGTH:
                    formatted_items.append({"id": str(item[0]), "label": str(item[1])})
                else:
                    formatted_items.append({"id": str(item), "label": str(item)})
            except (ValueError, TypeError, AttributeError):
                logger.exception("Error formatting item %r", item)
                # Skip this item

        # Log the first few items for debugging
        for item in formatted_items[:MAX_DEBUG_ITEMS]:
            logger.debug("Item: %r", item)
        if len(formatted_items) > MAX_DEBUG_ITEMS:
            logger.debug(
                "... and %d more items", len(formatted_items) - MAX_DEBUG_ITEMS
            )

        return formatted_items

    def _handle_search(self, change: dict[str, Any]) -> None:
        """Handle search query changes."""
        try:
            # Get the search query
            query = cast(str, change.get("new", ""))
            self.search_query = query

            # If there's a custom search function, use it
            if self._on_search:
                self.filtered_items = self._on_search(query, self.items)
            else:
                # Default search: case-insensitive substring match on label
                query_lower = query.lower()
                self.filtered_items = [
                    item for item in self.items if query_lower in item["label"].lower()
                ]

            # Force a sync of the filtered_items value
            self.send_state("filtered_items")
        except Exception:
            logger.exception("Error in search")
            # If there's an error, just show all items
            self.filtered_items = self.items
            self.send_state("filtered_items")

    def _handle_load_request(self, change: dict[str, Any]) -> None:
        """Handle load request changes."""
        try:
            if not self.can_load:
                note = self.disable_load_reason or ERROR_LOAD_DISABLED
                self.load_response = {"success": False, "note": note}
                self.send_state("load_response")
                return

            # Get the item to load
            item_id = cast(str, change.get("new", {}).get("id"))
            if not item_id:
                return

            # Find the item in the list
            item = next((item for item in self.items if item["id"] == item_id), None)
            if not item:
                self.load_response = {
                    "success": False,
                    "note": f"Item {item_id} not found",
                }
                self.send_state("load_response")
                return

            # If there's a custom load function, use it
            if self._on_load:
                success, note = self._on_load(item)
                self.load_response = {"success": success, "note": note}
            else:
                # Default load: just set the current item
                self.current_item = item
                self.modified = False
                self.change_note = ""
                self.load_response = {"success": True, "note": ""}

            # Force a sync of the response and state
            self.send_state(
                ["load_response", "current_item", "modified", "change_note"]
            )
        except Exception:
            logger.exception("Error in load request")
            self.load_response = {"success": False, "note": "Error loading item"}
            self.send_state("load_response")

    def _handle_save_request(self, change: dict[str, Any]) -> None:
        """Handle save request changes."""
        try:
            if not self.can_save:
                note = self.disable_save_reason or ERROR_SAVE_DISABLED
                self.save_response = {"success": False, "note": note}
                self.send_state("save_response")
                return

            # Get the item to save
            item = change.get("new")
            if not item:
                return

            # If there's a custom save function, use it
            if self._on_save:
                success, note = self._on_save(item)
                self.save_response = {"success": success, "note": note}
            else:
                # Default save: just update the current item
                self.current_item = item
                self.modified = False
                self.change_note = ""
                self.save_response = {"success": True, "note": ""}

            # Force a sync of the response and state
            self.send_state(["save_response", "modified", "change_note"])
        except Exception:
            logger.exception("Error in save request")
            self.save_response = {"success": False, "note": "Error saving item"}
            self.send_state("save_response")

    def _handle_reset_request(self, change: dict[str, Any]) -> None:
        """Handle reset request changes."""
        try:
            # Get the reset request
            reset = cast(bool, change.get("new", False))
            if not reset:
                return

            # If there's a custom reset function, use it
            if self._on_reset:
                success, note = self._on_reset()
                self.reset_response = {"success": success, "note": note}
            else:
                # Default reset: just clear the current item
                self.current_item = None
                self.modified = False
                self.change_note = ""
                self.reset_response = {"success": True, "note": ""}

            # Force a sync of the response and state
            self.send_state(["reset_response", "modified", "change_note"])
        except Exception:
            logger.exception("Error in reset request")
            self.reset_response = {"success": False, "note": "Error resetting state"}
            self.send_state("reset_response")

    def _handle_new_request(self, change: dict[str, Any]) -> None:
        """Handle new item request changes."""
        try:
            # Get the new item request
            new_item_request = change.get("new")
            if not new_item_request:
                return

            # Create the new item
            new_item = {
                "id": new_item_request.get("id", ""),
                "label": new_item_request.get("label", ""),
            }

            # If there's a custom new function, use it
            if self._on_new:
                success, note = self._on_new(new_item)
                self.new_response = {"success": success, "note": note}
                if success:
                    # Add the new item to the list
                    self.items = [*self.items, new_item]
                    # Make sure the new item appears in the filtered list
                    self._handle_search({"new": self.search_query})
            else:
                # Default new: just add the item to the list
                self.items = [*self.items, new_item]
                # Make sure the new item appears in the filtered list
                self._handle_search({"new": self.search_query})
                self.new_response = {"success": True, "note": ""}

            # Force a sync of the response and state
            self.send_state(["new_response", "items", "filtered_items"])
        except Exception:
            logger.exception("Error in new item request")
            self.new_response = {"success": False, "note": "Error creating new item"}
            self.send_state("new_response")

    def set_items(self, items: list[dict[str, str] | tuple[str, str] | str]) -> None:
        """
        Set the list of items.

        Args:
            items: List of items to display. Each item can be a tuple of (id, label)
                or just a label.

        """
        self.items = self._format_items(items)
        self._handle_search({"new": self.search_query})

    def set_modified(self, modified: bool, change_note: str = "") -> None:
        """
        Set the modified state of the current item.

        Args:
            modified: Whether the current item is modified.
            change_note: Optional note about the change.

        """
        self.modified = modified
        self.change_note = change_note
        # Force a sync of these values
        self.send_state(["modified", "change_note"])

    def set_can_save(self, can_save: bool) -> None:
        """
        Set whether saving is enabled.

        Args:
            can_save: Whether saving is enabled.

        """
        self.can_save = can_save
        # Force a sync of this value
        self.send_state("can_save")

    def set_can_load(self, can_load: bool) -> None:
        """
        Set whether loading is enabled.

        Args:
            can_load: Whether loading is enabled.

        """
        self.can_load = can_load
        # Force a sync of this value
        self.send_state("can_load")

    def get_current_item(self) -> dict[str, str] | None:
        """
        Get the currently loaded item.

        Returns:
            The currently loaded item, or None if no item is loaded.

        """
        if self.current_item is None:
            return None
        return {
            "id": str(self.current_item["id"]),
            "label": str(self.current_item["label"]),
        }
