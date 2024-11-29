import importlib.metadata
#from .project_widget import ProjectsMenuWidget
#from .scenario_input_widget import ScenarioInputWidget
try:
    __version__ = importlib.metadata.version("widget")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

from .button import Button
from .drop_down import DropDown
from .number import Number
from .tabs import Tabs, tabs_active_page_content
from .checkbox import CheckBox
from .map_selector import MapSelector
from .card import card
from .progress_bar import ProgressBar
