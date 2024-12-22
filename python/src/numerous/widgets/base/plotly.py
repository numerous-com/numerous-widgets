import anywidget
import traitlets
from typing import Dict, List, Any
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("PlotWidget")

class Plot(anywidget.AnyWidget):
    """
    A widget for displaying Plotly charts.

    Args:
        data: The data configuration for the plot
        layout: Optional layout configuration
        config: Optional plot configuration
    """
    # Define traitlets for the widget properties
    plot_data: List[Dict[str, Any]]|None = traitlets.List(allow_none=True).tag(sync=True) # type: ignore[assignment]
    plot_layout: Dict[str, Any]|None = traitlets.Dict(allow_none=True).tag(sync=True) # type: ignore[assignment]
    plot_config: Dict[str, Any]|None = traitlets.Dict(allow_none=True).tag(sync=True) # type: ignore[assignment]

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        data: List[Dict[str, Any]]|None = None,
        layout: Dict[str, Any]|None = None,
        config: Dict[str, Any]|None = None,
    ):
        if data is None:
            data = []
        
        if layout is None:
            layout = {}

        if config is None:
            config = {}

        super().__init__(
            plot_data=data,
            plot_layout=layout,
            plot_config=config,
        )

    def update_data(self, data: List[Dict[str, Any]]) -> None:
        """Updates the plot data.
        
        Args:
            data: The new plot data configuration
        """
        self.plot_data = data

    def update_layout(self, layout: Dict[str, Any]) -> None:
        """Updates the plot layout.
        
        Args:
            layout: The new layout configuration
        """
        self.plot_layout = layout

    def update_config(self, config: Dict[str, Any]) -> None:
        """Updates the plot configuration.
        
        Args:
            config: The new plot configuration
        """
        self.plot_config = config 