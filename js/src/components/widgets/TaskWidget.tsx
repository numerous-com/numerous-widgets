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

    const handleReset = async () => {
        setProgress(0);
        setIsRunning(false);
        setIsCompleted(false);
        setIsFailed(false);
        setStarted(false);

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
        />
    );
}

const widget = {
    render: createRender(TaskWidget)
};

export default widget; 