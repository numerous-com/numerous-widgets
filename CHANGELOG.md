# CHANGELOG



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
