"""Tests for LoadSaveWidget disable controls functionality."""

import sys
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from numerous.widgets.loadsave import LoadSaveWidget


class TestLoadSaveWidgetDisableControls:
    """Test cases for the disable controls functionality of LoadSaveWidget."""

    def test_disable_rename_in_constructor(self) -> None:
        """Test that rename functionality can be disabled in the constructor."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_rename=True,
            disable_rename_reason="User lacks permissions",
        )
        assert widget.disable_rename is True
        assert widget.disable_rename_reason == "User lacks permissions"

    def test_disable_rename_dynamically_via_method(self) -> None:
        """Test that rename functionality can be disabled dynamically via methods."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_rename=False,
        )
        assert widget.disable_rename is False
        assert widget.disable_rename_reason is None

        # Disable dynamically
        widget.set_disable_rename(True, "Admin revoked permissions")  # noqa: FBT003
        assert widget.disable_rename is True
        assert widget.disable_rename_reason == "Admin revoked permissions"

        # Re-enable dynamically
        widget.set_disable_rename(False, None)  # noqa: FBT003
        assert widget.disable_rename is False
        assert widget.disable_rename_reason is None

    def test_disable_all_ui_elements_simultaneously(self) -> None:
        """Test that all UI elements can be disabled for restricted users."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_save=True,
            disable_save_reason="System maintenance",
            disable_load=True,
            disable_rename=True,
            disable_rename_reason="Insufficient permissions",
        )

        # Check all are disabled
        assert widget.disable_save is True
        assert widget.disable_load is True
        assert widget.disable_rename is True

        # Check reasons are set (only save and rename have reason attributes)
        assert widget.disable_save_reason == "System maintenance"
        assert widget.disable_rename_reason == "Insufficient permissions"

    def test_disable_controls_with_existing_functionality(self) -> None:
        """Test that disable controls work with existing functionality."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_save=True,
            disable_save_reason="Testing save disable",
            disable_load=True,
        )

        # Existing disable functionality should still work
        assert widget.disable_save is True
        assert widget.disable_load is True

    def test_granular_control_methods(self) -> None:
        """Test that granular control methods work for all UI elements."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_save=False,
            disable_rename=False,
        )

        # Test updating reasons
        widget.set_disable_save(True, "Database backup in progress")  # noqa: FBT003
        widget.set_disable_rename(True, "Feature temporarily disabled")  # noqa: FBT003

        assert widget.disable_save_reason == "Database backup in progress"
        assert widget.disable_rename_reason == "Feature temporarily disabled"

    def test_dynamic_permission_updates_based_on_user_context(self) -> None:
        """Test that permissions can be updated dynamically based on user context."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}],
            disable_rename=True,
            disable_rename_reason="Checking permissions...",
        )

        # Initially disabled
        assert widget.disable_rename is True

        # Simulate permission check completed - user has permissions
        widget.set_disable_rename(False, None)  # noqa: FBT003
        assert widget.disable_rename is False
        assert widget.disable_rename_reason is None

        # Simulate user context change - permissions revoked
        widget.set_disable_rename(True, "Session expired - please re-authenticate")  # noqa: FBT003
        assert widget.disable_rename is True
        assert (
            widget.disable_rename_reason == "Session expired - please re-authenticate"
        )

    def test_disable_rename_doesnt_affect_other_widget_state(self) -> None:
        """Test that disabling rename doesn't affect other widget state."""
        widget = LoadSaveWidget(
            items=[
                {"id": "item1", "label": "Item 1"},
                {"id": "item2", "label": "Item 2"},
            ],
            selected_item_id="item1",
            disable_rename=False,
        )

        # Widget should maintain its item list and selection
        assert len(widget.items) == 2  # noqa: PLR2004
        assert widget.selected_item_id == "item1"

        # Disabling rename shouldn't affect other state
        widget.set_disable_rename(True, "Testing state consistency")  # noqa: FBT003
        assert len(widget.items) == 2  # noqa: PLR2004
        assert widget.selected_item_id == "item1"
        assert widget.disable_rename is True


if __name__ == "__main__":
    test_class = TestLoadSaveWidgetDisableControls()

    test_methods = [
        test_class.test_disable_rename_in_constructor,
        test_class.test_disable_rename_dynamically_via_method,
        test_class.test_disable_all_ui_elements_simultaneously,
        test_class.test_disable_controls_with_existing_functionality,
        test_class.test_granular_control_methods,
        test_class.test_dynamic_permission_updates_based_on_user_context,
        test_class.test_disable_rename_doesnt_affect_other_widget_state,
    ]

    for test_method in test_methods:
        try:
            test_method()
        except Exception:  # noqa: BLE001
            import traceback

            traceback.print_exc()
