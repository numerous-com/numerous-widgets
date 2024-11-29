import * as React from "react";
import { Tooltip } from './Tooltip';

interface ProgressBarProps {
    value: number;
    uiLabel?: string;
    uiTooltip?: string;
}

export function ProgressBar({ value, uiLabel, uiTooltip }: ProgressBarProps) {
    console.log("value");
    console.log(value);
    // Ensure value is between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100);
    console.log(clampedValue);
    return (
        <div className="progress-bar-container">
            {uiLabel && (
                <div className="progress-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </div>
            )}
            <div className="progress-track">
                <div 
                    className="progress-fill"
                    style={{ width: `${clampedValue}%` }}
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <div className="progress-value">{Math.round(clampedValue)}%</div>
        </div>
    );
}
