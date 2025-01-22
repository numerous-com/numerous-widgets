import * as React from "react";
import { Tooltip } from './Tooltip';

interface SliderProps {
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
    uiLabel: string;
    uiTooltip: string;
    onChange: (value: number) => void;
    fitToContent?: boolean;
    labelInline?: boolean;
}

export function Slider({ 
    value, 
    minValue,
    maxValue,
    step,
    uiLabel, 
    uiTooltip, 
    onChange,
    fitToContent = false,
    labelInline = true
}: SliderProps) {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

    return (
        <div className={`input-container slider-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {!labelInline && (
                <label className="input-label slider-label">
                    <span className="string-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className="input-wrapper">
                {labelInline && (
                    <label className="input-label slider-label">
                        <span className="string-label-text">{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </label>
                )}
                <div className="slider-value">{value}</div>
                <div className="slider-track-container">
                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        step={step}
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="slider-input"
                        style={{
                            background: `linear-gradient(to right, 
                                var(--ui-widget-focus-border) 0%, 
                                var(--ui-widget-focus-border) ${percentage}%, 
                                var(--ui-widget-secondary-background) ${percentage}%, 
                                var(--ui-widget-secondary-background) 100%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
} 