import * as React from "react";

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
            <button 
                className="widget-button"
                onClick={onClick}
                disabled={disabled}
                aria-pressed={value}
                title={tooltip}
            >
                {label}
            </button>
        </div>
    );
} 