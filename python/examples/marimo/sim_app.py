import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    from widgets.process_task import Simulation, process_task_control, SubprocessTask
    return Simulation, SubprocessTask, process_task_control


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
def __(aw, process_task_control, simulation):
    def on_start():
        simulation.start(10.0, 1, 0)

    task = aw(process_task_control(simulation, on_start=on_start))
    task
    return on_start, task


@app.cell
def __(SubprocessTask):
    subprocess_task = SubprocessTask()
    return (subprocess_task,)


@app.cell
def __(aw, process_task_control, subprocess_task):
    def on_start_cmd():
        subprocess_task.start("ipconfig")

    process_task = aw(process_task_control(subprocess_task, on_start=on_start_cmd))
    process_task
    return on_start_cmd, process_task


if __name__ == "__main__":
    app.run()
