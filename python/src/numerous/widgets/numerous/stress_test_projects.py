"""Module providing a stress test for the Numerous projects module."""

import logging
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
    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
    )
    start_time = time.time()
    total_documents = 0

    logging.info("Starting stress test with:")
    logging.info(f"- {NUM_PROJECTS} projects")
    logging.info(f"- {SCENARIOS_PER_PROJECT} scenarios per project")
    logging.info(f"- {DOCUMENTS_PER_SCENARIO} documents per scenario")

    for p in range(NUM_PROJECTS):
        project = Project(
            id=f"stress-project-{p}",
            name=f"Stress Test Project {p}",
            description=f"Auto-generated project {p} for stress testing",
            scenarios={},
        )

        logging.info(f"\nCreating project {p+1}/{NUM_PROJECTS}")
        save_project(project)

        for s in range(SCENARIOS_PER_PROJECT):
            scenario = Scenario(
                id=f"stress-scenario-{p}-{s}",
                name=f"Scenario {s} in Project {p}",
                description=f"Auto-generated scenario {s} in project {p}",
                documents={},
                files=None,
            )

            logging.info(f"  Creating scenario {s+1}/{SCENARIOS_PER_PROJECT}")
            save_scenario(project, scenario)

            for d in range(DOCUMENTS_PER_SCENARIO):
                document = create_test_document(d)
                save_document(project, scenario, document["key"], document)
                total_documents += 1

                if d % 10 == 0:  # Progress indicator every 10 documents
                    logging.info(f"    Saved {d} documents...")

    end_time = time.time()
    duration = end_time - start_time

    logging.info("\nStress test completed!")
    logging.info(
        f"Created {NUM_PROJECTS} projects with {total_documents} total documents"
    )
    logging.info(f"Total time: {duration:.2f} seconds")
    logging.info(f"Average time per document: {(duration/total_documents):.3f} seconds")


if __name__ == "__main__":
    main()
