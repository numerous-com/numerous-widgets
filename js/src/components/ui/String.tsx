import * as React from "react";
import { Tooltip } from './Tooltip';

interface StringInputProps {
    value: string;
    uiLabel: string;
    uiTooltip: string;
    placeholder?: string;
    onChange: (value: string) => void;
    fitToContent: boolean;
    validationRegex?: string;
    isPassword?: boolean;
}

export function StringInput({ 
    value, 
    uiLabel, 
    uiTooltip, 
    placeholder,
    onChange,
    fitToContent,
    validationRegex,
    isPassword
}: StringInputProps) {
    const isValid = React.useMemo(() => {
        if (!validationRegex) return true;
        const regex = new RegExp(validationRegex);
        return regex.test(value);
    }, [value, validationRegex]);

    return (
        <div className={`string-input-container ${fitToContent ? 'fit-to-content' : ''}`}>
            <div className="input-wrapper" style={{ width: fitToContent ? 'auto' : '100%' }}>
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
                />
            </div>
        </div>
    );
}
