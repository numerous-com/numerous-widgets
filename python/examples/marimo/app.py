import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    return (mo,)


@app.cell
def __(mo):
    import numerous.widgets as wi
    aw = mo.ui.anywidget
    return aw, wi


@app.cell
def __(aw, wi):
    number = aw(wi.Number(label="Number", tooltip="This is a number", start=0, stop=10, default=1, step=.1, fit_to_content=False))
    number
    return (number,)


@app.cell
def __(wi):
    drop_down = wi.DropDown(label="Select", tooltip="sdfsd", options=["Option 1", "Option 2"])
    return (drop_down,)


@app.cell
def __(wi):
    button = wi.Button(label="ok", tooltip="The button")
    return (button,)


@app.cell
def __(aw, button, drop_down, mo, number):
    content = [aw(number), aw(drop_down), aw(button), mo.vstack([aw(number)])]
    return (content,)


@app.cell
def __():
    tabs_options=["Number", "Drop Down", "Button", "Vstack"]
    return (tabs_options,)


@app.cell
def __(aw, tabs_options, wi):
    tabs = aw(wi.Tabs(tabs=tabs_options))
    tabs
    return (tabs,)


@app.cell
def __(content, mo, tabs, tabs_options, wi):
    mo.Html(wi.render_tab_content({k: v for k,v in zip(tabs_options, content)}, tabs.selected_value))
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
    progress.val = 50
    return


@app.cell
def __(progress):
    progress.value
    return


@app.cell
def __():
    #markdown_drawer = aw(wi.MarkdownDrawer("Docs", content="# Hello World"))
    #markdown_drawer
    return


@app.cell
def __():
    #markdown_drawer.content = """# Documentation for the System Designer
    """
    1. Test
    2. Test more

    ## section
    sfsfds
    ### Hello
    sfdsfd
    """
    return


@app.cell
def __(wi):
    loader = wi.FileLoader(
        label="Load CSV",
        tooltip="Click to load a CSV file",
        accept=".csv"
    )
    return (loader,)


@app.cell
def __(aw, loader):
    loader_widget = aw(loader)
    loader_widget
    return (loader_widget,)


@app.cell
def __():
    #with loader_widget.open("r") as f:
    #    print(f.read())
    return


@app.cell
def __(loader, loader_widget):
    if loader_widget.file_content:
       print(loader.as_buffer.read())
    return


@app.cell
def __(loader, loader_widget):
    if loader_widget.file_content:
        _str = loader.as_string.read()
        print(_str)
    return


@app.cell
def __(aw, loader_widget):
    from numerous.widgets.files.load_save_from_local import FileSaver

    # Create a saver widget
    saver = FileSaver(label="Save File", tooltip="Click to save file")

    if loader_widget.file_content:
        # Update content when needed
        saver.update_content(loader_widget.file_content, "hello.txt")

    saver_widget = aw(saver)
    saver_widget
    return FileSaver, saver, saver_widget


if __name__ == "__main__":
    app.run()
