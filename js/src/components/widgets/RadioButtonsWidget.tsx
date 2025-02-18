import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { RadioButtons } from "../ui/RadioButtons";
import '../../css/styles.scss';

function RadioButtonsWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [options] = useModelState<string[]>("options");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [labelInline] = useModelState<boolean>("label_inline");

    return (
        <RadioButtons
            value={value}
            options={options}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            fitToContent={fitToContent}
            labelInline={labelInline}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(RadioButtonsWidget)
} 