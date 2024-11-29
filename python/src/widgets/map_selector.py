import anywidget
import traitlets
from typing import Dict, Union, List, Tuple
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("MapSelectorWidget")

class MapSelector(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    points = traitlets.Dict({}).tag(sync=True)
    value = traitlets.Unicode('').tag(sync=True)
    center = traitlets.List([0, 0]).tag(sync=True)  # [lon, lat]
    zoom = traitlets.Int(2).tag(sync=True)
    location_clicked = traitlets.List([0, 0]).tag(sync=True)  # [lon, lat] of last click

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        points: Dict[str, Tuple[float, float]] = None,
        center: List[float] = None,
        zoom: int = None,
    ):
        # Initialize with keyword arguments
        super().__init__(
            points=points if points is not None else {},
            value='',
            center=center if center is not None else [0, 0],
            zoom=zoom if zoom is not None else 2,
            location_clicked=[0, 0],
        )

    @property
    def selected_value(self) -> str:
        """Returns the currently selected point ID."""
        return self.value
