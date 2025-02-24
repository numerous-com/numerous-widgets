"""Task is for running long-running tasks."""

from collections.abc import Callable
from datetime import datetime
from typing import Any

import anywidget
import traitlets
from anywidget import AnyWidget

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TaskWidget")


class Task(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for controlling and displaying task progress.

    The widget shows a play button that transforms into a stop button with
    circular progress indicator when running, and either a checkmark (success)
    or X (failure) when finished.
    """

    # Define traitlets for the widget properties
    is_running = traitlets.Bool(default_value=False).tag(sync=True)
    is_completed = traitlets.Bool(default_value=False).tag(sync=True)
    is_failed = traitlets.Bool(default_value=False).tag(sync=True)
    is_disabled = traitlets.Bool(default_value=False).tag(sync=True)
    is_stopped = traitlets.Bool(default_value=False).tag(sync=True)
    is_reset = traitlets.Bool(default_value=True).tag(sync=True)
    started = traitlets.Bool(default_value=False).tag(sync=True)
    progress = traitlets.Float(default_value=0.0).tag(sync=True)
    stopped = traitlets.Bool(default_value=False).tag(sync=True)
    logs: list[tuple[str, str, str, str]] = traitlets.List(default_value=[]).tag(
        sync=True
    )
    error: dict[str, Any] | None = traitlets.Dict(
        allow_none=True, default_value=None
    ).tag(sync=True)
    last_sync = traitlets.Float(default_value=0.0).tag(sync=True)
    sync_enabled = traitlets.Bool(default_value=False).tag(sync=True)
    sync_interval = traitlets.Float(default_value=1.0).tag(sync=True)
    reset_flag = traitlets.Bool(default_value=False).tag(sync=True)
    # Load the JavaScript and CSS
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        on_start: Callable[[], None] | None = None,
        on_stop: Callable[[], None] | None = None,
        on_reset: Callable[[], None] | None = None,
        on_sync: Callable[[AnyWidget], None] | None = None,
        sync_interval: float = 1.0,
        disabled: bool = False,
    ) -> None:
        super().__init__()
        self._on_start = on_start
        self._on_stop = on_stop
        self._on_reset = on_reset
        self._on_sync = on_sync
        self.is_disabled = disabled
        self.error = None
        self.sync_enabled = False
        self.sync_interval = sync_interval
        self._terminal_state = False

        # Add reset observation
        self.observe(self._handle_reset, names=["reset_flag"])
        # Observe changes to is_running and started to trigger callbacks
        self.observe(self._handle_started_change, names=["started"])
        self.observe(self._handle_sync, names=["last_sync"])
        self.observe(self._handle_stopped_change, names=["stopped"])

    def _handle_stopped_change(self, change: dict[str, Any]) -> None:
        """Handle stopped state changes."""
        if change["new"]:
            self.stop()

    def _handle_running_change(self, change: dict[str, Any]) -> None:
        """Handle running state changes."""
        if change["new"]:  # Started running
            if self._terminal_state:
                # Prevent state change cascade
                with self.hold_trait_notifications():
                    self.is_running = False  # Reset the running state
                    self.started = False  # Also reset started state
                return
            self.is_completed = False
            self.is_failed = False
            self.enable_sync()

            if self._on_start:
                self._on_start()

    def _handle_started_change(self, change: dict[str, Any]) -> None:
        """Handle started state changes."""
        if change["new"]:  # Started transition to true
            self.start()

    def _handle_reset(self, change: dict[str, Any]) -> None:
        """Handle reset events."""
        if change["new"]:
            self.reset()
        with self.hold_trait_notifications():
            self.reset_flag = False

    def _handle_sync(self, change: dict[str, Any]) -> None:  # noqa: ARG002
        """Handle sync events."""
        if self._on_sync is not None and self.sync_enabled:
            _sync = self._on_sync(self)

            if _sync is None:
                _sync = False
            if not _sync:
                self.disable_sync()
        else:
            self.sync_enabled = False

    def set_progress(self, value: float) -> None:
        """Set the progress value (0.0 to 1.0)."""
        self.progress = max(0.0, min(1.0, value))
        if self.progress >= 1.0:
            self.complete()

    def start(self) -> None:
        """Start the task."""
        if not self.is_disabled:
            # if not self._terminal_state:
            self.enable_sync()

            if self._terminal_state:
                return
            # Set states atomically to prevent cascading events
            with self.hold_trait_notifications():
                self.started = True
                self._terminal_state = False  # Ensure terminal state is cleared
            self.is_running = True
            self.is_completed = False  # Ensure completed state is cleared
            self.is_failed = False
            self.is_reset = False
            self.reset_flag = False

            if self._on_start:
                self._on_start()

    def stop(self) -> None:
        """Stop the task."""
        self.is_running = False
        self.is_stopped = True
        if self._on_stop:
            self._on_stop()

    def complete(self) -> None:
        """Mark the task as completed successfully."""
        if not self.is_disabled:
            self.disable_sync()  # Ensure sync is disabled first

            # Set states atomically to prevent cascading events
            with self.hold_trait_notifications():
                self._terminal_state = True  # Set terminal state last

            self.is_running = False
            self.progress = 1.0
            self.is_completed = True
            self.is_failed = False

    def fail(self) -> None:
        """Mark the task as failed."""
        if not self.is_disabled:
            self.disable_sync()  # Ensure sync is disabled first
            # Set states atomically to prevent cascading events
            with self.hold_trait_notifications():
                self._terminal_state = True  # Set terminal state last
            self.is_running = False
            self.is_failed = True
            self.is_completed = False
            self.reset_flag = False

    def reset(self) -> None:
        """Reset the widget to its initial state."""
        if not self.is_disabled:
            self.disable_sync()  # Ensure sync is disabled first
            # Reset states atomically to prevent cascading events
            with self.hold_trait_notifications():
                self._terminal_state = False  # Reset terminal state last
                self.started = False

            self.is_running = False
            self.progress = 0.0
            self.is_completed = False
            self.is_failed = False
            self.is_stopped = False
            self.is_reset = True

            self.logs = []
            self.clear_error()
            # Call the reset callback if provided
            if self._on_reset:
                self._on_reset()

    def enable(self) -> None:
        """Enable the task widget."""
        self.is_disabled = False

    def disable(self) -> None:
        """Disable the task widget."""
        self.is_disabled = True

    def add_log(
        self, message: str, log_type: str = "info", source: str = "system"
    ) -> None:
        """
        Add a log entry with timestamp, type, source, and message.

        Args:
            message: The log message text
            log_type: Type of log ('info', 'error', 'warning', etc.)
            source: Source of the log message

        """
        # Ensure timestamp is a string in ISO format
        timestamp = datetime.now().isoformat()
        # Convert to list for JSON serialization
        log_entry = (timestamp, log_type, source, message)
        self.logs.append(log_entry)

    def add_logs(self, logs: list[tuple[str, str, str, str]]) -> None:
        """Add multiple log entries."""
        if len(logs) > 0:
            # Ensure all timestamps are strings
            processed_logs = []
            for log in logs:
                timestamp = log[0]
                # Convert datetime to ISO string if necessary
                if isinstance(timestamp, datetime):
                    timestamp = timestamp.isoformat()
                processed_logs.append(
                    (
                        timestamp,
                        log[1],
                        log[2],
                        log[3],
                    )
                )

            self.logs = self.logs + processed_logs

    def set_logs(self, logs: list[tuple[str, str, str, str]]) -> None:
        """Set the logs to a new list."""
        self.logs = logs

    def clear_logs(self) -> None:
        """Clear all logs."""
        self.logs = []

    def set_error(
        self,
        message: str,
        traceback: str | None = None,
        timestamp: datetime | None = None,
    ) -> None:
        """Set an error message and optional traceback."""
        if timestamp is None:
            timestamp = datetime.now()

        # Ensure timestamp is converted to ISO format string
        timestamp_str = (
            timestamp.isoformat() if isinstance(timestamp, datetime) else str(timestamp)
        )

        self.error = {
            "message": str(message),
            "traceback": str(traceback) if traceback else None,
            "timestamp": timestamp_str,
        }
        self.fail()

    def clear_error(self) -> None:
        """Clear the current error."""
        self.error = None  # Set to None instead of empty dict

    def enable_sync(self) -> None:
        """Enable synchronization."""
        self.sync_enabled = True

    def disable_sync(self) -> None:
        """Disable synchronization."""
        self.sync_enabled = False
        self.is_running = False
