import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    from widgets.process_task import Simulation, process_task_control
    return Simulation, process_task_control


@app.cell
def __():
    import marimo as mo
    import widgets as wi
    return mo, wi


@app.cell
def __(mo):
    aw = mo.ui.anywidget
    return (aw,)


@app.cell
def __(Simulation):
    simulation = Simulation(run_in_process=True, capture_stdout=True)
    return (simulation,)


@app.cell
def __(process_task_control, simulation):
    def on_start():
        simulation.start(10.0, 1, 0)

    task, timer = process_task_control(simulation, on_start=on_start)
    return on_start, task, timer


@app.cell
def __(aw, timer):
    aw(timer)
    return


@app.cell
def __(aw, task):
    aw(task)
    return


@app.cell
def __(mo, task_widget):
    def on_complete(event):
        task_widget.complete()

    mo.ui.button(label="Complete", on_click=on_complete)
    return (on_complete,)


@app.cell
def __(mo, task_widget):
    def on_fail(event):
        task_widget.fail()

    mo.ui.button(label="Fail", on_click=on_fail)
    return (on_fail,)


@app.cell
def __(mo, task_widget):
    def on_reset(event):
        task_widget.reset()

    mo.ui.button(label="Reset", on_click=on_reset)
    return (on_reset,)


@app.cell
def __(mo, task_widget):
    def on_disable(event):
        task_widget.disable()

    mo.ui.button(label="Dislabe", on_click=on_disable)
    return (on_disable,)


@app.cell
def __(mo, task_widget):
    def on_enable(event):
        task_widget.enable()

    mo.ui.button(label="Enable", on_click=on_enable)
    return (on_enable,)


if __name__ == "__main__":
    app.run()
