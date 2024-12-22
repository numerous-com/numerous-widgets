"""Module providing a datetime range picker widget for the numerous library."""

from datetime import datetime

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DateTimeRangePickerWidget")


class DateTimeRangePicker(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a date and time range.

    The selected values can be accessed via the `selected_value` property.

    Args:
        label: The label of the datetime range picker.
        tooltip: The tooltip of the datetime range picker.
        default_start: The default start datetime value.
        default_end: The default end datetime value.
        min_date: The minimum allowed date (optional).
        max_date: The maximum allowed date (optional).

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    start_value = traitlets.Unicode().tag(sync=True)  # ISO format string
    end_value = traitlets.Unicode().tag(sync=True)  # ISO format string
    min_date = traitlets.Unicode().tag(sync=True)  # ISO format string
    max_date = traitlets.Unicode().tag(sync=True)  # ISO format string

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        default_start: datetime | None = None,
        default_end: datetime | None = None,
        min_date: datetime | None = None,
        max_date: datetime | None = None,
    ) -> None:
        # Use current datetime as default start if none provided
        if default_start is None:
            default_start = datetime.now()

        # Use start + 1 hour as default end if none provided
        if default_end is None:
            from datetime import timedelta

            default_end = default_start + timedelta(hours=1)

        if default_start >= default_end:
            raise ValueError("default_start must be less than default_end")

        # Validate min/max dates if provided
        if min_date and max_date and min_date > max_date:
            raise ValueError("min_date must be less than or equal to max_date")

        if min_date and (default_start < min_date or default_end < min_date):
            raise ValueError("default dates must be greater than or equal to min_date")

        if max_date and (default_start > max_date or default_end > max_date):
            raise ValueError("default dates must be less than or equal to max_date")

        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            start_value=default_start.isoformat(),
            end_value=default_end.isoformat(),
            min_date=min_date.isoformat() if min_date else "",
            max_date=max_date.isoformat() if max_date else "",
        )

    @property
    def selected_value(self) -> tuple[datetime, datetime]:
        """Returns the current datetime range as a tuple (start, end)."""
        return (
            datetime.fromisoformat(self.start_value),
            datetime.fromisoformat(self.end_value),
        )

    @property
    def val(self) -> tuple[datetime, datetime]:
        """Returns the current datetime range as a tuple (start, end)."""
        return self.selected_value

    @val.setter
    def val(self, value: tuple[datetime, datetime]) -> None:
        start, end = value
        if isinstance(start, str):
            start = datetime.fromisoformat(start)
        if isinstance(end, str):
            end = datetime.fromisoformat(end)

        if start >= end:
            raise ValueError("start datetime must be less than end datetime")

        # Validate against min/max dates
        if self.min_date:
            min_date = datetime.fromisoformat(self.min_date)
            if start < min_date or end < min_date:
                raise ValueError("Values must be greater than or equal to min_date")

        if self.max_date:
            max_date = datetime.fromisoformat(self.max_date)
            if start > max_date or end > max_date:
                raise ValueError("Values must be less than or equal to max_date")

        self.start_value = start.isoformat()
        self.end_value = end.isoformat()
