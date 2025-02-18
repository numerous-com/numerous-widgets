import * as React from "react";
import { Tooltip } from './Tooltip';

interface RadioButtonsProps {
    value: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: string) => void;
    fitToContent?: boolean;
    labelInline?: boolean;
}

export function RadioButtons({ 
    value, 
    options,
    uiLabel, 
    uiTooltip, 
    onChange,
    fitToContent = false,
    labelInline = true,
}: RadioButtonsProps) {
    return (
        <div className={`input-container radio-buttons-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {!labelInline && (
                <div className="input-label radio-buttons-label">
                    <span className="radio-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </div>
            )}
            <div className="input-wrapper">
                {labelInline && (
                    <div className="input-label radio-buttons-label">
                        <span className="radio-label-text">{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </div>
                )}
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
        </div>
    );
} 