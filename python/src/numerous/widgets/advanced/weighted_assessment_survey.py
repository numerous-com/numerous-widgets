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
        survey_mode: Whether to run in secure survey mode, limiting data sent to JS
                     (default: False)

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
        survey_mode: bool = False,
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

        # Store the complete survey data privately
        self._complete_survey_data = survey_data.copy()

        # Filter data for JS side if in survey mode
        if survey_mode and not edit_mode:
            filtered_data = self._filter_survey_data_for_js(survey_data)
            self.survey_data = filtered_data
        else:
            self.survey_data = survey_data

        # Set initial values
        self.edit_mode = edit_mode
        self.class_name = class_name
        self.submit_text = submit_text
        self.submitted = False
        self.saved = False
        self.disable_editing = disable_editing
        self.read_only = read_only
        self._survey_mode = survey_mode

        # Register callbacks if provided
        if on_submit is not None:
            self.on_submit(on_submit)

        if on_save is not None:
            self.on_save(on_save)

    def _filter_survey_data_for_js(self, survey_data: SurveyType) -> SurveyType:
        """
        Filter survey data for JS side in survey mode.

        This method creates a version of the survey data that only includes the
        essential information needed for displaying the survey, removing sensitive
        or unnecessary data.
        """
        filtered_data = {
            "title": survey_data.get("title", ""),
            "description": survey_data.get("description", ""),
            "groups": [],
        }

        # Include only necessary group and question information
        for group in survey_data.get("groups", []):
            filtered_group = {
                "id": group.get("id", self._generate_id()),
                "title": group.get("title", ""),
                "description": group.get("description", ""),
                "questions": [],
            }

            # Include only necessary question fields
            for question in group.get("questions", []):
                filtered_question = {
                    "id": question.get("id", self._generate_id()),
                    "text": question.get("text", ""),
                    "comment": None,  # Initialize comment as None for proper clearing
                    "value": None,  # No value by default
                    "doNotKnow": question.get("doNotKnow", False),
                }
                filtered_group["questions"].append(filtered_question)

            filtered_data["groups"].append(filtered_group)

        return filtered_data

    def _create_default_survey(self) -> SurveyType:
        """Create a default survey structure."""
        return {
            "title": "Assessment Survey",
            "description": "Please complete this assessment survey.",
            "groups": [],  # Initialize with empty groups array
            "categories": [],
        }

    def _generate_id(self, length: int = 36) -> str:  # noqa: ARG002
        """Generate a UUID-style ID."""
        return str(uuid.uuid4())

    def toggle_edit_mode(self) -> None:
        """Toggle between edit and assessment modes."""
        self.edit_mode = not self.edit_mode

        # Update survey data when toggling to/from edit mode
        if self._survey_mode:
            if self.edit_mode:
                # When switching to edit mode, use complete data
                self.survey_data = self._complete_survey_data
            else:
                # When switching to survey mode, filter data
                self.survey_data = self._filter_survey_data_for_js(
                    self._complete_survey_data
                )

    def save_to_file(self, filepath: str) -> None:
        """Save the survey data to a JSON file."""
        # Always save the complete data
        with Path(filepath).open("w", encoding="utf-8") as f:
            json.dump(self._complete_survey_data, f, indent=2)

    def load_from_file(self, filepath: str) -> None:
        """Load survey data from a JSON file."""
        path = Path(filepath)
        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")

        with path.open(encoding="utf-8") as f:
            data = json.load(f)
            self._complete_survey_data = data

            # Update the survey_data based on mode
            if self._survey_mode and not self.edit_mode:
                self.survey_data = self._filter_survey_data_for_js(data)
            else:
                self.survey_data = data

    def get_results(self) -> dict[str, Any]:
        """
        Get the current results of the survey.

        If in survey mode, merge the submitted results with the complete survey data.
        Otherwise, returns the survey_data dictionary directly.
        """
        if self._survey_mode:
            # Merge submitted results with complete data
            return self._merge_results_with_complete_data()
        return self.survey_data  # type: ignore[no-any-return]

    def _update_questions(
        self, questions: list[dict[str, Any]], complete_questions: list[dict[str, Any]]
    ) -> None:
        """
        Update questions in the complete data with submitted user responses.

        This helper method is extracted to reduce complexity of the merge function.
        """
        for question in questions:
            question_id = question.get("id")
            if not question_id:
                continue

            # Find matching question in complete data
            found_question = False
            for complete_question in complete_questions:
                if complete_question.get("id") == question_id:
                    found_question = True
                    # Copy all properties from the submitted question
                    # Make sure to preserve key properties like categoryTypes
                    category_types = complete_question.get("categoryTypes", {})

                    for key in question:
                        complete_question[key] = question[key]

                    # Restore categoryTypes if they were missing from the survey data
                    # This ensures that Performance/Enabler settings are not lost
                    if "categoryTypes" not in question and category_types:
                        complete_question["categoryTypes"] = category_types

                    break

            # If question not found in complete data, add it
            if not found_question:
                complete_questions.append(question.copy())

    def _merge_results_with_complete_data(self) -> dict[str, Any]:  # noqa: C901
        """
        Merge submitted results from JavaScript with the complete survey data.

        This ensures that sensitive or excluded data from the complete survey
        is included in the final results.
        """
        # Start with the complete data structure
        merged_data = self._complete_survey_data.copy()

        # Create a map of existing group IDs for faster lookup
        existing_group_ids = {
            group.get("id"): True
            for group in merged_data.get("groups", [])
            if group.get("id") is not None
        }

        # Update with any top-level fields that might have been modified by JS
        excluded_keys = {"groups", "categories"}
        for key in self.survey_data:
            if key not in excluded_keys:
                merged_data[key] = self.survey_data[key]

        # Update with values from the JavaScript side
        updated_groups = []
        for group in self.survey_data.get("groups", []):
            group_id = group.get("id")
            if not group_id:
                continue

            # Find matching group in complete data
            found_group = False
            for complete_group in merged_data.get("groups", []):
                if complete_group.get("id") == group_id:
                    found_group = True

                    # Update group properties that might have been modified
                    for key in group:
                        if key != "questions":
                            complete_group[key] = group[key]

                    # Update questions with user responses
                    self._update_questions(
                        group.get("questions", []), complete_group.get("questions", [])
                    )

                    # Add this group to our updated list
                    updated_groups.append(complete_group)
                    break

            # If group not found in complete data but has a valid ID, add it
            # Only add if it's not a default group or if it has questions
            if not found_group and group_id not in existing_group_ids:
                # Check if it looks like a default empty group
                is_default_empty = "Default Group" in group.get(
                    "title", ""
                ) and not group.get("questions", [])

                if not is_default_empty:
                    group_copy = group.copy()
                    updated_groups.append(group_copy)
                    merged_data["groups"].append(group_copy)

        # Process categories if present
        self._merge_categories(merged_data)

        return merged_data

    def _merge_categories(self, merged_data: dict[str, Any]) -> None:
        """
        Merge categories from JS data into the complete data.

        This helper method is extracted to reduce complexity of the merge function.
        """
        if "categories" not in self.survey_data:
            return

        # For categories that exist in both, update from JS
        js_category_ids = {
            cat.get("id"): cat
            for cat in self.survey_data.get("categories", [])
            if cat.get("id") is not None
        }

        # Update existing categories
        for i, cat in enumerate(merged_data.get("categories", [])):
            cat_id = cat.get("id")
            if cat_id in js_category_ids:
                merged_data["categories"][i] = js_category_ids[cat_id]

        # Add new categories that don't exist in backend
        complete_cat_ids = {
            cat.get("id")
            for cat in merged_data.get("categories", [])
            if cat.get("id") is not None
        }

        for cat in self.survey_data.get("categories", []):
            cat_id = cat.get("id")
            if cat_id and cat_id not in complete_cat_ids:
                if "categories" not in merged_data:
                    merged_data["categories"] = []
                merged_data["categories"].append(cat.copy())

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
                if self._survey_mode:
                    # When in survey mode, always use the complete data for saving
                    callback(self._complete_survey_data)
                else:
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
