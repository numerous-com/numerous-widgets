import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { FileSaver } from "../ui/FileSaver";
import '../../css/styles.css';

function FileSaverWidget() {
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [content] = useModelState<Uint8Array | null>("content");
    const [suggestedFilename] = useModelState<string | null>("suggested_filename");

    return (
        <FileSaver
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            content={content}
            suggestedFilename={suggestedFilename}
        />
    );
}

export default {
    render: createRender(FileSaverWidget)
} 