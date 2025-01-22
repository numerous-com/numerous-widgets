import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { CheckBox } from "../ui/CheckBox";
import '../../css/styles.scss';

function CheckBoxWidget() {
    // Model states
    const [value, setValue] = useModelState<boolean>("value");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    return (
        <CheckBox
            value={value}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(CheckBoxWidget)
}
