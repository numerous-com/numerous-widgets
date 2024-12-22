"""Module providing a file loader widget for the numerous library."""

from io import BytesIO, StringIO
from typing import Any

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("FileLoaderWidget")


class FileLoader(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for loading file contents.

    Args:
        label: The label of the load button
        tooltip: The tooltip text
        accept: File types to accept (e.g., '.txt,.csv')

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode("Load File").tag(sync=True)
    ui_tooltip = traitlets.Unicode("").tag(sync=True)
    accept = traitlets.Unicode("*.*").tag(sync=True)
    file_content = traitlets.Dict(allow_none=True).tag(sync=True)
    filename = traitlets.Unicode(allow_none=True).tag(sync=True)
    encoding = traitlets.Unicode("UTF-8").tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str = "Load File",
        tooltip: str | None = None,
        accept: str = "*",
        encoding: str = "utf-8",
    ) -> None:
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            accept=accept,
            file_content=None,
            filename=None,
            encoding=encoding,
        )
        self._bytes: bytes | None = None

    @property
    def content(self) -> dict[str, Any]:
        """Returns the loaded file content as bytes."""
        return self.file_content  # type: ignore[no-any-return]

    @property
    def selected_filename(self) -> str | None:
        """Returns the name of the loaded file."""
        return self.filename  # type: ignore[no-any-return]

    @traitlets.observe("file_content")  # type: ignore[misc]
    def _observe_file_content(self, change: dict[str, Any]) -> None:
        # Convert from dict where values are integers to bytes
        if isinstance(change["new"], dict):
            self._bytes = bytes(change["new"].values())
        else:
            self._bytes = change["new"]

    @property
    def as_buffer(self) -> BytesIO | None:
        """
        Returns a file-like object (BytesIO) containing the loaded file content.

        Example:
            with open(loader_widget.as_buffer, "r") as f:
                print(f)

        """
        if self._bytes is None:
            return None
        return BytesIO(self._bytes)

    @property
    def as_string(self) -> StringIO | None:
        """Return the loaded file content as a string."""
        if self._bytes is None:
            return None
        return StringIO(
            self._bytes.decode(self.encoding if self.encoding is not None else "utf-8")
        )
