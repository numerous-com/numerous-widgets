"""Module providing a weighted assessment survey widget for the numerous library."""

import json
import uuid
from collections.abc import Callable
from pathlib import Path
from typing import Any

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("WeightedAssessmentSurveyWidget")

# Define types for our survey structure
QuestionType = dict[str, Any]
GroupType = dict[str, Any]
CategoryType = dict[str, Any]
SurveyType = dict[str, Any]


class WeightedAssessmentSurvey(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget for creating and displaying weighted assessment surveys.

    The survey consists of question groups, each containing multiple questions.
    Each question has a slider (0-5 by default) and an optional comment field.

    The survey can also include a markdown conclusion that is stored with the
    survey data but not displayed in the survey flow. This can be used for
    storing analysis, summary information, or additional context.

    Args:
        survey_data: Dictionary containing the survey structure and data
        edit_mode: Whether the survey is in edit mode (default: False)
        class_name: Optional CSS class name for styling (default: "")
        submit_text: Text to display on the submit button (default: "Submit")
        on_submit: Optional callback function to call when survey is submitted
        on_save: Optional callback function to call when survey is saved in edit mode
        disable_editing: Whether the survey is disabled for editing (default: False)
        read_only: Whether the survey is in read-only mode (default: False)

    Examples:
        >>> import numerous as nu
        >>> from numerous.widgets import WeightedAssessmentSurvey
        >>>
        >>> # Create a survey with submit and save callbacks
        >>> def on_survey_submit(results):
        ...     print(f"Survey submitted with {len(results['groups'])} groups")
        ...     # Process the results as needed
        ...
        >>> def on_survey_save(data):
        ...     print(f"Survey saved with {len(data['groups'])} groups")
        ...     # Save the data to a database or file
        ...
        >>> survey = WeightedAssessmentSurvey(
        ...     submit_text="Submit Feedback",
        ...     on_submit=on_survey_submit,
        ...     on_save=on_survey_save
        ... )
        >>>
        >>> # Add some questions
        >>> survey.add_question("How would you rate the overall experience?")
        >>> survey.add_question("How likely are you to recommend this to others?")
        >>>
        >>>
        >>> # Display the survey
        >>> nu.display(survey)

    """

    # Define traitlets for the widget properties
    survey_data = traitlets.Dict().tag(sync=True)
    edit_mode = traitlets.Bool(default_value=False).tag(sync=True)
    class_name = traitlets.Unicode("").tag(sync=True)
    submit_text = traitlets.Unicode("Submit").tag(sync=True)
    submitted = traitlets.Bool(default_value=False).tag(sync=True)
    saved = traitlets.Bool(default_value=False).tag(sync=True)
    disable_editing = traitlets.Bool(default_value=False).tag(sync=True)
    read_only = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        survey_data: SurveyType | None = None,
        edit_mode: bool = False,
        class_name: str = "",
        submit_text: str = "Submit",
        on_submit: Callable[[dict[str, Any]], None] | None = None,
        on_save: Callable[[dict[str, Any]], None] | None = None,
        disable_editing: bool = False,
        read_only: bool = False,
    ) -> None:
        # Initialize widget
        super().__init__()

        # Process survey data...
        if survey_data is not None and "data" in survey_data:
            # Initialize base survey structure
            processed_data = {
                "title": survey_data["data"]["title"],
                "description": survey_data["data"]["description"],
                "groups": [],  # We'll populate this from the results if available
                "categories": survey_data["data"]["categories"],
            }

            # If there are results, use the group data from results as it contains
            # the answers
            if (
                "results" in survey_data["data"]
                and "data" in survey_data["data"]["results"]
            ):
                results_data = survey_data["data"]["results"]["data"]
                if "groups" in results_data:
                    processed_data["groups"] = results_data["groups"]
            else:
                # If no results, use the original groups
                processed_data["groups"] = survey_data["data"]["groups"]

            survey_data = processed_data
        elif survey_data is None:
            survey_data = self._create_default_survey()

        # Set initial values
        self.survey_data = survey_data
        self.edit_mode = edit_mode
        self.class_name = class_name
        self.submit_text = submit_text
        self.submitted = False
        self.saved = False
        self.disable_editing = disable_editing
        self.read_only = read_only

        # Register callbacks if provided
        if on_submit is not None:
            self.on_submit(on_submit)

        if on_save is not None:
            self.on_save(on_save)

    def _create_default_survey(self) -> SurveyType:
        """Create a default survey structure."""
        return {
            "title": "Assessment Survey",
            "description": "Please complete this assessment survey.",
            "groups": [
                {
                    "id": self._generate_id(),  # Add ID for default group
                    "title": "Default Group",
                    "description": "Please answer the following questions.",
                    "questions": [],
                }
            ],
            "categories": [],
        }

    def _generate_id(self, length: int = 36) -> str:  # noqa: ARG002
        """Generate a UUID-style ID."""
        return str(uuid.uuid4())

    def toggle_edit_mode(self) -> None:
        """Toggle between edit and assessment modes."""
        self.edit_mode = not self.edit_mode

    def save_to_file(self, filepath: str) -> None:
        """Save the survey data to a JSON file."""
        with Path(filepath).open("w", encoding="utf-8") as f:
            json.dump(self.survey_data, f, indent=2)

    def load_from_file(self, filepath: str) -> None:
        """Load survey data from a JSON file."""
        path = Path(filepath)
        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")

        with path.open(encoding="utf-8") as f:
            data = json.load(f)
            self.survey_data = data

    def get_results(self) -> dict[str, Any]:
        """
        Get the current results of the survey.

        Returns the survey_data dictionary directly.
        """
        return self.survey_data  # type: ignore[no-any-return]

    def on_submit(self, callback: Callable[[dict[str, Any]], None]) -> None:
        """
        Register a callback function to be called when the survey is submitted.

        Args:
            callback: Function that takes the survey results as an argument

        """

        def handle_submit(change: dict[str, Any]) -> None:
            if change["new"]:
                callback(self.get_results())

        self.observe(handle_submit, names=["submitted"])

    def on_save(self, callback: Callable[[dict[str, Any]], None]) -> None:
        """
        Register a callback function to be called when the survey is saved in edit mode.

        Args:
            callback: Function that takes the survey data as an argument

        """

        def handle_save(change: dict[str, Any]) -> None:
            if change["new"]:
                callback(self.survey_data)
                # Reset the saved flag after callback is executed
                self.saved = False

        # Make sure we're observing the correct trait
        self.observe(handle_save, names=["saved"])

    def trigger_save(self) -> None:
        """
        Manually trigger the save event.

        Useful for testing the save callback.
        """
        # Set the saved flag to True to trigger the callback
        self.saved = True
