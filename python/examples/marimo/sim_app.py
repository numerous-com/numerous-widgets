import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    from widgets.process_task import Simulation
    return (Simulation,)


@app.cell
def __():
    return


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
def __(aw, simulation, wi):
    def on_start():
        print("Start")
        simulation.start(10.0, 1, 0)

    task_widget = aw(wi.Task(on_start=on_start, on_stop=simulation.stop, on_reset=simulation.reset))
    task_widget
    return on_start, task_widget


@app.cell
def __(aw, simulation, task_widget, wi):
    def update_progress():
        task_widget.progress = simulation.progress
        if simulation.completed:
            task_widget.complete()

    timer = aw(wi.Timer(callback=update_progress, active=True, interval=1))
    timer
    return timer, update_progress


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


@app.cell
def __(task_widget):
    task_widget.started
    return


if __name__ == "__main__":
    app.run()
