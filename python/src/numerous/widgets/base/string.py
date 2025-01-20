"""Module providing a string input widget for the numerous library."""

from collections.abc import Callable

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("StringInputWidget")


class String(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for text input.

    Args:
        label: The label of the string input.
        tooltip: The tooltip of the string input.
        default: The default value of the string input.
        placeholder: Placeholder text to show when input is empty.
        on_validation: Optional callable that takes a string\
        and returns True/None if valid,\
        or an error message string if invalid.
        label_inline: If True (default), label appears next to input. \
            If False, label appears above.

    """

    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Unicode().tag(sync=True)
    placeholder = traitlets.Unicode().tag(sync=True)
    fit_to_content = traitlets.Bool(default_value=False).tag(sync=True)
    is_valid = traitlets.Bool(default_value=True).tag(sync=True)
    is_password = traitlets.Bool(default_value=False).tag(sync=True)
    validation_message = traitlets.Unicode().tag(sync=True)
    label_inline = traitlets.Bool(default_value=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        default: str = "",
        placeholder: str = "",
        fit_to_content: bool = False,
        on_validation: Callable[[str], bool | str | None] | None = None,
        is_password: bool = False,
        label_inline: bool = True,
    ) -> None:
        # Set validator before calling super().__init__
        self._validator = on_validation

        # Validate initial value
        validation_result = self._validate(default)
        is_valid = validation_result is True or validation_result is None
        validation_message = "" if is_valid else str(validation_result)

        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            value=default,
            placeholder=placeholder,
            fit_to_content=fit_to_content,
            is_valid=is_valid,
            is_password=is_password,
            validation_message=validation_message,
            label_inline=label_inline,
        )

    def _validate(self, value: str) -> bool | str | None:
        """Run validation and return the result."""
        if self._validator:
            return self._validator(value)
        return True

    @traitlets.observe("value")  # type: ignore[misc]
    def _validate_value(self, change: traitlets.BaseDescriptor) -> None:
        """Validate the value when it changes."""
        if self._validator:
            validation_result = self._validate(change["new"])
            self.is_valid = validation_result is True or validation_result is None
            self.validation_message = "" if self.is_valid else str(validation_result)

    @property
    def val(self) -> str:
        """
        Return the current input value.

        Returns:
            str: The current input value.

        """
        return str(self.value)

    @val.setter
    def val(self, value: str) -> None:
        """
        Set the current input value.

        Args:
            value: The new value to set.

        """
        self.value = value
