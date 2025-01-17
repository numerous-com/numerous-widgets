"""Tests for the numerous-widgets CLI."""

import os
import pathlib
from unittest.mock import patch

import pytest

from numerous.widgets.base.config import DEFAULT_CSS
from numerous.widgets.cli import main


def test_export_css_command(tmp_path: pathlib.Path) -> None:
    """Test the export-css command creates the expected file with correct content."""
    output_file = tmp_path / "test-output.css"

    with patch("sys.argv", ["numerous-widgets", "export-css", "-o", str(output_file)]):
        main()

    assert output_file.exists()
    assert output_file.read_text() == DEFAULT_CSS


def test_export_css_default_filename(tmp_path: pathlib.Path) -> None:
    """Test the export-css command without file."""
    with (
        patch("sys.argv", ["numerous-widgets", "export-css"]),
        patch.object(os, "getcwd", return_value=str(tmp_path)),
    ):
        main()

    default_file = tmp_path / "numerous-widgets.css"
    assert default_file.exists()
    assert default_file.read_text() == DEFAULT_CSS


def test_no_command_shows_help() -> None:
    """Test that running without a command shows help and exits with code 1."""
    with (
        patch("sys.argv", ["numerous-widgets"]),
        pytest.raises(SystemExit) as exit_info,
        patch("argparse.ArgumentParser.print_help") as mock_help,
    ):
        main()

    assert exit_info.value.code == 1
    mock_help.assert_called_once()
