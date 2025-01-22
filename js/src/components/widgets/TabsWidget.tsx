import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tabs } from "../ui/Tabs";
import '../../css/styles.scss';

function TabsWidget({ model }: { model?: any }) {
    const [tabs] = useModelState<string[]>("tabs");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [contentUpdated, setContentUpdated] = useModelState<boolean>("content_updated");
    const [activeTab, setModelActiveTab] = useModelState<string>("active_tab");
  

    const handleTabChange = (newValue: string) => {
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
