"""Tests for LoadSaveWidget save-as target name functionality."""

import sys
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from numerous.widgets.loadsave import LoadSaveWidget


class TestLoadSaveWidgetSaveAsTargetNames:
    """Test cases for the save-as target name functionality of LoadSaveWidget."""

    def test_save_callback_receives_target_name_parameter(self) -> None:
        """Test that save callbacks can receive target name for save-as operations."""
        save_calls: list[dict[str, str | bool | None]] = []

        def enhanced_save_callback(
            force: bool = False, target_name: str | None = None
        ) -> tuple[bool, str]:
            save_calls.append({"force": force, "target_name": target_name})
            return True, f"Saved to {target_name or 'current item'}"

        widget = LoadSaveWidget(
            items=[
                {"id": "config_a", "label": "Configuration A"},
                {"id": "config_b", "label": "Configuration B"},
            ],
            on_save=enhanced_save_callback,
        )

        # Test save-as with target name
        widget.save_as_target_name = "Configuration B"
        widget.do_save = True

        assert len(save_calls) == 1
        assert save_calls[0]["target_name"] == "Configuration B"
        assert not save_calls[0]["force"]

    def test_save_as_target_name_lookup_from_selected_item(self) -> None:
        """Test that target names are properly looked up from selected item IDs."""
        save_calls: list[dict[str, str | bool | None]] = []

        def save_callback(
            force: bool = False, target_name: str | None = None
        ) -> tuple[bool, str]:
            save_calls.append({"force": force, "target_name": target_name})
            return True, f"Saved to {target_name}"

        widget = LoadSaveWidget(
            items=[
                {"id": "project_alpha", "label": "Project Alpha"},
                {"id": "project_beta", "label": "Project Beta"},
                {"id": "project_gamma", "label": "Project Gamma"},
            ],
            on_save=save_callback,
        )

        # Select an item and trigger save (simulating save-as)
        widget.selected_item_id = "project_beta"
        widget.do_save = True

        assert len(save_calls) == 1
        assert save_calls[0]["target_name"] == "Project Beta"

    def test_backwards_compatibility_with_legacy_save_callbacks(self) -> None:
        """Test that legacy save callbacks without target_name parameter still work."""
        save_calls: list[dict[str, bool]] = []

        def legacy_save_callback(force: bool = False) -> tuple[bool, str]:
            save_calls.append({"force": force})
            return True, "Saved with legacy callback"

        widget = LoadSaveWidget(
            items=[{"id": "item1", "label": "Item 1"}], on_save=legacy_save_callback
        )

        # Trigger save operation
        widget.do_save = True

        assert len(save_calls) == 1
        assert not save_calls[0]["force"]

    def test_save_as_workflow_with_configuration_management(self) -> None:
        """Test complete save-as workflow with configuration management scenario."""
        # Simulate a configuration management system
        configurations = {
            "dev_config": {
                "id": "dev_config",
                "label": "Development Config",
                "data": {"env": "dev"},
            },
            "test_config": {
                "id": "test_config",
                "label": "Test Config",
                "data": {"env": "test"},
            },
            "prod_config": {
                "id": "prod_config",
                "label": "Production Config",
                "data": {"env": "prod"},
            },
        }

        current_config = None
        save_operations: list[str] = []

        def configuration_save_callback(
            force: bool = False,  # noqa: ARG001
            target_name: str | None = None,
        ) -> tuple[bool, str]:
            nonlocal current_config

            if target_name:
                # Find target configuration by name
                target_config = None
                for config in configurations.values():
                    if config["label"] == target_name:
                        target_config = config
                        break

                if target_config:
                    target_config["data"] = current_config  # type: ignore[assignment]
                    save_operations.append(f"Saved to {target_name}")
                    return True, f"Configuration saved to {target_name}"
                return False, f"Target configuration '{target_name}' not found"
            save_operations.append("Saved to current")
            return True, "Configuration saved to current"

        widget = LoadSaveWidget(
            items=[
                {"id": "dev_config", "label": "Development Config"},
                {"id": "test_config", "label": "Test Config"},
                {"id": "prod_config", "label": "Production Config"},
            ],
            on_save=configuration_save_callback,
        )

        # Simulate workflow: modify dev config and save as test config
        current_config = {"env": "modified", "new_feature": True}
        widget.save_as_target_name = "Test Config"
        widget.do_save = True

        assert len(save_operations) == 1
        assert save_operations[0] == "Saved to Test Config"
        assert configurations["test_config"]["data"] == {
            "env": "modified",
            "new_feature": True,
        }

    def test_explicit_target_name_takes_precedence_over_selected_item(self) -> None:
        """Test that explicit target names take precedence over selected item lookup."""
        save_calls: list[dict[str, str | bool | None]] = []

        def save_callback(
            force: bool = False, target_name: str | None = None
        ) -> tuple[bool, str]:
            save_calls.append({"force": force, "target_name": target_name})
            return True, f"Saved to {target_name}"

        widget = LoadSaveWidget(
            items=[
                {"id": "option_a", "label": "Option A"},
                {"id": "option_b", "label": "Option B"},
            ],
            on_save=save_callback,
        )

        # Set both explicit target name and selected item
        widget.save_as_target_name = "Explicit Target"  # This should take precedence
        widget.selected_item_id = "option_a"  # This should be ignored
        widget.do_save = True

        assert len(save_calls) == 1
        assert save_calls[0]["target_name"] == "Explicit Target"  # Not "Option A"

    def test_save_operation_state_cleanup_after_completion(self) -> None:
        """Test that save operation state is properly cleaned up after completion."""

        def save_callback(
            force: bool = False,  # noqa: ARG001
            target_name: str | None = None,
        ) -> tuple[bool, str]:
            return True, f"Saved to {target_name}"

        widget = LoadSaveWidget(
            items=[{"id": "item1", "label": "Item 1"}], on_save=save_callback
        )

        # Set save-as target and trigger operation
        widget.save_as_target_name = "Target Item"
        widget.do_save = True

        # State should be cleaned up after operation
        assert not widget.do_save
        assert widget.save_as_target_name is None

    def test_save_callback_signature_detection_mechanism(self) -> None:
        """Test the automatic detection of save callback signatures."""

        def legacy_callback(force: bool) -> tuple[bool, str]:  # noqa: ARG001
            return True, "Legacy save"

        def enhanced_callback(
            force: bool,  # noqa: ARG001
            target_name: str | None = None,  # noqa: ARG001
        ) -> tuple[bool, str]:
            return True, "Enhanced save"

        # Test legacy callback detection
        legacy_widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test"}], on_save=legacy_callback
        )

        # Should detect that legacy callback doesn't support target_name
        assert not legacy_widget._save_callback_supports_target  # noqa: SLF001

        # Test enhanced callback detection
        enhanced_widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test"}], on_save=enhanced_callback
        )

        # Should detect that enhanced callback supports target_name
        assert enhanced_widget._save_callback_supports_target  # noqa: SLF001


if __name__ == "__main__":
    test_class = TestLoadSaveWidgetSaveAsTargetNames()

    test_methods = [
        test_class.test_save_callback_receives_target_name_parameter,
        test_class.test_save_as_target_name_lookup_from_selected_item,
        test_class.test_backwards_compatibility_with_legacy_save_callbacks,
        test_class.test_save_as_workflow_with_configuration_management,
        test_class.test_explicit_target_name_takes_precedence_over_selected_item,
        test_class.test_save_operation_state_cleanup_after_completion,
        test_class.test_save_callback_signature_detection_mechanism,
    ]

    for test_method in test_methods:
        try:
            test_method()
        except Exception:  # noqa: BLE001
            import traceback

            traceback.print_exc()
