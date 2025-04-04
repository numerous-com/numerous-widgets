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
def _(current_data, load_save_widget, mo, set_current_data, set_modified):
    def on_number_change(event):
        load_save_widget.set_modified(True)
        set_current_data(event)
        set_modified(True)
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
def _(aw, configs, mo, wi):
    current_data, set_current_data = mo.state(0)
    selected_item_id, set_selected_item_id = mo.state(None)
    modified, set_modified = mo.state(False)

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
        conf = find_config_by_id(load_save_widget.selected_item_id)
        conf["settings"]["param1"] = current_data()
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

    def search_configs(query):
        return configs

    def on_new(name):
        _id = str(int(configs[-1]["id"])+1)
        new_item = {"id": _id, "label": name, "settings": {
                        "param1": current_data(),
                    }}

        configs.append(new_item)
        set_modified(False)
        set_selected_item_id(_id)

        return new_item, True, f"Created new configuration: **{name}**"

    # Create a widget
    load_save_widget = aw(wi.LoadSaveWidget(
        items=configs,
        on_load=on_load,
        on_save=on_save,
        on_reset=on_reset,
        on_search=search_configs,
        on_new=on_new,
        default_new_item_name="New Configuration",
        selected_item_id=selected_item_id(),
        modified=modified()

    ))
    return (
        current_data,
        find_config_by_id,
        load_save_widget,
        modified,
        on_load,
        on_new,
        on_reset,
        on_save,
        search_configs,
        selected_item_id,
        set_current_data,
        set_modified,
        set_selected_item_id,
    )


if __name__ == "__main__":
    app.run()
