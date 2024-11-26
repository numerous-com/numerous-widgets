import * as React from "react";
import { Tooltip } from './Tooltip';

interface TabsProps {
    value: string;
    tabs: string[];
    uiLabel: string;
    uiTooltip: string;
    tabIds: {[key: string]: string};
    onChange: (value: string) => void;
}

export function Tabs({
    value,
    tabs,
    uiLabel,
    uiTooltip,
    tabIds,
    onChange,
}: TabsProps) {
    const tabElements = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Dispatch event whenever tabs or elements change
    const dispatchMountEvent = React.useCallback(() => {
        const elements = Object.fromEntries(
            Object.entries(tabElements.current)
                .filter(([_, el]) => el !== null)
        );
        
        // Only dispatch if we have all elements ready
        if (Object.keys(elements).length === Object.keys(tabIds).length) {
            const event = new CustomEvent('marimo:tabs-mounted', {
                detail: { tabIds, elements }
            });
            document.dispatchEvent(event);
        }
    }, [tabIds]);

    // Initial mount
    React.useEffect(() => {
        dispatchMountEvent();
    }, [dispatchMountEvent]);

    // Re-dispatch when tab elements change
    const setTabRef = React.useCallback((tabId: string, el: HTMLDivElement | null) => {
        tabElements.current[tabId] = el;
        dispatchMountEvent();
    }, [dispatchMountEvent]);

    return (
        <div className="tabs-container">
            {uiLabel && (
                <label className="tabs-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className="tabs-list">
                <div className="tabs-row">
                    {tabs.map(tab => (
                        <div
                            key={tab}
                            className={`tab ${tab === value ? 'active' : ''}`}
                            onClick={() => onChange(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                {tabs.map(tab => {
                    const tabId = tabIds[tab];
                    return (
                        <div
                            key={tab}
                            ref={el => setTabRef(tabId, el)}
                            id={tabId}
                            className={`tab-content ${tab === value ? 'active' : 'hidden'}`}
                            data-tab={tab}
                            data-marimo-tab="true"
                        >
                            <div data-widget="tab-content-wrapper"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
