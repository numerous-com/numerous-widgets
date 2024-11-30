import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Timer } from "../ui/Timer";
import '../../css/styles.css';

function TimerWidget() {
    const [interval] = useModelState<number>("interval");
    const [isActive, setIsActive] = useModelState<boolean>("is_active");
    const [uiLabel] = useModelState<string>("ui_label");
    const [lastTick, setLastTick] = useModelState<number>("last_tick");

    const handleTick = React.useCallback(() => {

        setLastTick(Date.now() / 1000);
    }, [setLastTick]);


    return (
        <Timer
            interval={interval}
            isActive={isActive}
            uiLabel={uiLabel}
            onTick={handleTick}
            onToggle={setIsActive}
        />
    );
}

export default {
    render: createRender(TimerWidget)
} 