import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { TaskButton } from "../ui/TaskButton";
import '../../css/styles.scss';

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
    const [resetFlag, setResetFlag] = useModelState<boolean>("reset_flag");
    const [stopped, setStopped] = useModelState<boolean>("stopped");

    React.useEffect(() => {
        if (syncEnabled) {
            const intervalId = setInterval(() => {
                setLastSync(Date.now() / 1000);
            }, syncInterval * 1000);
            
            return () => clearInterval(intervalId);
        }
    }, [syncEnabled, setLastSync]);

    
    const handleReset = async () => {
        console.log("Resetting task");
        console.log(resetFlag);
        setResetFlag(true);
    };

    const handleStart = () => {
        if (!isRunning && !isDisabled) {
            setStarted(true);
        }
    };

    const handleStop = () => {
        setStopped(true);
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
            onStop={handleStop}
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