import anywidget
import traitlets
from typing import Optional, Dict, Any
from python.src.numerous.widgets.base.config import get_widget_paths
from io import BytesIO, StringIO

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("FileLoaderWidget")


class FileLoader(anywidget.AnyWidget):
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
        tooltip: str = None,
        accept: str = "*",
        encoding: str = "utf-8",
    ):
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            accept=accept,
            file_content=None,
            filename=None,
            encoding=encoding,
        )
        self._bytes: Optional[bytes] = None

    @property
    def content(self) -> Dict[str, Any]:
        """Returns the loaded file content as bytes."""
        return self.file_content

    @property
    def selected_filename(self) -> Optional[str]:
        """Returns the name of the loaded file."""
        return self.filename

    @traitlets.observe("file_content")
    def _observe_file_content(self, change: Dict[str, Any]) -> None:
        print("file_content changed")
        # Convert from dict where values are integers to bytes
        if isinstance(change["new"], dict):
            self._bytes = bytes(change["new"].values())
        else:
            self._bytes = change["new"]

    @property
    def as_buffer(self) -> Optional[BytesIO]:
        """Returns a file-like object (BytesIO) containing the loaded file content.

        Example:
            with open(loader_widget.as_buffer, "r") as f:
                print(f)
        """
        if self._bytes is None:
            return None
        return BytesIO(self._bytes)

    @property
    def as_string(self, encoding: Optional[str] = None) -> Optional[StringIO]:
        """Returns the loaded file content as a string."""
        if self._bytes is None:
            return None
        return StringIO(
            self._bytes.decode(self.encoding if encoding is None else encoding)
        )
