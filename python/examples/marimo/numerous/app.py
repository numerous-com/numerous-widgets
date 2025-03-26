import marimo

__generated_with = "0.11.14"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo

    import numerous.widgets as wi

    aw = mo.ui.anywidget
    ht = mo.Html
    from page import page
    return aw, ht, mo, page, wi


@app.cell
def _(aw, wi):
    """Example of using the LoadSaveWidget."""

    import time
    import uuid
    from typing import Dict, List, Optional, Tuple, Any

    class ConfigManager:
        """Simple example class to manage configurations."""

        def __init__(self) -> None:
            """Initialize the configuration manager."""
            self.configs: Dict[str, Dict[str, Any]] = {
                "config-1": {
                    "id": "config-1",
                    "label": "Basic Configuration",
                    "settings": {
                        "param1": 5,
                        "param2": "test",
                        "param3": True
                    }
                },
                "config-2": {
                    "id": "config-2",
                    "label": "Advanced Configuration",
                    "settings": {
                        "param1": 10,
                        "param2": "advanced",
                        "param3": False,
                        "param4": 3.14
                    }
                }
            }
            self.current_config: Optional[Dict[str, Any]] = None
            self.current_config_id: Optional[str] = None
            self.modified: bool = False

        def get_configs(self) -> List[Dict[str, str]]:
            """Get list of configurations for display in the widget."""
            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
            ]

        def load_config(self, config_id: str) -> Tuple[bool, Optional[str]]:
            """Load a configuration by ID."""
            if config_id in self.configs:
                self.current_config = self.configs[config_id].copy()
                self.current_config_id = config_id
                self.modified = False
                return True, f"Loaded **{self.current_config['label']}** successfully"
            return False, "Configuration not found"

        def save_config(self, force: bool = False) -> Tuple[bool, Optional[str]]:
            """Save the current configuration.

            Args:
                force: Whether to force a save even if the content appears unmodified.
                       This is used for Save As operations.
            """
            if self.current_config and self.current_config_id:
                if self.modified or force:
                    self.configs[self.current_config_id] = self.current_config.copy()
                    self.modified = False
                    time.sleep(0.5)  # Simulate a delay for saving
                    return True, f"Configuration **{self.current_config['label']}** saved successfully"
                return True, None  # No changes to save
            return False, "No configuration to save"

        def reset_config(self) -> Tuple[bool, Optional[str]]:
            """Reset the current configuration."""
            if self.current_config_id:
                self.current_config = self.configs[self.current_config_id].copy()
                self.modified = False
                return True, "Configuration reset successfully"
            return False, "No configuration to reset"

        def modify_config(self, change: Dict[str, Any]) -> str:
            """Make changes to the current configuration."""
            if not self.current_config:
                return "No configuration loaded"

            # Apply changes to the configuration
            if "settings" in self.current_config:
                for key, value in change.items():
                    self.current_config["settings"][key] = value

            self.modified = True
            return f"Changed {len(change)} parameter(s)"

        def search_configs(self, query: str) -> List[Dict[str, str]]:
            """Search configurations by name."""
            if not query:
                return self.get_configs()

            return [
                {"id": config["id"], "label": config["label"]}
                for config in self.configs.values()
                if query.lower() in config["label"].lower()
            ]

        def create_new_config(self, name: str) -> Tuple[Dict[str, str], bool, Optional[str]]:
            """Create a new configuration.

            Args:
                name: Name for the new configuration
                is_save_as: Whether this is a Save As operation, in which case we should
                           copy the current configuration's content
            """
            config_id = f"config-{str(uuid.uuid4())[:8]}"


            # For regular new config, create with default values
            new_config = {
                "id": config_id,
                "label": name,
                "settings": {
                    "param1": 0,
                    "param2": "",
                    "param3": False
                }
            }

            self.configs[config_id] = new_config

            return {"id": config_id, "label": name}, True, f"Created new configuration: **{name}**"


    # Create a configuration manager
    config_manager = ConfigManager()

    # Create a widget
    load_save_widget = aw(wi.LoadSaveWidget(
        items=config_manager.get_configs(),
        on_load=config_manager.load_config,
        on_save=config_manager.save_config,
        on_reset=config_manager.reset_config,
        on_search=config_manager.search_configs,
        on_new=config_manager.create_new_config,
        default_new_item_name="New Configuration"
    ))
    return (
        Any,
        ConfigManager,
        Dict,
        List,
        Optional,
        Tuple,
        config_manager,
        load_save_widget,
        time,
        uuid,
    )


@app.cell
def _(aw, config_manager, load_save_widget, wi):
    def on_click_modify(event):
        # Simulate some changes
        note = config_manager.modify_config({"param1": 15})
        load_save_widget.set_modified(True, note)

    modify_button = aw(wi.Button(label="Modify", on_click=on_click_modify))
    return modify_button, on_click_modify


@app.cell
def _(
    accordion,
    chat,
    check_box,
    counter,
    fit_to_content_checkbox,
    ht,
    increment_counter,
    inline_label_checkbox,
    load_save_widget,
    make_a_change,
    map,
    md,
    modify_button,
    page,
    picker,
    picker_range,
    project_widget,
    radio,
    selection_widget,
    slider,
    string_input,
    table,
    tabs,
    task_button,
    toggle_button,
    tree,
    widget_html,
):
    ht(
        page(
            tabs=tabs,
            show_basic=tabs.active_tab == "Basic",
            show_map=tabs.active_tab == "Map",
            show_accordion_tab=tabs.active_tab == "Accordion",
            show_projects=tabs.active_tab == "Projects",
            show_task=tabs.active_tab == "Task",
            show_table=tabs.active_tab == "Table",
            show_markdown=tabs.active_tab == "Markdown",
            show_chat = tabs.active_tab == "Chat",
            show_tree = tabs.active_tab == "Tree",
            show_html_template = tabs.active_tab == "HTML Template",
            show_load_save = tabs.active_tab == "LoadSave", 
            counter=counter,
            increment_counter=increment_counter,
            selection_widget=selection_widget,
            map_widget=map,
            string_input=string_input,
            accordion=accordion,
            show_accordion=accordion.expanded,
            project_widget=project_widget,
            toggle_button=toggle_button,
            radio=radio,
            slider=slider,
            picker=picker,
            picker_range=picker_range,
            table=table,
            markdown=md,
            chat=chat,
            task=task_button,
            make_a_change=make_a_change,
            tree=tree,
            html_template=widget_html,
            check_box=check_box,
            fit_to_content_checkbox=fit_to_content_checkbox,
            inline_label_checkbox=inline_label_checkbox,
            load_save_widget=load_save_widget,
            modify_button=modify_button
        )
    )
    return


@app.cell
def _(aw, wi):
    tabs = aw(
        wi.Tabs(
            [
                "Basic",
                "Map",
                "Accordion",
                "Projects",
                "Task",
                "Table",
                "Markdown",
                "Chat",
                "Tree",
                "HTML Template",
                "LoadSave"
            ]
        )
    )
    return (tabs,)


@app.cell
def _(mo):
    value, set_value = mo.state(0)
    return set_value, value


@app.cell
def _(aw, check_box, counter, selection_widget, slider, string_input, wi):
    layout_adjustable_widgets = [counter, selection_widget, string_input, slider, check_box, slider]

    def on_fit_to_content_change(value):
        for widget in layout_adjustable_widgets:
            widget.fit_to_content = value

    fit_to_content_checkbox = aw(wi.CheckBox(label="Fit to content", on_change=on_fit_to_content_change))

    def on_inline_labvel_change(value):
        for widget in layout_adjustable_widgets:
            widget.label_inline = value

    inline_label_checkbox = aw(wi.CheckBox(label="Inline Label", on_change=on_inline_labvel_change))
    return (
        fit_to_content_checkbox,
        inline_label_checkbox,
        layout_adjustable_widgets,
        on_fit_to_content_change,
        on_inline_labvel_change,
    )


@app.cell
def _():
    return


@app.cell
def _(aw, value, wi):
    counter = aw(
        wi.Number(
            default=value(),
            label="Counter:",
            fit_to_content=False,
            tooltip="This is the value the counter has reached.",
            unit="MW",
            strict_validation=True
        )
    )
    return (counter,)


@app.cell
def _(aw, set_value, value, wi):
    def on_click(event):
        set_value(value() + 1)

    increment_counter = aw(wi.Button(label="Increment Counter", on_click=on_click))
    return increment_counter, on_click


@app.cell
def _(aw, wi):
    selection_widget = aw(
        wi.DropDown(["1", "2", "3"], label="Select Value", fit_to_content=True)
    )
    return (selection_widget,)


@app.cell
def _(aw, wi):
    def on_validation(value):
        if value == value.lower():
            return True

        return "All characters must be lower case!"

    string_input = aw(
        wi.String(
            label="Enter text",
            tooltip="Type your text here",
            default="Hello",
            placeholder="Type something...",
            fit_to_content=False,
            label_inline=False,
            on_validation=on_validation,
            is_password=False,
        )
    )
    return on_validation, string_input


@app.cell
def _(aw, wi):
    map = aw(
        wi.MapSelector(
            points={
                "New York": [-73.985428, 40.748817],  # New York
                "Paris": [2.294481, 48.858370],  # Paris
                "Tokyo": [139.839478, 35.652832],  # Tokyo
            },
            center=[2.294481, 48.858370],
            zoom=0,
        )
    )
    return (map,)


@app.cell
def _(aw, wi):
    sub_process_task = wi.task.SubprocessTask(run_in_process=True)

    def on_start():
        print("Starting")
        sub_process_task.start(["echo 0%", "echo 100%"], shell=True)

    task_button = aw(wi.task.process_task_control(sub_process_task, on_start=on_start))
    return on_start, sub_process_task, task_button


@app.cell
def _(aw, wi):
    project_widget = aw(wi.ProjectsMenu())
    return (project_widget,)


@app.cell
def _(aw, project_widget, wi):
    def on_change_something(event):
        project_widget.changed = True

    make_a_change = aw(wi.Button(label="Make a change!", on_click=on_change_something))
    return make_a_change, on_change_something


@app.cell
def _(aw, wi):
    # Create a single accordion button
    accordion = aw(
        wi.Accordion(
            title="Click to expand",
            expanded=False,  # Optional: specify initial state
        )
    )
    return (accordion,)


@app.cell
def _(aw, wi):
    toggle_button = aw(
        wi.ToggleButton(label="Toogle Something")
    )
    return (toggle_button,)


@app.cell
def _(aw, wi):
    check_box = aw(
        wi.CheckBox(label="Check Something")
    )
    return (check_box,)


@app.cell
def _(aw, wi):
    radio = aw(
        wi.RadioButtons(
            options=["Option 1", "Option 2", "Option 3"],
            label="Select an option",
            tooltip="Choose one of the available options",
            default="Option 1",
        )
    )
    return (radio,)


@app.cell
def _(aw, wi):
    slider = aw(
        wi.Slider(
            label="Select a value",
            min_value=0,
            max_value=100,
            step=1,
            default=50,
            tooltip="Drag to adjust the value",
            label_inline=False,
            fit_to_content=False
        )
    )
    return (slider,)


@app.cell
def _(aw, wi):
    from datetime import datetime, timedelta

    # Create a datetime picker with a date range
    now = datetime.now()
    picker = aw(
        wi.DateTimePicker(
            label="Select date and time",
            tooltip="Choose a date and time",
            default=now,
            min_date=now - timedelta(days=7),  # Last week
            max_date=now + timedelta(days=7),  # Next week
        )
    )
    return datetime, now, picker, timedelta


@app.cell
def _(aw, datetime, timedelta, wi):
    # Create a datetime range picker with a date range
    _now = datetime.now()
    picker_range = aw(
        wi.DateTimeRangePicker(
            label="Select date and time range",
            tooltip="Choose start and end dates/times",
            default_start=_now,
            default_end=_now + timedelta(hours=2),
            min_date=_now - timedelta(days=7),  # Last week
            max_date=_now + timedelta(days=7),  # Next week
        )
    )
    return (picker_range,)


@app.cell
def _(aw, wi):
    # Create a markdown display with some content
    md = aw(
        wi.MarkdownDisplay(
            """
    # Hello World

    This is a **markdown** display widget with support for:

    - Lists
    - *Italic* and **bold** text
    - `code blocks`
    - [Links](https://example.com)
    - Math equations: $E = mc^2$
    - Tables
    - And more!"""
        )
    )
    return (md,)


@app.cell
def _(aw, wi):
    # Create sample data
    data = [
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Jane", "age": 25, "city": "London"},
        {"name": "Bob", "age": 35, "city": "Paris"},
    ]

    # Define columns
    columns = [
        {"accessorKey": "name", "header": "Name"},
        {"accessorKey": "age", "header": "Age"},
        {"accessorKey": "city", "header": "City"},
    ]

    # Create table widget
    table = aw(wi.Table(data=data, columns=columns, page_size=10))

    # Get selected rows
    selected_data = table.get_selected_rows()

    # Update data
    new_data = [{"name": "Alice", "age": 28, "city": "Tokyo"}]
    table.update_data(new_data)
    return columns, data, new_data, selected_data, table


@app.cell
def _(aw, wi):
    # Create chat widget
    chat = aw(
        wi.Chat(
            messages=[
                {"content": "Hello! How can I help you today?", "type": "system"}
            ],
            placeholder="Type your message here...",
        )
    )

    # Handle new messages
    def on_new_message(change):
        if change.new is not None:
            # Echo back the message
            chat.add_message(f"You said: {change.new['content']}", msg_type="user")

    chat.observe_new_messages(on_new_message)

    # Add a new system message
    chat.add_message("This is a system message", msg_type="system")
    return chat, on_new_message


@app.cell
def _(aw, wi):
    items = {
        'root': {
            'id': 'root',  # Add id field
            'label': 'Root',
            'parent_id': None,
            'is_expanded': True  # Add is_expanded field
        },
        'branch1': {
            'id': 'branch1',
            'label': 'Branch 1',
            'parent_id': 'root',
            'is_expanded': True
        },
        'leaf1': {
            'id': 'leaf1',
            'label': 'Leaf 1',
            'parent_id': 'branch1',
            'is_expanded': False
        },
        'leaf2': {
            'id': 'leaf2',
            'label': 'Leaf 2',
            'parent_id': 'branch1',
            'is_expanded': False
        },
        'branch3': {
            'id': 'branch3',
            'label': 'Branch 3',
            'parent_id': 'root',
            'is_expanded': True
        },
    }

    tree = aw(wi.TreeBrowser(
        items=items,
        selection_mode='single',
        expanded_ids=['root', 'branch1']
    ))
    return items, tree


@app.cell
def _(aw, wi):
    # Create a template with variables
    template = """
    <div>
        <h1>Welcome, {{name}}!</h1>
        <p>Your age is {{age}} years old.</p>
        <p>Your favorite color is {{color}}.</p>
    </div>
    """

    # Define variables
    variables = {
        "name": "John Doe",
        "age": 32,
        "color": "blue"
    }

    # Create the widget
    widget_html = aw(wi.HTMLTemplate(template=template, variables=variables))
    return template, variables, widget_html


@app.cell
def _(widget_html):
    widget_html.update_variable("age", 50)
    return


@app.cell
def _(chat):
    chat.set_thinking("system", True)
    return


@app.cell
def _(aw):
    from numerous.widgets.advanced.weighted_assessment_survey import WeightedAssessmentSurvey
    assement_survey = aw(WeightedAssessmentSurvey())
    def print_results(results):
        print(results)
    assement_survey.on_submit(print_results)
    #assement_survey
    return WeightedAssessmentSurvey, assement_survey, print_results


if __name__ == "__main__":
    app.run()
