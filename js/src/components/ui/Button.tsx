import * as React from "react";
import { Tooltip } from './Tooltip';

interface ButtonProps {
    label: string;
    uiLabel: string;
    uiTooltip: string;
    onClick: () => void;
}

export function Button({ 
    label, 
    uiLabel, 
    uiTooltip, 
    onClick 
}: ButtonProps) {
    return (
        <div className="button-container">
            {uiLabel && (
                <label className="button-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <button 
                className="widget-button"
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );
} 