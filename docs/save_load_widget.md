# Save & Load Widget

The Save & Load widget provides a user interface for managing a flat list of items, configurations, or cases. It allows users to search, load, save, reset, and create new items while synchronizing with the application.

## Features

- **Item Management**: Display and manage a list of items with unique IDs and labels
- **Search Functionality**: Filter items by substring matching or custom search logic
- **Load Functionality**: Load selected items with confirmation for unsaved changes
- **Save Functionality**: Save the current item state
- **Save As Functionality**: Save the current state to a new item or existing item
- **Reset Functionality**: Reset the current item to its original state
- **New Item Creation**: Create new items with custom labels
- **Modification Tracking**: Visual indication of unsaved changes with optional change notes
- **Customizable Callbacks**: Override default behavior with custom callbacks
- **Disable Load/Save**: Ability to disable loading or saving functionality with optional reason messages
- **Confirmation Dialogs**: Configurable confirmation dialogs for critical actions

## Usage

### Basic Usage

```python
import marimo as mo
import numerous.widgets as wi

# Create a configuration manager for handling item state
config_manager = ConfigManager()  # Your implementation

# Create a widget with basic functionality
load_save_widget = mo.ui.anywidget(wi.LoadSaveWidget(
    items=config_manager.get_configs(),
    on_load=config_manager.load_config,
    on_save=config_manager.save_config,
    on_reset=config_manager.reset_config,
    on_search=config_manager.search_configs,
    on_new=config_manager.create_new_config,
    default_new_item_name="New Configuration"
))

# Display the widget
load_save_widget
```

### Implementing a Manager Class

```python
class ConfigManager:
    """Simple example class to manage configurations."""

    def __init__(self) -> None:
        """Initialize the configuration manager."""
        self.configs = {
            "config-1": {
                "id": "config-1",
                "label": "Basic Configuration",
                "settings": {
                    "param1": 5,
                    "param2": "test",
                    "param3": True
                }
            },
            "config-2": {
                "id": "config-2",
                "label": "Advanced Configuration",
                "settings": {
                    "param1": 10,
                    "param2": "advanced",
                    "param3": False,
                    "param4": 3.14
                }
            }
        }
        self.current_config = None
        self.current_config_id = None
        self.modified = False

    def get_configs(self) -> list[dict[str, str]]:
        """Get list of configurations for display in the widget."""
        return [
            {"id": config["id"], "label": config["label"]}
            for config in self.configs.values()
        ]

    def load_config(self, config_id: str) -> tuple[bool, str | None]:
        """Load a configuration by ID."""
        if config_id in self.configs:
            self.current_config = self.configs[config_id].copy()
            self.current_config_id = config_id
            self.modified = False
            return True, f"Loaded **{self.current_config['label']}** successfully"
        return False, "Configuration not found"

    def save_config(self, force: bool = False) -> tuple[bool, str | None]:
        """Save the current configuration."""
        if self.current_config and self.current_config_id:
            if self.modified or force:
                self.configs[self.current_config_id] = self.current_config.copy()
                self.modified = False
                return True, f"Configuration **{self.current_config['label']}** saved successfully"
            return True, None  # No changes to save
        return False, "No configuration to save"

    def reset_config(self) -> tuple[bool, str | None]:
        """Reset the current configuration."""
        if self.current_config_id:
            self.current_config = self.configs[self.current_config_id].copy()
            self.modified = False
            return True, "Configuration reset successfully"
        return False, "No configuration to reset"

    def search_configs(self, query: str) -> list[dict[str, str]]:
        """Search configurations by name."""
        if not query:
            return self.get_configs()

        return [
            {"id": config["id"], "label": config["label"]}
            for config in self.configs.values()
            if query.lower() in config["label"].lower()
        ]

    def create_new_config(self, name: str) -> tuple[dict[str, str], bool, str | None]:
        """Create a new configuration."""
        import uuid
        config_id = f"config-{str(uuid.uuid4())[:8]}"

        # Create with default values
        new_config = {
            "id": config_id,
            "label": name,
            "settings": {
                "param1": 0,
                "param2": "",
                "param3": False
            }
        }

        self.configs[config_id] = new_config
        return {"id": config_id, "label": name}, True, f"Created new configuration: **{name}**"
```

### Handling Modifications

```python
# When application makes changes, notify the widget
def on_click_modify(event):
    # Simulate some changes
    note = config_manager.modify_config({"param1": 15})
    load_save_widget.set_modified(True, note)

# Disable saving with a reason
def on_click_disable(event):
    load_save_widget.disable_save = True
    load_save_widget.disable_save_as = True
    load_save_widget.disable_save_reason = "Not allowed now!"

# Enable saving
def on_click_enable(event):
    load_save_widget.disable_save = False
    load_save_widget.disable_save_as = False
    load_save_widget.disable_save_reason = ""
```

## API Reference

### Constructor

```python
LoadSaveWidget(
    items: list[dict[str, Any]] | None = None,
    on_load: LoadCallback | None = None,
    on_save: SaveCallback | None = None,
    on_reset: ResetCallback | None = None,
    on_search: SearchCallback | None = None,
    on_new: NewItemCallback | None = None,
    selected_item_id: str | None = None,
    disable_load: bool = False,
    disable_save: bool = False,
    disable_save_as: bool = False,
    disable_save_reason: str | None = None,
    default_new_item_name: str = "New Item",
)
```

### Parameters

- **items**: List of items to display. Each item should be a dict with at least an 'id' key and a 'label' key.
- **on_load**: Callback when an item is selected to load. Should return (success, note).
- **on_save**: Callback when save is requested. Should return (success, note).
- **on_reset**: Callback when reset is requested. Should return (success, note).
- **on_search**: Callback when search is requested. Should return a list of items matching the search.
- **on_new**: Callback when new item creation is requested. Should return (item, success, note).
- **selected_item_id**: ID of the item to select initially.
- **disable_load**: Whether to disable the load button.
- **disable_save**: Whether to disable the save button.
- **disable_save_as**: Whether to disable the "Save As" button.
- **disable_save_reason**: Optional reason why saving is disabled (shown as tooltip).
- **default_new_item_name**: Default name for new items.

### Methods

- **set_items(items)**: Update the list of items displayed in the widget.
- **set_modified(is_modified, note=None)**: Set the modified state of the current item with an optional modification note.
- **set_disable_save(disable, reason=None)**: Set whether saving is disabled with an optional reason.
- **set_disable_save_as(disable, reason=None)**: Set whether Save As is disabled with an optional reason.
- **set_selected_item(item_id)**: Set the selected item by ID.

### Callback Signatures

- **LoadCallback = Callable[[str], tuple[bool, str | None]]**
  - Called when an item is loaded
  - Takes item ID as parameter
  - Returns success flag and optional message

- **SaveCallback = Callable[[bool], tuple[bool, str | None]]**
  - Called when save is requested
  - Takes force parameter (True for Save As operations)
  - Returns success flag and optional message

- **ResetCallback = Callable[[], tuple[bool, str | None]]**
  - Called when reset is requested
  - Returns success flag and optional message

- **SearchCallback = Callable[[str], list[dict[str, Any]]]**
  - Called when search is requested
  - Takes search query as parameter
  - Returns filtered list of items

- **NewItemCallback = Callable[[str, bool], tuple[dict[str, Any], bool, str | None]]**
  - Called when new item creation is requested
  - Takes name and is_save_as flag as parameters
  - Returns new item, success flag, and optional message

## User Interface Features

The widget provides a comprehensive user interface with:

- Item selection dropdown with search functionality
- Visual indication of modified state
- Save, Save As, Reset, and Load operations
- Confirmation dialogs for potentially destructive actions
- Toast notifications for operation status
- Keyboard navigation support
- Responsive design

## Internal Processing Flow

When a Save As operation is performed, the widget follows this sequence:

1. If saving to an existing item, it uses the `onSaveAsWithId` method to:
   - Set the selected item ID to the target
   - Trigger a save operation
   - Display a custom success message

2. If creating a new item, it:
   - Creates the new item using the provided name
   - Sets it as the current item
   - Performs a save operation
   - Displays a success message

The widget handles all UI state management automatically, providing appropriate feedback to the user at each step. 