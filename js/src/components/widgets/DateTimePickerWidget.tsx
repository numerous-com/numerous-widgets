import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { DateTimePicker } from "../ui/DateTimePicker";
import '../../css/styles.scss';

function DateTimePickerWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [minDate] = useModelState<string>("min_date");
    const [maxDate] = useModelState<string>("max_date");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    return (
        <DateTimePicker
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(DateTimePickerWidget)
} 