"""Tests for LoadSaveWidget functionality."""

import sys
from pathlib import Path
from unittest.mock import Mock, call


sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from numerous.widgets.loadsave import LoadSaveWidget


class TestLoadSaveWidget:
    """Test cases for LoadSaveWidget."""

    def setup_method(self) -> None:
        """Set up test fixtures."""
        self.mock_on_load = Mock()
        self.mock_on_save = Mock()
        self.mock_on_reset = Mock()
        self.mock_on_new = Mock()
        self.mock_on_rename = Mock()

        # Sample test data
        self.test_items = [
            {"id": "config_a", "label": "Configuration A"},
            {"id": "config_b", "label": "Configuration B"},
            {"id": "config_c", "label": "Configuration C"},
        ]

        # Reset mock return values
        self.mock_on_load.return_value = (True, "Loaded successfully")
        self.mock_on_save.return_value = (True, "Saved successfully")
        self.mock_on_reset.return_value = (True, "Reset successfully")
        self.mock_on_new.return_value = (
            {"id": "new_config", "label": "New Config"},
            True,
            "Created successfully",
        )
        self.mock_on_rename.return_value = (True, "Renamed successfully")

    def test_basic_initialization(self) -> None:
        """Test basic widget initialization."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        assert widget.items == self.test_items
        assert widget.selected_item_id is None
        assert widget.is_modified is False

    def test_load_operation(self) -> None:
        """Test loading an item."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Simulate loading an item
        widget.selected_item_id = "config_a"
        widget.do_load = True

        # Check that callback was called with correct parameters
        self.mock_on_load.assert_called_once_with("config_a")

    def test_save_operation(self) -> None:
        """Test saving an item."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Simulate saving
        widget.do_save = True

        # Check that callback was called with force=False
        self.mock_on_save.assert_called_once_with(False)  # noqa: FBT003

    def test_save_as_new_item(self) -> None:
        """Test 'Save As' with a new item name."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Simulate Save As with new item
        widget.new_item_name = "New Configuration"
        widget.is_save_as = True
        widget.create_new_item = True

        # Check that callback was called with correct parameters
        self.mock_on_new.assert_called_once_with("New Configuration", True)  # noqa: FBT003

    def test_save_as_existing_item_issue(self) -> None:
        """Test the issue where 'Save As' to existing item doesn't pass the name."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Set up initial state: load configuration A
        widget.selected_item_id = "config_a"
        widget.do_load = True
        widget.is_modified = True

        # Now simulate "Save As" to existing configuration C
        # This should pass the target config name to the save callback
        widget.selected_item_id = "config_c"
        widget.do_save = True

        # The issue: save callback should receive information about target config
        # Currently it only receives force=False, but should also receive target name
        calls = self.mock_on_save.call_args_list
        assert len(calls) == 1

        # This is the current behavior (the bug) - save callback doesn't know target
        call_args = calls[0]
        assert call_args == call(False)  # Only force parameter  # noqa: FBT003

    def test_reset_operation(self) -> None:
        """Test resetting an item."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Simulate reset
        widget.do_reset = True

        # Check that callback was called
        self.mock_on_reset.assert_called_once_with()

    def test_new_item_creation(self) -> None:
        """Test creating a new item."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Simulate new item creation
        widget.new_item_name = "New Config"
        widget.is_save_as = False
        widget.create_new_item = True

        # Check that callback was called with correct parameters
        self.mock_on_new.assert_called_once_with("New Config", False)  # noqa: FBT003

    def test_save_as_workflow(self) -> None:
        """Test the complete Save As workflow that demonstrates the issue."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Step 1: Load configuration A
        widget.selected_item_id = "config_a"
        widget.do_load = True
        self.mock_on_load.assert_called_once_with("config_a")

        # Step 2: Make some modifications
        widget.is_modified = True

        # Step 3: User selects "Save As" and chooses existing configuration C
        # This should ideally pass "config_c" name to the save callback
        widget.selected_item_id = "config_c"
        widget.do_save = True

        # The issue: save callback should know we're saving to "config_c"
        # but it doesn't receive this information
        save_calls = self.mock_on_save.call_args_list
        assert len(save_calls) == 1

        # Current behavior (the bug): only force parameter is passed
        assert save_calls[0] == call(False)  # noqa: FBT003

        # Expected behavior (after fix): should pass target config info
        # This test documents the current broken behavior

    def test_save_callback_signature_compatibility(self) -> None:
        """Test that save callback works with different signatures."""

        # Test callback that only accepts force parameter (current)
        def save_callback_old(force: bool) -> tuple[bool, str | None]:
            return True, f"Saved with force={force}"

        # Test callback that accepts force and target_name (proposed fix)
        def save_callback_new(
            force: bool, target_name: str | None = None
        ) -> tuple[bool, str | None]:
            return True, f"Saved with force={force}, target={target_name}"

        # Widget should work with both callback signatures
        widget1 = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=save_callback_old,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        widget2 = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=save_callback_new,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Both should work
        assert widget1._on_save_callback == save_callback_old  # noqa: SLF001
        assert widget2._on_save_callback == save_callback_new  # noqa: SLF001

    def test_modified_state_management(self) -> None:
        """Test modified state management."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Initially not modified
        assert widget.is_modified is False

        # Set modified
        widget.set_modified(is_modified=True, note="Test modification")
        assert widget.is_modified is True
        assert widget.modification_note == "Test modification"

        # After successful save, should be unmodified
        widget.do_save = True
        assert widget.is_modified is False

    def test_disable_save_functionality(self) -> None:
        """Test disabling save functionality."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
            disable_save=True,
            disable_save_reason="Testing disabled save",
        )

        assert widget.disable_save is True
        assert widget.disable_save_reason == "Testing disabled save"

        # Test dynamic disable
        widget.set_disable_save(False)
        assert widget.disable_save is False

    def test_item_selection(self) -> None:
        """Test item selection functionality."""
        widget = LoadSaveWidget(
            items=self.test_items,
            on_load=self.mock_on_load,
            on_save=self.mock_on_save,
            on_reset=self.mock_on_reset,
            on_new=self.mock_on_new,
        )

        # Set selected item
        widget.set_selected_item("config_b")
        assert widget.selected_item_id == "config_b"

        # Set to None
        widget.set_selected_item(None)
        assert widget.selected_item_id is None

    def test_disable_save_as_functionality(self) -> None:
        """Test that disable save-as functionality works."""
        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test"}],
            disable_save_as=True,
        )

        assert widget.disable_save_as is True
