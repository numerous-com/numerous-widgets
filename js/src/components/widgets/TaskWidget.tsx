import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { TaskButton } from "../ui/TaskButton";
import '../../css/styles.css';

function TaskWidget() {
    const [isRunning, setIsRunning] = useModelState<boolean>("is_running");
    const [isCompleted, setIsCompleted] = useModelState<boolean>("is_completed");
    const [isFailed, setIsFailed] = useModelState<boolean>("is_failed");
    const [isDisabled] = useModelState<boolean>("is_disabled");
    const [started, setStarted] = useModelState<boolean>("started");
    const [progress, setProgress] = useModelState<number>("progress");
    const [logs, setLogs] = useModelState<[string, string, string, string][]>("logs");
    const [error] = useModelState<{
        message: string;
        traceback?: string;
        timestamp: string;
    } | null>("error");
    const [lastSync, setLastSync] = useModelState<number>("last_sync");
    const [syncEnabled] = useModelState<boolean>("sync_enabled");
    const [syncInterval] = useModelState<number>("sync_interval");

    React.useEffect(() => {
        if (syncEnabled && isRunning) {
            const intervalId = setInterval(() => {
                setLastSync(Date.now() / 1000);
            }, syncInterval * 1000);
            
            return () => clearInterval(intervalId);
        }
    }, [syncEnabled, isRunning, setLastSync]);

    const handleReset = async () => {
        setProgress(0);
        setIsRunning(false);
        setIsCompleted(false);
        setIsFailed(false);
        setStarted(false);
        setLogs([]);
    };

    const handleStart = () => {
        if (!isRunning && !isCompleted && !isFailed) {
            setIsRunning(true);
            setStarted(true);
        }
    };

    return (
        <TaskButton
            isRunning={isRunning}
            isCompleted={isCompleted}
            isFailed={isFailed}
            isDisabled={isDisabled}
            started={started}
            progress={progress}
            onStart={handleStart}
            onStop={() => {
                setIsRunning(false);
                setProgress(0);
            }}
            onReset={handleReset}
            taskName="Task"
            error={error ?? undefined}
            logs={logs || []}
        />
    );
}

const widget = {
    render: createRender(TaskWidget)
};

export default widget; 