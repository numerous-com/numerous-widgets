import * as React from "react";
import { Tooltip } from './Tooltip';

interface StringInputProps {
    value: string;
    uiLabel: string;
    uiTooltip: string;
    placeholder?: string;
    onChange: (value: string) => void;
    fitToContent: boolean;
    isValid: boolean;
    isPassword?: boolean;
    validationMessage: string;
    labelInline: boolean;
}

export function StringInput({ 
    value, 
    uiLabel, 
    uiTooltip, 
    placeholder,
    onChange,
    fitToContent,
    isValid,
    isPassword,
    validationMessage,
    labelInline
}: StringInputProps) {
    
    return (
        <div className={`input-container string-input-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {!labelInline && (
                <label className="input-label string-label">
                    <span className="string-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className={`input-wrapper ${!isValid ? 'invalid' : ''}`}>
                {labelInline && (
                    <label className="input-label string-label">
                        <span className="string-label-text">{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </label>
                )}
                <input 
                    type={isPassword ? "password" : "text"}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
                {!isValid && validationMessage && (
                    <div className="validation-message">
                        {validationMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
