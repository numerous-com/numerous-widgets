"""Module providing functions for interacting with Numerous projects."""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from uuid import uuid4


try:
    from numerous.collections import collection
except ImportError:

    def collection(path: str) -> Any:  # type: ignore[misc, unused-ignore]  # noqa: ANN401, ARG001
        raise ImportError(
            "numerous sdk is not installed. Please install it with\
                  `pip install numerous`"
        )


@dataclass
class Scenario:
    """A scenario is a collection of documents and files."""

    name: str
    description: str
    documents: dict[str, dict[str, Any] | None]
    files: dict[str, str] | None
    id: str = field(default_factory=lambda: str(uuid4()))


@dataclass
class ScenarioMetadata:
    id: str
    name: str
    description: str
    app_slug: str
    app_version: str
    interface: str
    interface_version: str

    def to_dict(self) -> dict[str, Any]:
        """Return a dictionary representation of the scenario metadata."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "app_slug": self.app_slug,
            "app_version": self.app_version,
            "interface": self.interface,
            "interface_version": self.interface_version,
        }


@dataclass
class Project:
    name: str
    description: str
    scenarios: dict[str, Scenario] | None
    id: str = field(default_factory=lambda: str(uuid4()))


def list_projects() -> dict[str, Project]:
    """Return a dictionary of project names and their descriptions."""
    projects_dict = {}
    projects = collection("projects")

    for project in projects.collections():
        project_metadata = project.document(".project_metadata").get()
        if project_metadata is None:
            raise ValueError(f"Project metadata not found for project {project.key}")
        projects_dict[project_metadata["id"]] = Project(
            id=project_metadata["id"],
            name=project_metadata["name"],
            description=project_metadata["description"],
            scenarios={},
        )

    return projects_dict


def get_project(project_name: str) -> Project:
    """Return project details including all scenario names and descriptions."""
    project = collection("projects").collection(project_name)
    project_metadata = project.document(".project_metadata").get()

    scenarios_dict = {}
    for scenario in project.collection("scenarios").collections():
        scenario_metadata = scenario.document(".scenario_metadata").get()
        if scenario_metadata is None:
            raise ValueError(
                f"Scenario metadata not found for scenario {scenario.key}\
                      in project {project_name}"
            )
        scenarios_dict[scenario_metadata["id"]] = Scenario(
            id=scenario_metadata["id"],
            name=scenario_metadata["name"],
            description=scenario_metadata["description"],
            documents={},
            files={},
        )
    if project_metadata is None:
        raise ValueError(f"Project metadata not found for project {project_name}")
    return Project(
        id=project_metadata["id"],
        name=project_metadata["name"],
        description=project_metadata["description"],
        scenarios=scenarios_dict,
    )


def get_scenario(project_name: str, scenario_name: str) -> Scenario:
    """Return full scenario details including all documents."""
    project = collection("projects").collection(project_name)
    scenario = project.collection("scenarios").collection(scenario_name)
    scenario_metadata = scenario.document(".scenario_metadata").get()

    docs_dict = {}
    for doc in scenario.collection("documents").documents():
        docs_dict[doc.key] = doc.get()

    files_dict = {}
    for file in scenario.collection("files").files():
        files_dict[file.key] = file.read_text()

    if scenario_metadata is None:
        raise ValueError(
            f"Scenario metadata not found for scenario {scenario_name}\
                  in project {project_name}"
        )

    return Scenario(
        id=scenario_metadata["id"],
        name=scenario_metadata["name"],
        description=scenario_metadata["description"],
        documents=docs_dict,
        files=files_dict,
    )


def get_document(
    project_name: str, scenario_name: str, document_key: str
) -> dict[str, Any] | None:
    """Return a specific document from a scenario."""
    project = collection("projects").collection(project_name)
    scenario = project.collection("scenarios").collection(scenario_name)
    return scenario.collection("documents").document(document_key).get()  # type: ignore[no-any-return]


def get_file(project_name: str, scenario_name: str, file_key: str) -> str | None:
    """Return a specific file from a scenario."""
    project = collection("projects").collection(project_name)
    scenario = project.collection("scenarios").collection(scenario_name)
    return scenario.collection("files").file(file_key).read_text()  # type: ignore[no-any-return]


def save_file(
    project: Project, scenario: Scenario, file_key: str, file_path: str
) -> None:
    """Save a file to a scenario."""
    _scenario = (
        collection("projects")
        .collection(project.id)
        .collection("scenarios")
        .collection(scenario.id)
    )
    with Path(file_path).open("rb") as file:
        _scenario.collection("files").file(file_key).save(file.read())


def save_project(project: Project) -> None:
    project_collection = collection("projects").collection(project.id)
    project_collection.document(".project_metadata").set(
        {"id": project.id, "name": project.name, "description": project.description}
    )
    project_collection.collection("scenarios")


def save_scenario(project: Project, scenario: Scenario) -> None:
    scenario_collection = (
        collection("projects")
        .collection(project.id)
        .collection("scenarios")
        .collection(scenario.id)
    )
    scenario_collection.document(".scenario_metadata").set(
        {"id": scenario.id, "name": scenario.name, "description": scenario.description}
    )
    scenario_collection.collection("documents")


def save_document(
    project: Project, scenario: Scenario, name: str, document: dict[str, Any]
) -> None:
    document_collection = (
        collection("projects")
        .collection(project.id)
        .collection("scenarios")
        .collection(scenario.id)
        .collection("documents")
    )
    document_collection.document(name).set(document)


def save_scenario_metadata(
    project: Project, scenario: Scenario, metadata: ScenarioMetadata
) -> None:
    _scenario = (
        collection("projects")
        .collection(project.id)
        .collection("scenarios")
        .collection(scenario.id)
    )
    _scenario.document(".scenario_metadata").set(metadata.to_dict())


if __name__ == "__main__":
    # Create test documents
    doc1 = {
        "key": "doc1",
        "content": "This is the first document",
        "metadata": {"type": "text", "created": "2024-03-20"},
    }

    doc2 = {
        "key": "doc2",
        "content": "This is the second document",
        "metadata": {"type": "text", "created": "2024-03-20"},
    }

    # Create projects and scenarios with fixed IDs
    project1 = Project(
        id="project-1", name="project1", description="This is a project", scenarios={}
    )
    scenario1 = Scenario(
        id="scenario-1",
        name="scenario1",
        description="This is a scenario",
        documents={"doc1": doc1},
        files={},
    )
    scenario2 = Scenario(
        id="scenario-2",
        name="scenario2",
        description="This is another scenario",
        documents={"doc1": doc1, "doc2": doc2},
        files={},
    )

    # Save everything
    save_project(project1)
    save_scenario(project1, scenario1)
    save_document(project1, scenario1, "doc1", doc1)

    save_scenario(project1, scenario2)
    save_document(project1, scenario2, "doc1", doc1)
    save_document(project1, scenario2, "doc2", doc2)

    # Create and save a second project
    project2 = Project(
        id="project-2",
        name="project2",
        description="This is another project",
        scenarios={},
    )
    save_project(project2)
