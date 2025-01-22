"""Module providing a progress bar widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ProgressBarWidget")


class ProgressBar(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for displaying progress.

    The progress value can be accessed and modified via the `value` property.

    Args:
        value: The initial progress value (0-100).
        label: Optional label to display above the progress bar.
        tooltip: Optional tooltip text.
        fit_to_content: Whether to fit the width to the content.
        label_inline: Whether to show the label inline.

    """

    # Define traitlets for the widget properties
    value = traitlets.Float(min=0.0, max=100.0).tag(sync=True)
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    fit_to_content = traitlets.Bool(default_value=False).tag(sync=True)
    label_inline = traitlets.Bool(default_value=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        value: float = 0.0,
        label: str | None = None,
        tooltip: str | None = None,
        fit_to_content: bool = False,
        label_inline: bool = True,
    ) -> None:
        """Initialize the progress bar widget."""
        super().__init__()  # Initialize first
        # Then set the properties
        self.value = min(max(value, 0.0), 100.0)
        self.ui_label = label if label is not None else ""
        self.ui_tooltip = tooltip if tooltip is not None else ""
        self.fit_to_content = fit_to_content
        self.label_inline = label_inline

    @property
    def val(self) -> float:
        """Return the current progress value (0-100)."""
        return float(self.value)

    @val.setter
    def val(self, value: float) -> None:
        """Set the progress value, clamped between 0 and 100."""
        self.value = min(max(value, 0.0), 100.0)

    # Add property getters and setters for fit_to_content and label_inline
    @property
    def is_fit_to_content(self) -> bool:
        """Return whether the widget is fit to content."""
        return bool(self.fit_to_content)

    @is_fit_to_content.setter
    def is_fit_to_content(self, value: bool) -> None:
        """Set whether the widget is fit to content."""
        self.fit_to_content = value

    @property
    def is_label_inline(self) -> bool:
        """Return whether the label is inline."""
        return bool(self.label_inline)

    @is_label_inline.setter
    def is_label_inline(self, value: bool) -> None:
        """Set whether the label is inline."""
        self.label_inline = value
