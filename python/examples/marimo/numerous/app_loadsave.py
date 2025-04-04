import marimo

__generated_with = "0.12.2"
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
def _(mo):
    current_data, set_current_data = mo.state(0)
    selected_item_id, set_selected_item_id = mo.state(None)
    modified, set_modified = mo.state(False)
    return (
        current_data,
        modified,
        selected_item_id,
        set_current_data,
        set_modified,
        set_selected_item_id,
    )


@app.cell
def _(current_data, mo, set_modified):
    def on_number_change(event):
        set_modified(True)
        #set_current_data(event)
        print(event)

    ui_number = mo.ui.number(current_data(), on_change=on_number_change)
    ui_number
    return on_number_change, ui_number


@app.cell
def _():
    return


@app.cell
def _(current_data):
    current_data()
    return


@app.cell
def _(load_save_widget):
    load_save_widget
    return


@app.cell
def _(aw, load_save_widget, wi):
    def on_click_disable(event):
        # Simulate some changes
        load_save_widget.disable_save = True
        load_save_widget.disable_save_as = True
        load_save_widget.disable_save_reason = "Not allowed now!"

    disable_save_button = aw(wi.Button(label="Disable Save", on_click=on_click_disable))
    disable_save_button
    return disable_save_button, on_click_disable


@app.cell
def _(aw, load_save_widget, wi):
    def on_click_enable(event):
        # Simulate some changes
        load_save_widget.disable_save = False
        load_save_widget.disable_save_as = False
        load_save_widget.disable_save_reason = ""

    enable_save_button = aw(wi.Button(label="Enable Save", on_click=on_click_enable))
    enable_save_button
    return enable_save_button, on_click_enable


@app.cell
def _():
    configs = [
                {
                    "id": "0",
                    "label": "Basic Configuration",
                    "settings": {
                        "param1": 5,
                    }
                },
                {
                    "id": "1",
                    "label": "Advanced Configuration",
                    "settings": {
                        "param1": 10,
                    }
                }
    ]
    return (configs,)


@app.cell
def _(aw, configs, wi):
    # Create a widget
    load_save_widget = aw(wi.LoadSaveWidget(
        items=configs,

        default_new_item_name="New Configuration",
        #selected_item_id=selected_item_id(),
        #modified=modified()

    ))
    print("!!!")
    return (load_save_widget,)


@app.cell
def _(
    configs,
    current_data,
    load_save_widget,
    selected_item_id,
    set_current_data,
    set_modified,
    set_selected_item_id,
    ui_number,
):
    def find_config_by_id(config_id):

        for conf in configs:
            if conf["id"] == config_id:
                return conf

    def on_load(config_id):
        print(f"Load {config_id}")
        conf = find_config_by_id(config_id)

        set_current_data(conf["settings"]["param1"])
        set_modified(False)
        set_selected_item_id(config_id)
        return True, "OK"

    def on_save(force):
        # Get all data from ui components

        conf = find_config_by_id(selected_item_id())
        conf["settings"]["param1"] = ui_number.value
        set_modified(False)

        print(f"Save {current_data()}")
        return True, "OK"

    def on_reset():
        print("Reset")
        conf = find_config_by_id(selected_item_id())

        set_current_data(conf["settings"]["param1"] if conf else 0)
        set_modified(False)
        load_save_widget.set_modified(False, "Theres a new val")
        return True, "Reset"

    def on_new(name):
        _id = str(int(configs[-1]["id"])+1)
        new_item = {"id": _id, "label": name, "settings": {
                        "param1": current_data(),
                    }}

        configs.append(new_item)
        set_modified(False)
        set_selected_item_id(_id)

        return new_item, True, f"Created new configuration: **{name}**"


    load_save_widget._on_load_callback = on_load
    load_save_widget._on_save_callback = on_save
    load_save_widget._on_reset_callback = on_reset
    load_save_widget._on_new_callback = on_new

    return (
        find_config_by_id,
        on_load,
        on_new,
        on_reset,
        on_save,
    )


@app.cell
def _(load_save_widget, modified):
    load_save_widget.set_modified(modified())
    print("!")
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
