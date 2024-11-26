import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    return (mo,)


@app.cell
def __():
    from widgets import ProjectsMenuWidget
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
        results_file = "test.txt"
        with open(results_file, 'w+') as f:
            f.write("Simulation results...")
        #widget_.set_file("results", results_file)


    button = mo.ui.button(label="Simulate", on_click=onclick)
    button
    return button, onclick


@app.cell
def __():
    # Input suggestions
    return


@app.cell
def __():
    #input_widget_ = ScenarioInputWidget()
    #input_widget = mo.ui.anywidget(input_widget_)
    return


@app.cell
def __():
    #input_widget
    return


@app.cell
def __():
    #project_widgets = []

    #for i in range(100):
    #    widgeti = ProjectsMenuWidget()
    #    mo_widgeti = mo.ui.anywidget(widgeti)
    #    project_widgets.append(mo_widgeti)

    #mo.vstack(project_widgets)
    return


@app.cell
def __():
    #button_widgets = []

    #for j in range(100):
    #    mo_buttoni = mo.ui.button()

     #   button_widgets.append(mo_buttoni)

    #mo.vstack(button_widgets)
    return


@app.cell
def __():
    from widgets.number_widget import NumberWidget
    return (NumberWidget,)


@app.cell
def __(NumberWidget, mo):
    number_widget = NumberWidget("My Number")
    mo.ui.anywidget(number_widget)
    return (number_widget,)


if __name__ == "__main__":
    app.run()
