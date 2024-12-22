"""Module providing a project browser widget for the numerous library."""

from typing import Any

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths
from numerous.widgets.numerous.projects import (
    Scenario,
    ScenarioMetadata,
    get_document,
    get_file,
    get_project,
    get_scenario,
    list_projects,
    save_document,
    save_file,
    save_scenario,
    save_scenario_metadata,
)


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ProjectMenuWidget")


class ProjectBrowserBase(anywidget.AnyWidget):  # type: ignore[misc]
    projects = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    scenarios = traitlets.List(trait=traitlets.Dict()).tag(sync=True)

    selected_project_id = traitlets.Unicode(allow_none=True).tag(sync=True)
    selected_scenario_id = traitlets.Unicode(allow_none=True).tag(sync=True)

    changed = traitlets.Bool(default_value=False).tag(sync=True)

    def __init__(self, *args: tuple[Any, ...], **kwargs: dict[str, Any]) -> None:
        super().__init__(*args, **kwargs)

        self._update_projects()

        self.scenarios = []
        self._documents: dict[str, Any] = {}
        self._files: dict[str, str] = {}

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

    @traitlets.observe("selected_project_id")  # type: ignore[misc]
    def _selected_project_id_changed(self, change: traitlets.Bunch) -> None:
        if change["new"]:
            project = get_project(change["new"])

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

    @traitlets.observe("selected_scenario_id")  # type: ignore[misc]
    def _selected_scenario_id_changed(self, change: traitlets.Bunch) -> None:
        if change.new and self.selected_project_id:
            self.scenario: Scenario | None = get_scenario(
                self.selected_project_id, change.new
            )
        else:
            self.scenario = None

    def get_document(self, name: str) -> dict[str, Any] | None:
        """Get the document for a given name."""
        if name in self._documents:
            return self._documents[name]  # type: ignore[no-any-return]
        if self.selected_project_id and self.selected_scenario_id:
            return get_document(  # type: ignore[no-any-return]
                self.selected_project_id, self.selected_scenario_id, name
            )
        return None

    def get_file(self, name: str) -> str | None:
        """Get the file path for a given file name."""
        if name in self._files:
            return self._files[name]
        if self.selected_project_id and self.selected_scenario_id:
            return get_file(  # type: ignore[no-any-return]
                self.selected_project_id, self.selected_scenario_id, name
            )
        return None


class ProjectsMenu(ProjectBrowserBase):
    _esm = ESM
    _css = CSS

    changed = traitlets.Bool(default_value=False).tag(sync=True)
    do_save = traitlets.Bool(default_value=False).tag(sync=True)

    def __init__(self, *args: tuple[Any, ...], **kwargs: dict[str, Any]) -> None:
        super().__init__(*args, **kwargs)

        self._metadata_changed = False

    @traitlets.observe("do_save")  # type: ignore[misc]
    def _do_save_changed(self, event: traitlets.Bunch) -> None:
        _save = event.new
        if _save:
            self.changed = False

            if not self.selected_project_id or not self.selected_scenario_id:
                return

            scenario = get_scenario(self.selected_project_id, self.selected_scenario_id)
            project = get_project(self.selected_project_id)

            if not project or not scenario:
                return

            save_scenario(project, scenario)

            for name, doc in self._documents.items():
                save_document(project, scenario, name, doc)

            for name, file_path in self._files.items():
                save_file(project, scenario, name, file_path)

            if self._metadata_changed:
                save_scenario_metadata(project, scenario, self._scenario_metadata)

    def set_document(self, name: str, doc: dict[str, Any]) -> None:
        """Set the document for a given name."""
        self._documents[name] = doc
        self.changed = True

    def set_file(self, name: str, file_path: str) -> None:
        """Set the file path for a given file name."""
        self._files[name] = file_path
        self.changed = True

    def set_scenario_metadata(self, metadata: ScenarioMetadata) -> None:
        """Set the scenario metadata."""
        self._scenario_metadata = metadata
        self.changed = True
        self._metadata_changed = True
