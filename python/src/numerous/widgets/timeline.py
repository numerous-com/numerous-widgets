"""Module providing a timeline chart widget for hourly data visualization."""

import json
import uuid
import warnings
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import anywidget
import h5py
import numpy as np
import traitlets

from .base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TimelineChartWidget")


class TimelineChart(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for displaying timeline data with hourly resolution.

    The widget allows adding data in blocks, where each block can contain data
    for multiple channels. Channels represent different metrics and each has a name,
    description, and unit. The widget supports two view modes:
    - Channel mode: Shows a single channel with all blocks as separate series
    - Rendered mode: Shows combined data using values from the highest order block

    Args:
        channels: Initial list of channels
        blocks: Initial list of data blocks
        view_mode: Initial view mode ('channel' or 'rendered')
        selected_channel_id: ID of the initially selected channel (for channel mode)

    Example:
        ```python
        from numerous.widgets import TimelineChart
        from datetime import datetime

        # Create the widget with predefined channels and blocks
        timeline = TimelineChart(
            channels=[
                {
                    "id": "temp",
                    "name": "Temperature",
                    "description": "Outdoor temperature",
                    "unit": "°C"
                },
                {
                    "id": "humidity",
                    "name": "Humidity",
                    "description": "Relative humidity",
                    "unit": "%"
                }
            ],
            blocks=[
                {
                    "id": "block1",
                    "name": "Day 1",
                    "order": 1,
                    "start_hour": datetime(2023, 1, 1, 0).isoformat(),
                    "end_hour": datetime(2023, 1, 1, 23).isoformat(),
                    "data": {
                        "temp": [10, 11, 12, 13, 14, 15, 16, 17, 18, 17, 16, 15,
                                14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3],
                        "humidity": [70, 72, 75, 77, 80, 82, 80, 78, 76, 74, 72, 70,
                                    68, 67, 65, 63, 60, 62, 65, 68, 70, 72, 75, 78]
                    }
                }
            ]
        )

        # Alternatively, you can add blocks after creation
        timeline.add_data_block(
            start_hour=datetime(2023, 1, 2, 0),
            end_hour=datetime(2023, 1, 2, 23),
            data={
                "temp": [5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 19, 20,
                        19, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2],
                "humidity": [80, 82, 84, 85, 86, 84, 82, 80, 78, 75, 72, 70,
                            68, 70, 72, 74, 76, 78, 80, 82, 84, 85, 86, 87]
            },
            name="Day 2",
            order=2
        )

        # Display the widget
        timeline
        ```

    """

    # Define traitlets for the widget properties
    channels = traitlets.List(trait=traitlets.Dict(), default_value=[]).tag(sync=True)

    blocks = traitlets.List(trait=traitlets.Dict(), default_value=[]).tag(sync=True)

    view_mode = traitlets.Unicode(default_value="channel").tag(sync=True)
    selected_channel_id = traitlets.Unicode(allow_none=True).tag(sync=True)
    chart_options = traitlets.Dict(default_value={}).tag(sync=True)

    # Action triggers from UI
    update_view_mode = traitlets.Unicode(default_value="").tag(sync=True)
    update_selected_channel = traitlets.Unicode(default_value="").tag(sync=True)
    update_channel_chart_type = traitlets.Dict(default_value={}).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        channels: list[dict[str, Any]] | None = None,
        blocks: list[dict[str, Any]] | None = None,
        view_mode: str = "channel",
        selected_channel_id: str | None = None,
        chart_options: dict[str, Any] | None = None,
    ) -> None:
        """
        Initialize the TimelineChart widget.

        Args:
            channels: List of channel configurations. Each channel should be a dict with
                at least 'id', 'name', 'description', and 'unit' keys.
                Optional keys include 'color', 'chart_id', and 'chart_type'.
            blocks: List of data blocks. Each block should be a dict with
                'id', 'name', 'order', 'start_hour', 'end_hour', and 'data' keys.
            view_mode: Initial view mode ('channel' or 'rendered').
            selected_channel_id: ID of the initially selected channel.
            chart_options: Optional Chart.js configuration options.

        """
        if channels is None:
            channels = []

        if blocks is None:
            blocks = []

        if chart_options is None:
            chart_options = {}

        # Ensure all channels have chart_id and chart_type
        for channel in channels:
            if "chart_id" not in channel:
                channel["chart_id"] = "main"
            if "chart_type" not in channel:
                channel["chart_type"] = "line"

        # Set default selected channel if not provided but channels exist
        if selected_channel_id is None and channels:
            selected_channel_id = channels[0]["id"]

        # Initialize the widget
        super().__init__()

        # Store initial configuration
        self.channels = channels
        self.view_mode = view_mode
        self.selected_channel_id = selected_channel_id
        self.chart_options = chart_options

        # Initialize blocks separately to ensure proper synchronization
        self.blocks = []

        # Process initial blocks if provided
        if blocks:
            # Create a deep copy to ensure a new reference
            self.blocks = list(blocks)
            # Force a trait notification to ensure the frontend is updated
            self._notify_trait("blocks", [], self.blocks)

        # Set up observers for UI actions
        self.observe(self._on_view_mode_changed, names=["update_view_mode"])
        self.observe(
            self._on_selected_channel_changed, names=["update_selected_channel"]
        )
        self.observe(
            self._on_channel_chart_type_changed, names=["update_channel_chart_type"]
        )

    def add_channel(
        self,
        channel_id: str | None = None,
        name: str = "",
        description: str = "",
        unit: str = "",
        color: str | None = None,
        chart_id: str | None = None,
        chart_type: str = "line",
    ) -> str:
        """
        Add a new channel to the timeline.

        Args:
            channel_id: Channel ID, generated if not provided
            name: Display name of the channel
            description: Description of what the channel represents
            unit: Unit of measurement for the channel
            color: Optional custom color for the channel
            chart_id: Optional chart ID to group channels into separate charts
                     (default: "main" for backward compatibility)
            chart_type: Type of chart to use ('line' or 'bar', default: 'line')

        Returns:
            Channel ID (generated if not provided)

        """
        if channel_id is None:
            channel_id = str(uuid.uuid4())

        channel = {
            "id": channel_id,
            "name": name,
            "description": description,
            "unit": unit,
            "chart_type": chart_type if chart_type in ["line", "bar"] else "line",
        }

        # Default to "main" chart if not specified
        if chart_id is not None:
            channel["chart_id"] = chart_id
        else:
            channel["chart_id"] = "main"

        if color is not None:
            channel["color"] = color

        self.channels = [*self.channels, channel]

        # If this is the first channel, select it automatically
        if len(self.channels) == 1:
            self.selected_channel_id = channel_id

        return channel_id

    def _prepare_block_data(
        self,
        block_id: str | None,
        order: int | None,
        name: str | None,
    ) -> tuple[str, int, str]:
        """
        Prepare block metadata.

        Args:
            block_id: Optional ID for the block
            order: Optional explicit order number
            name: Optional name for the block

        Returns:
            Tuple of (block_id, order, name)

        """
        # Generate ID if not provided
        if block_id is None:
            block_id = str(uuid.uuid4())

        # Calculate the next order if not provided
        if order is None:
            if not self.blocks:
                order = 1
            else:
                order = max([block.get("order", 0) for block in self.blocks]) + 1

        # Generate a default name if not provided
        if name is None:
            name = f"Block {order}"

        return block_id, order, name

    def _prepare_block_datetime(
        self, start_hour: datetime, end_hour: datetime
    ) -> tuple[datetime, datetime]:
        """
        Prepare datetime values for a block.

        Args:
            start_hour: The starting datetime
            end_hour: The ending datetime

        Returns:
            Tuple of (normalized start_hour, normalized end_hour)

        """
        # Floor datetimes to hour precision and ensure tz-aware
        tz_info = start_hour.tzinfo or UTC
        start_hour_norm = datetime(
            start_hour.year,
            start_hour.month,
            start_hour.day,
            start_hour.hour,
            0,
            0,
            0,
            tzinfo=tz_info,
        )
        end_hour_norm = datetime(
            end_hour.year,
            end_hour.month,
            end_hour.day,
            end_hour.hour,
            0,
            0,
            0,
            tzinfo=tz_info,
        )
        return start_hour_norm, end_hour_norm

    def add_data_block(
        self,
        start_hour: datetime,
        end_hour: datetime,
        data: dict[str, list[float | None]],
        block_id: str | None = None,
        order: int | None = None,
        name: str | None = None,
        dependencies: list[str] | None = None,
        is_dependent: bool = False,
        reference_order: int | None = None,
        dependency_type: str | None = None,
    ) -> str:
        """
        Add a new block of data to the timeline.

        Args:
            start_hour: The starting datetime (will be floored to the hour)
            end_hour: The ending datetime (will be floored to the hour)
            data: Dictionary mapping channel IDs to lists of values
            block_id: Optional ID for the block (generated if not provided)
            order: Optional explicit order number (determined automatically
                  if not provided)
            name: Optional name for the block
            dependencies: Optional list of block IDs this block depends on
            is_dependent: Flag to mark this block as dependent on others
            reference_order: Optional order number this block references
            dependency_type: Optional type of dependency ('version', 'extension',
                            'derivative')

        Returns:
            Block ID (generated if not provided)

        """
        # Prepare block metadata
        block_id, order, name = self._prepare_block_data(block_id, order, name)

        # Normalize datetime values
        start_hour_norm, end_hour_norm = self._prepare_block_datetime(
            start_hour, end_hour
        )

        # Create the new block
        block: dict[str, Any] = {
            "id": block_id,
            "name": name,
            "order": order,
            "start_hour": start_hour_norm.isoformat(),
            "end_hour": end_hour_norm.isoformat(),
            "data": data,
        }

        # Add dependency information if provided
        has_dependency_info = (
            dependencies
            or is_dependent
            or reference_order is not None
            or dependency_type
        )
        if has_dependency_info:
            if dependencies:
                block["dependencies"] = dependencies
            if is_dependent:
                block["isDependent"] = is_dependent
            if reference_order is not None:
                block["referenceOrder"] = reference_order
            if dependency_type:
                # Validate dependency type
                valid_types = ["version", "extension", "derivative"]
                if dependency_type not in valid_types:
                    raise ValueError(f"dependency_type must be one of {valid_types}")
                block["dependencyType"] = dependency_type

        # Create a new list with the block added to ensure proper change detection
        new_blocks = list(self.blocks)  # Create a new list
        new_blocks.append(block)  # Append the new block

        # Update blocks with the new list
        self.blocks = new_blocks

        # Force a trait notification to ensure the frontend is updated
        # Use empty list as old value to force update
        self._notify_trait("blocks", [], self.blocks)

        return block_id

    def clear_blocks(self) -> None:
        """Remove all blocks from the timeline."""
        self.blocks = []

    def remove_block(self, block_id: str) -> bool:
        """
        Remove a block by ID.

        Args:
            block_id: ID of the block to remove

        Returns:
            True if block was found and removed, False otherwise

        """
        original_length = len(self.blocks)
        self.blocks = [block for block in self.blocks if block["id"] != block_id]
        return len(self.blocks) < original_length

    def set_view_mode(self, mode: str) -> None:
        """
        Set the view mode for the chart.

        Args:
            mode: Either 'channel' or 'rendered'

        """
        if mode not in ["channel", "rendered"]:
            raise ValueError("View mode must be either 'channel' or 'rendered'")
        self.view_mode = mode

    def set_selected_channel(self, channel_id: str) -> None:
        """
        Set the selected channel for channel view mode.

        Args:
            channel_id: ID of the channel to select

        """
        # Check if channel exists
        if not any(c["id"] == channel_id for c in self.channels):
            raise ValueError(f"Channel with ID {channel_id} not found")
        self.selected_channel_id = channel_id

    def update_chart_options(self, options: dict[str, Any]) -> None:
        """
        Update the Chart.js options.

        Args:
            options: Dictionary of Chart.js configuration options

        """
        self.chart_options = {**self.chart_options, **options}

    def _on_view_mode_changed(self, change: traitlets.Bunch) -> None:
        """Handle view mode changes from the UI."""
        if not change.new:
            return

        self.view_mode = change.new
        self.update_view_mode = ""  # Reset the trigger

    def _on_selected_channel_changed(self, change: traitlets.Bunch) -> None:
        """Handle selected channel changes from the UI."""
        if not change.new:
            return

        self.selected_channel_id = change.new
        self.update_selected_channel = ""  # Reset the trigger

    def update_channel_chart(
        self,
        channel_id: str,
        chart_type: str | None = None,
        chart_id: str | None = None,
    ) -> bool:
        """
        Update a channel's chart type or chart assignment.

        Args:
            channel_id: ID of the channel to update
            chart_type: Optional new chart type ('line' or 'bar')
            chart_id: Optional new chart ID to reassign the channel

        Returns:
            True if channel was found and updated, False otherwise

        """
        # Find the channel in the list
        for i, channel in enumerate(self.channels):
            if channel["id"] == channel_id:
                # Create a copy of the channel
                updated_channel = dict(channel)

                # Update chart type if provided
                if chart_type is not None:
                    if chart_type not in ["line", "bar"]:
                        raise ValueError("Chart type must be either 'line' or 'bar'")
                    updated_channel["chart_type"] = chart_type

                # Update chart ID if provided
                if chart_id is not None:
                    updated_channel["chart_id"] = chart_id

                # Create a new channels list with the updated channel
                new_channels = list(self.channels)
                new_channels[i] = updated_channel

                # Update the channels list
                self.channels = new_channels

                return True

        return False

    def _on_channel_chart_type_changed(self, change: traitlets.Bunch) -> None:
        """Handle channel chart type changes from the UI."""
        if not change.new:
            return

        # Extract channel_id and chart_type from the update
        channel_id = change.new.get("channel_id", "")
        chart_type = change.new.get("chart_type", "")
        chart_id = change.new.get("chart_id", None)

        if channel_id and (chart_type or chart_id):
            # Apply the update
            self.update_channel_chart(
                channel_id=channel_id,
                chart_type=chart_type if chart_type else None,
                chart_id=chart_id,
            )

        # Reset the trigger
        self.update_channel_chart_type = {}

    def save_data(self, filename: str, compress: bool = True) -> None:
        """
        Save the timeline data to HDF5 format with metadata in JSON.

        This function saves:
        - Data blocks to an HDF5 file (.h5 extension)
        - Channels and other metadata to a complementary JSON file
          (same filename, .json extension)

        Args:
            filename: Base filename to save to (extension will be added automatically)
            compress: Whether to compress the numerical data in the HDF5 file

        Raises:
            ImportError: If h5py is not available
            OSError: If there's an error writing to the files

        """
        # Ensure filename doesn't already have extensions
        file_path = Path(filename)
        h5_file = file_path.with_suffix(".h5")
        json_file = file_path.with_suffix(".json")

        # Create metadata dictionary (channels, view mode, etc.)
        metadata = {
            "channels": self.channels,
            "view_mode": self.view_mode,
            "selected_channel_id": self.selected_channel_id,
            "chart_options": self.chart_options,
            # Add block metadata (but not the data itself, which goes in HDF5)
            "blocks_metadata": [
                {
                    k: v
                    for k, v in block.items()
                    if k != "data"  # Data will be stored in HDF5
                }
                for block in self.blocks
            ],
        }

        # Save metadata to JSON
        try:
            with json_file.open("w", encoding="utf-8") as f:
                json.dump(metadata, f, indent=2)
        except Exception as e:
            raise OSError(f"Error saving metadata to JSON: {e}") from e

        # Save data to HDF5
        try:
            with h5py.File(h5_file, "w") as f:
                # Create a group for each block
                for i, block in enumerate(self.blocks):
                    block_id = block["id"]
                    block_group = f.create_group(f"block_{i}")
                    block_group.attrs["id"] = block_id

                    # For each channel in the block
                    for channel_id, data in block["data"].items():
                        # Convert data to numpy array, handling None values
                        np_data = np.array(data, dtype=np.float32)
                        # Convert None/null values to NaN for HDF5 storage
                        if np_data.dtype.kind == "f":  # If floating point
                            np_data = np.where(np.equal(np_data, None), np.nan, np_data)

                        # Store data in dataset
                        compression = "gzip" if compress else None
                        compression_opts = 9 if compress else None
                        block_group.create_dataset(
                            channel_id,
                            data=np_data,
                            compression=compression,
                            compression_opts=compression_opts,
                        )
        except Exception as e:
            raise OSError(f"Error saving data to HDF5: {e}") from e

    def _process_hdf5_data(
        self, h5_file: Path, blocks_metadata: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:
        """
        Process data from an HDF5 file.

        Args:
            h5_file: Path to the HDF5 file
            blocks_metadata: List of block metadata objects

        Returns:
            List of complete block objects with data

        Raises:
            ValueError: If there's an error processing the data

        """
        blocks = []

        with h5py.File(h5_file, "r") as f:
            # Process each block group
            for i, block_meta in enumerate(blocks_metadata):
                block_group = f.get(f"block_{i}")
                if block_group is None:
                    warnings.warn(f"Block {i} not found in HDF5 file", stacklevel=2)
                    continue

                # Create data dictionary for this block
                block_data: dict[str, list[float | None]] = {}
                for channel_id in block_group:
                    # Convert numpy array to list, handling NaN values
                    np_data = block_group[channel_id][:]
                    # Convert NaN values back to None for JSON
                    data_list: list[float | None] = []
                    for val in np_data:
                        val_float = float(val)
                        if np.isnan(val_float):
                            data_list.append(None)
                        else:
                            data_list.append(val_float)
                    block_data[channel_id] = data_list

                # Create complete block with metadata and data
                block = {**block_meta, "data": block_data}
                blocks.append(block)

        return blocks

    @classmethod
    def load_data(cls, filename: str) -> "TimelineChart":
        """
        Load a TimelineChart from saved HDF5 and JSON files.

        Args:
            filename: Base filename to load from (extensions will be added
                     automatically)

        Returns:
            A new TimelineChart instance with the loaded data

        Raises:
            ImportError: If h5py is not available
            FileNotFoundError: If the files don't exist
            ValueError: If there's an error in the file format

        """
        # Ensure filename doesn't already have extensions
        file_path = Path(filename)
        h5_file = file_path.with_suffix(".h5")
        json_file = file_path.with_suffix(".json")

        # Check if files exist
        if not h5_file.exists():
            raise FileNotFoundError(f"HDF5 file not found: {h5_file}")
        if not json_file.exists():
            raise FileNotFoundError(f"JSON metadata file not found: {json_file}")

        # Load metadata from JSON
        try:
            with json_file.open("r", encoding="utf-8") as f:
                metadata = json.load(f)
        except Exception as e:
            raise ValueError(f"Error loading metadata from JSON: {e}") from e

        # Extract metadata components
        channels = metadata.get("channels", [])
        view_mode = metadata.get("view_mode", "channel")
        selected_channel_id = metadata.get("selected_channel_id", None)
        chart_options = metadata.get("chart_options", {})
        blocks_metadata = metadata.get("blocks_metadata", [])

        # Load data from HDF5 and create TimelineChart instance
        try:
            # Create a new instance with just metadata (no blocks yet)
            timeline_chart = cls(
                channels=channels,
                blocks=[],  # Start with empty blocks
                view_mode=view_mode,
                selected_channel_id=selected_channel_id,
                chart_options=chart_options,
            )

            # Create a method to process and apply the HDF5 data
            timeline_chart.blocks = cls._process_blocks_from_file(
                timeline_chart, h5_file, blocks_metadata
            )

            # Force a notification to ensure frontend update - need direct access
            timeline_chart._notify_trait("blocks", [], timeline_chart.blocks)  # noqa: SLF001
        except Exception as e:
            raise ValueError(f"Error loading data from HDF5: {e}") from e
        else:
            return timeline_chart

    @classmethod
    def _process_blocks_from_file(
        cls,
        instance: "TimelineChart",
        h5_file: Path,
        blocks_metadata: list[dict[str, Any]],
    ) -> list[dict[str, Any]]:
        """
        Process blocks from HDF5 file for the given instance.

        Args:
            instance: TimelineChart instance to process blocks for
            h5_file: Path to the HDF5 file
            blocks_metadata: List of block metadata

        Returns:
            List of processed blocks with data

        """
        # Direct access to private method is needed here
        return instance._process_hdf5_data(h5_file, blocks_metadata)  # noqa: SLF001

    # Aliases for backward compatibility
    save_to_hdf5 = save_data
    load_from_hdf5 = classmethod(load_data)
