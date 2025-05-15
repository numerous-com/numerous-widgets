"""Module providing a weighted assessment survey widget for the numerous library."""

import json
import uuid
from collections.abc import Callable
from pathlib import Path
from typing import Any, NotRequired, TypedDict, cast

import anywidget
import traitlets

from numerous.widgets.base.config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("WeightedAssessmentSurveyWidget")

# Define types for our survey structure


class ScoringRange(TypedDict):
    min: int
    max: int
    title: str
    text: str


class Question(TypedDict):
    id: str
    text: str
    value: int | None
    min: int
    max: int
    comment: str
    categoryWeights: dict[str, int]
    categoryTypes: dict[str, str]  # 'performance' | 'enabler'
    timestamps: dict[str, float]  # Using dict for created/modified
    doNotKnow: NotRequired[bool]
    antiText: NotRequired[str]
    helpText: NotRequired[str]  # Add helpText for question info/tooltip


class Category(TypedDict):
    id: str
    name: str
    description: str
    scoringRanges: list[ScoringRange]
    imageRef: NotRequired[str]


class Group(TypedDict):
    id: str
    title: str
    description: str
    questions: list[Question]
    scoringRanges: list[ScoringRange]


class SurveyData(TypedDict):
    title: str
    description: str
    groups: list[Group]
    categories: list[Category]
    useQualitativeScale: NotRequired[bool]
    conclusion: NotRequired[str]
    overallScoringRanges: NotRequired[list[ScoringRange]]
    submitted_utc_timestamp: NotRequired[float]
    submitted_local_timestamp_string: NotRequired[str]


# Keep aliases for compatibility if needed, but prefer TypedDicts
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
    survey_data: traitlets.Dict = traitlets.Dict().tag(sync=True)
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
        survey_data: SurveyData | None = None,
        edit_mode: bool = False,
        class_name: str = "",
        submit_text: str = "Submit",
        on_submit: Callable[[SurveyData], None] | None = None,
        on_save: Callable[[SurveyData], None] | None = None,
        disable_editing: bool = False,
        read_only: bool = False,
        survey_mode: bool = False,
    ) -> None:
        # Initialize widget
        super().__init__()

        # Process survey_data or create default
        if survey_data is None:
            survey_data_to_use = self._create_default_survey()
        else:
            # Create a base structure from the provided survey_data
            survey_data_to_use = {
                "title": survey_data.get("title", "Default Title"),
                "description": survey_data.get("description", ""),
                "groups": survey_data.get("groups", []),
                "categories": survey_data.get("categories", []),
                # Provide defaults for NotRequired fields
                "useQualitativeScale": survey_data.get("useQualitativeScale", False),
                "conclusion": survey_data.get("conclusion", ""),
                "overallScoringRanges": survey_data.get("overallScoringRanges", []),
            }

            # Only add timestamp fields if they have non-None values
            if survey_data.get("submitted_utc_timestamp") is not None:
                survey_data_to_use["submitted_utc_timestamp"] = survey_data[
                    "submitted_utc_timestamp"
                ]
            if survey_data.get("submitted_local_timestamp_string") is not None:
                survey_data_to_use["submitted_local_timestamp_string"] = survey_data[
                    "submitted_local_timestamp_string"
                ]

        # Explicitly cast to SurveyData to satisfy MyPy
        typed_survey_data = cast(SurveyData, survey_data_to_use)

        # Store the complete survey data privately
        self._complete_survey_data = typed_survey_data

        # Filter data for JS side if in survey mode
        if survey_mode and not edit_mode:
            filtered_data = self._filter_survey_data_for_js(typed_survey_data)
            self.survey_data = filtered_data
        else:
            self.survey_data = typed_survey_data

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

    def _filter_survey_data_for_js(self, survey_data: SurveyData) -> SurveyType:
        """
        Filter survey data for JS side in survey mode.

        This method creates a version of the survey data that only includes the
        essential information needed for displaying the survey, removing sensitive
        or unnecessary data.
        """
        survey_data_dict = cast(dict[str, Any], survey_data)

        filtered_data: SurveyType = {
            "title": survey_data_dict.get("title", ""),
            "description": survey_data_dict.get("description", ""),
            "groups": [],
        }

        # Include only necessary group and question information
        survey_groups = survey_data_dict.get("groups", [])
        if not isinstance(survey_groups, list):
            return filtered_data

        filtered_data_groups: list[GroupType] = []

        for group in survey_groups:
            if not isinstance(group, dict):
                continue

            filtered_group: GroupType = {
                "id": group.get("id", self._generate_id()),
                "title": group.get("title", ""),
                "description": group.get("description", ""),
                "questions": [],
            }

            # Include only necessary question fields
            group_questions = group.get("questions", [])
            if not isinstance(group_questions, list):
                continue

            filtered_group_questions: list[QuestionType] = []

            for question in group_questions:
                if not isinstance(question, dict):
                    continue

                filtered_question: QuestionType = {
                    "id": question.get("id", self._generate_id()),
                    "text": question.get("text", ""),
                    "comment": None,  # Initialize comment as None for proper clearing
                    "value": None,  # No value by default
                    "doNotKnow": question.get("doNotKnow", False),
                    "min": question.get("min", 0),  # Keep min/max for slider rendering
                    "max": question.get("max", 5),  # Keep min/max for slider rendering
                    # Excluded: antiText, categoryWeights, categoryTypes, timestamps
                }
                filtered_group_questions.append(filtered_question)

            filtered_group["questions"] = filtered_group_questions
            filtered_data_groups.append(filtered_group)

        filtered_data["groups"] = filtered_data_groups
        return filtered_data

    def _create_default_survey(self) -> SurveyData:
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
        # Always save the complete data (which is SurveyData implicitly)
        complete_data: SurveyData = self._complete_survey_data
        with Path(filepath).open("w", encoding="utf-8") as f:
            json.dump(complete_data, f, indent=2)

    def load_from_file(self, filepath: str) -> None:
        """Load survey data from a JSON file."""
        path = Path(filepath)
        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")

        with path.open(encoding="utf-8") as f:
            data: SurveyData = json.load(f)
            self._complete_survey_data = data

            # Update the survey_data based on mode
            if self._survey_mode and not self.edit_mode:
                self.survey_data = self._filter_survey_data_for_js(data)
            else:
                self.survey_data = data

    def get_results(self) -> SurveyData:
        """
        Get the current results of the survey.

        If in survey mode, merge the submitted results with the complete survey data.
        Otherwise, returns the survey_data dictionary directly.
        """
        if self._survey_mode:
            # Merge submitted results with complete data
            return self._merge_results_with_complete_data()
        # Cast survey_data to SurveyData
        return cast(SurveyData, self.survey_data)

    def _update_questions(
        self,
        questions: list[Question | QuestionType],
        complete_questions: list[Question | QuestionType],
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
                    # Cast to dict for key iteration
                    complete_question_dict = cast(dict[str, Any], complete_question)
                    question_dict = cast(dict[str, Any], question)
                    # Copy all properties from the submitted question
                    # Make sure to preserve key properties like categoryTypes
                    category_types = complete_question_dict.get("categoryTypes", {})

                    for key in question_dict:
                        complete_question_dict[key] = question_dict[key]

                    # Restore categoryTypes if they were missing from the survey data
                    # This ensures that Performance/Enabler settings are not lost
                    if "categoryTypes" not in question_dict and category_types:
                        complete_question_dict["categoryTypes"] = category_types

                    break

            # If question not found in complete data, add it
            if not found_question:
                complete_questions.append(question.copy())

    def _merge_results_with_complete_data(self) -> SurveyData:  # noqa: C901, PLR0912
        """
        Merge submitted results from JavaScript with the complete survey data.

        This ensures that sensitive or excluded data from the complete survey
        is included in the final results.
        """
        # Start with the complete data structure
        merged_data = self._complete_survey_data.copy()

        # Cast to dict[str, Any] to allow for dynamic key access
        merged_data_dict = cast(dict[str, Any], merged_data)
        survey_data_dict = cast(dict[str, Any], self.survey_data)

        # Create a map of existing group IDs for faster lookup
        existing_group_ids = {
            str(group.get("id", "")): True
            for group in merged_data.get("groups", [])
            if group.get("id") is not None
        }

        # Update with any top-level fields that might have been modified by JS
        excluded_keys = {"groups", "categories"}

        # Ensure survey_data_dict contains iterable keys
        if isinstance(survey_data_dict, dict):
            for key in survey_data_dict:
                if key not in excluded_keys:
                    merged_data_dict[key] = survey_data_dict[key]

        # Update with values from the JavaScript side
        updated_groups = []

        # Ensure groups exists and is iterable
        js_groups = (
            survey_data_dict.get("groups", [])
            if isinstance(survey_data_dict, dict)
            else []
        )

        for group in js_groups:
            if not isinstance(group, dict):
                continue

            group_id = group.get("id")
            if not group_id:
                continue

            # Find matching group in complete data
            found_group = False
            for complete_group in merged_data.get("groups", []):
                if not isinstance(complete_group, dict):
                    continue

                if complete_group.get("id") == group_id:
                    found_group = True
                    complete_group_dict = cast(dict[str, Any], complete_group)
                    group_dict = cast(dict[str, Any], group)

                    # Update group properties that might have been modified
                    for key in group_dict:
                        if key != "questions":
                            complete_group_dict[key] = group_dict[key]

                    # Update questions with user responses
                    group_questions = group_dict.get("questions", [])
                    complete_questions = complete_group_dict.get("questions", [])

                    if isinstance(group_questions, list) and isinstance(
                        complete_questions, list
                    ):
                        self._update_questions(
                            group_questions,
                            complete_questions,
                        )

                    # Add this group to our updated list
                    updated_groups.append(complete_group)
                    break

            # If group not found in complete data but has a valid ID, add it
            # Only add if it's not a default group or if it has questions
            if not found_group and str(group_id) not in existing_group_ids:
                # Check if it looks like a default empty group
                is_default_empty = "Default Group" in str(
                    group.get("title", "")
                ) and not group.get("questions", [])

                if not is_default_empty:
                    group_copy = cast(Group, group.copy())
                    updated_groups.append(group_copy)
                    # Ensure merged_data["groups"] exists
                    merged_data_dict["groups"] = merged_data_dict.get("groups", [])
                    merged_data_dict_groups = cast(
                        list[Group], merged_data_dict["groups"]
                    )
                    merged_data_dict_groups.append(group_copy)

        # Update merged_data["groups"] with the updated groups list
        merged_data_dict["groups"] = updated_groups

        # Process categories if present
        self._merge_categories(cast(SurveyData, merged_data_dict))

        # Return as a properly typed SurveyData
        return cast(SurveyData, merged_data_dict)

    def _merge_categories(self, merged_data: SurveyData) -> None:  # noqa: C901, PLR0912
        """
        Merge categories from JS data into the complete data.

        This helper method is extracted to reduce complexity of the merge function.
        """
        if "categories" not in self.survey_data:
            return

        survey_data_dict = cast(dict[str, Any], self.survey_data)
        merged_data_dict = cast(dict[str, Any], merged_data)

        # Ensure survey_data_dict has categories and it's a list
        survey_categories = survey_data_dict.get("categories", [])
        if not isinstance(survey_categories, list):
            return

        # For categories that exist in both, update from JS
        js_category_ids = {}
        for cat in survey_categories:
            if isinstance(cat, dict) and cat.get("id") is not None:
                js_category_ids[str(cat.get("id"))] = cat

        # Update existing categories
        merged_categories = merged_data_dict.get("categories", [])
        if not isinstance(merged_categories, list):
            return

        for i, cat in enumerate(merged_categories):
            if not isinstance(cat, dict):
                continue

            cat_id = cat.get("id")
            if cat_id and str(cat_id) in js_category_ids:
                merged_categories[i] = js_category_ids[str(cat_id)]

        # Add new categories that don't exist in backend
        complete_cat_ids = set()
        for cat in merged_categories:
            if isinstance(cat, dict) and cat.get("id") is not None:
                complete_cat_ids.add(str(cat.get("id")))

        for cat in survey_categories:
            if not isinstance(cat, dict):
                continue

            cat_id = cat.get("id")
            if cat_id and str(cat_id) not in complete_cat_ids:
                # Ensure merged_data_dict["categories"] exists
                if "categories" not in merged_data_dict:
                    merged_data_dict["categories"] = []

                if isinstance(merged_data_dict["categories"], list):
                    merged_data_dict["categories"].append(cat.copy())

    def on_submit(self, callback: Callable[[SurveyData], None]) -> None:
        """
        Register a callback function to be called when the survey is submitted.

        Args:
            callback: Function that takes the survey results as an argument

        """

        def handle_submit(change: dict[str, Any]) -> None:
            if change["new"]:
                callback(self.get_results())

        self.observe(handle_submit, names=["submitted"])

    def on_save(self, callback: Callable[[SurveyData], None]) -> None:
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
