import anywidget
import traitlets
import pathlib
from typing import Dict, Union

_DEV = True  # switch to False for production

if _DEV:
    # from `npx vite`
    ESM = "http://localhost:5173/js/components/NumberWidget.tsx?anywidget"
    CSS = pathlib.Path(__file__).parent.joinpath("number_widget/number_widget.css")

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

    def __init__(self, config: Dict[str, Union[str, float]]):
        # Initialize with the merged configuration
        super().__init__(
            ui_label=config["ui_label"],
            ui_tooltip=config["ui_tooltip"],
            value=config["default"],
            start=config["start"],
            stop=config["stop"],
            step=config["step"],
        )

    @property
    def selected_value(self) -> float:
        """Returns the currently selected numeric value."""
        return self.value
