import * as React from "react";
import { Tooltip } from './Tooltip';

interface ButtonProps {
    label: string;
    tooltip: string;
    onClick: () => void;
    disabled?: boolean;
    value?: boolean;
}

export function Button({ 
    label, 
    tooltip, 
    onClick,
    disabled = false,
    value = false
}: ButtonProps) {
    return (
        <div className="button-container">
            {label && (
                <label className="button-label">
                    <span>{label}</span>
                    {tooltip && <Tooltip tooltip={tooltip} />}
                </label>
            )}
            <button 
                className="widget-button"
                onClick={onClick}
                disabled={disabled}
                aria-pressed={value}
            >
                {label}
            </button>
        </div>
    );
} 