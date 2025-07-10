"""
Comprehensive Configuration Management System using LoadSaveWidget.

This example demonstrates all LoadSaveWidget features including save-as target names,
rename functionality, and granular UI controls for different user permissions.
"""

import logging
import time
import uuid
from typing import Any


# Set up logging instead of print statements
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ConfigurationManager:
    """A complete configuration management system using LoadSaveWidget features."""

    def __init__(self, user_role: str = "admin") -> None:
        """
        Initialize the configuration manager.

        Args:
            user_role: Role of the current user (admin, editor, viewer)

        """
        self.user_role = user_role
        self.current_config: dict[str, Any] | None = None
        self.current_config_id: str | None = None
        self.is_modified = False

        # Sample configurations demonstrating different environments
        self.configurations = {
            "development": {
                "id": "development",
                "label": "Development Environment",
                "config": {
                    "database_url": "localhost:5432/dev_db",
                    "debug_mode": True,
                    "log_level": "DEBUG",
                    "api_timeout": 30,
                    "cache_enabled": False,
                },
                "created_by": "system",
                "last_modified": "2024-01-15T10:30:00Z",
            },
            "staging": {
                "id": "staging",
                "label": "Staging Environment",
                "config": {
                    "database_url": "staging.db.company.com:5432/staging_db",
                    "debug_mode": False,
                    "log_level": "INFO",
                    "api_timeout": 60,
                    "cache_enabled": True,
                },
                "created_by": "devops",
                "last_modified": "2024-01-20T14:15:00Z",
            },
            "production": {
                "id": "production",
                "label": "Production Environment",
                "config": {
                    "database_url": "prod.db.company.com:5432/prod_db",
                    "debug_mode": False,
                    "log_level": "WARNING",
                    "api_timeout": 120,
                    "cache_enabled": True,
                },
                "created_by": "admin",
                "last_modified": "2024-01-25T09:45:00Z",
            },
        }

        # Track modification history
        self.modification_history: list[dict[str, Any]] = []

    def get_items_for_widget(self) -> list[dict[str, str]]:
        """Get items formatted for the LoadSaveWidget."""
        return [
            {"id": config_id, "label": config_data["label"]}
            for config_id, config_data in self.configurations.items()
        ]

    def load_configuration(self, config_id: str) -> tuple[bool, str | None]:
        """
        Load a configuration by ID.

        Args:
            config_id: ID of the configuration to load

        Returns:
            Tuple of (success, message)

        """
        if config_id not in self.configurations:
            return False, f"Configuration '{config_id}' not found"

        config_data = self.configurations[config_id]
        self.current_config = config_data["config"].copy()
        self.current_config_id = config_id
        self.is_modified = False

        return True, f"Loaded '{config_data['label']}'"

    def save_configuration(
        self, force: bool = False, target_name: str | None = None
    ) -> tuple[bool, str | None]:
        """
        Save the current configuration.

        Args:
            force: Whether to force save even if not modified
            target_name: Name of target configuration for Save As operations

        Returns:
            Tuple of (success, message)

        """
        if not self.current_config:
            return False, "No configuration loaded to save"

        # Check user permissions for saving
        if self.user_role == "viewer":
            return False, "Save disabled: Viewers cannot save configurations"

        # Determine target configuration
        target_config_id = self.current_config_id
        is_save_as = target_name is not None

        if target_name:
            # Find target by name for Save As operations
            for config_id, config_data in self.configurations.items():
                if config_data["label"] == target_name:
                    target_config_id = config_id
                    break
            else:
                # Target name not found, this might be a new configuration
                target_config_id = target_name.lower().replace(" ", "_")

        if not target_config_id:
            return False, "No target configuration specified"

        # Check if save is needed
        if not self.is_modified and not force:
            return True, "No changes to save"

        # Perform the save
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ")

        if target_config_id in self.configurations:
            # Update existing configuration
            self.configurations[target_config_id]["config"] = self.current_config.copy()
            self.configurations[target_config_id]["last_modified"] = timestamp
            action = "Updated" if not is_save_as else "Saved as"
            target_label = self.configurations[target_config_id]["label"]
        else:
            # Create new configuration for save-as to new name
            self.configurations[target_config_id] = {
                "id": target_config_id,
                "label": target_name or target_config_id,
                "config": self.current_config.copy(),
                "created_by": self.user_role,
                "last_modified": timestamp,
            }
            action = "Created"
            target_label = target_name or target_config_id

        # Record the modification
        self.modification_history.append(
            {
                "action": action,
                "config_id": target_config_id,
                "user": self.user_role,
                "timestamp": timestamp,
                "target_name": target_name,
            }
        )

        self.is_modified = False
        return True, f"{action} configuration '{target_label}'"

    def reset_configuration(self) -> tuple[bool, str | None]:
        """
        Reset the current configuration to its original state.

        Returns:
            Tuple of (success, message)

        """
        if not self.current_config_id:
            return False, "No configuration loaded to reset"

        # Reload the original configuration
        success, message = self.load_configuration(self.current_config_id)
        if success:
            return True, f"Reset to original state: {message}"
        return False, f"Failed to reset: {message}"

    def create_new_configuration(
        self, name: str, is_save_as: bool = False
    ) -> tuple[dict[str, str], bool, str | None]:
        """
        Create a new configuration.

        This is the on_new callback that handles both new item creation
        and Save As operations.
        """
        # Check user permissions
        if self.user_role == "viewer":
            new_item = {"id": "", "label": ""}
            return (
                new_item,
                False,
                "Create disabled: Viewers cannot create configurations",
            )

        # Generate new configuration ID
        new_id = str(uuid.uuid4())[:8]
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ")

        if is_save_as and self.current_config:
            # Save As: copy current configuration
            new_config = self.current_config.copy()
            message = f"Created '{name}' as copy of current configuration"
        else:
            # New item: create default configuration
            new_config = {
                "database_url": "localhost:5432/new_db",
                "debug_mode": True,
                "log_level": "INFO",
                "api_timeout": 30,
                "cache_enabled": False,
            }
            message = f"Created new configuration '{name}'"

        # Store the new configuration
        self.configurations[new_id] = {
            "id": new_id,
            "label": name,
            "config": new_config,
            "created_by": self.user_role,
            "last_modified": timestamp,
        }

        # Record the creation
        self.modification_history.append(
            {
                "action": "Created",
                "config_id": new_id,
                "user": self.user_role,
                "timestamp": timestamp,
                "is_save_as": is_save_as,
            }
        )

        new_item = {"id": new_id, "label": name}
        return new_item, True, message

    def rename_configuration(
        self, config_id: str, new_name: str
    ) -> tuple[bool, str | None]:
        """
        Rename a configuration.

        Args:
            config_id: ID of configuration to rename
            new_name: New name for the configuration

        Returns:
            Tuple of (success, message)

        """
        # Check user permissions
        if self.user_role not in ["admin", "editor"]:
            return False, "Rename disabled: Insufficient permissions"

        if config_id not in self.configurations:
            return False, f"Configuration '{config_id}' not found"

        old_name = self.configurations[config_id]["label"]
        self.configurations[config_id]["label"] = new_name
        self.configurations[config_id]["last_modified"] = time.strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        )

        # Record the rename
        self.modification_history.append(
            {
                "action": "Renamed",
                "config_id": config_id,
                "old_name": old_name,
                "new_name": new_name,
                "user": self.user_role,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
        )

        return True, f"Renamed '{old_name}' to '{new_name}'"

    def modify_configuration(self, key: str, value: str | int | bool) -> bool:
        """Modify a configuration parameter."""
        if not self.current_config:
            return False

        self.current_config[key] = value
        self.is_modified = True
        return True

    def get_user_permissions(self) -> dict[str, dict[str, Any]]:
        """Get user permissions for UI disable settings."""
        permissions = {
            "admin": {
                "disable_save": False,
                "disable_save_reason": None,
                "disable_rename": False,
                "disable_rename_reason": None,
            },
            "editor": {
                "disable_save": False,
                "disable_save_reason": None,
                "disable_rename": False,
                "disable_rename_reason": None,
            },
            "viewer": {
                "disable_save": True,
                "disable_save_reason": "Viewers cannot modify configurations",
                "disable_rename": True,
                "disable_rename_reason": "Viewers cannot rename configurations",
            },
        }
        return permissions.get(self.user_role, permissions["viewer"])


def create_configuration_widget(
    user_role: str = "admin",
) -> object | None:
    """
    Create a LoadSaveWidget configured for configuration management.

    Args:
        user_role: Role of the current user

    Returns:
        Configured LoadSaveWidget instance or None if dependencies unavailable

    """
    config_manager = ConfigurationManager(user_role)
    permissions = config_manager.get_user_permissions()

    # Import here to avoid issues if anywidget is not available
    try:
        from numerous.widgets import LoadSaveWidget
    except ImportError:
        logger.warning("LoadSaveWidget not available - this is a demo")
        return None

    # Create widget with all enhanced features
    widget = LoadSaveWidget(
        items=config_manager.get_items_for_widget(),
        selected_item_id="development",  # Default selection
        # Enhanced callbacks with full functionality
        on_load=config_manager.load_configuration,
        on_save=config_manager.save_configuration,  # Enhanced with target_name support
        on_reset=config_manager.reset_configuration,
        on_new=config_manager.create_new_configuration,  # Handles both new and save-as
        on_rename=config_manager.rename_configuration,  # Now fully implemented
        # User-based permissions
        disable_save=permissions["disable_save"],
        disable_save_reason=permissions["disable_save_reason"],
        disable_rename=permissions["disable_rename"],
        disable_rename_reason=permissions["disable_rename_reason"],
        # Initial state
        modified=False,
        modification_note=None,
    )

    return widget  # noqa: RET504


def demo_configuration_management() -> None:
    """Demonstrate the configuration management system."""
    logger.info("Configuration Management System Demo")
    logger.info("=" * 50)

    # Test different user roles
    roles = ["admin", "editor", "viewer"]

    for role in roles:
        logger.info("\n--- Testing as %s user ---", role.upper())

        try:
            # Create configuration manager for this role
            manager = ConfigurationManager(role)
            result = create_configuration_widget(role)

            if result is None:
                logger.info("Widget creation skipped (dependencies not available)")
                continue

            # Demonstrate functionality

            # Test loading a configuration
            success, message = manager.load_configuration("development")
            logger.info("Load: %s", message)

            # Test modifying configuration
            debug_enabled = False
            if manager.modify_configuration("debug_mode", debug_enabled):
                logger.info("Modified debug_mode setting")

            # Test saving (permissions dependent)
            success, message = manager.save_configuration()
            logger.info("Save: %s", message)

            # Test save-as functionality
            success, message = manager.save_configuration(
                force=True, target_name="Staging Environment"
            )
            logger.info("Save As: %s", message)

            # Test rename (permissions dependent)
            success, message = manager.rename_configuration(
                "development", "Dev Environment"
            )
            logger.info("Rename: %s", message)

        except Exception:
            logger.exception("Demo for %s failed", role)

    logger.info("%s", "\n" + "=" * 50)
    logger.info("Demo completed!")


if __name__ == "__main__":
    demo_configuration_management()
