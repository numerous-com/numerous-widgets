"""Module providing a modal dialog widget for the numerous library."""

from collections.abc import Callable

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ModalDialogWidget")


class ModalDialog(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A modal dialog widget that displays a message with OK and optional Cancel buttons.

    Args:
        title: The title of the modal
        message: The message to display
        show_cancel: Whether to show the Cancel button (default: False)
        ok_label: Custom label for the OK button (default: "OK")
        cancel_label: Custom label for the Cancel button (default: "Cancel")
        className: Optional CSS class name for styling

    """

    # Define traitlets for the widget properties
    is_open = traitlets.Bool(default_value=False).tag(sync=True)
    title = traitlets.Unicode().tag(sync=True)
    message = traitlets.Unicode().tag(sync=True)
    show_cancel = traitlets.Bool().tag(sync=True)
    ok_label = traitlets.Unicode().tag(sync=True)
    cancel_label = traitlets.Unicode().tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)
    result = traitlets.Unicode(allow_none=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        title: str = "",
        message: str = "",
        show_cancel: bool = False,
        ok_label: str = "OK",
        cancel_label: str = "Cancel",
        class_name: str = "",
    ) -> None:
        super().__init__(
            is_open=False,
            title=title,
            message=message,
            show_cancel=show_cancel,
            ok_label=ok_label,
            cancel_label=cancel_label,
            class_name=class_name,
            result=None,
        )

    def show(self, title: str | None = None, message: str | None = None) -> None:
        """Show the modal dialog with optional new title and message."""
        if title is not None:
            self.title = title
        if message is not None:
            self.message = message
        self.result = None
        self.is_open = True

    def hide(self) -> None:
        """Hide the modal dialog."""
        self.is_open = False

    def observe_result(self, handler: Callable[[str], None]) -> None:
        """Observe the result of the modal dialog."""
        self.observe(handler, names=["result"])
