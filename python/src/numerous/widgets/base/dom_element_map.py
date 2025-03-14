"""Module providing a DOM Element Map widget for the numerous library."""

import logging

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DOMElementMapWidget")

logger = logging.getLogger(__name__)


class DOMElementMap(anywidget.AnyWidget):  # type: ignore[misc]
    # Define traitlets for the widget properties
    element_ids = traitlets.List().tag(sync=True)  # List of element IDs to track
    values = traitlets.Dict(
        key_trait=traitlets.Unicode(),
        value_trait=traitlets.Union(
            [traitlets.Unicode(), traitlets.Instance(type(None))]
        ),
        default_value={},
    ).tag(sync=True)  # Values from the DOM elements
    js_to_eval = traitlets.Unicode("").tag(sync=True)  # JavaScript code to evaluate
    js_eval_result = traitlets.Unicode("").tag(
        sync=True
    )  # Result from evaluated JavaScript
    values_to_set = traitlets.Dict(
        key_trait=traitlets.Unicode(),
        value_trait=traitlets.Union(
            [traitlets.Unicode(), traitlets.Instance(type(None))]
        ),
        default_value={},
    ).tag(sync=True)  # Values to set in DOM elements

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        element_ids: list[str],
    ) -> None:
        """
        Initialize the DOM Element Map widget.

        Args:
            element_ids: List of DOM element IDs to track

        """
        super().__init__(
            element_ids=element_ids,
            values={},  # Initialize with empty dict
            js_to_eval="",  # Initialize with empty string
            js_eval_result="",  # Initialize with empty string
            values_to_set={},  # Initialize with empty dict
        )

    def get_value(self, element_id: str) -> str | None:
        """
        Get the current value of a specific element.

        Args:
            element_id: The ID of the DOM element

        Returns:
            The current value of the element or None if not found

        """
        value = str(self.values.get(element_id))
        logger.info(f"[Python] Getting value for {element_id}: {value}")
        return value

    def get_values(self) -> dict[str, str | None]:
        """
        Get all current values.

        Returns:
            Dictionary of element IDs to their current values

        """
        logger.info(f"[Python] Getting all values: {self.values}")
        return dict(self.values)

    def eval_js(self, js_code: str) -> str:
        """
        Send JavaScript code to be evaluated on the browser side.

        Args:
            js_code: JavaScript code as a string to be evaluated

        Returns:
            The result of the JavaScript evaluation as a string

        """
        logger.info(f"[Python] Sending JavaScript for evaluation: {js_code}")
        self.js_to_eval = js_code

        # In a real implementation, you might want to wait for the result
        # This is a simplified version that returns the last result
        return str(self.js_eval_result)

    def set_value(self, element_id: str, value: str | None) -> None:
        """
        Set the value of a specific element.

        Args:
            element_id: The ID of the DOM element
            value: The value to set, or None to clear the value

        """
        logger.info(f"[Python] Setting value for {element_id}: {value}")
        self.values_to_set = {element_id: value if value is not None else ""}

    def set_values(self, values: dict[str, str | None]) -> None:
        """
        Set multiple element values at once.

        Args:
            values: Dictionary mapping element IDs to their new values

        """
        logger.info(f"[Python] Setting multiple values: {values}")
        self.values_to_set = {k: v if v is not None else "" for k, v in values.items()}
