"""Module providing a datetime picker widget for the numerous library."""

from datetime import datetime

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DateTimePickerWidget")


class DateTimePicker(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for selecting a date and time.

    The selected value can be accessed via the `selected_value` property.

    Args:
        label: The label of the datetime picker.
        tooltip: The tooltip of the datetime picker.
        default: The default datetime value.
        min_date: The minimum allowed date (optional).
        max_date: The maximum allowed date (optional).

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)  # ISO format string
    min_date = traitlets.Unicode().tag(sync=True)  # ISO format string
    max_date = traitlets.Unicode().tag(sync=True)  # ISO format string

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        default: datetime | None = None,
        min_date: datetime | None = None,
        max_date: datetime | None = None,
    ) -> None:
        # Use current datetime as default if none provided
        if default is None:
            default = datetime.now()

        # Validate min/max dates if provided
        if min_date and max_date and min_date > max_date:
            raise ValueError("min_date must be less than or equal to max_date")

        if min_date and default < min_date:
            raise ValueError("default date must be greater than or equal to min_date")

        if max_date and default > max_date:
            raise ValueError("default date must be less than or equal to max_date")

        # Initialize with keyword arguments
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default.isoformat(),
            min_date=min_date.isoformat() if min_date else "",
            max_date=max_date.isoformat() if max_date else "",
        )

    @property
    def selected_value(self) -> datetime:
        """Returns the current datetime value."""
        return datetime.fromisoformat(self.value)

    @property
    def val(self) -> datetime:
        """Returns the current datetime value."""
        return datetime.fromisoformat(self.value)

    @val.setter
    def val(self, value: datetime) -> None:
        if isinstance(value, str):
            value = datetime.fromisoformat(value)

        # Validate against min/max dates
        if self.min_date and value < datetime.fromisoformat(self.min_date):
            raise ValueError("Value must be greater than or equal to min_date")
        if self.max_date and value > datetime.fromisoformat(self.max_date):
            raise ValueError("Value must be less than or equal to max_date")

        self.value = value.isoformat()
