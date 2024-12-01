import anywidget
import traitlets
from .projects import get_project, get_scenario, save_scenario, get_document, get_file, save_document, save_file, list_projects, ScenarioMetadata
from .project import ProjectBrowserBase
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ScenarioInputWidget")

class ScenarioInputWidget(ProjectBrowserBase):
    _esm = ESM
    _css = CSS


