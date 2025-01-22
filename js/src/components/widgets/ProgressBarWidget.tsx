import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { ProgressBar } from "../ui/ProgressBar";

function ProgressBarWidget() {
    const [value] = useModelState<number>("value");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [labelInline] = useModelState<boolean>("label_inline");

    return (
        <ProgressBar
            value={value}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            fitToContent={fitToContent}
            labelInline={labelInline}
        />
    );
}

export default {
    render: createRender(ProgressBarWidget)
}
