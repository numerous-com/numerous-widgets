import anywidget
import traitlets
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("StringInputWidget")

class String(anywidget.AnyWidget):
    """
    A widget for text input.

    The input value can be accessed via the `value` property.

    Args:
        label: The label of the string input.
        tooltip: The tooltip of the string input.
        default: The default value of the string input.
        placeholder: Placeholder text to show when input is empty.
    """
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    placeholder = traitlets.Unicode().tag(sync=True)
    fit_to_content = traitlets.Bool(default_value=False).tag(sync=True)
    validation_regex = traitlets.Unicode().tag(sync=True)
    is_password = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str = None,
        default: str = "",
        placeholder: str = "",
        fit_to_content: bool = False,
        validation_regex: str = "",
        is_password: bool = False,
    ):
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
            placeholder=placeholder,
            fit_to_content=fit_to_content,
            validation_regex=validation_regex,
            is_password=is_password,
        )

    @property
    def val(self) -> str:
        """Returns the current input value.
        
        Returns:
            str: The current input value.
        """
        return self.value
    
    @val.setter
    def val(self, value: str):
        """Sets the current input value.
        
        Args:
            value: The new value to set.
        """
        self.value = value 