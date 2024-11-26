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
    from widgets.number_widget import NumberWidget
    from widgets.drop_down_widget import DropDownWidget
    from widgets.tabs_widget import TabsWidget
    from widgets.card_widget import CardWidget
    return (
        CardWidget,
        DropDownWidget,
        NumberWidget,
        ProjectsMenuWidget,
        TabsWidget,
    )


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
    return


@app.cell
def __(NumberWidget, mo):
    number_widget = NumberWidget("My Number")
    mo.ui.anywidget(number_widget)
    return (number_widget,)


@app.cell
def __(TabsWidget, mo):
    tabs_widget = mo.ui.anywidget(TabsWidget("Tabs", ["Tab1", "Tab2"]))
    tabs_widget
    return (tabs_widget,)


@app.cell
def __(DropDownWidget, mo, tabs_widget):
    dropdown_widget = DropDownWidget("Hello", options=["1", "2", "3"], element_id=tabs_widget.tab_ids["Tab1"])
    mo.ui.anywidget(dropdown_widget)
    return (dropdown_widget,)


@app.cell
def __(tabs_widget):
    tabs_widget.tab_elements
    return


@app.cell
def __(CardWidget, mo, tabs_widget):
    card_widget = CardWidget("teerte", "sfsfd", element_id=tabs_widget.tab_ids["Tab2"])
    card_widget_ = mo.ui.anywidget(card_widget)
    card_widget_
    return card_widget, card_widget_


if __name__ == "__main__":
    app.run()
