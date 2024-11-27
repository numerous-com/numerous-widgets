import anywidget
import traitlets
from typing import Dict, Union, Callable
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ButtonWidget")

class ButtonWidget(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    label = traitlets.Unicode().tag(sync=True)
    clicked = traitlets.Int().tag(sync=True)
    on_click = None

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        label: str,
        ui_label: str = "",
        tooltip: str = None,
        on_click: Callable = None,
    ):
        super().__init__(
            label=label,
            ui_label=ui_label,
            ui_tooltip=tooltip if tooltip is not None else "",
            clicked=0,
        )
        
        self.on_click = on_click

    @traitlets.observe('clicked')
    def _handle_click(self, change):
        if isinstance(self.on_click, Callable):
            self.on_click(change)

    @staticmethod
    def from_dict(config: Dict[str, Union[str, Callable]]) -> "ButtonWidget":
        """Creates a ButtonWidget instance from a configuration dictionary."""
        return ButtonWidget(
            label=config["label"],
            ui_label=config.get("ui_label", ""),
            tooltip=config.get("tooltip"),
            on_click=config.get("on_click"),
        ) 