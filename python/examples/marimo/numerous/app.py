import marimo

__generated_with = "0.10.6"
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
def _(
    accordion,
    chat,
    counter,
    ht,
    increment_counter,
    make_a_change,
    map,
    md,
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
):
    ht(
        page(
            **{
                "tabs": tabs,
                "show_basic": tabs.active_tab == "Basic",
                "show_map": tabs.active_tab == "Map",
                "show_accordion_tab": tabs.active_tab == "Accordion",
                "show_projects": tabs.active_tab == "Projects",
                "show_task": tabs.active_tab == "Task",
                "show_table": tabs.active_tab == "Table",
                "show_markdown": tabs.active_tab == "Markdown",
                "show_chat": tabs.active_tab == "Chat",
                "counter": counter,
                "increment_counter": increment_counter,
                "selection_widget": selection_widget,
                "map_widget": map,
                "string_input": string_input,
                "accordion": accordion,
                "show_accordion": accordion.expanded,
                "project_widget": project_widget,
                "radio": radio,
                "slider": slider,
                "picker": picker,
                "picker_range": picker_range,
                "table": table,
                "markdown": md,
                "chat": chat,
                "task": task_button,
                "make_a_change": make_a_change,
            }
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
            ]
        )
    )
    return (tabs,)


@app.cell
def _(mo):
    value, set_value = mo.state(0)
    return set_value, value


@app.cell
def _(aw, value, wi):
    counter = aw(wi.Number(default=value(), label="Counter:", fit_to_content=True))
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
    string_input = aw(
        wi.String(
            label="Enter text",
            tooltip="Type your text here",
            default="Hello",
            placeholder="Type something...",
            fit_to_content=True,
            validation_regex=r"^[a-z]*$",
            is_password=False,
        )
    )
    return (string_input,)


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
    task_button = aw(wi.Task())
    return (task_button,)


@app.cell
def _(task_button):
    task_button.progress = 0.25
    return


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
            title="Click to expand", expanded=False  # Optional: specify initial state
        )
    )
    return (accordion,)


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
            max_height="500px",
        )
    )

    # Handle new messages
    def on_new_message(change):
        if change.new is not None:
            # Echo back the message
            chat.add_message(f"You said: {change.new['content']}", type="user")

    chat.observe_new_messages(on_new_message)

    # Add a new system message
    chat.add_message("This is a system message", type="system")

    # Get message history
    history = chat.message_history
    return chat, history, on_new_message


@app.cell
def _(aw, wi):
    # Create modal dialog
    dialog = aw(
        wi.ModalDialog(
            title="Confirm Action",
            message="Are you sure you want to proceed?",
            show_cancel=True,
            ok_label="Yes, proceed",
            cancel_label="No, go back",
        )
    )

    # Handle dialog result
    def on_result(change):
        if change.new == "ok":
            print("User clicked OK")
        elif change.new == "cancel":
            print("User clicked Cancel")

    dialog.observe_result(on_result)

    # Show with different message
    dialog.show(title="Success", message="Operation completed successfully!")

    # Hide the dialog programmatically
    dialog.hide()
    dialog
    return dialog, on_result


@app.cell
def _(dialog):
    # Show the dialog
    dialog.show()
    return


if __name__ == "__main__":
    app.run()
