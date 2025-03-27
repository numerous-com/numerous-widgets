import marimo

__generated_with = "0.11.14"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo

    import numerous.widgets as wi

    aw = mo.ui.anywidget
    ht = mo.Html
    from page import page
    return aw, ht, mo, page, wi


@app.cell
def _(load_save_widget):
    load_save_widget
    return


@app.cell
def _(aw, config_manager, load_save_widget, wi):
    def on_click_modify(event):
        # Simulate some changes
        note = config_manager.modify_config({"param1": 15})
        load_save_widget.set_modified(True, note)

    modify_button = aw(wi.Button(label="Modify", on_click=on_click_modify))
    modify_button
    return modify_button, on_click_modify


@app.cell
def _(aw, load_save_widget, wi):
    def on_click_disable(event):
        # Simulate some changes
        load_save_widget.disable_save = True
        load_save_widget.disable_save_as = True
        load_save_widget.disable_save_reason = "Not allowed now!"

    disable_save_button = aw(wi.Button(label="Disable Save", on_click=on_click_disable))
    disable_save_button
    return disable_save_button, on_click_disable


@app.cell
def _(aw, load_save_widget, wi):
    def on_click_enable(event):
        # Simulate some changes
        load_save_widget.disable_save = False
        load_save_widget.disable_save_as = False
        load_save_widget.disable_save_reason = ""

    enable_save_button = aw(wi.Button(label="Enable Save", on_click=on_click_enable))
    enable_save_button
    return enable_save_button, on_click_enable


@app.cell
def _(aw, wi):
    """Example of using the LoadSaveWidget."""

    import time
    import uuid
    from typing import Dict, List, Optional, Tuple, Any

    class ConfigManager:
        """Simple example class to manage configurations."""

        def __init__(self) -> None:
            """Initialize the configuration manager."""
            self.configs: Dict[str, Dict[str, Any]] = {
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
            print(self.configs)
            self.current_config: Optional[Dict[str, Any]] = None
            self.current_config_id: Optional[str] = None
            self.modified: bool = False

        def get_configs(self) -> List[Dict[str, str]]:
            """Get list of configurations for display in the widget."""
            print("Config manager: Widget requested configs")
            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
            ]

        def load_config(self, config_id: str) -> Tuple[bool, Optional[str]]:
            """Load a configuration by ID."""
            print(f"Config Manager: Widget requested load of config {config_id}")
            if config_id in self.configs:
                self.current_config = self.configs[config_id].copy()
                self.current_config_id = config_id
                self.modified = False
                return True, f"Loaded **{self.current_config['label']}** successfully"
            return False, "Configuration not found"

        def save_config(self, force: bool = False) -> Tuple[bool, Optional[str]]:
            """Save the current configuration.

            Args:
                force: Whether to force a save even if the content appears unmodified.
                       This is used for Save As operations.
            """
            print(f"Config manager: Widget request save configs, force: {force}")

            if self.current_config and self.current_config_id:
                if self.modified or force:
                    self.configs[self.current_config_id] = self.current_config.copy()
                    self.modified = False
                    time.sleep(0.5)  # Simulate a delay for saving
                    print(self.configs)
                    return True, f"Configuration **{self.current_config['label']}** saved successfully"
                return True, None  # No changes to save
            return False, "No configuration to save"

        def reset_config(self) -> Tuple[bool, Optional[str]]:
            """Reset the current configuration."""
            print("Config manager: Widget requested reset")

            if self.current_config_id:
                self.current_config = self.configs[self.current_config_id].copy()
            self.modified = False
            return True, "Configuration reset successfully"

        def modify_config(self, change: Dict[str, Any]) -> str:
            """Make changes to the current configuration."""
            print("Config manager: App modified item - updating data structure")

            if not self.current_config:
                return "No configuration loaded"

            # Apply changes to the configuration
            if "settings" in self.current_config:
                for key, value in change.items():
                    self.current_config["settings"][key] = value

            self.modified = True
            return f"Changed {len(change)} parameter(s)"

        def search_configs(self, query: str) -> List[Dict[str, str]]:
            """Search configurations by name."""
            print("Config manager: Widget requested search")

            if not query:
                return self.get_configs()

            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
                if query.lower() in config["label"].lower()
            ]

        def create_new_config(self, name: str) -> Tuple[Dict[str, str], bool, Optional[str]]:
            """Create a new configuration.

            Args:
                name: Name for the new configuration
                is_save_as: Whether this is a Save As operation, in which case we should
                           copy the current configuration's content
            """
            print("Config manager: Widget requested create new config")

            config_id = f"config-{str(uuid.uuid4())[:8]}"


            # For regular new config, create with default values
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


    # Create a configuration manager
    config_manager = ConfigManager()

    # Create a widget
    load_save_widget = aw(wi.LoadSaveWidget(
        items=config_manager.get_configs(),
        on_load=config_manager.load_config,
        on_save=config_manager.save_config,
        on_reset=config_manager.reset_config,
        on_search=config_manager.search_configs,
        on_new=config_manager.create_new_config,
        default_new_item_name="New Configuration"
    ))
    return (
        Any,
        ConfigManager,
        Dict,
        List,
        Optional,
        Tuple,
        config_manager,
        load_save_widget,
        time,
        uuid,
    )


@app.cell
def _(aw, wi):
    project_widget = aw(wi.ProjectsMenu())
    project_widget
    return (project_widget,)


if __name__ == "__main__":
    app.run()
