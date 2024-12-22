"""Module providing a stress test for the Numerous projects module."""

import random
import time
from datetime import datetime
from typing import Any

from numerous.widgets.numerous.projects import (
    Project,
    Scenario,
    save_document,
    save_project,
    save_scenario,
)


# Configuration
NUM_PROJECTS = 100
SCENARIOS_PER_PROJECT = 100
DOCUMENTS_PER_SCENARIO = 2


def generate_random_text(length: int = 100) -> str:
    """Generate random lorem-ipsum-like text."""
    words = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "sed",
        "do",
        "eiusmod",
        "tempor",
        "incididunt",
        "ut",
        "labore",
    ]
    return " ".join(random.choices(words, k=length))  # noqa: S311


def create_test_document(doc_id: int) -> dict[str, Any]:
    """Create a test document with random content."""
    return {
        "key": f"doc_{doc_id}",
        "content": generate_random_text(),
        "metadata": {
            "type": "text",
            "created": datetime.now().isoformat(),
            "version": 1,
            "tags": random.sample(
                ["important", "draft", "final", "review", "archived"], 2
            ),
        },
    }


def main() -> None:
    start_time = time.time()
    total_documents = 0

    print("Starting stress test with:")  # noqa: T201
    print(f"- {NUM_PROJECTS} projects")  # noqa: T201
    print(f"- {SCENARIOS_PER_PROJECT} scenarios per project")  # noqa: T201
    print(f"- {DOCUMENTS_PER_SCENARIO} documents per scenario")  # noqa: T201

    for p in range(NUM_PROJECTS):
        project = Project(
            id=f"stress-project-{p}",
            name=f"Stress Test Project {p}",
            description=f"Auto-generated project {p} for stress testing",
            scenarios={},
        )

        print(f"\nCreating project {p+1}/{NUM_PROJECTS}")  # noqa: T201
        save_project(project)

        for s in range(SCENARIOS_PER_PROJECT):
            scenario = Scenario(
                id=f"stress-scenario-{p}-{s}",
                name=f"Scenario {s} in Project {p}",
                description=f"Auto-generated scenario {s} in project {p}",
                documents={},
                files=None,
            )

            print(f"  Creating scenario {s+1}/{SCENARIOS_PER_PROJECT}")  # noqa: T201
            save_scenario(project, scenario)

            for d in range(DOCUMENTS_PER_SCENARIO):
                document = create_test_document(d)
                save_document(project, scenario, document["key"], document)
                total_documents += 1

                if d % 10 == 0:  # Progress indicator every 10 documents
                    print(f"    Saved {d} documents...")  # noqa: T201

    end_time = time.time()
    duration = end_time - start_time

    print("\nStress test completed!")  # noqa: T201
    print(f"Created {NUM_PROJECTS} projects with {total_documents} total documents")  # noqa: T201
    print(f"Total time: {duration:.2f} seconds")  # noqa: T201
    print(f"Average time per document: {(duration/total_documents):.3f} seconds")  # noqa: T201


if __name__ == "__main__":
    main()
