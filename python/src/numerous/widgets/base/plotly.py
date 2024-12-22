"""Module providing a plotly widget for the numerous library."""

from typing import Any

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("PlotWidget")


class Plot(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for displaying Plotly charts.

    Args:
        data: The data configuration for the plot
        layout: Optional layout configuration
        config: Optional plot configuration

    """

    # Define traitlets for the widget properties
    plot_data: list[dict[str, Any]] | None = traitlets.List(allow_none=True).tag(
        sync=True
    )
    plot_layout: dict[str, Any] | None = traitlets.Dict(allow_none=True).tag(sync=True)
    plot_config: dict[str, Any] | None = traitlets.Dict(allow_none=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        data: list[dict[str, Any]] | None = None,
        layout: dict[str, Any] | None = None,
        config: dict[str, Any] | None = None,
    ) -> None:
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

    def update_data(self, data: list[dict[str, Any]]) -> None:
        """
        Update the plot data.

        Args:
            data: The new plot data configuration

        """
        self.plot_data = data

    def update_layout(self, layout: dict[str, Any]) -> None:
        """
        Update the plot layout.

        Args:
            layout: The new layout configuration

        """
        self.plot_layout = layout

    def update_config(self, config: dict[str, Any]) -> None:
        """
        Update the plot configuration.

        Args:
            config: The new plot configuration

        """
        self.plot_config = config
