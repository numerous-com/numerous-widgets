"""Example of using the Save & Load widget."""

from typing import Any

import marimo as mo

import numerous.widgets as wi


def create_save_load_example() -> mo.Html:
    """Create a simple example of the Save & Load widget."""
    # Sample data
    configurations: dict[str, dict[str, Any]] = {
        "config1": {
            "id": "config1",
            "label": "Basic Configuration",
            "settings": {"param1": 5, "param2": "test", "param3": True},
        },
        "config2": {
            "id": "config2",
            "label": "Advanced Configuration",
            "settings": {
                "param1": 10,
                "param2": "advanced",
                "param3": False,
                "param4": 3.14,
            },
        },
    }

    # Callback for loading a configuration
    def on_load(item: dict[str, str]) -> tuple[bool, str | None]:
        """Handle loading a configuration."""
        # In a real app, you would load the configuration from a file or database
        output.value = f"Loaded configuration: {item['label']} (ID: {item['id']})\n\n"
        output.value += "This is a sample configuration with the following settings:\n"
        output.value += "- Setting 1: 5\n"
        output.value += "- Setting 2: test\n"
        output.value += "- Setting 3: True"
        return True, f"Loaded **{item['label']}** successfully"

    # Callback for saving a configuration
    def on_save() -> tuple[bool, str | None]:
        """Handle saving a configuration."""
        # In a real app, you would save the configuration to a file or database
        output.value = "Saved configuration successfully\n\n"
        output.value += "This is a sample save operation that would write to storage."
        return True, "Configuration saved successfully"

    # Callback for resetting a configuration
    def on_reset() -> tuple[bool, str | None]:
        """Handle resetting a configuration."""
        # In a real app, you would reset the configuration to its original state
        output.value = "Reset configuration to original state\n\n"
        output.value += "This is a sample reset operation that would restore defaults."
        return True, "Configuration reset successfully"

    # Callback for creating a new configuration
    def on_new(label: str) -> tuple[dict[str, str], bool, str | None]:
        """Handle creating a new configuration."""
        # In a real app, you would create a new configuration in storage
        new_id = f"config{len(configurations) + 1}"
        new_item = {"id": new_id, "label": label}
        configurations[new_id] = {
            "id": new_id,
            "label": label,
            "settings": {"param1": 0, "param2": "", "param3": False},
        }
        output.value = f"Created new configuration: {label}\n\n"
        output.value += "This is a sample creation operation with default values."
        return new_item, True, f"Created new configuration: **{label}**"

    # Create the widget
    save_load = mo.ui.anywidget(
        wi.LoadSaveWidget(
            items=[
                {"id": config["id"], "label": config["label"]}
                for config in configurations.values()
            ],
            on_load=on_load,
            on_save=on_save,
            on_reset=on_reset,
            on_new=on_new,
            default_new_item_name="New Configuration",
        )
    )

    # Create output display
    output = mo.md("")
    status_label = mo.md("")

    # Button callbacks
    def on_modify_click(_: mo.MouseEvent) -> None:
        """Handle modify button click."""
        if save_load.get_current_item():
            save_load.set_modified(
                modified=True,
                note=(
                    "Modified the following settings:\n"
                    "- Setting 2: **New Value**\n"
                    "- Added Setting 4: Custom Value"
                ),
            )
            output.value = output.value.replace(
                "- Setting 2: test", "- Setting 2: **New Value**"
            )
            output.value += "\n- Setting 4: Custom Value"

    def on_disable_load_click(_: mo.MouseEvent) -> None:
        """Handle disable load button click."""
        save_load.set_can_load(False)
        status_label.value = "Loading disabled"

    def on_enable_load_click(_: mo.MouseEvent) -> None:
        """Handle enable load button click."""
        save_load.set_can_load(True)
        status_label.value = "Loading enabled"

    # Create buttons
    modify_button = mo.ui.anywidget(wi.Button(label="Modify", on_click=on_modify_click))
    disable_load_button = mo.ui.anywidget(
        wi.Button(label="Disable Load", on_click=on_disable_load_click)
    )
    enable_load_button = mo.ui.anywidget(
        wi.Button(label="Enable Load", on_click=on_enable_load_click)
    )

    # Create the main container
    return mo.hstack(
        [
            save_load,
            mo.vstack(
                [
                    output,
                    status_label,
                    mo.hstack([modify_button, disable_load_button, enable_load_button]),
                ]
            ),
        ]
    )


if __name__ == "__main__":
    # Display the example
    mo.display(create_save_load_example())
