import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { DateTimeRangePicker } from "../ui/DateTimeRangePicker";
import '../../css/styles.scss';

function DateTimeRangePickerWidget() {
    // Model states
    const [startValue, setStartValue] = useModelState<string>("start_value");
    const [endValue, setEndValue] = useModelState<string>("end_value");
    const [minDate] = useModelState<string>("min_date");
    const [maxDate] = useModelState<string>("max_date");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");

    const handleChange = (start: string, end: string) => {
        setStartValue(start);
        setEndValue(end);
    };

    return (
        <DateTimeRangePicker
            startValue={startValue}
            endValue={endValue}
            minDate={minDate}
            maxDate={maxDate}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={handleChange}
        />
    );
}

export default {
    render: createRender(DateTimeRangePickerWidget)
} 