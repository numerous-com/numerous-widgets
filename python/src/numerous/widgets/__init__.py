import importlib.metadata
#from .project_widget import ProjectsMenuWidget
#from .scenario_input_widget import ScenarioInputWidget
try:
    __version__ = importlib.metadata.version("widget")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

from .base._config import CSS as css

from .base.button import Button
from .base.drop_down import DropDown
from .base.number import Number
from .base.tabs import Tabs, render_tab_content
from .base.checkbox import CheckBox
from .base.map_selector import MapSelector
from .base.card import card
from .base.container import container, side_by_side_container
from .base.progress_bar import ProgressBar
from .base.markdown_drawer import MarkdownDrawer
from .base.task import Task
from .base.timer import Timer

from .base.chartjs import Chart

from .task.process_task import process_task_control, ProcessTask, SubprocessTask, run_in_subprocess, sync_with_task

from .templating import render_template

try:
    import numerous
    from .numerous.project import ProjectsMenu
except ImportError:
    pass

