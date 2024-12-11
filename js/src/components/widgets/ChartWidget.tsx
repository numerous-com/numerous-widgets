import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { ChartComponent } from "../ui/Chart";
import "../ui/chartjs-registration";

function ChartWidget() {
    // Model states
    const [chartType] = useModelState<string>("chart_type");
    const [chartData] = useModelState<any>("chart_data");
    const [chartOptions] = useModelState<any>("chart_options");

    return (
        <ChartComponent
            type={chartType as any}
            data={chartData}
            options={chartOptions}
        />
    );
}

export default {
    render: createRender(ChartWidget)
} 