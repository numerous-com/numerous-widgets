import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Slider } from "../ui/Slider";
import '../../css/components/Slider.scss';

function SliderWidget() {
    // Model states
    const [value, setValue] = useModelState<number>("value");
    const [minValue] = useModelState<number>("min_value");
    const [maxValue] = useModelState<number>("max_value");
    const [step] = useModelState<number>("step");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [fitToContent] = useModelState<boolean>("fit_to_content");
    const [labelInline] = useModelState<boolean>("label_inline");

    return (
        <Slider
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            fitToContent={fitToContent}
            labelInline={labelInline}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(SliderWidget)
} 