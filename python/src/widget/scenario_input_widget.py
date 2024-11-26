import anywidget
import traitlets
from .projects import get_project, get_scenario, save_scenario, get_document, get_file, save_document, save_file, list_projects, ScenarioMetadata
from .project_widget import ProjectBrowserBase
import pathlib

_DEV = True  # switch to False for production

if _DEV:
    # from `npx vite`
    ESM = "http://localhost:5173/src/components/ScenarioInputWidget.tsx?anywidget"
    CSS = pathlib.Path(__file__).parent / ".." / ".." / ".." / "js"  / "src" / "css" / "styles.css"
else:
    ESM = pathlib.Path(__file__).parent / "static" / "ScenarioInputWidget.mjs"
    CSS = pathlib.Path(__file__).parent / "static" / "style.css"



class ScenarioInputWidget(ProjectBrowserBase):
    _esm = ESM
    _css = CSS


