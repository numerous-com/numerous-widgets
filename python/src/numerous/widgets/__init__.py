"""Widgets is for creating widgets."""

import importlib.metadata


try:
    __version__ = importlib.metadata.version("widget")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

from .base.accordion import Accordion as Accordion
from .base.button import Button as Button
from .base.card import card as card
from .base.chartjs import Chart as Chart
from .base.chat import Chat as Chat
from .base.checkbox import CheckBox as CheckBox
from .base.config import CSS as CSS
from .base.container import (
    container as container,
)
from .base.container import (
    side_by_side_container as side_by_side_container,
)
from .base.datetime_picker import DateTimePicker as DateTimePicker
from .base.datetime_range_picker import DateTimeRangePicker as DateTimeRangePicker
from .base.drop_down import DropDown as DropDown
from .base.map_selector import MapSelector as MapSelector
from .base.markdown_display import MarkdownDisplay as MarkdownDisplay
from .base.markdown_drawer import MarkdownDrawer as MarkdownDrawer
from .base.number import Number as Number
from .base.progress_bar import ProgressBar as ProgressBar
from .base.radio_buttons import RadioButtons as RadioButtons
from .base.slider import Slider as Slider
from .base.string import String as String
from .base.table import Table as Table
from .base.tabs import Tabs as Tabs
from .base.task import Task as Task
from .base.timer import Timer as Timer
from .numerous.project import ProjectsMenu as ProjectsMenu
from .task.process_task import (
    ProcessTask as ProcessTask,
)
from .task.process_task import (
    SubprocessTask as SubprocessTask,
)
from .task.process_task import (
    process_task_control as process_task_control,
)
from .task.process_task import (
    run_in_subprocess as run_in_subprocess,
)
from .task.process_task import (
    sync_with_task as sync_with_task,
)
from .templating import render_template as render_template
