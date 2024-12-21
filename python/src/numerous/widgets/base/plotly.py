import anywidget
import traitlets
from typing import Dict, List
from ._config import get_widget_paths

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
    plot_data = traitlets.List().tag(sync=True)
    plot_layout = traitlets.Dict().tag(sync=True)
    plot_config = traitlets.Dict().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        data: List[Dict] = None,
        layout: Dict = None,
        config: Dict = None,
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

    def update_data(self, data: List[Dict]):
        """Updates the plot data.
        
        Args:
            data: The new plot data configuration
        """
        self.plot_data = data

    def update_layout(self, layout: Dict):
        """Updates the plot layout.
        
        Args:
            layout: The new layout configuration
        """
        self.plot_layout = layout

    def update_config(self, config: Dict):
        """Updates the plot configuration.
        
        Args:
            config: The new plot configuration
        """
        self.plot_config = config 