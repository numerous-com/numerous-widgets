import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    import numerous.widgets as wi
    aw = mo.ui.anywidget
    ht = mo.Html
    from page import page
    return aw, ht, mo, page, wi


@app.cell
def __(counter, ht, increment_counter, page, selection_widget, tabs):
    ht(page(**{
        "tabs": tabs,
        "show_components": tabs.active_tab == "Components",
        "show_advanced": tabs.active_tab == "Advanced",
        "counter": counter,
        "increment_counter": increment_counter,
        "selection_widget": selection_widget,
        
    }))
    return


@app.cell
def __(aw, wi):
    tabs = aw(wi.Tabs(["Components", "Advanced"]))
    return (tabs,)


@app.cell
def __(mo):
    value, set_value = mo.state(0)
    return set_value, value


@app.cell
def __(aw, value, wi):
    counter = aw(wi.Number(default=value(), label="Counter:", fit_to_content=True))
    return (counter,)


@app.cell
def __(aw, set_value, value, wi):
    def on_click(event):
        set_value(value()+1)

    increment_counter = aw(wi.Button(label="Increment Counter", on_click=on_click))
    return increment_counter, on_click


@app.cell
def __(aw, wi):
    selection_widget = aw(wi.DropDown(["1", "2", "3"], label="Select Value", fit_to_content=True))
    return (selection_widget,)


if __name__ == "__main__":
    app.run()
