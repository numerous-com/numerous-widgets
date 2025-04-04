"""Module providing a save & load widget for generic items."""

from collections.abc import Callable
from typing import Any, Protocol, runtime_checkable

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("LoadSaveWidget")


@runtime_checkable
class LoadSaveManager(Protocol):
    """
    Protocol defining the interface for managing saveable/loadable items.

    Implement this protocol to create a manager class that can work with LoadSaveWidget.
    """

    def get_items(self) -> list[dict[str, str]]:
        """
        Get list of items for display in the widget.

        Returns:
            A list of dictionaries, each with at least 'id' and 'label' keys.

        """
        ...

    def load_item(self, item_id: str) -> tuple[bool, str | None]:
        """
        Load an item by ID.

        Args:
            item_id: The ID of the item to load.

        Returns:
            A tuple of (success, message). If success is True, the item was loaded
            successfully. The message is an optional string that will be displayed
            to the user.

        """
        ...

    def save_item(self, force: bool = False) -> tuple[bool, str | None]:
        """
        Save the current item.

        Args:
            force: Whether to force a save even if the item doesn't appear modified.
                   This is used for Save As operations.

        Returns:
            A tuple of (success, message). If success is True, the item was saved
            successfully. The message is an optional string that will be displayed
            to the user.

        """
        ...

    def reset_item(self) -> tuple[bool, str | None]:
        """
        Reset the current item to its original state.

        Returns:
            A tuple of (success, message). If success is True, the item was reset
            successfully. The message is an optional string that will be displayed
            to the user.

        """
        ...

    def create_new_item(
        self, name: str, is_save_as: bool = False
    ) -> tuple[dict[str, str], bool, str | None]:
        """
        Create a new item.

        Args:
            name: Name for the new item.
            is_save_as: Whether this is a Save As operation, in which case the current
                       item's content should be copied to the new item.

        Returns:
            A tuple of (item, success, message), where item is a dictionary with
            at least 'id' and 'label' keys, success is a boolean indicating whether
            the creation was successful, and message is an optional string to display
            to the user.

        """
        ...

    def rename_item(self, item_id: str, new_name: str) -> tuple[bool, str | None]:
        """
        Rename an existing item.

        Args:
            item_id: The ID of the item to rename.
            new_name: The new name for the item.

        Returns:
            A tuple of (success, message). If success is True, the item was renamed
            successfully. The message is an optional string that will be displayed
            to the user.

        """
        ...

    def reset_config(self) -> tuple[bool, str | None]:
        """
        Reset the current configuration.

        Returns:
            A tuple of (success, message). If success is True, the configuration was
            reset successfully. The message is an optional string that will be
            displayed to the user.

        """
        ...


class LoadSaveWidget(anywidget.AnyWidget):  # type: ignore[misc]
    """
    Widget for loading, saving, resetting, and creating new items.

    This widget provides a UI for managing saveable/loadable items such as
    configurations, documents, or any other type of data that can be created,
    loaded, saved, and modified.

    The widget is designed to work with a manager class that implements the
    LoadSaveManager protocol, which defines methods for loading, saving, and
    managing items.

    Example:
        ```python
        from numerous.widgets import LoadSaveWidget

        class MyConfigManager:
            def __init__(self):
                self.configs = {
                    "config1": {
                        "id": "config1",
                        "label": "Default Config",
                        "data": {...}
                    }
                }
                self.current_config = None
                self.current_id = None
                self.modified = False

            def get_items(self):
                return [{"id": k, "label": v["label"]} for k, v in self.configs.items()]

            def load_item(self, item_id):
                if item_id in self.configs:
                    self.current_config = self.configs[item_id].copy()
                    self.current_id = item_id
                    self.modified = False
                    return True, f"Loaded {self.current_config['label']}"
                return False, "Configuration not found"

            def save_item(self, force=False):
                if self.current_config and self.current_id:
                    if self.modified or force:
                        self.configs[self.current_id] = self.current_config.copy()
                        self.modified = False
                        return True, "Saved successfully"
                    return True, None
                return False, "No configuration to save"

            # ... implement other required methods ...

        # Create a manager and widget
        manager = MyConfigManager()
        widget = LoadSaveWidget(
            items=manager.get_items(),
            on_load=manager.load_item,
            on_save=manager.save_item,
            on_reset=manager.reset_item,
            on_new=manager.create_new_item,
            on_rename=manager.rename_item
        )
        ```

    """

    # Required traits
    items = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    selected_item_id = traitlets.Unicode(allow_none=True).tag(sync=True)
    is_modified = traitlets.Bool(default_value=False).tag(sync=True)

    # Optional traits
    modification_note = traitlets.Unicode(allow_none=True).tag(sync=True)
    disable_load = traitlets.Bool(default_value=False).tag(sync=True)
    disable_save = traitlets.Bool(default_value=False).tag(sync=True)
    disable_save_as = traitlets.Bool(default_value=False).tag(sync=True)
    disable_save_reason = traitlets.Unicode(allow_none=True).tag(sync=True)
    default_new_item_name = traitlets.Unicode(default_value="New Item").tag(sync=True)

    # Action triggers (from Widget to Python)
    do_save = traitlets.Bool(default_value=False).tag(sync=True)
    do_reset = traitlets.Bool(default_value=False).tag(sync=True)
    do_load = traitlets.Bool(default_value=False).tag(sync=True)

    # Response traits (from Python to Widget)
    action_note = traitlets.Unicode(allow_none=True).tag(sync=True)
    success_status = traitlets.Bool(default_value=True).tag(sync=True)
    search_results = traitlets.List(trait=traitlets.Dict()).tag(sync=True)

    # For creating new items
    new_item_name = traitlets.Unicode(allow_none=True).tag(sync=True)
    create_new_item = traitlets.Bool(default_value=False).tag(sync=True)
    is_save_as = traitlets.Bool(default_value=False).tag(sync=True)

    _esm = ESM
    _css = CSS

    # Type aliases for readability
    LoadCallback = Callable[[str], tuple[bool, str | None]]
    SaveCallback = Callable[[bool], tuple[bool, str | None]]
    ResetCallback = Callable[[], tuple[bool, str | None]]
    NewItemCallback = Callable[[str, bool], tuple[dict[str, Any], bool, str | None]]

    def __init__(
        self,
        items: list[dict[str, Any]] | None = None,
        on_load: LoadCallback | None = None,
        on_save: SaveCallback | None = None,
        on_reset: ResetCallback | None = None,
        on_new: NewItemCallback | None = None,
        selected_item_id: str | None = None,
        disable_load: bool = False,
        disable_save: bool = False,
        disable_save_as: bool = False,
        disable_save_reason: str | None = None,
        default_new_item_name: str = "New Item",
        modified: bool = False,
        modification_note: str | None = None,
    ) -> None:
        """
        Initialize the LoadSaveWidget.

        Args:
            items: List of items to display. Each item should be a dict with at least
                an 'id' key and a 'label' key.
            on_load: Callback when an item is selected to load.
                Should return (success, note).
            on_save: Callback when save is requested.
                Should return (success, note).
            on_reset: Callback when reset is requested.
                Should return (success, note).
            on_new: Callback when new item creation is requested.
                Should return (item, success, note).
            selected_item_id: ID of the item to select initially.
            disable_load: Whether to disable the load button.
            disable_save: Whether to disable the save button.
            disable_save_as: Whether to disable the "Save As" button.
            disable_save_reason: Optional reason why saving is disabled
                (shown as tooltip).
            default_new_item_name: Default name for new items.
            modified: Whether the current item is modified.
            modification_note: Optional note to display about the modification.

        """
        if items is None:
            items = []

        # Store callbacks as instance variables, making sure they are properly typed
        self._on_load_callback = on_load
        self._on_save_callback = on_save
        self._on_reset_callback = on_reset
        self._on_new_callback = on_new

        # Initialize the widget
        super().__init__()

        # Store initial items
        self.items = items
        self.search_results = items.copy()

        # Store configuration
        self.selected_item_id = selected_item_id
        self.disable_load = disable_load
        self.disable_save = disable_save
        self.disable_save_as = disable_save_as
        self.disable_save_reason = disable_save_reason
        self.default_new_item_name = default_new_item_name

        self.is_modified = modified
        self.modification_note = modification_note

    def set_items(self, items: list[dict[str, Any]]) -> None:
        """
        Update the list of items displayed in the widget.

        Args:
            items: New list of items to display.

        """
        self.items = items
        self.search_results = items.copy()

    def set_modified(self, is_modified: bool, note: str | None = None) -> None:
        """
        Set the modified state of the current item.

        Args:
            is_modified: Whether the current item is modified.
            note: Optional note to display about the modification.

        """
        self.is_modified = is_modified
        self.modification_note = note

    def set_disable_save(self, disable: bool, reason: str | None = None) -> None:
        """
        Set whether saving is disabled and optionally provide a reason.

        Args:
            disable: Whether to disable the save button.
            reason: Optional reason why saving is disabled (shown as tooltip).

        """
        self.disable_save = disable
        self.disable_save_reason = reason

    def set_disable_save_as(self, disable: bool, reason: str | None = None) -> None:
        """
        Set whether Save As is disabled and optionally provide a reason.

        Args:
            disable: Whether to disable the Save As button.
            reason: Optional reason why Save As is disabled (shown as tooltip).

        """
        self.disable_save_as = disable
        self.disable_save_reason = reason

    def set_selected_item(self, item_id: str | None) -> None:
        """
        Set the selected item by ID.

        Args:
            item_id: ID of the item to select.

        """
        self.selected_item_id = item_id

    @traitlets.observe("do_save")  # type: ignore[misc]
    def _do_save_changed(self, change: traitlets.Bunch) -> None:
        """Handle save requests from the widget."""
        if not change.new:
            return

        if self._on_save_callback is not None:
            success, note = self._handle_save(save_forced=False)
        else:
            success, note = True, None

        self.success_status = success
        self.action_note = note

        # Reset modified state if save was successful
        if success:
            self.set_modified(False)

        # Reset the flag
        self.do_save = False

    @traitlets.observe("do_reset")  # type: ignore[misc]
    def _do_reset_changed(self, change: traitlets.Bunch) -> None:
        """Handle reset requests from the widget."""
        if not change.new:
            return

        if self._on_reset_callback is not None:
            success, note = self._on_reset_callback()
        else:
            success, note = True, None

        self.success_status = success
        self.action_note = note

        # Reset modified state if reset was successful
        if success:
            self.set_modified(False)

        # Reset the flag
        self.do_reset = False

    @traitlets.observe("selected_item_id")  # type: ignore[misc]
    def _selected_item_id_changed(self, change: traitlets.Bunch) -> None:
        """Handle item selection changes from the widget."""
        if change.new == change.old or not change.new:
            return

        # Selection changed, but loading will now be triggered by do_load

    @traitlets.observe("do_load")  # type: ignore[misc]
    def _do_load_changed(self, change: traitlets.Bunch) -> None:
        """Handle load requests from the widget."""
        if not change.new:
            return

        if self._on_load_callback is not None and self.selected_item_id:
            success, note = self._on_load_callback(self.selected_item_id)
            self.success_status = success
            self.action_note = note

        # Reset the flag
        self.do_load = False

    @traitlets.observe("create_new_item")  # type: ignore[misc]
    def _create_new_item_changed(self, change: traitlets.Bunch) -> None:
        """Handle new item creation requests from the widget."""
        if not change.new:
            return

        # Get name and save-as status
        name = self.new_item_name or self.default_new_item_name
        is_save_as_val = self.is_save_as

        # Create the new item
        new_item, success, note = self._create_item(name, is_save_as_val)

        # Update UI state
        self.success_status = success
        self.action_note = note

        # Handle successful item creation
        if success and new_item is not None:
            self._handle_successful_item_creation(new_item, is_save_as_val)

        # Reset the flags
        self.create_new_item = False
        self.new_item_name = None
        self.is_save_as = False

    def _create_item(
        self, name: str, is_save_as: bool
    ) -> tuple[dict[str, Any] | None, bool, str | None]:
        """
        Create a new item using the provided callback or default behavior.

        Args:
            name: Name for the new item.
            is_save_as: Whether this is a Save As operation.

        Returns:
            A tuple of (new_item, success, note).

        """
        if self._on_new_callback is None:
            # Default behavior: create item with a default ID
            import uuid

            new_item = {"id": str(uuid.uuid4()), "label": name}
            return new_item, True, None

        # Try with two arguments (name, is_save_as)
        try:
            return self._on_new_callback(name, is_save_as)
        except TypeError:
            # If two parameters fail, try with just one parameter
            try:
                return self._on_new_callback(name)  # type: ignore[call-arg]
            except (TypeError, ValueError, AttributeError, KeyError) as e:
                # Handle specific exceptions that might occur during item creation
                import uuid

                new_item = {"id": str(uuid.uuid4()), "label": name}
                return new_item, False, f"Failed to create new item: {e!s}"

    def _handle_successful_item_creation(
        self, new_item: dict[str, Any], is_save_as: bool
    ) -> None:
        """
        Handle post-creation steps for a successfully created item.

        Args:
            new_item: The newly created item.
            is_save_as: Whether this is a Save As operation.

        """
        # Add the new item to the list
        self.items = [*self.items, new_item]
        self.search_results = [*self.search_results, new_item]

        # Set selected item ID
        self.selected_item_id = new_item["id"]

        # Load the new item if a load callback is available
        self._load_new_item(new_item)

        # Handle saving based on operation type
        if is_save_as:
            self._handle_save_as_operation(new_item)
        elif self.is_modified and self._on_save_callback is not None:
            self._handle_modified_item_save(new_item)

    def _load_new_item(self, new_item: dict[str, Any]) -> None:
        """Load a newly created item using the load callback."""
        if self._on_load_callback is not None:
            load_success, load_note = self._on_load_callback(new_item["id"])
            if load_note:
                self.action_note = load_note
            self.success_status = load_success

    def _handle_save_as_operation(self, new_item: dict[str, Any]) -> None:
        """Handle saving for Save As operations."""
        if self._on_save_callback is not None:
            # Always force save for Save As operations
            save_success, save_note = self._handle_save(save_forced=True)

            if save_note:
                self.action_note = save_note
            self.success_status = save_success

            # Always reset modified state after saving
            self.set_modified(False)

            # Set a success message if one wasn't provided
            if not save_note:
                self.action_note = f"Saved as '{new_item['label']}'"

    def _handle_modified_item_save(self, new_item: dict[str, Any]) -> None:
        """Handle saving for modified new items."""
        # Only save normal new items if they're modified
        save_success, save_note = self._handle_save(save_forced=True)

        if save_note:
            self.action_note = save_note
        self.success_status = save_success

        # Always reset modified state after saving
        self.set_modified(False)

        # Set a success message if one wasn't provided
        if not save_note:
            self.action_note = f"Created '{new_item['label']}'"

    def _handle_save(self, save_forced: bool = False) -> tuple[bool, str | None]:
        """
        Call the save callback.

        Args:
            save_forced: Whether to force a save even if the item doesn't
              appear modified. This is used for Save As operations.

        Returns:
            A tuple of (success, note).

        """
        if self._on_save_callback is None:
            return True, None

        # Always pass the force parameter - assume the callback supports it
        return self._on_save_callback(save_forced)
