import * as React from "react";
import { Tooltip } from './Tooltip';

interface TabsProps {
    value: string;
    tabs: string[];
    uiLabel: string;
    uiTooltip: string;
    contentUpdated: boolean;
    onChange: (value: string) => void;
    setContentUpdated?: (updated: boolean) => void;
}

export function Tabs({
    value,
    tabs,
    uiLabel,
    uiTooltip,
    contentUpdated,
    onChange,
    setContentUpdated,
}: TabsProps) {
    React.useEffect(() => {
        if (contentUpdated && setContentUpdated) {
            setContentUpdated(false);
        }
    }, [contentUpdated, setContentUpdated]);

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
                            className={`tab ${value === tab ? 'active' : ''}`}
                            onClick={() => onChange(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}
