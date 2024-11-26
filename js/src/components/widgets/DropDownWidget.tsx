import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { DropDown } from "../ui/DropDown";
import '../../css/styles.css';

function DropDownWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [options] = useModelState<string[]>("options");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    return (
        <DropDown
            value={value}
            options={options}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(DropDownWidget)
}
