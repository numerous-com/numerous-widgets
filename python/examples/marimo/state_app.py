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
    from numerous.widgets.state import StateModel, number_field
    aw = mo.ui.anywidget
    return StateModel, aw, number_field, wi


@app.cell
def __(StateModel, number_field):
    class TestStateModel(StateModel):
        g_value: float = number_field("g-value", "bla bla", start=0, stop=10, default=1, multiple_of=0.1)

    tsm = TestStateModel(g_value=0.9)
    print(tsm.changed)
    tsm.update_widgets()
    print(tsm.changed)
    return TestStateModel, tsm


@app.cell
def __(aw, tsm):
    aw(tsm.get_widget("g_value"))
    return


@app.cell
def __(tsm):
    tsm.g_value = 0.5
    return


@app.cell
def __(tsm):
    tsm.update_widgets()
    return


@app.cell
def __(tsm):
    tsm.update_values()
    tsm.g_value
    return


@app.cell
def __(tsm):
    print(tsm.validate("g_value", 100))
    return


@app.cell
def __(TestStateModel, tsm):
    tsm.apply_values(TestStateModel(g_value=3))
    tsm.g_value
    return


if __name__ == "__main__":
    app.run()
