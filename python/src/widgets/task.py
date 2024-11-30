import anywidget
import traitlets
from typing import Callable, Optional
from .config import get_widget_paths

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
    
    # Load the JavaScript and CSS
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        on_start: Optional[Callable[[], None]] = None,
        on_stop: Optional[Callable[[], None]] = None,
        on_reset: Optional[Callable[[], None]] = None,
        disabled: bool = False
    ):
        super().__init__()
        self._on_start = on_start
        self._on_stop = on_stop
        self._on_reset = on_reset
        self.is_disabled = disabled
        
        # Observe changes to is_running and started to trigger callbacks
        self.observe(self._handle_running_change, names=['is_running'])
        self.observe(self._handle_started_change, names=['started'])
    
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
            
            # Call the reset callback if provided
            if self._on_reset:
                self._on_reset()
    
    def enable(self):
        """Enables the task widget"""
        self.is_disabled = False
    
    def disable(self):
        """Disables the task widget"""
        self.is_disabled = True