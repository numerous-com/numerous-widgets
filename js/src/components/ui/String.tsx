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
        <div className={`string-input-container ${fitToContent ? 'fit-to-content' : ''}`}>
            <div className={`input-wrapper ${!labelInline ? 'label-top' : ''}`}>
                <label className="string-label">
                    <span className="string-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
                <input 
                    type={isPassword ? "password" : "text"}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ flexGrow: fitToContent ? 0 : 1 }}
                    className={!isValid ? 'invalid' : ''}
                    title={validationMessage || undefined}
                />
            </div>
        </div>
    );
}
