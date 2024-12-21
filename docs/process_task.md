# ProcessTasks and Control

The task classes are made to help with running long-running tasks in a separate process with progress tracking.

The `ProcessTask` class is a base class for controlling the task which can be extended to with a run method to execute the task in a separate process.

The `SubprocessTask` class is a subclass of `ProcessTask` that uses a subprocess to run the task. Use this if you need to run a task that is not a python script.

For a simple way to combine a `ProcessTask` with a `Task` widget, see the `process_task_control` function. This will automatically create a `Task` widget and connect it to the `ProcessTask` so you can monitor the progress of the task and control it.

Example:

```python
# Basic usage
from numerous.widgets import SubprocessTask, process_task_control

# Create a subprocess task with progress tracking
subprocess_task = SubprocessTask(
    progress_parser=my_progress_parser  # Function to parse progress updates
)

# Define command and startup function
cmd = ["executable", "-arg1", "value1", "-arg2", "value2"]

def on_start_cmd():
    subprocess_task.start(cmd, cwd="working_directory")

# Create and display the process control widget
process_task = process_task_control(
    subprocess_task,
    on_start=on_start_cmd
)

```

This example shows how to:
1. Create a `SubprocessTask` with progress tracking
2. Define a command to run
3. Create a startup function
4. Connect everything with `process_task_control`


