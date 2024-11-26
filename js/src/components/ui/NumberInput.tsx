import * as React from "react";
import '../../css/styles.css';
import { Tooltip } from './Tooltip';

interface NumberInputProps {
    value: number;
    start: number;
    stop: number;
    step: number;
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: number) => void;
}

export function NumberInput({ 
    value, 
    start, 
    stop, 
    step, 
    uiLabel, 
    uiTooltip, 
    onChange 
}: NumberInputProps) {
    // Local state for button acceleration
    const [stepMultiplier, setStepMultiplier] = React.useState(1);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const getStepDecimals = (stepValue: number): number => {
        const str = stepValue.toString();
        return str.includes('.') ? str.split('.')[1].length : 0;
    };

    const formatToStepPrecision = (num: number, decimals: number): number => {
        return Number(num.toFixed(decimals));
    };

    const validateAndAdjustValue = (inputValue: number): number => {
        if (!start || !stop || !step) return inputValue;
        
        const stepDecimals = getStepDecimals(step);
        let newValue = formatToStepPrecision(inputValue, stepDecimals);
        
        // Clamp value between start and stop
        newValue = Math.max(start, Math.min(stop, newValue));
        
        // Adjust to nearest step multiple
        const stepsFromStart = Math.round((newValue - start) / step);
        newValue = formatToStepPrecision(start + (stepsFromStart * step), stepDecimals);
        
        // Final clamp
        return Math.max(start, Math.min(stop, newValue));
    };

    const updateValue = (newValue: string | number) => {
        if (!step) return;
        
        const stepDecimals = getStepDecimals(step);
        
        if (newValue === '' || isNaN(Number(newValue))) {
            onChange(value || 0);
            return;
        }

        const validValue = validateAndAdjustValue(Number(newValue));
        onChange(validValue);
    };

    // Add button press handlers
    const handleButtonPress = (direction: number) => {
        if (!step) return;
        
        // Initial update
        updateValue(value + (direction * step * stepMultiplier));
        
        // Start acceleration after delay
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                setStepMultiplier(prev => Math.min(prev + 0.5, 10));
                updateValue(value + (direction * step * stepMultiplier));
            }, 50);
        }, 500);
    };

    const handleButtonRelease = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setStepMultiplier(1);
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="number-input-container">
            <div className="input-wrapper">
                <label className="number-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
                <input 
                    type="number"
                    value={value}
                    min={start}
                    max={stop}
                    step={step}
                    onChange={(e) => updateValue(e.target.value)}
                    onBlur={(e) => updateValue(e.target.value)}
                />
                <div className="buttons">
                    <button 
                        className="step-button"
                        onMouseDown={() => handleButtonPress(-1)}
                        onMouseUp={handleButtonRelease}
                        onMouseLeave={handleButtonRelease}
                        onTouchStart={() => handleButtonPress(-1)}
                        onTouchEnd={handleButtonRelease}
                        onTouchCancel={handleButtonRelease}
                    >
                        −
                    </button>
                    <button 
                        className="step-button"
                        onMouseDown={() => handleButtonPress(1)}
                        onMouseUp={handleButtonRelease}
                        onMouseLeave={handleButtonRelease}
                        onTouchStart={() => handleButtonPress(1)}
                        onTouchEnd={handleButtonRelease}
                        onTouchCancel={handleButtonRelease}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
