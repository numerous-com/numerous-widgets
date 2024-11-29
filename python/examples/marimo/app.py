import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    return (mo,)


@app.cell
def __(mo):
    import widgets as wi
    aw = mo.ui.anywidget
    return aw, wi


@app.cell
def __():
    #projects_menu = aw(wi.ProjectsMenu())
    #projects_menu
    return


@app.cell
def __(wi):
    number = wi.Number(label="Number", tooltip="This is a number")
    number
    return (number,)


@app.cell
def __(wi):
    drop_down = wi.DropDown(label="Select", tooltip="sdfsd", options=["Option 1", "Option 2"])
    drop_down
    return (drop_down,)


@app.cell
def __(wi):
    button = wi.Button(label="ok", tooltip="The button")
    button
    return (button,)


@app.cell
def __(button, drop_down, number):
    content = [number, drop_down, button]
    return (content,)


@app.cell
def __(aw, wi):
    tabs = aw(wi.Tabs(tabs=["Number", "Drop Down", "Button"]))
    tabs
    return (tabs,)


@app.cell
def __(content, tabs, wi):
    wi.tabs_active_page_content(tabs, content)
    return


@app.cell
def __(aw, wi):
    aw(wi.CheckBox("Check box"))
    return


@app.cell
def __(aw, mo, wi):
    map = aw(wi.MapSelector(points={
            'nyc': [-73.985428, 40.748817],    # New York
            'paris': [2.294481, 48.858370],     # Paris
            'tokyo': [139.839478, 35.652832]    # Tokyo
        }, center= [2.294481, 48.858370], zoom=8))

    mo.Html(wi.card(map))
    return (map,)


@app.cell
def __(map):
    map.location_clicked
    return


@app.cell
def __(map):
    map.selected_value
    return


@app.cell
def __(aw, wi):
    progress = aw(wi.ProgressBar(label="Hello"))
    progress
    return (progress,)


@app.cell
def __(progress):
    progress.val = 75
    return


@app.cell
def __(progress):
    progress.value
    return


if __name__ == "__main__":
    app.run()
