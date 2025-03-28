import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { NumberInput } from "../ui/NumberInput";
import '../../css/components/NumberInput.scss';
import '../../css/styles.scss';



function NumberWidget() {
    // Model states
    const [value, setValue] = useModelState<number>("value");
    const [start] = useModelState<number>("start");
    const [stop] = useModelState<number>("stop");
    const [step] = useModelState<number>("step");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [labelInline] = useModelState<boolean>("label_inline");
    const [unit] = useModelState<string>("unit");
    const [strictValidation] = useModelState<boolean>("strict_validation");

    return (
        <NumberInput
            value={value}
            start={start}
            stop={stop}
            step={step}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            fitToContent={fitToContent}
            labelInline={labelInline}
            unit={unit || undefined}
            onChange={setValue}
            strictValidation={strictValidation}
        />
    );
}

export default {
    render: createRender(NumberWidget)
}