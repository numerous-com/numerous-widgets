import multiprocessing
import time
import traceback
import sys
from datetime import datetime
from numerous.widgets.base.task import Task as TaskWidget
from numerous.widgets.base.timer import Timer
from typing import Callable, Dict, Any, Optional, Tuple, List, Union
import subprocess


class ProcessTask:
    """A base class for running long-running tasks in a separate process with progress tracking.

    This class provides functionality for running tasks asynchronously, monitoring their progress,
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
        self._process: Optional[multiprocessing.Process] = None
        self._progress = multiprocessing.Value("d", 0.0)
        self._stop_flag = multiprocessing.Value("i", 0)
        self._exit_flag = multiprocessing.Value("i", 0)
        self._result_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._exception_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._log_queue: multiprocessing.Queue = multiprocessing.Queue()  # type: ignore[type-arg]
        self._return_value: Any = None
        self._exception: Optional[Exception] = None
        self.stop_message: str = stop_message
        self.capture_stdout: bool = capture_stdout
        self.run_in_process: bool = run_in_process
        self.exc: Optional[Exception] = None
        self.tb: Optional[str] = None
        self._started: bool = False
        self._exit_pending: bool = False
        self._result_fetched: bool = False

    def _log(self, type_: str, source: str, message: str) -> None:
        """Internal method to add a log entry to the queue.

        Args:
            type_ (str): The type of log entry (e.g., "info", "error", "stdout")
            source (str): The source of the log entry (e.g., "process", "task")
            message (str): The message to log
        """
        self._log_queue.put((datetime.now(), type_, source, message))

    def _run_wrapper(self, *args: Any, **kwargs: Any) -> None:
        """Internal wrapper method to handle task execution and exception handling.

        Args:
            *args: Variable length argument list to pass to run().
            **kwargs: Arbitrary keyword arguments to pass to run().
        """

        try:
            if self.capture_stdout:
                # Redirect stdout and stderr to capture all output
                class StreamToQueue:
                    def __init__(self, queue):
                        self.queue = queue
                        self.original_stdout = sys.stdout

                    def write(self, text):
                        if text.strip():  # Only queue non-empty strings
                            timestamp = datetime.now()
                            self.queue.put(
                                (timestamp, "stdout", "process", text.strip())
                            )
                        self.original_stdout.write(text)

                    def flush(self):
                        self.original_stdout.flush()

                sys.stdout = StreamToQueue(self._log_queue)
                sys.stderr = StreamToQueue(self._log_queue)

            try:

                result = self.run(*args, **kwargs)

                self._result_queue.put(result)

            except Exception as e:

                self._log("error", "process", f"Error in run(): {str(e)}")
                self._log("error", "process", f"Traceback:\n{traceback.format_exc()}")
                self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
                raise
            finally:

                # Always mark as complete, even if there was an error
                self._progress.value = 1.0

        except Exception as e:

            self._log("error", "process", f"Error in wrapper: {str(e)}")
            self._log("error", "process", f"Traceback:\n{traceback.format_exc()}")
            self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
            raise
        finally:

            # Always restore stdout/stderr
            if self.capture_stdout:
                sys.stdout = sys.__stdout__
                sys.stderr = sys.__stderr__

            self._exit_flag.value = 1
            # signal.raise_signal(signal.SIGTERM)

    def log(self, message: str) -> None:
        """Add a log entry to the queue.

        Args:
            message (str): The message to add to the log queue.
        """
        self._log("info", "task", message)

    @property
    def log_strings(self) -> str:
        """Get all accumulated log messages.

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
    def log_entries(self) -> List[Tuple[datetime, str, str, str]]:
        entries = []
        while not self._log_queue.empty():
            entries.append(self._log_queue.get())
        return entries

    def run(self, *args: Any, **kwargs: Any) -> Any:
        """Override this method in subclasses to define the simulation."""
        raise NotImplementedError("The run method must be implemented by the subclass.")

    def start(self, *args: Any, **kwargs: Any) -> None:
        """Start the task in a new process or in the same thread.

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
            self.started = True
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
                raise RuntimeError(self.stop_message)
            except Exception as e:
                self._exception_queue.put((datetime.now(), e, traceback.format_exc()))

    def join(self) -> None:
        if self._process:
            self._process.join()

    def _cleanup(self) -> None:
        if self._exit_flag.value == 2:
            if self._process is not None:
                self._process.terminate()
                self._process.join()

    @property
    def alive(self) -> bool:
        self._cleanup()

        if not self.run_in_process:
            return False
        if self._process is None:
            return False
        # A process is only considered alive if it's running (exitcode is None)
        # return self._process.is_alive() and self._process.exitcode is None
        return self._exit_flag.value == 0

    @property
    def started(self) -> bool:
        return self._started

    @property
    def exited(self) -> bool:
        if not self.run_in_process:
            # For non-process tasks, consider exited if started and pending exit
            return self.started and self._exit_pending

        if self._process is None:
            return False

        # Process has exited if it was started, has an exitcode, and exit is pending
        has_exited = (
            not self.alive
            and
            # self._process.exitcode is not None and
            self.started
            and self._exit_pending
        )

        if has_exited:
            self._exit_pending = False

        return has_exited

    @property
    def completed(self) -> bool:
        return self.exited and self._progress.value >= 1.0

    @property
    def progress(self) -> float:
        """Get the current progress of the task.

        Returns:
            float: Progress value between 0.0 and 1.0.
        """
        return self._progress.value

    def set_progress(self, value: float) -> None:
        """Set the progress of the task.

        Args:
            value (float): Progress value between 0.0 and 1.0.
        """
        self._progress.value = value

    @property
    def result(self) -> Any:
        """Get the result of the task execution.

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
    ) -> Optional[Union[Tuple[Exception, str], Tuple[Exception, str, datetime]]]:
        """Get any exception that occurred during task execution.

        Returns:
            Optional[Union[Tuple[Exception, str], Tuple[datetime, Exception, str]]]:
                A tuple containing (timestamp, exception, traceback) if available,
                or (exception, traceback) if using cached values,
                or None if no exception occurred.
        """
        self._cleanup()

        if not self._exception_queue.empty():
            self.exception_timestamp, self.exc, self.tb = self._exception_queue.get()
            return self.exc, self.tb, self.exception_timestamp

        if self.exc is not None:
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
        self._exit_pending = False

    def on_log_line(self, line: str, source: str) -> None:
        """Process a line of output from the task.
        Override this method in subclasses to implement custom log line processing.

        Args:
            line (str): A line of output to process
            source (str): Source of the line (e.g. "stdout", "stderr")
        """
        pass


def run_in_subprocess(
    task: ProcessTask,
    cmd: Union[str, List[str]],
    shell: bool = False,
    cwd: Optional[str] = None,
) -> Tuple[str, str]:
    """Run a shell command and capture its output."""
    process = None
    try:
        # Start process
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=shell,
            cwd=cwd,
            text=True,
            bufsize=1,
            universal_newlines=True,
        )

        from queue import Queue
        from threading import Thread

        stdout_queue = Queue()
        stderr_queue = Queue()

        def pipe_reader(pipe, queue):
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
            if task._stop_flag.value == 1:
                process.terminate()
                break

            # Process all available stdout
            while not stdout_queue.empty():
                stdout_line = stdout_queue.get_nowait()
                stdout_lines.append(stdout_line)
                task._log("stdout", "process", stdout_line.strip())
                task.on_log_line(stdout_line.strip(), "stdout")

            # Process all available stderr
            while not stderr_queue.empty():
                stderr_line = stderr_queue.get_nowait()
                stderr_lines.append(stderr_line)
                task._log("stderr", "process", stderr_line.strip())
                task.on_log_line(stderr_line.strip(), "stderr")

            # Check if process has finished
            retcode = process.poll()
            if retcode is not None:
                # Process any remaining output
                time.sleep(0.1)  # Give threads a chance to finish reading

                while not stdout_queue.empty():
                    stdout_line = stdout_queue.get_nowait()
                    stdout_lines.append(stdout_line)
                    task._log("stdout", "process", stdout_line.strip())

                while not stderr_queue.empty():
                    stderr_line = stderr_queue.get_nowait()
                    stderr_lines.append(stderr_line)
                    task._log("stderr", "process", stderr_line.strip())

                if retcode != 0:
                    stdout_str = "".join(stdout_lines)
                    stderr_str = "".join(stderr_lines)
                    error = subprocess.CalledProcessError(
                        retcode, cmd, stdout_str, stderr_str
                    )
                    task._log(
                        "error",
                        "process",
                        f"Process failed with exit code {retcode}\n{stderr_str}",
                    )
                    raise error
                break

            # Small sleep to prevent CPU hogging
            time.sleep(0.1)

        return "".join(stdout_lines), "".join(stderr_lines)

    except Exception as e:
        task._log("error", "process", f"Error: {str(e)}")
        if process and process.poll() is None:
            process.kill()
        raise


class SubprocessTask(ProcessTask):
    """ProcessTask subclass for running shell commands using subprocess.

    Captures stdout and stderr, with progress parsing from stdout.
    """

    def __init__(self, *args, **kwargs) -> None:
        """Initialize the subprocess task."""
        super().__init__(*args, stop_message="Process was terminated.", **kwargs)

    def run(self, *args: Tuple[Any], **kwargs: Dict[str, Any]) -> Any:
        return run_in_subprocess(self, *args, **kwargs)


def sync_with_task(
    task_widget: TaskWidget, process_task: ProcessTask, on_stopped: Callable = None
) -> None:
    """Synchronize the task widget with the process task

    This function synchronizes the task widget with the process task by updating the progress, logs, and error state.

    Args:
        task_widget (TaskWidget): The task widget to synchronize
        process_task (ProcessTask): The process task to synchronize with
        on_stopped (Callable): Callback function for when the task stops
    """

    task_widget.progress = process_task.progress
    log_entries = process_task.log_entries

    if process_task.exception is not None:
        task_widget.set_error(*process_task.exception)

    if process_task.exception is None and task_widget.error is not None:
        task_widget.clear_error()

    task_widget.add_logs(log_entries)

    if process_task.completed and process_task.exception is None:
        task_widget.complete()

    if process_task.exited:
        if on_stopped:
            try:
                on_stopped(process_task)
            except Exception as e:
                print("Error in on_stopped callback", e)
                traceback.print_exc()
        return False

    return True


def process_task_control(
    process_task: ProcessTask,
    on_start: Callable,
    on_stopped: Callable = None,
    update_interval: float = 1.0,
) -> Tuple[TaskWidget, Timer]:
    """Control a process task with a task widget

    This function creates a task widget to synchronize the task widget with the process task.

    Args:
        process_task (ProcessTask): The process task to control
        on_start (Callable): Callback function for when the task starts
        on_stop (Callable): Callback function for when the task stops
        update_interval (float): The interval between syncs in seconds

    Returns:
        TaskWidget: The task widget
    """

    def _sync_with_task(task_widget: TaskWidget) -> bool:

        return sync_with_task(task_widget, process_task, on_stopped)

    def _on_stop() -> None:
        process_task.stop()

    task_widget = TaskWidget(
        on_start=on_start,
        on_stop=_on_stop,
        on_reset=process_task.reset,
        on_sync=_sync_with_task,
        sync_interval=update_interval,
    )

    return task_widget
