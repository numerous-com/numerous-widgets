import anywidget
import traitlets
from typing import Dict, Union, Callable
from ._config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ButtonWidget")

class Button(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    label = traitlets.Unicode().tag(sync=True)
    clicked = traitlets.Int().tag(sync=True)
    disabled = traitlets.Bool().tag(sync=True)
    value = traitlets.Bool().tag(sync=True)
    on_click = None

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS
    def __init__(
        self,
        label: str,
        tooltip: str = None,
        on_click: Callable = None,
        disabled: bool = False,
    ):
        super().__init__(
            ui_label=label,
            ui_tooltip=tooltip if tooltip is not None else "",
            clicked=0,
            disabled=disabled,
        )
        
        self.on_click = on_click

    @traitlets.observe('clicked')
    def _handle_click(self, change):
        #self.value = self.clicked > 0
        if isinstance(self.on_click, Callable):
            self.on_click(change)

    @staticmethod
    def from_dict(config: Dict[str, Union[str, Callable, bool]]) -> "Button":
        """Creates a ButtonWidget instance from a configuration dictionary."""
        return Button(
            label=config["label"],
            tooltip=config.get("tooltip"),
            on_click=config.get("on_click"),
            disabled=config.get("disabled", False),
        )
    
    @property
    def val(self) -> bool:
        return self.value
    
    
