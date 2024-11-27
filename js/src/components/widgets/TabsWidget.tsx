import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tabs } from "../ui/Tabs";
import { getActiveTab, setActiveTab } from "../../store/tabsStore";
import '../../css/styles.css';

function TabsWidget({ model }: { model?: any }) {
    const [tabs] = useModelState<{[key: string]: string}>("tabs");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [contentUpdated, setContentUpdated] = useModelState<boolean>("content_updated");
    const [activeTab, setModelActiveTab] = useModelState<string>("active_tab");

    // Use the widget's model ID as a unique identifier, or fallback to a default
    const widgetId = model?.model_id || 'default';

    // Initialize the global store with the initial active tab
    React.useEffect(() => {
        const storedTab = getActiveTab(widgetId);
        if (!storedTab && activeTab) {
            setActiveTab(widgetId, activeTab);
        }
    }, [widgetId, activeTab]);

    // Initialize with stored tab or first tab if no active tab is set
    React.useEffect(() => {
        const storedTab = getActiveTab(widgetId);
        if (storedTab) {
            setModelActiveTab(storedTab);
        } else if (!activeTab && tabs && Object.keys(tabs).length > 0) {
            const firstTab = Object.keys(tabs)[0];
            setModelActiveTab(firstTab);
            setActiveTab(widgetId, firstTab);
        }
    }, [tabs, activeTab]);

    const handleTabChange = (newValue: string) => {
        setActiveTab(widgetId, newValue);     // Update global store
        setModelActiveTab(newValue);          // Update model state
    };

    const currentTab = getActiveTab(widgetId) || activeTab;

    return (
        <Tabs
            value={currentTab}
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
