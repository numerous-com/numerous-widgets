import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tabs } from "../ui/Tabs";
import { getActiveTab, setActiveTab } from "../../store/tabsStore";
import '../../css/styles.css';

function TabsWidget({ model }: { model?: any }) {
    const [tabs] = useModelState<string[]>("tabs");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [contentUpdated, setContentUpdated] = useModelState<boolean>("content_updated");
    const [activeTab, setModelActiveTab] = useModelState<string>("active_tab");

    // Use the widget's model ID as a unique identifier, or fallback to a default
    const widgetId = model?.model_id || 'default';

   

    const handleTabChange = (newValue: string) => {
        setActiveTab(widgetId, newValue);     // Update global store
        setModelActiveTab(newValue);          // Update model state
    };


    return (
        <Tabs
            value={activeTab}
            tabs={tabs}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            onChange={handleTabChange}
            contentUpdated={contentUpdated}
            setContentUpdated={setContentUpdated}
        />
    );
}

export default {
    render: createRender(TabsWidget)
}
