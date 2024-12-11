import anywidget
import traitlets
from typing import Dict, List, Union
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ChartWidget")

class Chart(anywidget.AnyWidget):
    """
    A widget for displaying Chart.js charts.

    Args:
        type: The type of chart ('line', 'bar', 'pie', etc.)
        data: The data configuration for the chart
        options: Optional chart configuration options
    """
    # Define traitlets for the widget properties
    chart_type = traitlets.Unicode().tag(sync=True)
    chart_data = traitlets.Dict().tag(sync=True)
    chart_options = traitlets.Dict().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        type: str = "line",
        data: Dict = None,
        options: Dict = None,
    ):
        if data is None:
            data = {
                "labels": [],
                "datasets": []
            }
        
        if options is None:
            options = {}

        super().__init__(
            chart_type=type,
            chart_data=data,
            chart_options=options,
        )

    def update_data(self, data: Dict):
        """Updates the chart data.
        
        Args:
            data: The new chart data configuration
        """
        self.chart_data = data

    def update_options(self, options: Dict):
        """Updates the chart options.
        
        Args:
            options: The new chart options configuration
        """
        self.chart_options = options