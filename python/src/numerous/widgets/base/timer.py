"""Module providing a timer widget for the numerous library."""

from collections.abc import Callable
from typing import Any

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TimerWidget")


class Timer(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget that triggers a callback at regular intervals.

    Args:
        interval: The interval in seconds between callbacks
        callback: The function to call at each interval
        active: Whether the timer starts active
        label: The label for the timer button

    """

    # Define traitlets for the widget properties
    interval = traitlets.Float().tag(sync=True)
    is_active = traitlets.Bool().tag(sync=True)
    ui_label = traitlets.Unicode().tag(sync=True)
    last_tick = traitlets.Float().tag(sync=True)

    # Load the JavaScript and CSS
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        interval: float = 1.0,
        callback: Callable[[], None] | None = None,
        active: bool = False,
        label: str = "Timer",
    ) -> None:
        super().__init__(
            interval=interval,
            is_active=active,
            ui_label=label,
            last_tick=0.0,
        )
        self._callback = callback
        self.observe(self._handle_tick, names=["last_tick"])

    def _handle_tick(self, change: dict[str, Any]) -> None:  # noqa: ARG002
        """Call when a tick occurs in the frontend."""
        if self._callback is not None:
            self._callback()

    @property
    def active(self) -> bool:
        """Return whether the timer is currently active."""
        return bool(self.is_active)

    @active.setter
    def active(self, value: bool) -> None:
        """Set whether the timer is active."""
        self.is_active = value
