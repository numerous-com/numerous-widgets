import anywidget
import traitlets
from typing import Dict, Union, Optional

class PortalWidget(anywidget.AnyWidget):
    """Base class for widgets that can be rendered in a portal."""
    
    element_id = traitlets.Unicode(allow_none=True).tag(sync=True)
    
    def __init__(self, element_id: Optional[str] = None, **kwargs):
        super().__init__(element_id=element_id, **kwargs) 