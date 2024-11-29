import * as React from "react";
import { Tooltip } from './Tooltip';

interface CheckBoxProps {
    value: boolean;
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: boolean) => void;
}

export function CheckBox({ 
    value, 
    uiLabel, 
    uiTooltip, 
    onChange 
}: CheckBoxProps) {
    return (
        <div className="checkbox-container">
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="checkbox-input"
                />
                <span>{uiLabel}</span>
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </label>
        </div>
    );
} 