import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { ProgressBar } from "../ui/ProgressBar";
import '../../css/styles.css';

function ProgressBarWidget() {
    const [value] = useModelState<number>("value");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    return (
        <ProgressBar
            value={value}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
        />
    );
}

export default {
    render: createRender(ProgressBarWidget)
}
