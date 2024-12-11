import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { PlotComponent } from "../ui/Plot";

function PlotWidget() {
    // Model states
    const [plotData] = useModelState<any>("plot_data");
    const [plotLayout] = useModelState<any>("plot_layout");
    const [plotConfig] = useModelState<any>("plot_config");

    return (
        <PlotComponent
            data={plotData}
            layout={plotLayout}
            config={plotConfig}
        />
    );
}

export default {
    render: createRender(PlotWidget)
} 