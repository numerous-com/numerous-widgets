import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { DropDown } from "../ui/DropDown";
import '../../css/styles.css';

function DropDownWidget() {
    // Model states
    const [selected_key, setSelectedKey] = useModelState<string>("selected_key");
    const [selected_value, setSelectedValue] = useModelState<string>("selected_value");
    const [options] = useModelState<string[]>("options");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    
    const handleChange = (value: string) => {
        setSelectedKey(value);
        setSelectedValue(value);
    };

    return (
        <DropDown
            selected_key={selected_key}
            options={options}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={handleChange}
            fitToContent={fitToContent}
        />
    );
}

export default {
    render: createRender(DropDownWidget)
}
