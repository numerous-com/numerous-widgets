import anywidget
import traitlets
from typing import Callable, Optional, List, Tuple, Dict
from datetime import datetime
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TaskWidget")

class Task(anywidget.AnyWidget):
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
    started = traitlets.Bool(default_value=False).tag(sync=True)
    progress = traitlets.Float(default_value=0.0).tag(sync=True)
    logs = traitlets.List(default_value=[]).tag(sync=True)  # Will store tuples as lists for JSON serialization
    error = traitlets.Dict(allow_none=True, default_value=None).tag(sync=True)  # Will store error details
    last_sync = traitlets.Float(default_value=0.0).tag(sync=True)
    sync_enabled = traitlets.Bool(default_value=False).tag(sync=True)
    sync_interval = traitlets.Float(default_value=1.0).tag(sync=True)
    # Load the JavaScript and CSS
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        on_start: Optional[Callable[[], None]] = None,
        on_stop: Optional[Callable[[], None]] = None,
        on_reset: Optional[Callable[[], None]] = None,
        on_sync: Optional[Callable[[], None]] = None,
        sync_interval: float = 1.0,
        disabled: bool = False
    ):
        super().__init__()
        self._on_start = on_start
        self._on_stop = on_stop
        self._on_reset = on_reset
        self._on_sync = on_sync
        self.is_disabled = disabled
        self.error = None
        self.sync_enabled = on_sync is not None
        self.sync_interval = sync_interval
        
        # Observe changes to is_running and started to trigger callbacks
        self.observe(self._handle_running_change, names=['is_running'])
        self.observe(self._handle_started_change, names=['started'])
        self.observe(self._handle_sync, names=['last_sync'])
    
    def _handle_running_change(self, change):
        """Internal handler for running state changes"""
        if change['new']:  # Started running
            self.is_completed = False
            self.is_failed = False
            if self._on_start:
                self._on_start()
        else:  # Stopped running
            if self._on_stop:
                self._on_stop()
    
    def _handle_started_change(self, change):
        """Internal handler for started state changes"""
        if change['new'] == False and change['old'] == True:  # Changed from True to False
            # This indicates a reset from the UI
            if self._on_reset:
                self._on_reset()
    
    def _handle_sync(self, change):
        """Internal handler for sync events"""
        if self._on_sync and self.sync_enabled:
            self._on_sync(self)
    
    def set_progress(self, value: float):
        """Sets the progress value (0.0 to 1.0)"""
        self.progress = max(0.0, min(1.0, value))
        if self.progress >= 1.0:
            self.complete()
    
    def start(self):
        """Starts the task"""
        if not self.is_disabled:
            self.is_running = True
            self.started = True
            self.is_completed = False
            self.is_failed = False
    
    def stop(self):
        """Stops the task"""
        if not self.is_disabled:
            self.is_running = False
            self.progress = 0.0
    
    def complete(self):
        """Marks the task as completed successfully"""
        if not self.is_disabled:
            self.is_running = False
            self.is_completed = True
            self.is_failed = False
            self.progress = 1.0
    
    def fail(self):
        """Marks the task as failed"""
        if not self.is_disabled:
            self.is_running = False
            self.is_completed = False
            self.is_failed = True
    
    def reset(self):
        """Resets the widget to its initial state"""
        if not self.is_disabled:
            # Reset all state variables atomically
            self.progress = 0.0
            self.is_running = False
            self.is_completed = False
            self.is_failed = False
            self.started = False
            self.logs = []
            self.clear_error()
            # Call the reset callback if provided
            if self._on_reset:
                self._on_reset()
    
    def enable(self):
        """Enables the task widget"""
        self.is_disabled = False
    
    def disable(self):
        """Disables the task widget"""
        self.is_disabled = True
    
    def add_log(self, message: str, log_type: str = "info", source: str = "system"):
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
        log_entry = [timestamp, log_type, source, message]
        self.logs = self.logs + [log_entry]

    def add_logs(self, logs: List[Tuple[str, str, str, str]]):
        """Add multiple log entries"""
        if len(logs) > 0:
            # Ensure all timestamps are strings
            processed_logs = []
            for log in logs:
                timestamp = log[0]
                # Convert datetime to ISO string if necessary
                if isinstance(timestamp, datetime):
                    timestamp = timestamp.isoformat()
                processed_logs.append([timestamp, log[1], log[2], log[3]])
            self.logs = self.logs + processed_logs

    def set_logs(self, logs: List[Tuple[str, str, str, str]]):
        """Set the logs to a new list"""
        self.logs = logs
    
    def clear_logs(self):
        """Clear all logs"""
        self.logs = []
    
    def set_error(self, message: str, traceback: Optional[str] = None, timestamp: Optional[datetime] = None):
        """Set an error message and optional traceback"""
        if timestamp is None:
            timestamp = datetime.now()
        
        # Ensure timestamp is converted to ISO format string
        timestamp_str = timestamp.isoformat() if isinstance(timestamp, datetime) else str(timestamp)
        
        self.error = {
            'message': str(message),
            'traceback': str(traceback) if traceback else None,
            'timestamp': timestamp_str
        }
        self.fail()
    
    def clear_error(self):
        """Clear the current error"""
        self.error = None  # Set to None instead of empty dict
    
    def enable_sync(self):
        """Enable synchronization"""
        self.sync_enabled = True
        
    def disable_sync(self):
        """Disable synchronization"""
        self.sync_enabled = False