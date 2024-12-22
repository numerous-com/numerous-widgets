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

    """

    # Define traitlets for the widget properties
    value = traitlets.Float(min=0.0, max=100.0).tag(sync=True)
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        value: float = 0.0,
        label: str | None = None,
        tooltip: str | None = None,
    ) -> None:
        super().__init__(
            value=min(max(value, 0.0), 100.0),
            ui_label=label if label is not None else "",
            ui_tooltip=tooltip if tooltip is not None else "",
        )

    @property
    def val(self) -> float:
        """Return the current progress value (0-100)."""
        return float(self.value)

    @val.setter
    def val(self, value: float) -> None:
        """Set the progress value, clamped between 0 and 100."""
        self.value = min(max(value, 0.0), 100.0)
