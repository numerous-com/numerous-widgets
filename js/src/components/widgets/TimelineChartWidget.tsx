import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { TimelineChart } from "../ui/TimelineChart";

import '../../css/styles.scss';

interface Channel {
    id: string;
    name: string;
    description: string;
    unit: string;
    color?: string;
    chart_id?: string;
    chart_type?: 'line' | 'bar';
}

interface DataBlock {
    id: string;
    name: string;
    order: number;
    start_hour: string;
    end_hour: string;
    data: {
        [channelId: string]: (number | null)[];
    };
    dependencies?: string[];
    isDependent?: boolean;
    referenceOrder?: number;
    dependencyType?: 'version' | 'extension' | 'derivative';
}

function TimelineChartWidget() {
    // Model states
    const [channels] = useModelState<Channel[]>("channels");
    const [blocks] = useModelState<DataBlock[]>("blocks");
    const [viewMode, setViewMode] = useModelState<string>("view_mode");
    const [selectedChannelId, setSelectedChannelId] = useModelState<string>("selected_channel_id");
    const [chartOptions] = useModelState<any>("chart_options");
    
    // Update triggers
    const [, setUpdateViewMode] = useModelState<string>("update_view_mode");
    const [, setUpdateSelectedChannel] = useModelState<string>("update_selected_channel");
    const [, setUpdateChannelChartType] = useModelState<{channel_id?: string, chart_type?: string, chart_id?: string}>("update_channel_chart_type");

    // Handle view mode changes
    const handleViewModeChange = (mode: string) => {
        setUpdateViewMode(mode);
    };

    // Handle channel selection
    const handleChannelSelect = (channelId: string) => {
        setUpdateSelectedChannel(channelId);
    };
    
    // Handle channel chart type changes
    const handleChannelChartUpdate = (channelId: string, chartType: string, chartId?: string) => {
        setUpdateChannelChartType({
            channel_id: channelId,
            chart_type: chartType,
            chart_id: chartId
        });
    };

    return (
        <TimelineChart
            channels={channels || []}
            blocks={blocks || []}
            viewMode={viewMode || "channel"}
            selectedChannelId={selectedChannelId || null}
            chartOptions={chartOptions || {}}
            onViewModeChange={handleViewModeChange}
            onChannelSelect={handleChannelSelect}
            onChannelChartUpdate={handleChannelChartUpdate}
        />
    );
}

export default {
    render: createRender(TimelineChartWidget)
} 