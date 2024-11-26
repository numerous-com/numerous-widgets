import anywidget
import traitlets
import pathlib
from typing import Dict, Union

_DEV = True  # switch to False for production

if _DEV:
    # from `npx vite`
    ESM = "http://localhost:5173/src/components/widgets/NumberInputWidget.tsx?anywidget"
    CSS = pathlib.Path(__file__).parent / ".." / ".." / ".." / "js"  / "src" / "css" / "styles.css"

else:
    ESM = pathlib.Path(__file__).parent / "static" / "NumberWidget.mjs"
    CSS = pathlib.Path(__file__).parent / "static" / "style.css"

class NumberWidget(anywidget.AnyWidget):
    # Define traitlets for the widget properties
    ui_label = traitlets.Unicode().tag(sync=True)
    ui_tooltip = traitlets.Unicode().tag(sync=True)
    value = traitlets.Float().tag(sync=True)
    start = traitlets.Float().tag(sync=True)
    stop = traitlets.Float().tag(sync=True)
    step = traitlets.Float().tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        *,
        ui_label: str,
        ui_tooltip: str,
        default: float,
        start: float,
        stop: float,
        step: float,
    ):
        # Initialize with keyword arguments
        super().__init__(
            ui_label=ui_label,
            ui_tooltip=ui_tooltip,
            value=default,
            start=start,
            stop=stop,
            step=step,
        )

    @staticmethod
    def from_dict(config: Dict[str, Union[str, float]]) -> "NumberWidget":
        """Creates a NumberWidget instance from a configuration dictionary.
        
        Args:
            config: Dictionary containing widget configuration parameters
        
        Returns:
            NumberWidget: A new widget instance
        """
        return NumberWidget(
            ui_label=config["ui_label"],
            ui_tooltip=config["ui_tooltip"],
            default=config["default"],
            start=config["start"],
            stop=config["stop"],
            step=config["step"],
        )

    @property
    def selected_value(self) -> float:
        """Returns the currently selected numeric value."""
        return self.value
