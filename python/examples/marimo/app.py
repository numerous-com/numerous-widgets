import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    aw = mo.ui.anywidget
    return aw, mo


@app.cell
def __():
    import widgets as wi
    return (wi,)


@app.cell
def __():
    #projects_menu = aw(wi.ProjectsMenu())
    #projects_menu
    return


@app.cell
def __(aw, wi):
    number = aw(wi.Number(label="Number", tooltip="This is a number"))
    number
    return (number,)


@app.cell
def __(aw, wi):
    drop_down = aw(wi.DropDown(label="Select", tooltip="sdfsd", options=["Option 1", "Option 2"]))
    drop_down
    return (drop_down,)


@app.cell
def __(aw, wi):
    button = aw(wi.Button(label="ok", tooltip="The button"))
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
def __(wi):
    wi.CheckBox("Check box")
    return


if __name__ == "__main__":
    app.run()
