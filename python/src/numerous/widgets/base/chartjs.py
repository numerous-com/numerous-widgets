"""Module providing a chartjs widget for the numerous library."""

from typing import Any

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ChartWidget")


class Chart(anywidget.AnyWidget):  # type: ignore[misc]
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
        chart_type: str = "line",
        data: dict[str, Any] | None = None,
        options: dict[str, Any] | None = None,
    ) -> None:
        if data is None:
            data = {"labels": [], "datasets": []}

        if options is None:
            options = {}

        super().__init__(
            chart_type=chart_type,
            chart_data=data,
            chart_options=options,
        )

    def update_data(self, data: dict[str, Any]) -> None:
        """
        Update the chart data.

        Args:
            data: The new chart data configuration

        """
        self.chart_data = data

    def update_options(self, options: dict[str, Any]) -> None:
        """
        Update the chart options.

        Args:
            options: The new chart options configuration

        """
        self.chart_options = options
