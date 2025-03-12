"""Module providing a URL parameters and slugs widget for the numerous library."""

from collections.abc import Callable
from contextlib import suppress
from threading import Lock
from typing import cast

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("URLParamsWidget")


class URLParams(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget that reads URL parameters and path segments (slugs).

    This widget provides a bridge to read the browser's URL state,
    allowing you to access URL parameters and path segments.

    Args:
        on_params_change: Optional callback function triggered when URL parameters
            change
        on_path_change: Optional callback function triggered when URL path segments
            change
        on_url_change: Optional callback function triggered when the full URL
            changes

    Examples:
        >>> url_widget = URLParams()
        >>> # Returns the value of the "page" parameter
        >>> url_widget.get_query_param("page")
        >>> url_widget.get_path_segments()  # Returns list of URL path segments
        >>> url_widget.get_current_url()  # Returns the full current URL
        >>> url_widget.get_base_url()  # Returns the base URL (protocol + host)

    """

    # Browser-writable states (for reading in Python)
    browser_query_params = traitlets.Dict().tag(sync=True)
    browser_path_segments = traitlets.List(traitlets.Unicode()).tag(sync=True)
    browser_current_url = traitlets.Unicode("").tag(sync=True)
    browser_base_url = traitlets.Unicode("").tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        on_params_change: Callable[[dict[str, str]], None] | None = None,
        on_path_change: Callable[[list[str]], None] | None = None,
        on_url_change: Callable[[str], None] | None = None,
    ) -> None:
        """Initialize the URLParams widget with optional callbacks."""
        # Initialize widget with empty values
        super().__init__()

        # Initialize state
        self.browser_query_params = {}
        self.browser_path_segments = []
        self.browser_current_url = ""
        self.browser_base_url = ""

        # Store callbacks
        self._on_params_change = on_params_change
        self._on_path_change = on_path_change
        self._on_url_change = on_url_change

        # Internal state to prevent update loops
        self._update_lock = Lock()

        # Register observers for the traits
        self.observe(
            self._handle_browser_updates,
            names=[
                "browser_query_params",
                "browser_path_segments",
                "browser_current_url",
            ],
        )

    def _handle_browser_updates(self, change: traitlets.Bunch) -> None:
        """Handle updates coming from the browser."""
        with self._update_lock:
            trait_name = cast(str, change.name)
            new_value = change.new

            if (
                trait_name == "browser_query_params"
                and self._on_params_change is not None
            ):
                with suppress(TypeError, ValueError):
                    self._on_params_change(cast(dict[str, str], new_value))
            elif (
                trait_name == "browser_path_segments"
                and self._on_path_change is not None
            ):
                self._on_path_change(cast(list[str], new_value))
            elif (
                trait_name == "browser_current_url" and self._on_url_change is not None
            ):
                self._on_url_change(cast(str, new_value))

    def get_query_param(self, key: str, default: str = "") -> str:
        """
        Get a specific query parameter value.

        Args:
            key: The parameter name to get
            default: Default value if parameter doesn't exist

        Returns:
            The parameter value or the default

        """
        params = cast(dict[str, str], self.browser_query_params)
        return params.get(key, default)

    def get_query_params(self) -> dict[str, str]:
        """
        Get all query parameters.

        Returns:
            Dictionary of all query parameters

        """
        return cast(dict[str, str], dict(self.browser_query_params))

    def get_path_segments(self) -> list[str]:
        """
        Get the current path segments (slugs).

        Returns:
            List of URL path segments

        """
        return cast(list[str], list(self.browser_path_segments))

    def get_path_segment(self, index: int, default: str = "") -> str:
        """
        Get a specific path segment by index.

        Args:
            index: The segment index (0-based)
            default: Default value if index is out of range

        Returns:
            The segment value or the default

        """
        segments = cast(list[str], self.browser_path_segments)
        if 0 <= index < len(segments):
            return segments[index]
        return default

    def get_current_url(self) -> str:
        """
        Get the current full URL.

        Returns:
            The current complete URL including protocol, host, path, and query
            parameters

        """
        return cast(str, self.browser_current_url)

    def get_base_url(self) -> str:
        """
        Get the base URL (protocol and host).

        Returns:
            The base URL (e.g., 'https://example.com')

        """
        return cast(str, self.browser_base_url)
