from typing import Any, Optional, Tuple, List, Union
import multiprocessing
import time
import traceback
import sys
import io
from datetime import datetime
from .. import Task as TaskWidget
from .. import Timer
from typing import Callable
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

    def __init__(self, stop_message: str = "Process was forcefully terminated.", capture_stdout: bool = False, 
                 run_in_process: bool = True) -> None:
        self._process: Optional[multiprocessing.Process] = None
        self._progress = multiprocessing.Value("d", 0.0)
        self._stop_flag = multiprocessing.Value('i', 0)
        self._result_queue: multiprocessing.Queue = multiprocessing.Queue()
        self._exception_queue: multiprocessing.Queue = multiprocessing.Queue()
        self._log_queue: multiprocessing.Queue = multiprocessing.Queue()
        self._return_value: Any = None
        self._exception: Optional[Exception] = None
        self.stop_message: str = stop_message
        self.capture_stdout: bool = capture_stdout
        self.run_in_process: bool = run_in_process
        self.exc: Optional[Exception] = None
        self.tb: Optional[str] = None

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
                            self.queue.put((timestamp, "stdout", "process", text.strip()))
                        self.original_stdout.write(text)

                    def flush(self):
                        self.original_stdout.flush()

                sys.stdout = StreamToQueue(self._log_queue)
                sys.stderr = StreamToQueue(self._log_queue)

            try:
                result = self.run(*args, **kwargs)
                self._result_queue.put(result)
            except Exception as e:
                # Log the exception details
                self._log_queue.put((datetime.now(), "error", "process", f"Error in run(): {str(e)}"))
                self._log_queue.put((datetime.now(), "error", "process", f"Traceback:\n{traceback.format_exc()}"))
                # Put the exception in the queue
                self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
                raise  # Re-raise to ensure the process exits with error
            finally:
                # Always mark as complete, even if there was an error
                self._progress.value = 1.0

        except Exception as e:
            # Catch any exceptions that might occur in the stdout/stderr redirection
            self._log_queue.put((datetime.now(), "error", "process", f"Error in wrapper: {str(e)}"))
            self._log_queue.put((datetime.now(), "error", "process", f"Traceback:\n{traceback.format_exc()}"))
            self._exception_queue.put((datetime.now(), e, traceback.format_exc()))
            raise
        finally:
            # Always restore stdout/stderr
            if self.capture_stdout:
                sys.stdout = sys.__stdout__
                sys.stderr = sys.__stderr__
            
            # Ensure queues are flushed
            try:
                while not self._log_queue.empty():
                    time.sleep(0.1)
            except:
                pass

    def log(self, message: str) -> None:
        """Add a log entry to the queue.

        Args:
            message (str): The message to add to the log queue.
        """
        self._log_queue.put((datetime.now(), "info", "task", message))

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
        return '\n'.join(messages)
    
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
        self._progress.value = 0.0
        self._return_value = None
        self._exception = None
        
        if self.run_in_process:
            if self._process is None or not self._process.is_alive():
                self._process = multiprocessing.Process(
                    target=self._run_wrapper, args=args, kwargs=kwargs
                )
                self._process.start()
        else:
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

    @property
    def alive(self) -> bool:
        return self._process.is_alive() if self._process else False

    @property
    def progress(self) -> float:
        """Get the current progress of the task.

        Returns:
            float: Progress value between 0.0 and 1.0.
        """
        return self._progress.value
    
    @property
    def result(self) -> Any:
        """Get the result of the task execution.

        Returns:
            Any: The return value from the run() method.

        Raises:
            RuntimeError: If an exception occurred during task execution.
        """
        if self._process is not None:
            self._process.join()  # Wait for process to finish

        if self._exception is not None:
            raise self._exception

        if not self._result_queue.empty():
            self._return_value = self._result_queue.get()

        if not self._exception_queue.empty():
            timestamp, exc, tb = self._exception_queue.get()  # Unpack all three values
            raise RuntimeError(f"Exception in process:\n{tb}") from exc

        return self._return_value

    @property
    def exception(self) -> Optional[Union[Tuple[Exception, str], Tuple[Exception, str, datetime]]]:
        """Get any exception that occurred during task execution.

        Returns:
            Optional[Union[Tuple[Exception, str], Tuple[datetime, Exception, str]]]: 
                A tuple containing (timestamp, exception, traceback) if available,
                or (exception, traceback) if using cached values,
                or None if no exception occurred.
        """
        if not self._exception_queue.empty():
            self.exception_timestamp, self.exc, self.tb = self._exception_queue.get()
            return self.exc, self.tb, self.exception_timestamp
        
        if self.exc is not None:
            return self.exc, self.tb, self.exception_timestamp
        return None
    
    @property
    def completed(self) -> bool:
        return self._progress.value >= 1.0

    def reset(self) -> None:
        """Reset the task's state to initial conditions."""

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

class SubprocessTask(ProcessTask):
    """ProcessTask subclass for running shell commands using subprocess.
    
    Captures stdout and stderr, with progress parsing from stdout.
    """
    
    def __init__(self, *args, progress_parser: Optional[Callable[[str], Optional[float]]]=None, **kwargs) -> None:
        """Initialize the subprocess task.
        
        Args:
            progress_parser: Callable that takes a stdout line and returns a float progress value (0-1) 
                           or None if the line doesn't contain progress info
            *args: Additional arguments passed to ProcessTask
            **kwargs: Additional keyword arguments passed to ProcessTask
        """
        super().__init__(*args, stop_message="Process was terminated.", **kwargs)
        self._progress_parser = progress_parser
        
    def run(self, cmd: Union[str, List[str]], shell: bool = False, cwd: Optional[str] = None) -> Tuple[str, str]:
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
                universal_newlines=True
            )
            
            from queue import Queue
            from threading import Thread
            
            stdout_queue = Queue()
            stderr_queue = Queue()
            
            def pipe_reader(pipe, queue):
                """Continuously read from pipe and put lines into queue."""
                try:
                    for line in iter(pipe.readline, ''):
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
                if self._stop_flag.value == 1:
                    process.terminate()
                    break
                
                # Process all available stdout
                while not stdout_queue.empty():
                    stdout_line = stdout_queue.get_nowait()
                    stdout_lines.append(stdout_line)
                    self._log_queue.put((datetime.now(), "stdout", "process", stdout_line.strip()))
                    if self._progress_parser:
                        progress = self._progress_parser(stdout_line)
                        if progress is not None:
                            self._progress.value = progress
                
                # Process all available stderr
                while not stderr_queue.empty():
                    stderr_line = stderr_queue.get_nowait()
                    stderr_lines.append(stderr_line)
                    self._log_queue.put((datetime.now(), "stderr", "process", stderr_line.strip()))
                
                # Check if process has finished
                retcode = process.poll()
                if retcode is not None:
                    # Process any remaining output
                    time.sleep(0.1)  # Give threads a chance to finish reading
                    
                    while not stdout_queue.empty():
                        stdout_line = stdout_queue.get_nowait()
                        stdout_lines.append(stdout_line)
                        self._log_queue.put((datetime.now(), "stdout", "process", stdout_line.strip()))
                        
                    while not stderr_queue.empty():
                        stderr_line = stderr_queue.get_nowait()
                        stderr_lines.append(stderr_line)
                        self._log_queue.put((datetime.now(), "stderr", "process", stderr_line.strip()))
                    
                    if retcode != 0:
                        stdout_str = ''.join(stdout_lines)
                        stderr_str = ''.join(stderr_lines)
                        error = subprocess.CalledProcessError(
                            retcode, cmd, 
                            stdout_str,
                            stderr_str
                        )
                        self._log_queue.put((datetime.now(), "error", "process", 
                                           f"Process failed with exit code {retcode}\n{stderr_str}"))
                        raise error
                    break
                
                # Small sleep to prevent CPU hogging
                time.sleep(0.1)

            return ''.join(stdout_lines), ''.join(stderr_lines)
            
        except Exception as e:
            # Ensure we capture and log any exceptions
            self._log_queue.put((datetime.now(), "error", "process", f"Error: {str(e)}"))
            if process and process.poll() is None:
                process.kill()
            raise

# Example subclass implementation
from time import sleep
class Simulation(ProcessTask):
    """Example simulation class demonstrating Task usage.

    A simple simulation that calculates changes in a value over time based on
    power input and loss factors.
    """

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, stop_message="Simulation was stopped.", **kwargs)

    def run(self, duration: float, input1: float, input2: float, do_raise: bool = False) -> Tuple[str, List[float], List[float]]:
        """Run the simulation.

        Args:
            duration (float): The duration of the simulation in seconds.
            input1 (float): Initial value for y.
            input2 (float): Power input value.

        Returns:
            tuple: A tuple containing (str, list, list):
                - Status message
                - Time points list
                - Result values list
        """
        y = input1
        power = input2
        result = []
        t = []
        print("Dur")
        print(duration)

        print(self._progress.value)
        self._progress.value = 0.0
        iterations = int(duration * 10)

        if do_raise:
            raise ValueError("Test exception")

        print("it")
        print(iterations)
        for i in range(iterations):
            print(i)
            loss = y * 0.01
            dy = power/10 - loss
            y += dy

            result.append(y)
            t.append(i/10)

            if self._progress.value >= 1.0:
                break
            self._progress.value = i / (duration * 10)
            self.log(f"Progress: {self._progress.value:.2%}")  # Using log instead of print
            print(f"STD OUT Progress: {self._progress.value:.2%}")
            sleep(0.1)
            print("!")

        return "Simulation complete!", t, result

def sync_with_task(task_widget: TaskWidget, process_task: ProcessTask) -> None:
    """Synchronize the task widget with the process task
    
    This function synchronizes the task widget with the process task by updating the progress, logs, and error state.

    Args:
        task_widget (TaskWidget): The task widget to synchronize
        process_task (ProcessTask): The process task to synchronize with
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


def process_task_control(process_task: ProcessTask, on_start: Callable, on_stop: Callable=None, update_interval: float = 1.0) -> Tuple[TaskWidget, Timer]:
    """Control a process task with a task widget
    
    This function creates a task widget and a timer to synchronize the task widget with the process task.

    Args:
        process_task (ProcessTask): The process task to control
        on_start (Callable): Callback function for when the task starts
        on_stop (Callable): Callback function for when the task stops
        update_interval (float): The interval between syncs in seconds

    Returns:
        Tuple[TaskWidget, Timer]: A tuple containing the task widget and timer
    """
    def _sync_with_task(task_widget: TaskWidget):

        sync_with_task(task_widget, process_task)

    def _on_stop():
        process_task.stop()
        if on_stop is not None:
            on_stop()
        

    task_widget = TaskWidget(on_start=on_start, on_stop=_on_stop, on_reset=process_task.reset, on_sync=_sync_with_task, sync_interval=update_interval)

    return task_widget