import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tabs } from "../ui/Tabs";
import '../../css/styles.css';

interface TabsProps {
    value: string;
    tabs: string[];
    uiLabel: string;
    uiTooltip: string;
    tabIds: {[key: string]: string};
    tabRefs: {[key: string]: React.RefObject<HTMLDivElement>};
    onChange: (value: string) => void;
}

function TabsWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [tabs] = useModelState<string[]>("tabs");
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [tabIds] = useModelState<{[key: string]: string}>("tab_ids");
    const [tabRefs, setTabRefs] = useModelState<{[key: string]: {current: null}}>("tab_refs");

    // Create and manage refs
    const localRefs = React.useMemo(() => {
        console.log('Creating new refs');
        return tabs.reduce((acc, tab) => {
            acc[tab] = React.createRef<HTMLDivElement>();
            return acc;
        }, {} as {[key: string]: React.RefObject<HTMLDivElement>});
    }, [tabs]);

    // Update refs when elements are mounted/updated
    React.useEffect(() => {
        const currentRefs = tabs.reduce((acc, tab) => {
            acc[tab] = {
                current: null
            };
            return acc;
        }, {} as {[key: string]: {current: null}});
        
        setTabRefs(currentRefs);
    }, [tabs]);

    return (
        <Tabs
            value={value}
            tabs={tabs}
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            tabIds={tabIds}
            tabRefs={localRefs}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(TabsWidget)
}
