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
