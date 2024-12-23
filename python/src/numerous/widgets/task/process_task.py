"""ProcessTask is for long-running tasks in a separate process."""

import multiprocessing
import subprocess
import sys
import time
import traceback
from collections.abc import Callable
from datetime import datetime
from threading import Thread
from typing import IO, Any

from numerous.widgets.base.task import Task as TaskWidget


class ProcessTask:
    """
    A base class for running long-running tasks in a separate process.

    This class provides functionality for running tasks asynchronously,\
        monitoring their progress,
    capturing output, and handling exceptions.

    Args:
        stop_message (str): Message to display when the task is forcefully terminated.
            Defaults to "Process was forcefully terminated."
        capture_stdout (bool): Whether to capture stdout/stderr output.
            Defaults to False.
        run_in_process (bool): Whether to run the task in a separate process.
            Defaults to True.

    Attributes:
        stop_message (str): Message displayed when task is terminated.
        capture_stdout (bool): Whether stdout/stderr capture is enabled.
        run_in_process (bool): Whether to run the task in a separate process.

    """

    def __init__(
        self,
        stop_message: str = "Process was forcefully terminated.",
        capture_stdout: bool = False,
        run_in_process: bool = True,
    ) -> None:
        self._process: multiprocessing.Process | None = None
        self._progress = multiprocessing.Value("d", 0.0)
        self._stop_flag = multiprocessing.Value("i", 0)
        self._exit_flag = multiprocessing.Value("i", 0)
        self._result_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._exception_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._log_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._return_value: Any = None
        self._exception: Exception | None = None
        self.stop_message: str = stop_message
        self.capture_stdout: bool = capture_stdout
        self.run_in_process: bool = run_in_process
        self.exc: Exception | None = None
        self.tb: str | None = None
        self._started: bool = False
        self._exit_pending: bool = False
        self._result_fetched: bool = False

    def _log(self, type_: str, source: str, message: str) -> None:
        """
        Add a log entry to the queue.

        Args:
            type_ (str): The type of log entry (e.g., "info", "error", "stdout")
            source (str): The source of the log entry (e.g., "process", "task")
            message (str): The message to log

        """
        self._log_queue.put((datetime.now(), type_, source, message))

    def _run_wrapper(self, *args: tuple[Any, ...], **kwargs: dict[str, Any]) -> None:
        """
        Handle task execution and exception handling.

        Args:
            *args: Variable length argument list to pass to run().
            **kwargs: Arbitrary keyword arguments to pass to run().

        """
        try:
            if self.capture_stdout:
                # Redirect stdout and stderr to capture all output
                class StreamToQueue:
                    def __init__(self, queue: multiprocessing.Queue) -> None:  # type: ignore[type-arg]
                        self.queue = queue
                        self.original_stdout = sys.stdout

                    def write(self, text: str) -> None:
                        if text.strip():  # Only queue non-empty strings
                            timestamp = datetime.now()
                            self.queue.put(
                                (timestamp, "stdout", "process", text.strip())
                            )
                        self.original_stdout.write(text)

                    def flush(self) -> None:
                        self.original_stdout.flush()

                sys.stdout = StreamToQueue(self._log_queue)
                sys.stderr = StreamToQueue(self._log_queue)

            try:
                result = self.run(*args, **kwargs)

                self._result_queue.put(result)

            except Exception as e:
                self._log("error", "process", f"Error in run(): {e!s}")
                self._log("error", "process", f"Traceback:\n{traceback.format_exc()}")
                self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
                raise
            finally:
                # Always mark as complete, even if there was an error
                self._progress.value = 1.0

        except Exception as e:
            self._log("error", "process", f"Error in wrapper: {e!s}")
            self._log("error", "process", f"Traceback:\n{traceback.format_exc()}")
            self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
            raise
        finally:
            # Always restore stdout/stderr
            if self.capture_stdout:
                sys.stdout = sys.__stdout__
                sys.stderr = sys.__stderr__

            self._exit_flag.value = 1

    def log(self, message: str) -> None:
        """
        Add a log entry to the queue.

        Args:
            message (str): The message to add to the log queue.

        """
        self._log("info", "task", message)

    @property
    def log_strings(self) -> str:
        """
        Get all accumulated log messages.

        Returns:
            str: A string containing all formatted log messages, joined by newlines.

        """
        messages = []
        while not self._log_queue.empty():
            timestamp, type_, source, message = self._log_queue.get()
            formatted_time = timestamp.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
            messages.append(f"[{formatted_time}] [{type_}] [{source}] {message}")
        return "\n".join(messages)

    @property
    def log_entries(self) -> list[tuple[datetime, str, str, str]]:
        """
        Get all accumulated log entries.

        Returns:
            list[tuple[datetime, str, str, str]]: A list of \
                tuples containing log entries.

        """
        entries = []
        while not self._log_queue.empty():
            entries.append(self._log_queue.get())
        return entries

    def run(self, *args: tuple[Any, ...], **kwargs: dict[str, Any]) -> Any:  # noqa: ANN401
        """Override this method in subclasses to define the simulation."""
        raise NotImplementedError("The run method must be implemented by the subclass.")

    def start(self, *args: tuple[Any, ...], **kwargs: dict[str, Any]) -> None:
        """
        Start the task in a new process or in the same thread.

        Args:
            *args: Variable length argument list to pass to run().
            **kwargs: Arbitrary keyword arguments to pass to run().

        """
        if self.started:
            raise RuntimeError("Task has already been started")

        if self.run_in_process:
            if self._process is None or not self._process.is_alive():
                self._process = multiprocessing.Process(
                    target=self._run_wrapper, args=args, kwargs=kwargs
                )
                self._process.start()
                self._started = True
                self._exit_pending = True
        else:
            self._started = True
            self._exit_pending = True

            # Run directly in the same thread
            self._run_wrapper(*args, **kwargs)

    def stop(self) -> None:
        """Stop the running task forcefully."""
        self._stop_flag.value = 1
        if self._process and self._process.is_alive():
            self._process.terminate()
            self._process.join()
            try:
                raise RuntimeError(self.stop_message)  # noqa: TRY301
            except Exception as e:  # noqa: BLE001
                self._exception_queue.put((datetime.now(), e, traceback.format_exc()))

    def join(self) -> None:
        """Join the process if it is running."""
        if self._process:
            self._process.join()

    def _cleanup(self) -> None:
        """Cleanup the process if it is forcefully terminated."""
        _exit_code_for_force_termination = 2
        if (
            self._exit_flag.value == _exit_code_for_force_termination
            and self._process is not None
        ):
            self._process.terminate()
            self._process.join()

    @property
    def alive(self) -> bool:
        """
        Check if the task is alive.

        Returns:
            bool: True if the task is alive, False otherwise.

        """
        self._cleanup()

        if not self.run_in_process:
            return False
        if self._process is None:
            return False

        return bool(self._exit_flag.value == 0)

    @property
    def started(self) -> bool:
        """
        Check if the task has started.

        Returns:
            bool: True if the task has started, False otherwise.

        """
        return self._started

    @property
    def exited(self) -> bool:
        """
        Check if the task has exited.

        Returns:
            bool: True if the task has exited, False otherwise.

        """
        if not self.run_in_process:
            # For non-process tasks, consider exited if started and pending exit
            return self.started and self._exit_pending

        if self._process is None:
            return False

        # Process has exited if it was started, has an exitcode, and exit is pending
        return (
            not self.alive
            and
            # self._process.exitcode is not None and
            self.started
            and self._exit_pending
        )

    @property
    def completed(self) -> bool:
        """
        Check if the task has completed.

        Returns:
            bool: True if the task has completed, False otherwise.

        """
        return self.exited and self._progress.value >= 1.0

    @property
    def progress(self) -> float:
        """
        Get the current progress of the task.

        Returns:
            float: Progress value between 0.0 and 1.0.

        """
        return float(self._progress.value)

    def set_progress(self, value: float) -> None:
        """
        Set the progress of the task.

        Args:
            value (float): Progress value between 0.0 and 1.0.

        """
        self._progress.value = value

    @property
    def result(self) -> Any:  # noqa: ANN401
        """
        Get the result of the task execution.

        Returns:
            Any: The return value from the run() method.

        Raises:
            RuntimeError: If an exception occurred during task execution.

        """
        self._cleanup()

        while not self._result_fetched:
            if not self.started:
                raise RuntimeError("Task has not been started")

            if self._exception is not None:
                raise self._exception

            if not self._result_queue.empty():
                self._return_value = self._result_queue.get()
                self._result_fetched = True

            if not self._exception_queue.empty():
                timestamp, exc, tb = (
                    self._exception_queue.get()
                )  # Unpack all three values
                raise RuntimeError(f"Exception in process:\n{tb}") from exc

            time.sleep(0.1)

        return self._return_value

    @property
    def exception(
        self,
    ) -> (
        tuple[Exception | None, str | None]
        | tuple[Exception | None, str | None, Any | None]
        | None
    ):
        """
        Get any exception that occurred during task execution.

        Returns:
            Optional[Union[Tuple[Exception, str], Tuple[datetime, Exception, str]]]:
                A tuple containing (timestamp, exception, traceback) if available,
                or (exception, traceback) if using cached values,
                or None if no exception occurred.

        """
        self._cleanup()

        if not self._exception_queue.empty():
            self.exception_timestamp, self.exc, self.tb = self._exception_queue.get()
            if all([self.exc, self.tb, self.exception_timestamp]):
                return self.exc, self.tb, self.exception_timestamp

        if all([self.exc, self.tb]):
            return self.exc, self.tb, self.exception_timestamp
        return None

    def reset(self) -> None:
        """Reset the task's state to initial conditions."""
        self._cleanup()
        if self._process and self._process.is_alive():
            self.stop()

        self._stop_flag.value = 0
        # Clear all queues
        while not self._result_queue.empty():
            self._result_queue.get()
        while not self._exception_queue.empty():
            self._exception_queue.get()
        while not self._log_queue.empty():
            self._log_queue.get()

        # Reset internal state
        self._progress.value = 0.0
        self._return_value = None
        self._exception = None
        self._process = None
        self.exc = None
        self.tb = None
        self.exception_timestamp = None
        self._started = False
        self._exit_pending = False
        self._exit_flag.value = 0
        self._result_fetched = False

    def disable_exit(self) -> None:
        """Disable the exit flag."""
        self._exit_pending = False

    def on_log_line(self, line: str, source: str) -> None:
        """
        Process a line of output from the task.

        Override this method in subclasses to implement custom log line processing.

        Args:
            line (str): A line of output to process
            source (str): Source of the line (e.g. "stdout", "stderr")

        """


def run_in_subprocess(  # noqa: PLR0915, C901, PLR0912
    task: ProcessTask,
    cmd: str | list[str],
    shell: bool = False,
    cwd: str | None = None,
) -> tuple[str, str]:
    """
    Run a shell command and capture its output.

    Security Warning:
        This function executes shell commands. Ensure that the 'cmd' parameter
        contains trusted input to prevent command injection vulnerabilities.
        When possible, use a list of arguments instead of shell=True.

    Args:
        task: The ProcessTask instance
        cmd: Command to execute (string or list of strings)
        shell: If True, run command through shell
        cwd: Working directory for the command

    Returns:
        tuple[str, str]: Captured stdout and stderr

    Raises:
        subprocess.CalledProcessError: If the command returns non-zero exit status
        ValueError: If the command is empty or None

    """

    def _raise_subprocess_error(error: subprocess.CalledProcessError) -> None:
        raise error

    # Validate input
    if not cmd:
        raise ValueError("Command cannot be empty or None")

    if isinstance(cmd, list):
        cmd = " ".join(cmd)

    if shell and isinstance(cmd, str):
        msg = "Using shell=True with string commands may pose security risks"
        task._log("warning", "process", msg)  # noqa: SLF001

    process = None
    try:
        # Start process
        process = subprocess.Popen(  # noqa: S603
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=shell,
            cwd=cwd,
            text=True,
            bufsize=1,
            universal_newlines=True,
        )

        stdout_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        stderr_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]

        def pipe_reader(pipe: IO[str], queue: multiprocessing.Queue) -> None:  # type: ignore[type-arg]
            """Continuously read from pipe and put lines into queue."""
            try:
                for line in iter(pipe.readline, ""):
                    queue.put(line)
            finally:
                pipe.close()

        # Start reader threads
        stdout_thread = Thread(target=pipe_reader, args=(process.stdout, stdout_queue))
        stderr_thread = Thread(target=pipe_reader, args=(process.stderr, stderr_queue))
        stdout_thread.daemon = True
        stderr_thread.daemon = True
        stdout_thread.start()
        stderr_thread.start()

        stdout_lines = []
        stderr_lines = []

        # Handle output while process runs
        while True:
            if task._stop_flag.value == 1:  # noqa: SLF001
                process.terminate()
                break

            # Process all available stdout
            while not stdout_queue.empty():
                stdout_line = stdout_queue.get_nowait()
                stdout_lines.append(stdout_line)
                task._log("stdout", "process", stdout_line.strip())  # noqa: SLF001
                task.on_log_line(stdout_line.strip(), "stdout")

            # Process all available stderr
            while not stderr_queue.empty():
                stderr_line = stderr_queue.get_nowait()
                stderr_lines.append(stderr_line)
                task._log("stderr", "process", stderr_line.strip())  # noqa: SLF001
                task.on_log_line(stderr_line.strip(), "stderr")

            # Check if process has finished
            retcode = process.poll()
            if retcode is not None:
                # Process any remaining output
                time.sleep(0.1)  # Give threads a chance to finish reading

                while not stdout_queue.empty():
                    stdout_line = stdout_queue.get_nowait()
                    stdout_lines.append(stdout_line)
                    task._log("stdout", "process", stdout_line.strip())  # noqa: SLF001

                while not stderr_queue.empty():
                    stderr_line = stderr_queue.get_nowait()
                    stderr_lines.append(stderr_line)
                    task._log("stderr", "process", stderr_line.strip())  # noqa: SLF001

                if retcode != 0:
                    stdout_str = "".join(stdout_lines)
                    stderr_str = "".join(stderr_lines)
                    error = subprocess.CalledProcessError(
                        retcode, cmd, stdout_str, stderr_str
                    )
                    task._log(  # noqa: SLF001
                        "error",
                        "process",
                        f"Process failed with exit code {retcode}\n{stderr_str}",
                    )
                    _raise_subprocess_error(error)
                break

            # Small sleep to prevent CPU hogging
            time.sleep(0.1)

        return "".join(stdout_lines), "".join(stderr_lines)

    except Exception as e:
        task._log("error", "process", f"Error: {e!s}")  # noqa: SLF001
        if process and process.poll() is None:
            process.kill()
        raise


class SubprocessTask(ProcessTask):
    """
    ProcessTask subclass for running shell commands using subprocess.

    Captures stdout and stderr, with progress parsing from stdout.
    """

    def __init__(
        self, capture_stdout: bool = True, run_in_process: bool = True
    ) -> None:
        """Initialize the subprocess task."""
        super().__init__(
            stop_message="Process was terminated.",
            capture_stdout=capture_stdout,
            run_in_process=run_in_process,
        )

    def run(  # type: ignore[override]
        self, cmd: str | list[str], shell: bool = False, cwd: str | None = None
    ) -> tuple[str, str]:
        """Run a shell command and capture its output."""
        return run_in_subprocess(self, cmd, shell, cwd)


def sync_with_task(
    task_widget: TaskWidget,
    process_task: ProcessTask,
    on_stopped: Callable[[ProcessTask], None] | None = None,
) -> bool:
    """
    Synchronize the task widget with the process task.

    This function synchronizes the task widget with the process task by updating the\
         progress, logs, and error state.

    Args:
        task_widget (TaskWidget): The task widget to synchronize
        process_task (ProcessTask): The process task to synchronize with
        on_stopped (Callable): Callback function for when the task stops

    """
    task_widget.progress = process_task.progress
    log_entries = process_task.log_entries

    # Convert datetime objects to strings in log entries
    formatted_logs = [
        (entry[0].strftime("%Y-%m-%d %H:%M:%S"), entry[1], entry[2], entry[3])
        for entry in log_entries
    ]

    if process_task.exception is not None:
        task_widget.set_error(*process_task.exception)

    if process_task.exception is None and task_widget.error is not None:
        task_widget.clear_error()

    task_widget.add_logs(formatted_logs)

    if process_task.completed and process_task.exception is None:
        task_widget.complete()

    if process_task.exited:
        if on_stopped is not None:
            try:
                on_stopped(process_task)
            except Exception:  # noqa: BLE001
                traceback.print_exc()
        return False

    return True


def process_task_control(
    process_task: ProcessTask,
    on_start: Callable[[], None] | None = None,
    on_stopped: Callable[[ProcessTask], None] | None = None,
    update_interval: float = 1.0,
) -> TaskWidget:
    """
    Control a process task with a task widget.

    This function creates a task widget to synchronize the task widget\
         with the process task.

    Args:
        process_task (ProcessTask): The process task to control
        on_start (Callable): Callback function for when the task starts
        on_stopped (Callable): Callback function for when the task stops
        update_interval (float): The interval between syncs in seconds

    Returns:
        TaskWidget: The task widget

    """

    def _sync_with_task(task_widget: TaskWidget) -> bool:
        return sync_with_task(task_widget, process_task, on_stopped)

    def _on_stop() -> None:
        process_task.stop()

    return TaskWidget(
        on_start=on_start,
        on_stop=_on_stop,
        on_reset=process_task.reset,
        on_sync=_sync_with_task,
        sync_interval=update_interval,
    )
