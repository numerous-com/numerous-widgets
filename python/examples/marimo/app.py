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
    from widgets.html_widget import HTMLWidget
    from widgets.button_widget import ButtonWidget
    return (
        ButtonWidget,
        CardWidget,
        DropDownWidget,
        HTMLWidget,
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
def __(CardWidget, NumberWidget, mo):
    number_widget = NumberWidget("My Number")
    number_widget_a = mo.ui.anywidget(number_widget)
    card_number = mo.ui.anywidget(CardWidget(content=number_widget_a))
    return card_number, number_widget, number_widget_a


@app.cell
def __(
    DropDownWidget,
    TabsWidget,
    button_for_tab3,
    button_n,
    card,
    card_number,
    mo,
):
    tabs_widget = mo.ui.anywidget(TabsWidget("Tabs", {
        "Tab1": card_number, 
        "Tab2": mo.ui.anywidget(DropDownWidget("Hello", options=["1", "2", "3"])),
        "Tab3": button_for_tab3,
        "Tab4": button_n,
        "Tab5": card

    }))
    tabs_widget
    return (tabs_widget,)


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
def __(ButtonWidget, do_action, mo):
    button_n = mo.ui.anywidget(ButtonWidget("sdfsdf", on_click=do_action))
    return (button_n,)


@app.cell
def __(mo, on_click2):
    button_for_tab3 = mo.ui.button(label="tab button!", on_click=on_click2)
    return (button_for_tab3,)


@app.cell
def __():
    def on_click2(event):

        ...
        #number_widget_a.value['value'] += 1
    return (on_click2,)


@app.cell
def __(ButtonWidget, mo, on_click2):
    card_button = mo.ui.anywidget(ButtonWidget(label="submit", on_click=on_click2))
    return (card_button,)


@app.cell
def __(CardWidget, card_button, mo):
    card = mo.ui.anywidget(CardWidget(content=card_button))
    return (card,)


@app.cell
def __():
    def do_action(event):
        ...
    return (do_action,)


@app.cell
def __(number_widget_a):
    number_widget_a.value
    return


if __name__ == "__main__":
    app.run()
