import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { NumberInput } from "../ui/NumberInput";
import '../../css/styles.css';

function NumberWidget() {
    // Model states
    const [value, setValue] = useModelState<number>("value");
    const [start] = useModelState<number>("start");
    const [stop] = useModelState<number>("stop");
    const [step] = useModelState<number>("step");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [valid, setValid] = useModelState<boolean>("valid");

    return (
        <NumberInput
            value={value}
            start={start}
            stop={stop}
            step={step}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            valid={valid}
            onChange={setValue}
            onChangeValid={setValid}
        />
    );
}

export default {
    render: createRender(NumberWidget)
}