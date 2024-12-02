import importlib.metadata
#from .project_widget import ProjectsMenuWidget
#from .scenario_input_widget import ScenarioInputWidget
try:
    __version__ = importlib.metadata.version("widget")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

from .base.button import Button
from .base.drop_down import DropDown
from .base.number import Number
from .base.tabs import Tabs, tabs_active_page_content
from .base.checkbox import CheckBox
from .base.map_selector import MapSelector
from .base.card import card
from .base.progress_bar import ProgressBar
from .base.markdown_drawer import MarkdownDrawer
from .base.task import Task
from .base.timer import Timer

from .task.process_task import process_task_control, ProcessTask, SubprocessTask

try:
    import numerous
    from .numerous.project import ProjectsMenu
except ImportError:
    pass

