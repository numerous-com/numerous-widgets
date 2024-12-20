import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Slider } from "../ui/Slider";
import '../../css/styles.css';

function SliderWidget() {
    // Model states
    const [value, setValue] = useModelState<number>("value");
    const [minValue] = useModelState<number>("min_value");
    const [maxValue] = useModelState<number>("max_value");
    const [step] = useModelState<number>("step");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    return (
        <Slider
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(SliderWidget)
} 