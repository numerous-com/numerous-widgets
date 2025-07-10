"""Tests for LoadSaveWidget rename functionality."""

import sys
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from numerous.widgets.loadsave import LoadSaveWidget


class TestLoadSaveWidgetRenameFunctionality:
    """Test cases for the rename functionality of LoadSaveWidget."""

    def test_rename_callback_parameter_in_constructor(self) -> None:
        """Test that on_rename callback can be passed to the widget constructor."""

        def rename_callback(item_id: str, new_name: str) -> tuple[bool, str]:
            return True, f"Renamed {item_id} to {new_name}"

        widget = LoadSaveWidget(
            items=[{"id": "test", "label": "Test Item"}], on_rename=rename_callback
        )

        assert widget._on_rename_callback == rename_callback  # noqa: SLF001

    def test_rename_operation_with_callback(self) -> None:
        """Test that rename operations call the callback with correct parameters."""
        rename_calls: list[dict[str, str]] = []

        def rename_callback(item_id: str, new_name: str) -> tuple[bool, str]:
            rename_calls.append({"item_id": item_id, "new_name": new_name})
            return True, f"Renamed {item_id} to {new_name}"

        widget = LoadSaveWidget(
            items=[{"id": "config1", "label": "Configuration 1"}],
            on_rename=rename_callback,
        )

        # Simulate rename operation
        widget.rename_item_id = "config1"
        widget.rename_new_name = "Updated Configuration"
        widget.do_rename = True

        assert len(rename_calls) == 1
        assert rename_calls[0]["item_id"] == "config1"
        assert rename_calls[0]["new_name"] == "Updated Configuration"

    def test_rename_updates_item_list_on_success(self) -> None:
        """Test that successful rename operations update the widget's item list."""

        def successful_rename_callback(
            item_id: str,  # noqa: ARG001
            new_name: str,
        ) -> tuple[bool, str]:
            return True, f"Renamed to {new_name}"

        widget = LoadSaveWidget(
            items=[
                {"id": "item1", "label": "Original Name"},
                {"id": "item2", "label": "Other Item"},
            ],
            on_rename=successful_rename_callback,
        )

        # Rename item1
        widget.rename_item_id = "item1"
        widget.rename_new_name = "New Name"
        widget.do_rename = True

        # Check that the item list was updated
        updated_item = next(
            (item for item in widget.items if item["id"] == "item1"), None
        )
        assert updated_item is not None
        assert updated_item["label"] == "New Name"

        # Check that other items weren't affected
        other_item = next(
            (item for item in widget.items if item["id"] == "item2"), None
        )
        assert other_item is not None
        assert other_item["label"] == "Other Item"

    def test_rename_handles_callback_failure(self) -> None:
        """Test that rename operations handle callback failures gracefully."""

        def failing_rename_callback(
            item_id: str,  # noqa: ARG001
            new_name: str,  # noqa: ARG001
        ) -> tuple[bool, str]:
            return False, "Rename failed due to permissions"

        widget = LoadSaveWidget(
            items=[{"id": "item1", "label": "Original Name"}],
            on_rename=failing_rename_callback,
        )

        # Attempt rename that will fail
        widget.rename_item_id = "item1"
        widget.rename_new_name = "New Name"
        widget.do_rename = True

        # Item list should not be updated on failure
        item = next((item for item in widget.items if item["id"] == "item1"), None)
        assert item is not None
        assert item["label"] == "Original Name"  # Should remain unchanged

        assert widget.success_status is False
        assert "permissions" in widget.action_note

    def test_rename_without_callback_shows_error(self) -> None:
        """Test that rename operations without callback show appropriate error."""
        widget = LoadSaveWidget(
            items=[{"id": "item1", "label": "Original Name"}],
            # No on_rename callback provided
        )

        # Attempt rename without callback
        widget.rename_item_id = "item1"
        widget.rename_new_name = "New Name"
        widget.do_rename = True

        assert widget.success_status is False
        assert "missing callback" in widget.action_note

    def test_rename_clears_operation_state(self) -> None:
        """Test that rename operations clear their state after completion."""

        def rename_callback(
            item_id: str,  # noqa: ARG001
            new_name: str,
        ) -> tuple[bool, str]:
            return True, f"Renamed to {new_name}"

        widget = LoadSaveWidget(
            items=[{"id": "item1", "label": "Original Name"}],
            on_rename=rename_callback,
        )

        # Perform rename
        widget.rename_item_id = "item1"
        widget.rename_new_name = "New Name"
        widget.do_rename = True

        # Check that state is cleared
        assert not widget.do_rename
        assert widget.rename_item_id is None
        assert widget.rename_new_name is None


if __name__ == "__main__":
    test_class = TestLoadSaveWidgetRenameFunctionality()

    test_methods = [
        test_class.test_rename_callback_parameter_in_constructor,
        test_class.test_rename_operation_with_callback,
        test_class.test_rename_updates_item_list_on_success,
        test_class.test_rename_handles_callback_failure,
        test_class.test_rename_without_callback_shows_error,
        test_class.test_rename_clears_operation_state,
    ]

    for test_method in test_methods:
        try:
            test_method()
        except Exception:  # noqa: BLE001
            import traceback

            traceback.print_exc()
