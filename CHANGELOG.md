# CHANGELOG



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
