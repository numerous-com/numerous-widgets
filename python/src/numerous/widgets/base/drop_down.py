from typing import List
import traitlets
from .config import get_widget_paths
import anywidget

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("DropDownWidget")


class DropDown(anywidget.AnyWidget):
    """
    A widget for selecting an option from a list of options.

    The selected option can be accessed via the `selected_value` property.

    Args:
        options: A list of options to select from.
        label: The label of the dropdown.
        tooltip: The tooltip of the dropdown.
    """

    # Define traitlets for the widget properties
    ui_label: str | None = traitlets.Unicode(allow_none=True).tag(sync=True)  # type: ignore[assignment]
    ui_tooltip: str | None = traitlets.Unicode(allow_none=True).tag(sync=True)  # type: ignore[assignment]
    selected_key: str | None = traitlets.Unicode(allow_none=True).tag(sync=True)  # type: ignore[assignment]
    selected_value: str | None = traitlets.Unicode(allow_none=True).tag(sync=True)  # type: ignore[assignment]
    options: List[str] = traitlets.List().tag(sync=True)  # type: ignore[assignment]
    fit_to_content: bool = traitlets.Bool(default_value=False).tag(sync=True)  # type: ignore[assignment]

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        options: List[str],
        label: str | None = None,
        tooltip: str | None = None,
        default: str | None = None,
        fit_to_content: bool = False,
    ):
        # Initialize with keyword arguments
        default_key = default if default is not None else options[0]
        super().__init__(
            ui_label="" if label is None else label,
            ui_tooltip=tooltip if tooltip is not None else "",
            selected_key=default_key,
            selected_value=default_key,
            options=options,
            fit_to_content=fit_to_content,
        )

    @property
    def val(self) -> str | None:
        """Returns the currently selected option."""
        return self.selected_value

    def get_value(self) -> str | None:
        return self.selected_value

    def set_value(self, value: str) -> None:
        self.selected_key = value
        self.selected_value = value

    @property
    def name(self) -> str | None:
        return self.ui_label
