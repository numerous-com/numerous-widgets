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
from .base.string import String
from .base.accordion import Accordion
from .base.chartjs import Chart
from .base.radio_buttons import RadioButtons
from .base.slider import Slider
from .base.datetime_picker import DateTimePicker
from .base.datetime_range_picker import DateTimeRangePicker
from .task.process_task import process_task_control, ProcessTask, SubprocessTask, run_in_subprocess, sync_with_task
from .base.markdown_display import MarkdownDisplay
from .base.table import Table
from .base.chat import Chat

from .templating import render_template


from .numerous.project import ProjectsMenu

