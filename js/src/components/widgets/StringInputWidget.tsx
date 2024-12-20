import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { StringInput } from "../ui/String";
import '../../css/styles.css';

function StringWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [placeholder] = useModelState<string>("placeholder");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [validationRegex] = useModelState<string>("validation_regex");
    const [isPassword] = useModelState<boolean>("is_password");

    return (
        <StringInput
            value={value}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            placeholder={placeholder}
            fitToContent={fitToContent}
            validationRegex={validationRegex}
            isPassword={isPassword}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(StringWidget)
} 