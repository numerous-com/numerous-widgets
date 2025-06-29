# CHANGELOG



## v0.2.17 (2025-06-25)

### Fix

* fix(WeightedAssessmentSurvey): Remove redundant sorting of scoring ranges

- Eliminated unnecessary sorting of scoring ranges by minimum value in multiple locations within the WeightedAssessmentSurveyWidget, improving code clarity and performance. ([`578c505`](https://github.com/numerous-com/numerous-widgets/commit/578c505e4598a0e32ab660bb74fbdf05bb20b736))


## v0.2.16 (2025-06-12)

### Fix

* fix(WeightedAssessmentSurvey): Ensure doNotKnow is reset when setting question value

- Updated the logic to set `doNotKnow` to false whenever a value is assigned to a question, ensuring consistent behavior in the survey flow. ([`eb81288`](https://github.com/numerous-com/numerous-widgets/commit/eb812880a5280e14fdfafd7227d76675fd541670))


## v0.2.15 (2025-05-23)

### Fix

* fix(WeightedAssessmentSurvey): Add &#34;I do not know&#34; option

- Introduced a new prop `enable_do_not_know` to the WeightedAssessmentSurveyWidget for enabling the &#34;I do not know&#34; feature.
- Updated the SurveyData structure to include the new option.
- Enhanced the widget&#39;s functionality to conditionally render the &#34;I do not know&#34; checkbox based on the new prop. ([`ea77b12`](https://github.com/numerous-com/numerous-widgets/commit/ea77b125e0822b9d446f02012f8f94c6b05361a6))


## v0.2.14 (2025-05-19)

### Fix

* fix(WeightedAssessmentSurvey): Simplify slider handling and state management

- Removed unnecessary state tracking for slider drag values, streamlining the slider interaction process.
- Consolidated slider change handling into a single function for both change and click events.
- Updated progress bar rendering to enhance accessibility with ARIA attributes.
- Cleaned up mouse event handlers related to slider interactions, improving code clarity and maintainability. ([`250b037`](https://github.com/numerous-com/numerous-widgets/commit/250b037b8a994b909496114848dca88921ae216d))


## v0.2.13 (2025-05-15)

### Fix

* fix(WeightedAssessmentSurvey): Update help text tooltip implementation

- Changed the help text display from using the `title` attribute to a `data-title` attribute for better accessibility and consistency.
- Updated CSS to reflect the change in tooltip functionality, ensuring help text is displayed correctly on hover. ([`ffdb5d6`](https://github.com/numerous-com/numerous-widgets/commit/ffdb5d6f3d2987af5141cfb1f58a5e855dedfa91))


## v0.2.12 (2025-05-15)

### Fix

* fix(WeightedAssessmentSurvey): Improve slider drag handling and state management

- Added state management for tracking if the user is actively dragging the slider.
- Updated mouse event handlers to properly manage the slider drag state, ensuring the drag value is only cleared when not actively dragging.
- Enhanced touch event handling to maintain consistent behavior across devices. ([`2a5c8c5`](https://github.com/numerous-com/numerous-widgets/commit/2a5c8c509494005c34ca78dd558a002e2435021b))


## v0.2.11 (2025-05-15)

### Fix

* fix(WeightedAssessmentSurvey): Add help text functionality for questions

- Introduced an optional `helpText` field in the `Question` interface to provide additional information via tooltips.
- Implemented a help text editor in edit mode, allowing users to input help text for each question.
- Enhanced the UI to display a help icon next to question text, showing the help text on hover.
- Updated CSS for help text and icons to improve layout and user experience. ([`386b7d4`](https://github.com/numerous-com/numerous-widgets/commit/386b7d4a777aef23b84512ad0d5d4d203dcaeabd))


## v0.2.10 (2025-05-06)

### Fix

* fix(WeightedAssessmentSurvey): Simplify slider marker rendering and enhance styling

- Removed the qualitative scale logic and replaced it with a numeric scale displaying values from 0 to 5.
- Updated the rendering of slider markers to include text labels for &#34;Strongly Disagree&#34; and &#34;Strongly Agree&#34; at the respective ends.
- Enhanced CSS for slider markers to improve layout and responsiveness, including adjustments for text alignment and spacing.
- Cleaned up unused code related to qualitative labels and adjusted marker positioning for better visual clarity. ([`1f71abc`](https://github.com/numerous-com/numerous-widgets/commit/1f71abcee9dc0b256ad0f4ce781ca3e80003ad1b))


## v0.2.9 (2025-04-24)

### Fix

* fix(WeightedAssessmentSurvey): Temporarily hide &#34;I do not know&#34; checkbox in the UI

- Updated the rendering logic for the &#34;I do not know&#34; checkbox to be hidden for now, while retaining the comment for future reference.
- This change is made to streamline the user interface during the current development phase ([`2227cc3`](https://github.com/numerous-com/numerous-widgets/commit/2227cc302e6234b6a294987594bdf7e4b5013828))


## v0.2.8 (2025-04-14)

### Fix

* fix(WeightedAssessmentSurvey): Update timestamps handling and enhance survey data structure

- Changed the `timestamps` property in the `Question` interface to use string keys for better clarity.
- Added `submitted_utc_timestamp` and `submitted_local_timestamp_string` fields to the `SurveyData` interface for tracking submission times.
- Updated the `handleSubmit` and `generateRandomAnswers` functions to include timestamp management.
- Removed the button for editing category types from the UI while retaining the modal functionality.
- Ensured model changes are saved after submission in both the submit and random answer generation processes. ([`1d413a6`](https://github.com/numerous-com/numerous-widgets/commit/1d413a65b96c5d74d77631e5c6751c62321f4de9))


## v0.2.7 (2025-04-14)

### Fix

* fix(WeightedAssessmentSurvey): Add anti-text field for questions and update UI

- Introduced an optional `antiText` field in the question structure to capture additional context.
- Updated the survey widget to initialize and process the `antiText` field in both edit and display modes.
- Added a new input field for `antiText` in the UI, allowing users to enter relevant anti-question text.
- Enhanced styles for the new anti-text input to ensure consistency with existing UI elements. ([`46c2ac4`](https://github.com/numerous-com/numerous-widgets/commit/46c2ac433451e4d678ba7c0099585de0ff3b5163))


## v0.2.6 (2025-04-08)

### Fix

* fix(WeightedAssessmentSurvey): Enhance question answering logic to include &#34;Do Not Know&#34; responses

- Updated logic to count answered questions to include those marked as &#34;Do Not Know&#34;.
- Modified functions to check if all questions in a group are answered, considering &#34;Do Not Know&#34; as a valid response.
- Adjusted validation messages to reflect the inclusion of &#34;Do Not Know&#34; in unanswered question counts.
- Enhanced the `clearAllAnswers` function to reset &#34;Do Not Know&#34; flags along with question values and comments. ([`45e3c8c`](https://github.com/numerous-com/numerous-widgets/commit/45e3c8cfdbfb7af5eee30d598c1ab48c781c6891))


## v0.2.5 (2025-04-08)

### Fix

* fix(WeightedAssessmentSurvey): Enhance question management with category types and movement functionality

- Added support for categorizing questions as &#39;performance&#39; or &#39;enabler&#39; with a new `categoryTypes` property.
- Implemented functionality to move questions between groups and reorder them within the same group.
- Introduced a &#34;Do Not Know&#34; checkbox to allow users to indicate uncertainty in their responses.
- Enhanced the UI with a new Category Types Matrix for managing question-category associations.
- Updated styles for new buttons and dropdowns related to question movement and type selection.
- Improved data handling in the backend to ensure `categoryTypes` are preserved during updates. ([`785ba8b`](https://github.com/numerous-com/numerous-widgets/commit/785ba8bda23e69178f52da5149bcbe9b69423caa))


## v0.2.4 (2025-04-04)

### Fix

* fix(LoadSave): Simplify LoadSave component and integrate context for state management

- Refactored LoadSave and LoadSaveModal components to utilize context for state management, improving code organization and readability.
- Removed redundant props and state variables, streamlining the component&#39;s interface.
- Enhanced search functionality with a clear button for better user experience.
- Updated LoadSaveWidget to leverage the new context, simplifying its implementation.
- Adjusted styles for the new clear search button in LoadSave.scss. ([`16ca213`](https://github.com/numerous-com/numerous-widgets/commit/16ca213a8e86374ecfd273965ff1eb9fc683bf0d))

* fix(loadsave): Fixed issue with load save using selected_item_id for loading.

- Deleted the SaveLoad component from the UI, which managed item saving and loading functionalities.
- Removed related SCSS styles for the SaveLoad component to clean up the codebase.
- Updated LoadSaveWidget to incorporate new loading logic and state management.
- Enhanced the LoadSaveWidget to handle loading requests more effectively with new state variables. ([`fa75de2`](https://github.com/numerous-com/numerous-widgets/commit/fa75de2fab27e3bfe9aab3b25cfe3db66b6f902e))


## v0.2.3 (2025-03-28)

### Fix

* fix(WeightedAssessmentSurvey): Update comment handling and group initialization

- Modified the `clearAllAnswers` function to reset question comments to an empty string.
- Changed the default comment initialization from an empty string to `None` for proper clearing.
- Updated group initialization to start with an empty array instead of a default group structure.
- Enhanced group handling logic to prevent adding default empty groups during data merging. ([`146d777`](https://github.com/numerous-com/numerous-widgets/commit/146d777ef16912485e275400bb0a8f575d46a945))


## v0.2.2 (2025-03-28)

### Fix

* fix(WeightedAssessmentSurvey): Add secure survey mode with data filtering

- Introduced a new `survey_mode` option to limit data sent to JavaScript, enhancing security.
- Implemented `_filter_survey_data_for_js` method to filter sensitive information from survey data.
- Updated `toggle_edit_mode` to manage data visibility based on the survey mode.
- Ensured complete survey data is saved and loaded correctly, regardless of the mode.
- Enhanced `get_results` method to merge submitted results with complete data in survey mode. ([`6761163`](https://github.com/numerous-com/numerous-widgets/commit/6761163cff561370e356b5f41605c8d14d0e63e4))


## v0.2.1 (2025-03-27)

### Fix

* fix(tests): Enhance testing setup and add linting for TypeScript and React

- Introduced ESLint configuration for TypeScript and React to enforce coding standards.
- Added pre-commit hooks for TypeScript linting and Jest testing to ensure code quality.
- Created setupTests.ts for Jest to include testing-library/jest-dom for improved testing capabilities.
- Added mock files for CSS imports and @anywidget/react to facilitate testing.
- Updated package.json and package-lock.json with necessary dependencies for testing and linting.
- Refactored components to improve code quality and maintainability. ([`b1a18c3`](https://github.com/numerous-com/numerous-widgets/commit/b1a18c36738da2f6fd19b727230eaa14812332d6))


## v0.2.0 (2025-03-27)

### Feature

* feat(SaveLoadWidget): Introduce Save &amp; Load widget for item management

- Added SaveLoadWidget component to manage a list of items with functionalities for saving, loading, and creating new items.
- Implemented search functionality to filter items based on user input.
- Enhanced user interface with confirmation dialogs for critical actions and visual indicators for unsaved changes.
- Updated documentation and examples to demonstrate the usage of the new widget.
- Integrated the SaveLoad widget into the existing application structure for seamless user experience. ([`39fa213`](https://github.com/numerous-com/numerous-widgets/commit/39fa213e2c863b9fd4d102234e658d9e7e54b352))

### Fix

* fix(TimelineChart): Introduce TimelineChart widget for hourly data visualization

- Added TimelineChart component to visualize data over time with hourly resolution.
- Implemented functionality to manage multiple channels and data blocks.
- Supported two view modes: channel mode for individual channels and rendered mode for combined data.
- Included example demonstrating the usage of the TimelineChart widget with simulated weather data.
- Enhanced styles for the TimelineChart and its components for better user experience.
- Integrated saving and loading functionality for timeline data using HDF5 and JSON formats. ([`217b741`](https://github.com/numerous-com/numerous-widgets/commit/217b741defe69d5016df7b3bcdcfb2e579a2ed52))


## v0.1.61 (2025-03-26)

### Fix

* fix(LoadSaveWidget): Reset modified state on successful save and reset actions

- Added logic to reset the modified state to false when a save or reset action is successful.
- Improved state management for the LoadSaveWidget to ensure accurate tracking of modifications. ([`da600ff`](https://github.com/numerous-com/numerous-widgets/commit/da600ff193b89a75bb341a983319601a28f09a0b))

* fix(Table): Implement column filtering functionality

- Added a FilterDropdown component for filtering table data by column values.
- Enhanced the Table component to support filtering with state management for column filters.
- Updated TableWidget to include filtering configuration for columns.
- Improved styles for filter buttons and dropdowns in the table header. ([`59da7a1`](https://github.com/numerous-com/numerous-widgets/commit/59da7a1dfe36c773c4c36e68de85d0ebb003dd03))

### Unknown

* Fix(LoadSaveWidget): Introduce LoadSave functionality for managing configurations

- Added LoadSaveWidget component for loading, saving, and managing configurations.
- Implemented LoadSaveManager protocol to define item management methods.
- Integrated LoadSave functionality into the example application for demonstration.
- Updated styles for the LoadSave component and its dialogs.
- Enhanced documentation for the LoadSaveWidget usage. ([`81f09d7`](https://github.com/numerous-com/numerous-widgets/commit/81f09d7d143e720b1b29ed273f0c0a96d4239986))


## v0.1.60 (2025-03-25)

### Fix

* fix(WeightedAssessmentSurvey): Adjust padding for survey layout

- Increased top padding from 3rem to 4rem for improved spacing in the survey component ([`8a3067c`](https://github.com/numerous-com/numerous-widgets/commit/8a3067c68814371394b2522254ae2c3be9a133f7))


## v0.1.59 (2025-03-25)

### Fix

* fix(WeightedAssessmentSurvey): Hide &#34;agree&#34; and &#34;disagree&#34; options in survey

- Added styles to hide the &#34;agree&#34; and &#34;disagree&#34; labels and their tick marks in the survey component
- Ensured consistent hiding of these elements across different states ([`4841129`](https://github.com/numerous-com/numerous-widgets/commit/48411291b2c95569864f0137eabb4496ec50bf1d))


## v0.1.58 (2025-03-14)

### Fix

* fix(DOMElementMapWidget): Add JavaScript evaluation and value setting functionality

- Introduced new state management for JavaScript code evaluation and results
- Implemented methods to set values on DOM elements from Python
- Enhanced the DOMElementMap class with new traits for JavaScript evaluation and value setting
- Updated widget configuration to include ToastWidget and relevant styles ([`9c03cde`](https://github.com/numerous-com/numerous-widgets/commit/9c03cde0ab54540b69f4f72e2cd5e572aa30c5bb))


## v0.1.57 (2025-03-14)

### Fix

* fix(WeightedAssessmentSurvey): Enhance checkbox and comment styling

- Added custom styles for checkboxes, including hover and focus states
- Improved comment container and textarea styles for better responsiveness
- Adjusted z-index for slider components to ensure proper layering ([`4123b8d`](https://github.com/numerous-com/numerous-widgets/commit/4123b8dbc4db77606dd48e45abd670ef4b796882))


## v0.1.56 (2025-03-13)

### Fix

* fix(WeightedAssessmentSurvey): Introduce overall scoring ranges functionality

- Added support for overall scoring ranges in the survey data model
- Implemented functions to add, update, and delete scoring ranges
- Enhanced UI to manage scoring ranges with validation for gaps and overlaps
- Updated state management to initialize and render overall scoring ranges ([`68929b4`](https://github.com/numerous-com/numerous-widgets/commit/68929b45cf0f3bceb1ad8c7c3f0ae1cddaf2f8f9))


## v0.1.55 (2025-03-13)

### Fix

* fix(WeightedAssessmentSurvey): Enhance validation logic for edit mode

- Updated validation checks to skip when in edit mode
- Added user feedback for unanswered questions when not in edit mode
- Improved button disable logic based on question completion status ([`5a0c5eb`](https://github.com/numerous-com/numerous-widgets/commit/5a0c5ebd8f89721f1f0be5edfacc9c3df827347c))


## v0.1.54 (2025-03-13)

### Fix

* fix(WeightedAssessmentSurvey): Refactor scroll behavior on group navigation

- Removed direct scroll-to-top logic from group navigation functions
- Added a useEffect hook to handle scrolling when currentGroupIndex changes
- Improved user experience by ensuring smooth scrolling after DOM updates ([`d0dea5c`](https://github.com/numerous-com/numerous-widgets/commit/d0dea5c7fb15b3c39f9d805ffe1aa52b57640217))


## v0.1.53 (2025-03-12)

### Fix

* fix(WeightedAssessmentSurvey): Update category icon handling to image references

- Replaced SVG icon handling with image file references for categories
- Updated UI components to support image previews and loading states
- Enhanced styling for image input and preview sections
- Improved dark mode handling for image visibility ([`a163a8b`](https://github.com/numerous-com/numerous-widgets/commit/a163a8b4e3bf05f483fe61c5ce75e454d0b265bd))


## v0.1.52 (2025-03-12)

### Fix

* fix(WeightedAssessmentSurvey): Scroll to top on group navigation

- Added functionality to scroll to the top of the survey content when moving to the next group
- Improved user experience by ensuring visibility of the new group content ([`dc9417d`](https://github.com/numerous-com/numerous-widgets/commit/dc9417da5e7670d8ff8447404f30d805b87f3b88))


## v0.1.51 (2025-03-12)

### Fix

* fix(WeightedAssessmentSurvey): Add advanced slider interactions and validation

- Implemented dynamic slider preview and drag handling
- Added validation messages for unanswered questions
- Enhanced slider UI with hover and interaction states
- Added category icon editor with preview and background toggle
- Improved comment editing with cursor position preservation
- Implemented more robust navigation and submission logic ([`5a912e7`](https://github.com/numerous-com/numerous-widgets/commit/5a912e74eebd8f2c288f3f9d9a1237e6beab78a6))


## v0.1.50 (2025-03-11)

### Fix

* fix(URLParamsWidget): Modify query params update logic and add debug logging

- Commented out query params equality check to always update
- Added additional debug logging for change tracking
- Improved visibility of state update process ([`31e6e7d`](https://github.com/numerous-com/numerous-widgets/commit/31e6e7daa48e989a084093e849a43de8387dccde))


## v0.1.49 (2025-03-10)

### Fix

* fix(WeightedAssessmentSurvey): Extract Markdown rendering to separate component

- Moved MarkdownRender component to a new file
- Replaced direct ReactMarkdown usage with SimpleMarkdownRender
- Simplified imports and reduced complexity in WeightedAssessmentSurveyWidget
- Improved code modularity by separating rendering concerns ([`1208cad`](https://github.com/numerous-com/numerous-widgets/commit/1208cadf9baeff3a1d325c65fee767d3700c8923))


## v0.1.48 (2025-03-10)

### Fix

* fix(WeightedAssessmentSurvey): Refine weights modal scrolling and layout styles

- Simplified scrollbar and overflow handling for weights modal
- Cleaned up redundant CSS rules for matrix table
- Improved scrolling behavior and layout consistency
- Removed duplicate styling for sticky headers and columns ([`496cae7`](https://github.com/numerous-com/numerous-widgets/commit/496cae71f841c3721e0a98c3be705f8e469c46fa))


## v0.1.47 (2025-03-10)

### Fix

* fix(WeightedAssessmentSurvey): Implement full-screen weights matrix with enhanced UI and interaction

- Replaced inline weights matrix with full-screen modal
- Added new modal overlay with close button and header
- Improved matrix column styling and sticky behavior
- Enhanced scrollbar and layout for better usability
- Updated edit weights button to open full-screen matrix
- Refined column headers and sticky column implementations ([`175b1c1`](https://github.com/numerous-com/numerous-widgets/commit/175b1c1f0a1f3d7291a79617e5c283219a22931a))


## v0.1.46 (2025-03-09)

### Fix

* fix(WeightedAssessmentSurvey): Enhance weights matrix with inline editing and improved navigation

- Replaced modal-based weights matrix with inline editing
- Added custom tab key navigation for matrix inputs
- Implemented scroll position preservation during matrix interactions
- Improved matrix UI with sticky headers and columns
- Added utility functions for finding question group and index
- Enhanced matrix input handling and state management ([`4d8c851`](https://github.com/numerous-com/numerous-widgets/commit/4d8c851c1454132c994c93b171e010b38ecca373))


## v0.1.45 (2025-03-06)

### Fix

* fix(spelling): Fix spelling of url widget ([`05c3266`](https://github.com/numerous-com/numerous-widgets/commit/05c3266ddf77b31893729d5a7f5b2a82ff263edf))

* fix(url_params): Add URLParams widget to project ([`6ba6dfb`](https://github.com/numerous-com/numerous-widgets/commit/6ba6dfb8cdb22370516d506ff6280f6edc3de34b))


## v0.1.44 (2025-03-06)

### Fix

* fix(lint): fix linting ([`744bf8f`](https://github.com/numerous-com/numerous-widgets/commit/744bf8f01f7709318cb277cc1d8b9d798f5ecafa))

* fix(widget): Add advanced features to WeightedAssessmentSurvey

- Implemented Markdown rendering for descriptions and questions
- Added qualitative scale option for slider inputs
- Introduced weights matrix for category and question weighting
- Added scoring ranges for groups and categories
- Implemented JSON import/export functionality
- Added random answer generation and clear answers features
- Enhanced UI with modal-based weights editing
- Improved overall component flexibility and user experience ([`6b97117`](https://github.com/numerous-com/numerous-widgets/commit/6b971178ca52e13849e8671dd427f9945ff59a88))


## v0.1.43 (2025-03-03)

### Fix

* fix(widget): Add undo changes functionality to WeightedAssessmentSurvey

- Implemented undo changes feature with original data preservation
- Added new state for tracking original survey data
- Created handleEditMode and handleUndoChanges methods
- Updated footer buttons to include undo button
- Styled undo button with red color scheme
- Improved edit mode workflow with data restoration ([`ea33b69`](https://github.com/numerous-com/numerous-widgets/commit/ea33b69c87adf2c2b57f5858a281ed6757540803))


## v0.1.42 (2025-03-03)

### Fix

* fix(widget): Remove fixed height constraints on survey container

- Removed fixed height and max-height properties from survey container
- Allows more flexible layout and responsive sizing
- Improves adaptability across different screen sizes ([`4a084a9`](https://github.com/numerous-com/numerous-widgets/commit/4a084a95fff6f0946a61d0a0b3d6235b73668916))


## v0.1.41 (2025-03-03)

### Fix

* fix(widget): Simplify survey navigation and remove final slide

- Removed final slide state and logic
- Replaced progress dots with a progress bar
- Simplified navigation flow by submitting survey on last group
- Updated styling to improve layout and responsiveness
- Removed redundant navigation controls ([`bcb24dc`](https://github.com/numerous-com/numerous-widgets/commit/bcb24dccecd5d39fae5619a187dd9811f44ae24c))


## v0.1.40 (2025-03-02)

### Fix

* fix(widget): Refactor survey navigation layout and positioning

- Moved survey navigation controls to the top of the component
- Removed duplicate navigation section at the bottom of the widget
- Maintained existing navigation functionality and styling ([`3b9f0d4`](https://github.com/numerous-com/numerous-widgets/commit/3b9f0d474dc17e981a55d1e0d8e8a7a3ca184ffb))


## v0.1.39 (2025-03-02)

### Fix

* fix(widget): Enhance WeightedAssessmentSurvey with intro and final slides

- Added intro and final slide states to improve survey navigation
- Implemented dynamic progress dots to reflect survey stages
- Updated navigation controls to handle intro and final slides
- Improved responsive design and layout for better user experience
- Added completion and submission confirmation screens ([`4df322b`](https://github.com/numerous-com/numerous-widgets/commit/4df322b2a32980015255ba64af97efd9591238be))


## v0.1.38 (2025-03-01)

### Fix

* fix(widgets): Missing widget ending ([`02daf29`](https://github.com/numerous-com/numerous-widgets/commit/02daf29f64af9c452438a41a7e5418adef29881f))

* fix(widgets): Add WeightedAssessmentSurvey to widget configuration ([`7c23998`](https://github.com/numerous-com/numerous-widgets/commit/7c239987cf7ce91eb56a9c237f2b688886cfe18d))


## v0.1.37 (2025-03-01)

### Fix

* fix(widgets): Add Weighted Assessment Survey widget

- Imported WeightedAssessmentSurvey widget in Marimo app example
- Added corresponding SCSS import for WeightedAssessmentSurvey component
- Demonstrated basic widget usage with submit event handler ([`0ee2f2b`](https://github.com/numerous-com/numerous-widgets/commit/0ee2f2b926a7e99eb8573d1dcb65e7a97ff44988))


## v0.1.36 (2025-02-25)

### Fix

* fix(task): Improve subprocess process group and termination handling

- Added process group creation for better subprocess management on Unix-like systems
- Enhanced subprocess termination with more robust kill and signal handling
- Implemented graceful process group termination with fallback for non-Unix systems
- Added error handling for process termination edge cases ([`8799f70`](https://github.com/numerous-com/numerous-widgets/commit/8799f706b9bfea0a772211e210ef8a881dc044c9))


## v0.1.35 (2025-02-25)

### Fix

* fix(ci): Include built widgets ([`72bfe84`](https://github.com/numerous-com/numerous-widgets/commit/72bfe84ead84e3104f35346d7f558108015782df))


## v0.1.34 (2025-02-25)

### Fix

* fix(static): Remove static widget files from repository

Cleaned up numerous widget static files by removing compiled JavaScript modules and CSS files. This includes removing generated files for various widgets such as AccordionWidget, ButtonWidget, ChartWidget, and others. ([`437a7d7`](https://github.com/numerous-com/numerous-widgets/commit/437a7d7c83c23ed822b37c9dcda112308cc80e42))


## v0.1.33 (2025-02-24)

### Fix

* fix(task): Improve subprocess command handling

- Removed unnecessary list to string conversion for subprocess commands
- Added security warning for shell commands with string inputs ([`a8424b3`](https://github.com/numerous-com/numerous-widgets/commit/a8424b3592eb22a1580879ce6390f492e85506eb))


## v0.1.32 (2025-02-24)

### Fix

* fix(task): Improve task widget state management and synchronization

- Added reset flag and stopped state to TaskWidget
- Enhanced task state handling in base Task class
- Updated ProcessTask synchronization and control methods
- Implemented more robust state transitions and event handling
- Improved process task lifecycle management ([`59d93c1`](https://github.com/numerous-com/numerous-widgets/commit/59d93c1aceecce7b939a5d53a5207e12265ffbd4))


## v0.1.31 (2025-02-18)

### Fix

* fix(styles): Enhance chat message and radio button styling

- Improved chat message design with speech/thought bubble effects
- Added drop shadow and refined padding for chat messages
- Updated thinking indicator styling with background and rounded corners
- Enhanced radio button layout with flexible display options
- Implemented inline and content-fitting radio button group styles ([`66a3cad`](https://github.com/numerous-com/numerous-widgets/commit/66a3cad2f4aa8c44f1ff386c86fb983fa85c789e))


## v0.1.30 (2025-02-18)

### Fix

* fix(widgets): Enhance RadioButtons with layout and styling options

- Added `fitToContent` and `labelInline` props to RadioButtons component
- Updated RadioButtonsWidget to support new layout configuration
- Improved CSS styles for more flexible radio button group layouts
- Implemented inline and content-fitting display options ([`31bf491`](https://github.com/numerous-com/numerous-widgets/commit/31bf491e735033b9f75c31afc69fb3570009508a))


## v0.1.29 (2025-02-05)

### Fix

* fix(widgets): Add strict validation and improved input handling for NumberInput

- Introduced `strictValidation` prop to NumberInput for more controlled input
- Implemented local value state to improve input editing experience
- Added input validation and coercion on blur and key events
- Updated NumberWidget and Number base class to support new prop
- Enhanced input handling with step coercion and value clamping ([`1ffb8c7`](https://github.com/numerous-com/numerous-widgets/commit/1ffb8c748f8f23095db9320b703881ca7a4049a3))


## v0.1.28 (2025-02-04)

### Fix

* fix(widgets): Include styles ([`c5a68f8`](https://github.com/numerous-com/numerous-widgets/commit/c5a68f85ba924ede62cc6068e5e63324482999b5))


## v0.1.27 (2025-02-04)

### Fix

* fix(widgets): Add DOMElementMap widget and enhance Button component

- Introduced DOMElementMap widget to the widget configuration
- Extended Button component with new props: className, icon, variant, and fitToContent
- Updated ButtonWidget to support new Button component features
- Refactored CSS styles to improve button and container flexibility
- Added support for inline and fit-to-content layouts across multiple widgets ([`c2ae60b`](https://github.com/numerous-com/numerous-widgets/commit/c2ae60b3f697816f3e79a149e58bd7c041dce84b))


## v0.1.26 (2025-01-30)

### Fix

* fix(task): Add support for additional keyword arguments in process task control

- Extended `process_task_control` function to accept arbitrary keyword arguments
- Passed additional kwargs to the TaskWidget for increased flexibility
- Updated function docstring to reflect the new parameter support ([`9561d35`](https://github.com/numerous-com/numerous-widgets/commit/9561d35ef29ca1902c0f08429a17948db93b21fe))


## v0.1.25 (2025-01-29)

### Fix

* fix(ui): Improve chart, map, and dropdown components with enhanced styling and functionality

- Updated Chart component with default options and responsive settings
- Modified MapSelector to handle coordinate order and improve map interactions
- Refactored DropDown component with improved styling and focus states
- Removed unnecessary props from Chat component
- Updated global Chart.js defaults and font settings
- Adjusted CSS variables and styles for better visual consistency
- Improved table and chart container styling ([`30ca5ba`](https://github.com/numerous-com/numerous-widgets/commit/30ca5bab738c3da539bfb3713890088fb5e35c45))


## v0.1.24 (2025-01-23)

### Fix

* fix(chat): Enhance Chat component with thinking states and styling

- Added `thinkingStates` prop to the Chat component to manage user thinking indicators.
- Implemented a new function `getLastMessageByType` to retrieve the last message of a specific type.
- Updated ChatWidget to pass `thinkingStates` from the model state.
- Refactored CSS styles to improve the layout and appearance of chat messages and thinking indicators.
- Introduced a new method `set_thinking` in the backend to manage thinking states for different user types.

These changes collectively enhance the interactivity and user experience of the chat interface. ([`63ee8c5`](https://github.com/numerous-com/numerous-widgets/commit/63ee8c5a4f0ab642ded7810fa0d9efacf6dcb030))


## v0.1.23 (2025-01-23)

### Fix

* fix(tabs): Added function to generate tabs_hidden variables ([`6973fc0`](https://github.com/numerous-com/numerous-widgets/commit/6973fc0109daf8c08af002733f05bdcce4407ab0))

* fix(state): Add widgets property to StateModel for enhanced widget access

- Introduced a new property `widgets` in the StateModel class to retrieve the widgets associated with the model.
- This property returns a dictionary of widgets, improving the accessibility of widget information within the model. ([`c7ee38d`](https://github.com/numerous-com/numerous-widgets/commit/c7ee38db90f010474d1715fa01a61054fc6403a2))


## v0.1.22 (2025-01-22)

### Fix

* fix(ui): Enhance ProgressBar and Slider components with new props

- Added `fitToContent` and `labelInline` props to ProgressBar and Slider components, improving layout flexibility and user experience.
- Updated corresponding widget components (ProgressBarWidget and SliderWidget) to utilize the new props for better rendering options.
- Refactored CSS styles to support the new props, enhancing visual consistency and responsiveness across the UI components.

These changes collectively improve the interactivity and presentation of the numerous widgets. ([`d9ad153`](https://github.com/numerous-com/numerous-widgets/commit/d9ad153580ef6c968bfc681dfbaab199a83486aa))


## v0.1.21 (2025-01-22)

### Fix

* fix(ui): Enhance widget components with new props and styling

- Added `fitToContent` and `labelInline` props to various widgets, including CheckBox, DropDown, and NumberInput, improving layout flexibility and user experience.
- Introduced new `inline_label_checkbox` and `fit_to_content_checkbox` in the app to control widget display options dynamically.
- Updated the CSS styles for better responsiveness and visual consistency across all widgets.
- Refactored existing components to utilize the new props, enhancing their functionality and usability.

These changes collectively improve the interactivity and presentation of the numerous widgets. ([`43b8df9`](https://github.com/numerous-com/numerous-widgets/commit/43b8df9e649e8b85f5a0086a483f9056a8d018f9))

* fix(NumberInput): Add new props for enhanced functionality and styling

- Introduced `fitToContent`, `labelInline`, and `unit` props to the NumberInput component for improved layout and usability.
- Updated the NumberInputWidget to utilize the new props, allowing for more flexible rendering options.
- Refactored CSS styles to support the new props, enhancing the visual consistency and responsiveness of the input component.

These changes collectively enhance the NumberInput component&#39;s functionality and user experience. ([`5d51cd0`](https://github.com/numerous-com/numerous-widgets/commit/5d51cd0721a661498bab35f630c974320287b07b))


## v0.1.20 (2025-01-21)

### Fix

* fix(dropdown): fix issues with z-index too high ([`05a9321`](https://github.com/numerous-com/numerous-widgets/commit/05a932137447b32dd66475791511989ce39e0b12))

* fix(ui): Enhance StringInput and introduce ToggleButton widget

- Updated StringInput component to include new props: `isValid`, `validationMessage`, and `labelInline`, improving validation handling and layout options.
- Refactored validation logic to utilize a callback for custom validation, enhancing flexibility.
- Introduced a new ToggleButton widget for better user interaction, complete with icon support and state management.
- Updated CSS styles for improved layout and visual consistency across components.

These changes collectively enhance the functionality and usability of the numerous widgets. ([`de23add`](https://github.com/numerous-com/numerous-widgets/commit/de23add8a5f10941566e59f36ee916e610e88490))


## v0.1.19 (2025-01-19)

### Fix

* fix(release): Update artifact paths in release workflow

- Changed the artifact paths in the GitHub Actions release workflow to reflect the new directory structure for the widgets, ensuring that all relevant static files are correctly uploaded and downloaded.
- This adjustment enhances the reliability of the release process by maintaining consistency in file locations.

These changes contribute to a more efficient and organized release workflow for the numerous widgets. ([`7ebe264`](https://github.com/numerous-com/numerous-widgets/commit/7ebe26482212deb9aa2e56e1f9ffb8d56ab58915))

* fix(release): Update artifact path in release workflow

- Changed the artifact path in the GitHub Actions release workflow to include all static files from the widgets directory, improving the artifact upload process.
- This adjustment ensures that all relevant files are included in the release, enhancing the deployment efficiency.

These changes contribute to a more streamlined release process for the widget components. ([`83bf4e2`](https://github.com/numerous-com/numerous-widgets/commit/83bf4e2142d52c13ce12b569f4054cce499aca9f))

* fix(release): Update release workflow and enhance widget components

- Modified the GitHub Actions workflow to download multiple artifacts, improving the release process.
- Removed unnecessary console logs from the HTMLTemplateWidget for cleaner code.
- Refactored the MarkdownDrawerWidget to improve accessibility and user experience.
- Updated the TreeBrowserWidget to support drag-and-drop functionality and inline label editing, enhancing interactivity.
- Improved CSS styles across components for better visual consistency.

These changes collectively enhance the functionality and usability of the numerous widgets. ([`6841579`](https://github.com/numerous-com/numerous-widgets/commit/6841579764b4b65153491619455e835fb3f9f2e2))


## v0.1.18 (2025-01-18)

### Fix

* fix(mark-down-drawer): Enhance MarkdownDrawer component with new features and styling

- Added `lucide-react` dependency for icon support in the MarkdownDrawer.
- Implemented click outside functionality to close the drawer when it is open.
- Refactored the drawer toggle button to include an icon and improve accessibility.
- Updated CSS styles for the MarkdownDrawer to enhance positioning and appearance.
- Modified the Python backend to dedent content before rendering, improving formatting.

These changes improve the user experience and visual appeal of the MarkdownDrawer component. ([`d259173`](https://github.com/numerous-com/numerous-widgets/commit/d259173ab566f8ef35920a377f74772d035d21a5))


## v0.1.17 (2025-01-17)

### Fix

* fix(config): Enhance CSS handling and export functionality

- Added support for custom CSS file path through the environment variable `NUMEROUS_WIDGETS_CSS`, allowing users to specify their own styles.
- Implemented logic to load custom CSS if provided; otherwise, defaults to the built-in styles.
- Introduced a new function `export_default_css` to export the default CSS to a specified file or return it as a string, improving usability for developers.
- Updated `mkdocs.yml` to include a new section for styling documentation.

These changes improve the flexibility and usability of the widget&#39;s styling options. ([`59ce7a2`](https://github.com/numerous-com/numerous-widgets/commit/59ce7a260a90d1cd94dde2a270070c0328e68418))


## v0.1.16 (2025-01-17)

### Fix

* fix(tree): Add drag-and-drop functionality to TreeBrowser component

- Introduced drag-and-drop capabilities for reordering tree nodes within the TreeBrowser component.
- Added new props `move_update` and `onMoveUpdate` to handle item movement and communicate updates to the backend.
- Implemented visual indicators for valid drop targets and positions (above, below, child) during drag operations.
- Enhanced the TreeBrowserWidget to manage move updates and maintain state consistency.
- Updated CSS styles to support drag-and-drop interactions and improve user experience.

These changes significantly enhance the interactivity and usability of the TreeBrowser, allowing users to easily rearrange nodes. ([`7307c0c`](https://github.com/numerous-com/numerous-widgets/commit/7307c0c70b6ea2f64c62c93deab6b60b22dad741))


## v0.1.15 (2025-01-17)

### Fix

* fix(tree): Implement label editing functionality in TreeBrowser component

- Added support for inline label editing in the TreeBrowser component, allowing users to double-click on a node to edit its label.
- Introduced new props `label_update` and `onLabelUpdate` to manage label changes and communicate updates to the backend.
- Enhanced the TreeBrowserWidget to handle label updates and maintain state consistency.
- Updated CSS styles for the editing input field to improve user experience.

These changes enhance the interactivity of the TreeBrowser, providing a more intuitive way for users to modify node labels. ([`ac47007`](https://github.com/numerous-com/numerous-widgets/commit/ac47007ad24649b166be1d6443eff54467f9ea0d))


## v0.1.14 (2025-01-16)

### Fix

* fix(widget): Remove console logging and refine environment variable handling

- Replaced console logging in HTMLTemplateWidget with a no-operation function to reduce noise during state updates.
- Updated the configuration in base/config.py to only set IS_DEV to True when WIDGET_ENV is explicitly set to &#34;development&#34;, improving clarity in environment management.

These changes enhance performance and maintainability of the widget components. ([`e0d4821`](https://github.com/numerous-com/numerous-widgets/commit/e0d482103c98d607199afaf6bc9115e44f863278))


## v0.1.13 (2025-01-16)

### Fix

* fix(tree): Correct variable reference in TreeBrowser serialization

- Updated the variable reference from &#39;id&#39; to &#39;_id&#39; in the TreeBrowser class to ensure accurate serialization of tree items.
- This change improves the integrity of the serialized data structure used in the widget. ([`8902e21`](https://github.com/numerous-com/numerous-widgets/commit/8902e21963ca8661235e0c31801e50464d435021))


## v0.1.12 (2025-01-16)

### Fix

* fix(widgets): Update widget configuration and enhance styling

- Replaced hardcoded widget names in build scripts with dynamic loading from a configuration file (widget-config.json) for better maintainability.
- Added new styles for tree browser components, including hover and disabled states, to improve user experience.
- Introduced a new HTML template widget for rendering dynamic content with variables.
- Updated various widgets to utilize the new tree structure and improved styling.
- Enhanced task widget to display more log entries and updated timestamp formatting to 24-hour format.

These changes streamline widget management and enhance the overall UI consistency. ([`2a46535`](https://github.com/numerous-com/numerous-widgets/commit/2a46535e25aa481cac729deb608afd5af6ff7b2b))


## v0.1.11 (2024-12-28)

### Fix

* fix(widgets): Do not refer to ModalWIdget ([`3ce852a`](https://github.com/numerous-com/numerous-widgets/commit/3ce852af8fc2dc72da5735452d23dad83a796c02))


## v0.1.10 (2024-12-23)

### Fix

* fix(docs): Enhance documentation and configuration for numerous widgets

- Updated mkdocs.yml to include new Templating section and improved theme settings with color scheme toggles.
- Added new dependencies for mkdocs-material, mkdocs-gen-files, mkdocs-section-index, and mkdocs-literate-nav in pyproject.toml.
- Expanded process_task.md, state_model.md, and widgets.md to include new widget documentation with show_root_heading options.
- Modified render_template function in templating module to accept AnyWidget for keyword arguments.

These changes improve the overall documentation structure and enhance the user experience with better theming and widget integration. ([`98a6af1`](https://github.com/numerous-com/numerous-widgets/commit/98a6af15526d183243b70d8d05d61ae4ec80743e))


## v0.1.9 (2024-12-23)

### Fix

* fix(TaskModal): Update timestamp formatting to 24-hour format and enhance warning type handling ([`db08ea0`](https://github.com/numerous-com/numerous-widgets/commit/db08ea020f8c5a112e532a98d4bef5a6389760fe))


## v0.1.8 (2024-12-23)

### Fix

* fix(Task): Enhance log display, improve code readability, and update task handling logic ([`853184e`](https://github.com/numerous-com/numerous-widgets/commit/853184e5a67722b10daf766d270f19d5f24326b9))


## v0.1.7 (2024-12-23)

### Fix

* fix(chat): Rename &#39;msg_type&#39; to &#39;type&#39; in message structure; update add_message method and related usage ([`6685cfd`](https://github.com/numerous-com/numerous-widgets/commit/6685cfd871e94dcaddc43a0906e8e12284161223))


## v0.1.6 (2024-12-23)

### Fix

* fix(widgets): Disable mypy ([`7890758`](https://github.com/numerous-com/numerous-widgets/commit/789075823b14dd2ee081d4ad0ca2b5d539e979f0))

* fix(widgets): add check to ruff cmd ([`4d22d83`](https://github.com/numerous-com/numerous-widgets/commit/4d22d83680cbcfee5750aba06d120dabf761b672))

* fix(widgets): Enable linting on github ([`5a0bd64`](https://github.com/numerous-com/numerous-widgets/commit/5a0bd6408632dbdd759747414be2ca1287393a3a))


## v0.1.5 (2024-12-22)

### Fix

* fix(widgets): Linting ([`02297a6`](https://github.com/numerous-com/numerous-widgets/commit/02297a6d3788c751ca58b44e4b4dfa7dcf473c89))


## v0.1.4 (2024-12-22)

### Fix

* fix(widgets): Liniting ([`aeb43ba`](https://github.com/numerous-com/numerous-widgets/commit/aeb43ba9f7f2de6b5921b4e117e85f22f2680c95))


## v0.1.3 (2024-12-22)

### Fix

* fix(widgets): Black formatted ([`db6baba`](https://github.com/numerous-com/numerous-widgets/commit/db6babadf106b575ca057c90f3c2118f1e61b790))

* fix(widgets): Linting ([`6cced83`](https://github.com/numerous-com/numerous-widgets/commit/6cced83fde39c451b61d64a3a4c5af5dfb5955a6))


## v0.1.2 (2024-12-21)

### Fix

* fix(widgets): ruff linting ([`e771527`](https://github.com/numerous-com/numerous-widgets/commit/e7715271b2df6e4aa1b04935d19c231d2f22cc2b))


## v0.1.1 (2024-12-20)

### Fix

* fix(widgets): Update example app ([`0551c6f`](https://github.com/numerous-com/numerous-widgets/commit/0551c6ff9afc4c6945f1a8f4c9886b8acc13aae8))


## v0.1.0 (2024-12-20)

### Feature

* feat(widgets): Add new widgets and update dependencies

- Introduced new widgets: TableWidget, ChatWidget, MarkdownDisplayWidget, StringInputWidget, AccordionWidget, RadioButtonsWidget, SliderWidget, DateTimePickerWidget, and DateTimeRangePickerWidget.
- Updated package dependencies to include @tanstack/react-table and react-table for enhanced table functionalities.
- Enhanced styles for new widgets and improved overall UI consistency.

This commit expands the widget library and improves the user interface with additional components. ([`1a6c855`](https://github.com/numerous-com/numerous-widgets/commit/1a6c855f98e4890ac25d99258a1691fc49fb0c91))

### Fix

* fix(widgets): Remove commas from widget lines ([`2761375`](https://github.com/numerous-com/numerous-widgets/commit/276137590cfa31bc87f1418f11c7062cc425657d))


## v0.0.29 (2024-12-17)

### Fix

* fix(widgets): Updates to project menu ([`3c71cab`](https://github.com/numerous-com/numerous-widgets/commit/3c71cab14e4cfd705cca6a134bdcb831500fd622))


## v0.0.28 (2024-12-17)

### Fix

* fix(widgets): Change icon on Task button details to (i) to signify a detailed view ([`e142f04`](https://github.com/numerous-com/numerous-widgets/commit/e142f04e9623d74ed2d861becc4ae8063eb19481))


## v0.0.27 (2024-12-16)

### Fix

* fix(widgets): styles for check box and task button updated ([`60eecef`](https://github.com/numerous-com/numerous-widgets/commit/60eecefd5d11e13a6189b78c1f1f57ccbb7fd503))


## v0.0.26 (2024-12-16)

### Fix

* fix(widgets): Updated main with chart and Numerous banner ([`58e5cc4`](https://github.com/numerous-com/numerous-widgets/commit/58e5cc457d0b8aaad1df6d509aaab7072f5e9e9a))


## v0.0.25 (2024-12-16)

### Documentation

* docs: Update README for development server instructions and build process; enhance index.html and main.tsx with new UI components

- Clarified instructions in README for running the development server from the `js/src` directory.
- Added details on building JavaScript code for production and CI pipeline requirements.
- Updated index.html to include a stylesheet link and corrected the script source path.
- Refactored main.tsx to implement new UI components: NumberInput, Button, Tabs, and MapSelector, improving the app&#39;s functionality and user experience.
- Introduced state management for counter and selected values, enhancing interactivity within the application. ([`4f42560`](https://github.com/numerous-com/numerous-widgets/commit/4f425604ce18a106468f9206bc7b53a599c13b04))

### Fix

* fix(widgets): Build a demo in main.tsx ([`cc187ac`](https://github.com/numerous-com/numerous-widgets/commit/cc187ac3052aa96e93f3b7962659c3703cecbe03))


## v0.0.24 (2024-12-14)

### Fix

* fix(widgets): remove file saver ([`a3d6782`](https://github.com/numerous-com/numerous-widgets/commit/a3d67829d1c5224c1b032eb9997236cf3f692baa))


## v0.0.23 (2024-12-11)

### Fix

* fix(widgets): Clean up examples ([`4cfc969`](https://github.com/numerous-com/numerous-widgets/commit/4cfc9697f281887cc7ce66cee4ba27fdfe1c2b52))

### Unknown

* chore(widgets) : Remove build folder ([`5ef7900`](https://github.com/numerous-com/numerous-widgets/commit/5ef79001066d42820dea2225367e1282d726b99d))


## v0.0.22 (2024-12-11)

### Documentation

* docs: Update README and enhance CI/CD documentation; refactor widget imports and adjust PlotWidget margins

- Revised project description in README to clarify the purpose of the widgets and libraries.
- Added CI/CD section detailing GitHub Actions integration for building widgets and generating mjs files.
- Updated import path for ProjectMenuWidget to reflect new directory structure.
- Adjusted margin settings in PlotWidget for improved layout.
- Minor CSS adjustments to maintain consistency across styles.

These changes improve documentation clarity and streamline the widget integration process. ([`fdbd9b3`](https://github.com/numerous-com/numerous-widgets/commit/fdbd9b3c1ec73af11c62e4331c1ce25254199142))

### Fix

* fix(widgets): Bump version ([`5a83d35`](https://github.com/numerous-com/numerous-widgets/commit/5a83d3556c75aae5bb8fddd508a25e3fd18d518c))


## v0.0.21 (2024-12-06)

### Fix

* fix(widgets): build path and related css ([`270e463`](https://github.com/numerous-com/numerous-widgets/commit/270e463e9c6903fe4ba4eae96ba17b60186852b9))


## v0.0.20 (2024-12-06)

### Fix

* fix(widgets): Remove unfinished FileLoaderWidget ([`5e8e965`](https://github.com/numerous-com/numerous-widgets/commit/5e8e965411e5cfa84024ebd8275b68530c184971))


## v0.0.19 (2024-12-06)

### Fix

* fix(widgets): Example app in marimo ([`943f8df`](https://github.com/numerous-com/numerous-widgets/commit/943f8dfe5c784d9b372f2f060fc2fda1b1c2959d))


## v0.0.18 (2024-12-06)

### Fix

* fix(widgets): Added templating features ([`4281ae7`](https://github.com/numerous-com/numerous-widgets/commit/4281ae74872fbe5a2bb3a9f5b4b42f67b9d7f372))

* fix(NumberField): add tooltip parameter to Field return

- Updated the number_field function to include a tooltip parameter in the Field return statement, enhancing the widget&#39;s usability by providing additional context for users.
- This change improves the overall user experience by allowing tooltips to be displayed alongside number input fields. ([`0eb3d1a`](https://github.com/numerous-com/numerous-widgets/commit/0eb3d1aba4b17a38b7c5153b1580bdad4cfa1810))


## v0.0.17 (2024-12-04)

### Fix

* fix(TaskWidget, ProcessTask): streamline synchronization and enhance task management

- Removed the dependency on `isRunning` in the `TaskWidget` component for sync interval management, simplifying the synchronization logic.
- Updated import paths in `sim_app.py` and `__init__.py` to reflect the new module structure.
- Added new properties and methods in `ProcessTask` for better task state management, including `is_stopped`, `_exit_flag`, and improved logging functionality.
- Enhanced the `sync_with_task` function to include a callback for when the task stops, improving task lifecycle management.
- Introduced validation methods in `StateModel` to check widget values, enhancing form handling capabilities.

These changes improve the overall usability and maintainability of the task management system. ([`2114246`](https://github.com/numerous-com/numerous-widgets/commit/2114246f916d997c395d0c23662e9abe989cefc6))


## v0.0.16 (2024-12-03)

### Fix

* fix(container): enhance container widget with new properties and styles

- Added new `width`, `height`, and `direction` parameters to the `container` function for better layout control.
- Introduced a `side_by_side_container` function for arranging contents horizontally.
- Updated CSS styles for the container to support flexible display options.
- Improved the overall usability and flexibility of the container widget. ([`c520d7c`](https://github.com/numerous-com/numerous-widgets/commit/c520d7cb240929465f45688ac0040da3d0ed0045))


## v0.0.15 (2024-12-03)

### Fix

* fix(DropDown): add fitToContent prop for responsive design

- Introduced a new `fitToContent` prop in the DropDown component to allow dynamic sizing based on content.
- Updated the DropDownWidget to utilize the new prop from model state.
- Enhanced CSS styles to support the responsive layout, adjusting width based on the `fitToContent` class.
- Improved overall usability and flexibility of the DropDown component. ([`03a2e57`](https://github.com/numerous-com/numerous-widgets/commit/03a2e57e50f7c79e613e00c02419cd88367e8854))


## v0.0.14 (2024-12-03)

### Fix

* fix(NumberInput): add fitToContent prop for responsive layout

- Introduced a new `fitToContent` prop to the NumberInput component to allow for dynamic sizing based on content.
- Updated styles to support the new layout mode, enabling the input to adjust its width accordingly.
- Modified the NumberInputWidget to pass the new prop from the model state.
- Adjusted the example in app.py to include the `fit_to_content` parameter.

This enhancement improves the usability and flexibility of the NumberInput component. ([`f32a9af`](https://github.com/numerous-com/numerous-widgets/commit/f32a9af13bf38f3d1917c64a4167c200be42dc84))


## v0.0.13 (2024-12-03)

### Fix

* fix(tabs): fixes to tabs ([`20e8d65`](https://github.com/numerous-com/numerous-widgets/commit/20e8d65d7e7227c4e14b24b2a08980e67f694a47))


## v0.0.12 (2024-12-03)

### Fix

* fix(styles): Updated stylesheet ([`535d96d`](https://github.com/numerous-com/numerous-widgets/commit/535d96d9b6ccbc792fca46dbd8215547e50487a5))


## v0.0.11 (2024-12-03)

### Fix

* fix(widgets): Improvements to NumberField ([`de99738`](https://github.com/numerous-com/numerous-widgets/commit/de9973835032dd0f00de7de29ce98e3818c1c1f3))


## v0.0.10 (2024-12-03)

### Fix

* fix(docs): update example ([`e647976`](https://github.com/numerous-com/numerous-widgets/commit/e647976f2739b547c88329e78bacdd2a4da271c9))


## v0.0.9 (2024-12-03)

### Documentation

* docs(state_model): Add example usage for StateModel in documentation ([`fe12690`](https://github.com/numerous-com/numerous-widgets/commit/fe12690c28cb4244202bf7b0dea1432bd32dbc01))

### Fix

* fix(docs): update example ([`57ea12d`](https://github.com/numerous-com/numerous-widgets/commit/57ea12de85dcb0b992a3d688c5220e7bc7944eda))


## v0.0.8 (2024-12-02)

### Fix

* fix(tests): Remove unused test ([`4fcd06e`](https://github.com/numerous-com/numerous-widgets/commit/4fcd06ed0fa3b4093baed0fcddd6e3038fd9a1e2))

* fix(state): Created a StateModel to generate ui widgets from a pydantic model and sync it. ([`086157a`](https://github.com/numerous-com/numerous-widgets/commit/086157ab2f3706dc6c75c0b53106393d0ad17f3b))


## v0.0.7 (2024-12-02)

### Fix

* fix(widgets): Update to process task docs and docstrings ([`57576ad`](https://github.com/numerous-com/numerous-widgets/commit/57576ad2e45ba5083fd26e43e01b1427ab82dbe4))


## v0.0.6 (2024-12-02)

### Fix

* fix(docs): setup with namespace package ([`0c6ddc0`](https://github.com/numerous-com/numerous-widgets/commit/0c6ddc03783e9dec4e73ed52e09c5b6d26234b66))


## v0.0.5 (2024-12-02)

### Fix

* fix(widgets): remove tabStorage ([`55f6955`](https://github.com/numerous-com/numerous-widgets/commit/55f69555763a761a3cc35f90502ca66b16e99326))

* fix(cicd): js folder as cwd ([`2a4132f`](https://github.com/numerous-com/numerous-widgets/commit/2a4132f10296ded961c43488ac6b887a04ce679d))

* fix(cicd): build from js folder ([`2c0df5d`](https://github.com/numerous-com/numerous-widgets/commit/2c0df5d2060fa8a49cfb981f57a8444cbfe95236))

* fix(cicd): Add build step to build widgets from js folder ([`cd9134d`](https://github.com/numerous-com/numerous-widgets/commit/cd9134d73be8bd2b0098789bf8685f0eb05253aa))


## v0.0.4 (2024-12-02)

### Fix

* fix(docs): Update references to code ([`99816ec`](https://github.com/numerous-com/numerous-widgets/commit/99816ec2cae40cf21147c942f7cd4cf3797872e5))


## v0.0.3 (2024-12-02)

### Fix

* fix(project): Added author and description ([`125fe39`](https://github.com/numerous-com/numerous-widgets/commit/125fe39bdb0bab99e28b86aa094ef93d2e7d63df))


## v0.0.2 (2024-12-02)

### Fix

* fix(cicd): removed aws ([`2101c1e`](https://github.com/numerous-com/numerous-widgets/commit/2101c1e03bff124df060a3fa6afd633d2b8a7fef))


## v0.0.1 (2024-12-02)

### Fix

* fix(conf): production is standard ([`48e021b`](https://github.com/numerous-com/numerous-widgets/commit/48e021bedb33416bd9feaa7996a59b85b032233b))

* fix(tests): Fix import ([`13aa2f4`](https://github.com/numerous-com/numerous-widgets/commit/13aa2f4a4133353d18378bff5e3c2179e9d53317))

* fix(cicd): tests path fixed ([`c71e665`](https://github.com/numerous-com/numerous-widgets/commit/c71e66527957d6aad105165d01849faba11aefdf))

* fix(widgets): refactoring and fixing pyproject.toml ([`7414ea1`](https://github.com/numerous-com/numerous-widgets/commit/7414ea10de88d3019dbdcbdc6964acd4d91c80a9))

* fix(cicd): Updates to pipeline spec ([`5c2dd45`](https://github.com/numerous-com/numerous-widgets/commit/5c2dd45eca14651d4e82980b9731855744a76af7))

* fix(widgets): Moved config.py to _config.py + dedicated css file pr. widget ([`1c6404a`](https://github.com/numerous-com/numerous-widgets/commit/1c6404ab6781f63ec8c85cff49e691b66add70b2))

* fix(widgets): individual widget css ([`15a0fe7`](https://github.com/numerous-com/numerous-widgets/commit/15a0fe7d9c61a00c182f696ab58aecb6e2814158))

* fix(widgets): refactoring config ([`0509f6e`](https://github.com/numerous-com/numerous-widgets/commit/0509f6ec8c05bc8c408fd0e52e4ddee6f5d29cbc))

* fix(widgets): refactoring ([`2ae25d6`](https://github.com/numerous-com/numerous-widgets/commit/2ae25d667c38193b35a965134914b7c732c6b8fc))

* fix(widgets): refactoring + panel example ([`2159c0b`](https://github.com/numerous-com/numerous-widgets/commit/2159c0b0bef3389a043cc1de6285fc910db63da9))

* fix(widgets): Added docs structure ([`cdb9a1d`](https://github.com/numerous-com/numerous-widgets/commit/cdb9a1db1854d3b0f0c03aa366a44a4a27893ecb))

* fix(widgets): print removed ([`641f2f9`](https://github.com/numerous-com/numerous-widgets/commit/641f2f9986a312e617547baae87177576c799d7b))

* fix(widgtes): auto scroll tracking ([`791bcc4`](https://github.com/numerous-com/numerous-widgets/commit/791bcc4b89ff92022e8d175a54cd4b32753acecb))

* fix(widgets): progress ([`4273c00`](https://github.com/numerous-com/numerous-widgets/commit/4273c005c02b92e720697cb84e73b8187a702dc4))

* fix(widgets): process_task ([`7976141`](https://github.com/numerous-com/numerous-widgets/commit/79761416d760800aa7cfb1e839647b29ccd4a9f3))

* fix(widgets): Subprocess task fizes ([`79e4503`](https://github.com/numerous-com/numerous-widgets/commit/79e45038742642c36d11dd7d31380bc0adb4d609))

* fix(widgets): Ability to sync task with task widget with simple function ([`41ebb23`](https://github.com/numerous-com/numerous-widgets/commit/41ebb23a8d879c88cc5171ad162ed03bbbf1d30d))

* fix(widgets): task updates ([`3b47453`](https://github.com/numerous-com/numerous-widgets/commit/3b474535179954f7c2bf4ef67af79e20545a3439))

* fix(widgets): reset fix ([`c5bb88f`](https://github.com/numerous-com/numerous-widgets/commit/c5bb88f3899b064043edb37ce9d8aaa957366eb5))

* fix(widgets): added more widgets ([`c86fd35`](https://github.com/numerous-com/numerous-widgets/commit/c86fd358502e3919fb6cd23f75ce1c03b11288fd))

* fix(widgets): Remove src folder in wrong place ([`899c70a`](https://github.com/numerous-com/numerous-widgets/commit/899c70ae76d156a6273c27a765fcf88f8fcbffa8))

* fix(widgets): MarkdownDrawer and ProgresBar ([`bbe28a9`](https://github.com/numerous-com/numerous-widgets/commit/bbe28a9152bf11b47f922aa3dbd05a8c386989e8))

* fix(widgets): Progress bar ([`6d000c8`](https://github.com/numerous-com/numerous-widgets/commit/6d000c83cc7d4550c1db3adcc966c4bff69dd37a))

* fix(widgets): Minor fixes to widgets and docs ([`62296ea`](https://github.com/numerous-com/numerous-widgets/commit/62296ea9d58ce140051dc0e4e176e6c7e312d6a7))

* fix(widgets): fix vite config dev ([`620a884`](https://github.com/numerous-com/numerous-widgets/commit/620a8845e9fc846808f81e05575eb669afeca181))

* fix(widgets): Add map ([`a668749`](https://github.com/numerous-com/numerous-widgets/commit/a6687490b3cb8bcb7f1d580759ea92fa97cc8f64))

* fix(widgets): Refactoring, build script upgrades, check box widget ([`9f6722e`](https://github.com/numerous-com/numerous-widgets/commit/9f6722e9df381e499b3d8e6082b98d503635def9))

* fix(widgets): Added button and some fixes to card and tabs ([`0ab4da9`](https://github.com/numerous-com/numerous-widgets/commit/0ab4da9937ea96ebb6c0f9d348948b879365a94b))

* fix(widgets): Change tabs to using widgets directly ([`77033f8`](https://github.com/numerous-com/numerous-widgets/commit/77033f8fa0739f72c8bab030729ce77d79c5c261))

* fix(widgets): html component ([`b0ea3ee`](https://github.com/numerous-com/numerous-widgets/commit/b0ea3ee59c2e733e7863468dff518319978523d4))

* fix(widgets): more portal fixes ([`32ba7cd`](https://github.com/numerous-com/numerous-widgets/commit/32ba7cdaf207b6c0afff44a64492ffbddc8bd1f6))

* fix(widgets): portal card ([`7c35436`](https://github.com/numerous-com/numerous-widgets/commit/7c35436d3a618fbb2c4414a0f5fb9a50a5bef509))

* fix(widgets): Added drop down widgget - issues with showing options ([`8c2e120`](https://github.com/numerous-com/numerous-widgets/commit/8c2e1204bfef1dbecc97222632582b8c74b79347))

* fix(widgets): Streamlined widgets placement ([`9ce50e2`](https://github.com/numerous-com/numerous-widgets/commit/9ce50e2c4f12fb413179059b8aa51a33392510e2))

* fix(widgets): Vite builds ([`84921c7`](https://github.com/numerous-com/numerous-widgets/commit/84921c7390fc16ef218442dbb5fe80a5b21e3017))

* fix(docs): Update docs ([`a004be6`](https://github.com/numerous-com/numerous-widgets/commit/a004be60a0e6df96cfc9a0a27f9fb7a602298d7e))

* fix(widgets): Futher work one dev flow and structure ([`66991ac`](https://github.com/numerous-com/numerous-widgets/commit/66991acf8ea75a879c2fc4ae7b21ee819c098232))

* fix(widgets): Further refactoring of repo and adding readme ([`b3d361c`](https://github.com/numerous-com/numerous-widgets/commit/b3d361cd2d6df627d82141f137787cfdf9902008))

* fix(widgets): Added number_widget and ported to typescript ([`f7b7968`](https://github.com/numerous-com/numerous-widgets/commit/f7b796838287ce261dc6fd60d51eecdb39ac9090))

* fix(widget): Work on input_widget ([`88275e1`](https://github.com/numerous-com/numerous-widgets/commit/88275e18e2ecb77c9b1149ebec4e9f9f7da1365e))

* fix(widget): Refactor widget folder ([`6b0dc14`](https://github.com/numerous-com/numerous-widgets/commit/6b0dc14d859eb7f77cc757345ee72bb6f6aa7fdc))

* fix(widget): Fixes ([`aab7dc1`](https://github.com/numerous-com/numerous-widgets/commit/aab7dc1df254feb791ccf1704aded1e822f9f4d6))

* fix(widget): Changes to scenario view ([`d07a48c`](https://github.com/numerous-com/numerous-widgets/commit/d07a48cc82d2466ad49daa7d665fe0aded6c753e))

* fix(widget): various fixes ([`0f7c3c6`](https://github.com/numerous-com/numerous-widgets/commit/0f7c3c61ea5e7675293410e29eb1b8369cb4516a))

* fix(widget): various fixes ([`90f7200`](https://github.com/numerous-com/numerous-widgets/commit/90f7200e40419c69fdf7b99a10954ade5fcb8bef))

* fix(widget): Fix scenarios in Project details ([`db8ffea`](https://github.com/numerous-com/numerous-widgets/commit/db8ffea389b8ac4d3a5c9629f342df2bb77ca354))

* fix(widget): Moved scenario list to ProjectBrowser ([`848aa51`](https://github.com/numerous-com/numerous-widgets/commit/848aa5177f9d2136fa9ec9e117226e8cd33a5b9a))

### Unknown

* fix(widgets) width of drop down ([`bc64f6d`](https://github.com/numerous-com/numerous-widgets/commit/bc64f6d968eb97c8203953f2c1bb68a54b2fb390))

* fix(widgets) ([`fa2b954`](https://github.com/numerous-com/numerous-widgets/commit/fa2b95480530bd38166741760c0e1c5909c725fe))

* fix(widgets) Refactoring of repo ([`28e053a`](https://github.com/numerous-com/numerous-widgets/commit/28e053a28e1639a038560bd92f3b2140bc738ed4))
