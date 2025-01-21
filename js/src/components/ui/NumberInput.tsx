import * as React from "react";
import { Tooltip } from './Tooltip';

interface NumberInputProps {
    value: number;
    start: number;
    stop: number;
    step: number;
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: number) => void;
    fitToContent?: boolean;
    labelInline?: boolean;
    unit?: string;
}

export function NumberInput({ 
    value, 
    start, 
    stop, 
    step, 
    uiLabel, 
    uiTooltip, 
    onChange,
    fitToContent = false,
    labelInline = true,
    unit
}: NumberInputProps) {
    const isValid = start <= value && value <= stop;

    // Helper function to coerce to nearest step multiple and round to step precision
    const coerceToStep = (val: number): number => {
        const steps = Math.round((val - start) / step);
        const coercedValue = start + (steps * step);
        return parseFloat(coercedValue.toFixed(getDecimalPlaces(step)));
    };

    // Function to determine the number of decimal places in the step
    const getDecimalPlaces = (num: number): number => {
        const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return 0; }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    };

    // Handle input change with step coercion
    const handleChange = (newValue: number) => {
        const coercedValue = coerceToStep(newValue);
        onChange(coercedValue);
    };

    return (
        <div className={`input-container number-input-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {!labelInline && (
                <label className="input-label number-label">
                    <span className="string-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className={`input-wrapper ${!isValid ? 'invalid' : ''}`}>
                {labelInline && (
                    <label className="input-label number-label">
                        <span className="string-label-text">{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </label>
                )}
                <input 
                    type="number"
                    value={value}
                    min={start}
                    max={stop}
                    step={step}
                    onChange={(e) => handleChange(Number(e.target.value))}
                />
                {unit && <span className="unit-badge">{unit}</span>}
                <div className="buttons">
                    <button 
                        className="step-button down"
                        onClick={() => handleChange(value - step)}
                    >
                        −
                    </button>
                    <button 
                        className="step-button up"
                        onClick={() => handleChange(value + step)}
                    >
                        +
                    </button>
                </div>
            </div>
            {!isValid && (
                <div className="validation-message">
                    Value must be between {start} and {stop}
                </div>
            )}
        </div>
    );
}
