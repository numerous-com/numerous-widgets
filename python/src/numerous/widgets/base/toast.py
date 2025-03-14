"""
Module providing a toast widget for the numerous library.

The Toast widget provides a modern, animated notification system with a progress bar
and dismiss button. The toast appears in the bottom-right corner of the screen and
automatically dismisses after a specified duration.

CSS Classes:
    - toast-container: The main container for the toast notification
        - Fixed position in bottom-right corner
        - Slide-in/slide-out animations
        - Shadow and rounded corners

    - toast-content: Container for the toast message and dismiss button
        - Proper padding and positioning

    - toast-message: The actual text message
        - Typography and color styling

    - toast-dismiss: The dismiss (X) button
        - Hover effects and transitions
        - Positioned in top-right corner

    - toast-progress: The progress bar container
        - Positioned at bottom of toast
        - Background color

    - toast-progress-bar: The actual progress bar
        - Smooth width transition
        - Accent color
"""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ToastWidget")


class Toast(anywidget.AnyWidget):  # type: ignore[misc]
    # Define traitlets for the widget properties
    message = traitlets.Unicode().tag(sync=True)
    duration = traitlets.Int().tag(sync=True)
    visible = traitlets.Bool().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        message: str = "",
        duration: int = 3000,
    ) -> None:
        """
        Initialize the Toast widget.

        Args:
            message: The message to display in the toast
            duration: Duration in milliseconds before the toast auto-dismisses

        """
        super().__init__(
            message=message,
            duration=duration,
            visible=False,
        )

    def show(self, message: str | None = None) -> None:
        """
        Show the toast with an optional new message.

        Args:
            message: Optional new message to display. If None, uses existing message.

        """
        if message is not None:
            self.message = message
        self.visible = True

    def hide(self) -> None:
        """Hide the toast."""
        self.visible = False
