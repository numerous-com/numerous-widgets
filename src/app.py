import marimo

__generated_with = "0.9.22"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    return (mo,)


@app.cell
def __():
    from widget import ProjectsMenuWidget
    return (ProjectsMenuWidget,)


@app.cell
def __(ProjectsMenuWidget, mo):
    widget_ = ProjectsMenuWidget()
    widget = mo.ui.anywidget(widget_)
    return widget, widget_


@app.cell
def __(widget):
    widget
    return


@app.cell
def __(mo, widget_):
    def onclick(event):
        widget_.set_document("doc3", {"content": 1})

    button = mo.ui.button(label="Simulate", on_click=onclick)
    button
    return button, onclick


if __name__ == "__main__":
    app.run()
