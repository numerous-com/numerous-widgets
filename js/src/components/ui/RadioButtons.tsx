import * as React from "react";
import { Tooltip } from './Tooltip';

interface RadioButtonsProps {
    value: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: string) => void;
}

export function RadioButtons({ 
    value, 
    options,
    uiLabel, 
    uiTooltip, 
    onChange 
}: RadioButtonsProps) {
    return (
        <div className="radio-buttons-container">
            <div className="radio-buttons-label">
                {uiLabel}
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </div>
            <div className="radio-buttons-group">
                {options.map((option) => (
                    <label key={option} className="radio-button-label">
                        <input
                            type="radio"
                            checked={value === option}
                            onChange={() => onChange(option)}
                            className="radio-button-input"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
} 