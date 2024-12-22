import anywidget
import traitlets
from typing import Any, Dict, Tuple, Optional
from numerous.widgets.numerous.projects import (
    get_project,
    get_scenario,
    save_scenario,
    get_document,
    get_file,
    save_document,
    save_file,
    list_projects,
    ScenarioMetadata,
    save_scenario_metadata,
    Scenario,
)
from numerous.widgets.base.config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ProjectMenuWidget")


class ProjectBrowserBase(anywidget.AnyWidget):

    projects = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    scenarios = traitlets.List(trait=traitlets.Dict()).tag(sync=True)

    selected_project_id = traitlets.Unicode(allow_none=True).tag(sync=True)
    selected_scenario_id = traitlets.Unicode(allow_none=True).tag(sync=True)

    changed = traitlets.Bool(default_value=False).tag(sync=True)

    def __init__(self, *args: Tuple[Any, ...], **kwargs: Dict[str, Any]) -> None:
        super().__init__(*args, **kwargs)

        self._update_projects()

        self.scenarios = []
        self._documents: Dict[str, Any] = {}
        self._files: Dict[str, str] = {}

    def _update_projects(self) -> None:
        projects_dict = list_projects()
        self.projects = [
            {
                "id": p.id,
                "name": p.name,
                "description": p.description,
            }
            for p in projects_dict.values()
        ]

    @traitlets.observe("selected_project_id")
    def _selected_project_id_changed(self, change: traitlets.Bunch) -> None:
        print("selected_project_id changed to:", change["new"])

        if change["new"]:
            project = get_project(change["new"])
            print("Loading scenarios for project:", project)

            if project and project.scenarios:
                new_scenarios = [
                    {
                        "id": s.id,
                        "name": s.name,
                        "description": s.description,
                        "projectId": change["new"],
                    }
                    for s in project.scenarios.values()
                ]
                self.scenarios = new_scenarios
                print("Updated scenarios:", self.scenarios)

    @traitlets.observe("selected_scenario_id")
    def _selected_scenario_id_changed(self, change: traitlets.Bunch) -> None:
        if change.new and self.selected_project_id:
            self.scenario: Optional[Scenario] = get_scenario(
                self.selected_project_id, change.new
            )
        else:
            self.scenario = None

    def get_document(self, name: str) -> Any:
        if name in self._documents:
            return self._documents[name]
        elif self.selected_project_id and self.selected_scenario_id:
            return get_document(
                self.selected_project_id, self.selected_scenario_id, name
            )
        return None

    def get_file(self, name: str) -> Optional[str]:
        if name in self._files:
            return self._files[name]
        elif self.selected_project_id and self.selected_scenario_id:
            return get_file(self.selected_project_id, self.selected_scenario_id, name)
        return None


class ProjectsMenu(ProjectBrowserBase):
    _esm = ESM
    _css = CSS

    changed = traitlets.Bool(default_value=False).tag(sync=True)
    do_save = traitlets.Bool(default_value=False).tag(sync=True)

    def __init__(self, *args: Tuple[Any, ...], **kwargs: Dict[str, Any]) -> None:
        super().__init__(*args, **kwargs)

        self._metadata_changed = False

    @traitlets.observe("do_save")
    def _do_save_changed(self, event: traitlets.Bunch) -> None:
        _save = event.new
        if _save:
            print("saving!")
            self.changed = False

            if not self.selected_project_id or not self.selected_scenario_id:
                print("Cannot save: project_id or scenario_id is None")
                return

            scenario = get_scenario(self.selected_project_id, self.selected_scenario_id)
            project = get_project(self.selected_project_id)

            if not project or not scenario:
                print("Cannot save: project or scenario not found")
                return

            save_scenario(project, scenario)
            print("documents:")
            print(self._documents)

            for name, doc in self._documents.items():
                print("saving document:", doc)
                save_document(project, scenario, name, doc)

            for name, file_path in self._files.items():
                print("saving file:", file_path)
                save_file(project, scenario, name, file_path)

            if self._metadata_changed:
                save_scenario_metadata(project, scenario, self._scenario_metadata)

    def set_document(self, name: str, doc: Any) -> None:
        self._documents[name] = doc
        self.changed = True

    def set_file(self, name: str, file_path: str) -> None:
        self._files[name] = file_path
        self.changed = True

    def set_scenario_metadata(self, metadata: ScenarioMetadata) -> None:
        self._scenario_metadata = metadata
        self.changed = True
        self._metadata_changed = True
