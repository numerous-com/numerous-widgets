from pydantic import BaseModel, Field
import numerous.widgets as wi
from anywidget import AnyWidget
from typing import Any, Dict, Tuple, Union, TypeVar
from pydantic.fields import FieldInfo

T = TypeVar("T")


def number_field(
    label: str,
    tooltip: str,
    start: float,
    stop: float,
    default: float,
    multiple_of: float,
) -> Any:
    """Create a number field.
    Args:
        label: The label of the field.
        tooltip: The tooltip of the field.
        start: The minimum value of the field.
        stop: The maximum value of the field.
        default: The default value of the field.
        multiple_of: The increment of the field.
    """
    widget = wi.Number(
        label=label,
        tooltip=tooltip,
        default=default,
        start=start,
        stop=stop,
        step=multiple_of,
    )

    def generate_widget() -> AnyWidget:
        return widget

    extra: Dict[str, Any] = {"widget_factory": generate_widget}

    return Field(
        default=default,
        ge=start,
        le=stop,
        multiple_of=multiple_of,
        json_schema_extra=extra,
        description=tooltip,
    )


class StateModel(BaseModel):
    """A model that can be used to generate a ui from a pydantic model and sync the ui with the model.

    Args:
        *args: The arguments to pass to the pydantic model.
        **kwargs: The keyword arguments to pass to the pydantic model.
    """

    def __init__(self, *args: Tuple[Any, ...], **kwargs: Dict[str, Any]) -> None:
        super().__init__(*args, **kwargs)

        for v in self.model_fields.values():
            if isinstance(v, FieldInfo):
                extra = v.json_schema_extra
                if isinstance(extra, dict):
                    widget_factory = extra.get("widget_factory")
                    if callable(widget_factory):
                        widget = widget_factory()
                        if isinstance(widget, AnyWidget):
                            extra["widget"] = widget

    @property
    def changed(self) -> bool:
        """Check if the model has changed.
        Returns:
            bool: True if the model has changed, False otherwise.
        """
        _changed = []
        for k, v in self.model_fields.items():
            if isinstance(v, FieldInfo):
                extra = v.json_schema_extra
                if isinstance(extra, dict):
                    widget = extra.get("widget")
                    if isinstance(widget, AnyWidget):
                        _changed.append(getattr(self, k) != widget.value)
        return any(_changed)

    def update_widgets(self) -> None:
        """Update the widgets with the values from the model."""
        for k, v in self.model_fields.items():
            if isinstance(v, FieldInfo):
                extra = v.json_schema_extra
                if isinstance(extra, dict):
                    widget = extra.get("widget")
                    if isinstance(widget, AnyWidget):
                        widget.value = getattr(self, k)

    def get_widget(self, field: str) -> AnyWidget:
        """Get the widget for a field."""
        field_info = self.model_fields[field]
        if isinstance(field_info, FieldInfo):
            extra = field_info.json_schema_extra
            if isinstance(extra, dict):
                widget = extra.get("widget")
                if isinstance(widget, AnyWidget):
                    return widget
        raise ValueError(f"No widget found for field {field}")

    def update_values(self) -> None:
        """Update the values of the model with the values from the widgets."""
        for k, v in self.model_fields.items():
            if isinstance(v, FieldInfo):
                extra = v.json_schema_extra
                if isinstance(extra, dict):
                    widget = extra.get("widget")
                    if isinstance(widget, AnyWidget):
                        setattr(self, k, widget.value)

    def widget_value_valid(self, field: str) -> bool:
        """Check if the value of a widget is valid."""
        widget = self.get_widget(field)
        try:
            self.model_validate({field: widget.value})
            return True
        except Exception:
            return False

    def all_valid(self) -> bool:
        """Check if all fields are valid.
        Returns:
            bool: True if all fields widgets values are valid, False otherwise.
        """
        return all(self.widget_value_valid(field) for field in self.model_fields.keys())

    def apply_values(
        self,
        values: Union[dict[str, Any], BaseModel],
        to_widgets: bool = True,
        to_model: bool = True,
    ) -> None:
        """Apply values to the model or widgets.
        Args:
            values: The values to apply.
            to_widgets: Whether to apply the values to the widgets.
            to_model: Whether to apply the values to the model.
        """
        if isinstance(values, BaseModel):
            values = values.model_dump()

        if to_widgets:
            for k, v in values.items():
                field_info = self.model_fields[k]
                if isinstance(field_info, FieldInfo):
                    extra = field_info.json_schema_extra
                    if isinstance(extra, dict):
                        widget = extra.get("widget")
                        if isinstance(widget, AnyWidget):
                            widget.value = v
        if to_model:
            for k, v in values.items():
                setattr(self, k, v)
