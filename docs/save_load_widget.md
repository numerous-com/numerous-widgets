# Save & Load Widget

The Save & Load widget provides a comprehensive user interface for managing a flat list of items, configurations, or cases. It allows users to search, load, save, reset, create new items, and rename existing items with granular permission controls.

## Features

- **Item Management**: Display and manage a list of items with unique IDs and labels
- **Search Functionality**: Filter items by substring matching or custom search logic
- **Load Functionality**: Load selected items with confirmation for unsaved changes
- **Save Functionality**: Save the current item state with target name support for Save As operations
- **Save As Functionality**: Save the current state to a new item or existing item with proper target identification
- **Reset Functionality**: Reset the current item to its original state
- **New Item Creation**: Create new items with custom labels, supporting both new items and save-as operations
- **Rename Functionality**: Rename existing items with callback support
- **Modification Tracking**: Visual indication of unsaved changes with optional change notes
- **Customizable Callbacks**: Override default behavior with flexible callback signatures
- **Granular Permission Controls**: Disable individual UI elements (load, save, save-as, rename) with helpful feedback
- **Enhanced User Feedback**: Tooltips and confirmation dialogs with proper contrast and visibility
- **Backward Compatibility**: Supports both enhanced and legacy callback signatures automatically

## Usage

### Basic Usage

```python
import marimo as mo
import numerous.widgets as wi

# Create a configuration manager for handling item state
config_manager = ConfigManager()  # Your implementation

# Create a widget with comprehensive functionality
load_save_widget = mo.ui.anywidget(wi.LoadSaveWidget(
    items=config_manager.get_configs(),
    on_load=config_manager.load_config,
    on_save=config_manager.save_config,  # Supports target_name parameter
    on_reset=config_manager.reset_config,
    on_search=config_manager.search_configs,
    on_new=config_manager.create_new_config,
    on_rename=config_manager.rename_config,  # Full rename support
    
    # Granular permission controls
    disable_rename=True,
    disable_rename_reason="Contact administrator for rename permissions",
    
    default_new_item_name="New Configuration"
))

# Display the widget
load_save_widget
```

### Configuration Manager Implementation

```python
class ConfigManager:
    """Configuration manager demonstrating all LoadSaveWidget features."""

    def __init__(self, user_role: str = "admin") -> None:
        """Initialize the configuration manager with user role support."""
        self.user_role = user_role
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

    def save_config(self, force: bool = False, target_name: str | None = None) -> tuple[bool, str | None]:
        """Save the current configuration. Supports target_name for Save As operations."""
        if not self.current_config or not self.current_config_id:
            return False, "No configuration to save"
        
        # Check user permissions
        if self.user_role == "viewer":
            return False, "Viewers cannot save configurations"
        
        if not self.modified and not force:
            return True, None  # No changes to save

        # Determine target configuration
        if not self.current_config_id:
            return False, "No configuration currently loaded"
            
        target_config_id = self.current_config_id
        
        if target_name:
            # Save As operation - find target by name
            for config_id, config in self.configs.items():
                if config["label"] == target_name:
                    target_config_id = config_id
                    break
            else:
                return False, f"Target configuration '{target_name}' not found"
        
        # Check permissions for specific targets
        if target_config_id == "production" and self.user_role != "admin":
            return False, "Only administrators can save to production"

        # Perform the save
        self.configs[target_config_id] = self.current_config.copy()
        self.modified = False
        
        target_label = self.configs[target_config_id]["label"]
        if target_name and target_name != self.configs[self.current_config_id]["label"]:
            return True, f"Configuration saved as **{target_label}**"
        else:
            return True, f"Configuration **{target_label}** saved successfully"

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

    def create_new_config(self, name: str, is_save_as: bool = False) -> tuple[dict[str, str], bool, str | None]:
        """Create a new configuration. Supports save-as operations."""
        # Check user permissions
        if self.user_role == "viewer":
            return {}, False, "Viewers cannot create configurations"
            
        import uuid
        config_id = f"config-{str(uuid.uuid4())[:8]}"

        if is_save_as and self.current_config:
            # Save As - copy current configuration
            new_config = self.current_config.copy()
            new_config["id"] = config_id
            new_config["label"] = name
            message = f"Created **{name}** as copy of current configuration"
        else:
            # New item - use default values
            new_config = {
                "id": config_id,
                "label": name,
                "settings": {
                    "param1": 0,
                    "param2": "",
                    "param3": False
                }
            }
            message = f"Created new configuration: **{name}**"

        self.configs[config_id] = new_config
        return {"id": config_id, "label": name}, True, message
        
    def rename_config(self, config_id: str, new_name: str) -> tuple[bool, str | None]:
        """Rename a configuration with permission checking."""
        # Check user permissions
        if self.user_role == "viewer":
            return False, "Viewers cannot rename configurations"
            
        if self.user_role == "editor" and config_id == "production":
            return False, "Editors cannot rename production configuration"
            
        if config_id not in self.configs:
            return False, "Configuration not found"
            
        old_name = self.configs[config_id]["label"]
        self.configs[config_id]["label"] = new_name
        
        # If this is the current config, update it too
        if self.current_config and self.current_config_id == config_id:
            self.current_config["label"] = new_name
            
        return True, f"Renamed configuration from **{old_name}** to **{new_name}**"
```

### Permission-Based Widget Configuration

```python
def create_widget_for_user_role(user_role: str):
    """Create widget with appropriate permissions for user role."""
    config_manager = ConfigManager(user_role)
    
    # Configure permissions based on user role
    if user_role == "admin":
        # Admins have full access
        widget = wi.LoadSaveWidget(
            items=config_manager.get_configs(),
            on_load=config_manager.load_config,
            on_save=config_manager.save_config,
            on_reset=config_manager.reset_config,
            on_search=config_manager.search_configs,
            on_new=config_manager.create_new_config,
            on_rename=config_manager.rename_config,
        )
    elif user_role == "editor":
        # Editors can't rename production configs
        widget = wi.LoadSaveWidget(
            items=config_manager.get_configs(),
            on_load=config_manager.load_config,
            on_save=config_manager.save_config,
            on_reset=config_manager.reset_config,
            on_search=config_manager.search_configs,
            on_new=config_manager.create_new_config,
            on_rename=config_manager.rename_config,
            disable_rename_reason="Limited rename permissions for editors",
        )
    else:  # viewer
        # Viewers can only load and search
        widget = wi.LoadSaveWidget(
            items=config_manager.get_configs(),
            on_load=config_manager.load_config,
            on_search=config_manager.search_configs,
            
            # Disable modification operations
            disable_save=True,
            disable_save_as=True,
            disable_rename=True,
            
            # Provide helpful feedback
            disable_save_reason="Viewers have read-only access",
            disable_rename_reason="Viewers cannot modify configurations",
        )
    
    return widget
```

### Dynamic Permission Updates

```python
# Change permissions dynamically based on application state
def update_permissions_based_on_context():
    # Example: Disable during maintenance
    load_save_widget.set_disable_save(True, "System maintenance in progress")
    load_save_widget.set_disable_rename(True, "Feature temporarily disabled")
    
    # Re-enable when maintenance is complete
    load_save_widget.set_disable_save(False, None)
    load_save_widget.set_disable_rename(False, None)
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
    on_rename: RenameCallback | None = None,
    selected_item_id: str | None = None,
    disable_load: bool = False,
    disable_save: bool = False,
    disable_save_as: bool = False,
    disable_rename: bool = False,
    disable_save_reason: str | None = None,
    disable_rename_reason: str | None = None,
    default_new_item_name: str = "New Item",
)
```

### Parameters

- **items**: List of items to display. Each item should be a dict with at least an 'id' key and a 'label' key.
- **on_load**: Callback when an item is selected to load. Should return (success, note).
- **on_save**: Callback when save is requested. Supports optional target_name parameter for Save As operations.
- **on_reset**: Callback when reset is requested. Should return (success, note).
- **on_search**: Callback when search is requested. Should return a list of items matching the search.
- **on_new**: Callback when new item creation is requested. Supports is_save_as parameter.
- **on_rename**: Callback when item rename is requested. Should return (success, note).
- **selected_item_id**: ID of the item to select initially.
- **disable_load**: Whether to disable the load button.
- **disable_save**: Whether to disable the save button.
- **disable_save_as**: Whether to disable the "Save As" button.
- **disable_rename**: Whether to disable the rename functionality.
- **disable_save_reason**: Optional reason why saving is disabled (shown as tooltip).
- **disable_rename_reason**: Optional reason why renaming is disabled (shown as tooltip).
- **default_new_item_name**: Default name for new items.

### Methods

- **set_items(items)**: Update the list of items displayed in the widget.
- **set_modified(is_modified, note=None)**: Set the modified state of the current item with an optional modification note.
- **set_disable_save(disable, reason=None)**: Set whether saving is disabled with an optional reason.
- **set_disable_save_as(disable, reason=None)**: Set whether Save As is disabled with an optional reason.
- **set_disable_rename(disable, reason=None)**: Set whether renaming is disabled with an optional reason.
- **set_selected_item(item_id)**: Set the selected item by ID.

### Callback Signatures

- **LoadCallback = Callable[[str], tuple[bool, str | None]]**
  - Called when an item is loaded
  - Takes item ID as parameter
  - Returns success flag and optional message

- **SaveCallback = Callable[[bool, str | None], tuple[bool, str | None]]**
  - Called when save is requested
  - Takes force parameter and optional target_name for Save As operations
  - Automatically detects callback signature for backward compatibility
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

- **RenameCallback = Callable[[str, str], tuple[bool, str | None]]**
  - Called when item rename is requested
  - Takes item ID and new name as parameters
  - Returns success flag and optional message

## User Interface Features

The widget provides a comprehensive user interface with:

- Item selection dropdown with search functionality
- Visual indication of modified state
- Save, Save As, Reset, Load, and Rename operations with granular controls
- Confirmation dialogs with proper contrast and visibility
- Toast notifications for operation status
- Keyboard navigation support
- Responsive design with accessibility improvements
- Helpful tooltips for disabled functions

### Permission Controls

The widget supports granular permission controls:

- **Individual UI Element Control**: Disable specific operations (load, save, save-as, rename) independently
- **Helpful User Feedback**: Provide clear reasons why features are disabled via tooltips
- **Dynamic Permission Updates**: Change permissions at runtime based on application state
- **Role-Based Configuration**: Configure widget differently for different user roles

### Confirmation Dialogs

The widget implements a comprehensive confirmation dialog system:

- **Proper Visual Contrast**: Clear text visibility with appropriate color schemes
- **Consistent Styling**: Uniform modal backgrounds and button contrast
- **Accessibility**: Focus management and keyboard navigation support
- **Descriptive Messages**: Clear explanations of what each action will do

### Save As Functionality

The Save As feature includes:

- **Target Name Identification**: Save callbacks receive the target configuration name
- **Proper Target Lookup**: Automatic lookup of target names from selected items
- **Backward Compatibility**: Legacy save callbacks continue to work unchanged
- **State Management**: Proper cleanup of operation state after completion

## Callback Compatibility

The widget supports both enhanced and legacy callback signatures:

### Save Callback Signatures

**Enhanced (Recommended):**
```python
def save_callback(force=False, target_name=None):
    if target_name:
        # Handle Save As operation
        return True, f"Saved as {target_name}"
    else:
        # Handle regular save
        return True, "Saved successfully"
```

**Legacy (Supported):**
```python
def save_callback(force=False):
    return True, "Saved successfully"
```

### New Item Callback Signatures

**Enhanced (Recommended):**
```python
def new_item_callback(name, is_save_as=False):
    if is_save_as:
        # Handle Save As operation
        return {"id": "new_id", "label": name}, True, f"Saved as {name}"
    else:
        # Handle new item creation
        return {"id": "new_id", "label": name}, True, f"Created {name}"
```

**Legacy (Supported):**
```python
def new_item_callback(name):
    return {"id": "new_id", "label": name}, True, "Created"
```

## Internal Processing Flow

### Save As Processing

When a Save As operation is performed, the widget:

1. **Target Identification**: Identifies the target by either:
   - Using an explicitly set target name
   - Looking up the selected item's label

2. **Callback Signature Detection**: Automatically detects whether the save callback supports the target_name parameter

3. **Save Execution**: 
   - For enhanced callbacks: Calls `save_callback(force=False, target_name="Target Name")`
   - For legacy callbacks: Calls `save_callback(force=False)`

4. **State Cleanup**: All operation state is properly cleaned up after completion

### Rename Operation Processing

The rename functionality:

1. **Permission Check**: Verify user has rename permissions
2. **UI Interaction**: Show rename dialog with current name pre-filled
3. **Callback Execution**: Call `on_rename(item_id, new_name)`
4. **UI Update**: Update the item list and current selection if successful
5. **User Feedback**: Display success or error notifications

### Dynamic Permission Updates

Permission changes are handled through:

1. **Method Calls**: Use `set_disable_*()` methods to change permissions
2. **UI Synchronization**: Frontend automatically updates button states and tooltips
3. **Consistent State**: All related UI elements update together for consistency

The widget handles all UI state management automatically, providing appropriate feedback to the user at each step with enhanced accessibility and user experience. 