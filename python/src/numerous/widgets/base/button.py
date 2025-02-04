"""Module providing a button widget for the numerous library."""

from collections.abc import Callable

import anywidget
import traitlets

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ButtonWidget")


class Button(anywidget.AnyWidget):  # type: ignore[misc]
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    label = traitlets.Unicode().tag(sync=True)
    clicked = traitlets.Int().tag(sync=True)
    disabled = traitlets.Bool().tag(sync=True)
    value = traitlets.Bool().tag(sync=True)
    className = traitlets.Unicode().tag(sync=True)  # noqa: N815
    variant = traitlets.Unicode().tag(sync=True)
    icon_svg = traitlets.Unicode().tag(sync=True)
    on_click = None
    fit_content = traitlets.Bool().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        tooltip: str | None = None,
        on_click: Callable[[traitlets.BaseDescriptor], None] | None = None,
        disabled: bool = False,
        className: str = "",  # noqa: N803
        variant: str = "default",
        icon_svg: str = "",
        fit_to_content: bool = False,
    ) -> None:
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            clicked=0,
            disabled=disabled,
            className=className,
            variant=variant,
            icon_svg=icon_svg,
            fit_to_content=fit_to_content,
        )

        self.on_click = on_click

    @traitlets.observe("clicked")  # type: ignore[misc]
    def _handle_click(self, change: traitlets.BaseDescriptor) -> None:
        if self.on_click is not None:
            self.on_click(change)

    @property
    def val(self) -> bool:
        """Return the value of the button."""
        return bool(self.value)
