"""Module providing a map selector widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("MapSelectorWidget")


class MapSelector(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a point on a map.

    The widget is initialized with a dictionary of points, where each point is a \
        tuple of longitude and latitude.
    The widget also has a center and zoom level, which can be specified at \
        initialization.

    The selected point can be accessed via the `selected_value` property.

    The last location clicked can be accessed via the `location_clicked` property.

    Args:
        points: A dictionary of points, where each point is a tuple of longitude \
            and latitude.
        center: The center of the map, as a tuple of longitude and latitude.
        zoom: The zoom level of the map.

    """

    # Define traitlets for the widget properties
    points = traitlets.Dict({}).tag(sync=True)
    value = traitlets.Unicode("").tag(sync=True)
    center = traitlets.List([0, 0]).tag(sync=True)  # [lon, lat]
    zoom = traitlets.Int(2).tag(sync=True)
    location_clicked = traitlets.List([0, 0]).tag(sync=True)  # [lon, lat] of last click

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        points: dict[str, tuple[float, float]] | None = None,
        center: list[float] | None = None,
        zoom: int | None = None,
        default: str | None = None,
    ) -> None:
        # Initialize with keyword arguments
        super().__init__(
            points=points if points is not None else {},
            value=default if default is not None else "",
            center=center if center is not None else [0, 0],
            zoom=zoom if zoom is not None else 2,
            location_clicked=[0, 0],
        )

    @property
    def selected_value(self) -> str:
        """
        Returns the currently selected point ID.

        Returns:
            str: The ID of the currently selected point.

        """
        return str(self.value)
