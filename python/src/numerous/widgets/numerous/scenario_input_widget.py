from .project import ProjectBrowserBase
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ScenarioInputWidget")

class ScenarioInputWidget(ProjectBrowserBase):
    _esm = ESM
    _css = CSS


