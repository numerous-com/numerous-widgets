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
    strictValidation?: boolean;
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
    unit,
    strictValidation = true
}: NumberInputProps) {
    // Function to determine the number of decimal places in the step
    const getDecimalPlaces = (num: number): number => {
        const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { 
            return 0; 
        }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    };

    // Helper function to clamp the value if strict validation is enabled.
    const clampValue = (val: number): number => {
        return strictValidation ? Math.min(stop, Math.max(val, start)) : val;
    };

    // Helper function to coerce the value to the nearest multiple of step.
    const coerceToStep = (val: number): number => {
        const steps = Math.round((val - start) / step);
        const coercedValue = start + steps * step;
        return parseFloat(coercedValue.toFixed(getDecimalPlaces(step)));
    };

    // Combined function to apply clamping and step coercion.
    // It also returns the new (clamped/coerced) value.
    const handleChange = (newValue: number): number => {
        const validatedValue = clampValue(newValue);
        const coercedValue = coerceToStep(validatedValue);
        onChange(coercedValue);
        return coercedValue;
    };

    // State to track the input value during editing
    const [localValue, setLocalValue] = React.useState<string>(value.toString());
    
    // Called when editing stops (onBlur or Enter/Tab key events)
    const handleFinishEditing = () => {
        const numValue = Number(localValue);
        if (!isNaN(numValue)) {
            const newValue = handleChange(numValue);
            setLocalValue(newValue.toString());
        } else {
            // If not a valid number, revert to the external value
            setLocalValue(value.toString());
        }
    };

    // Handle keyboard events: finish editing when user presses Enter or Tab.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            handleFinishEditing();
            if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
            }
        }
    };

    // Update the local input value when the external value prop changes.
    React.useEffect(() => {
        setLocalValue(value.toString());
    }, [value]);

    const isValid = start <= value && value <= stop;

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
                    value={localValue}
                    min={start}
                    max={stop}
                    step={step}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleFinishEditing}
                    onKeyDown={handleKeyDown}
                />
                {unit && <span className="unit-badge">{unit}</span>}
                <div className="buttons">
                    <button 
                        className="step-button down"
                        onClick={() => {
                            const newValue = handleChange(value - step);
                            setLocalValue(newValue.toString());
                        }}
                    >
                        −
                    </button>
                    <button 
                        className="step-button up"
                        onClick={() => {
                            const newValue = handleChange(value + step);
                            setLocalValue(newValue.toString());
                        }}
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
