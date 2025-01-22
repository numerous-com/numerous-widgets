import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { StringInput } from "../ui/String";
import '../../css/styles.scss';

function StringWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [placeholder] = useModelState<string>("placeholder");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [isValid] = useModelState<boolean>("is_valid");
    const [isPassword] = useModelState<boolean>("is_password");
    const [validationMessage] = useModelState<string>("validation_message");
    const [labelInline] = useModelState<boolean>("label_inline");

    return (
        <StringInput
            value={value}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            placeholder={placeholder}
            fitToContent={fitToContent}
            isValid={isValid}
            isPassword={isPassword}
            validationMessage={validationMessage}
            labelInline={labelInline}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(StringWidget)
} 