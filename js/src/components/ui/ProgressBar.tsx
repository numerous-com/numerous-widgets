import * as React from "react";
import { Tooltip } from './Tooltip';
import '../../css/components/ProgressBar.scss';

interface ProgressBarProps {
    value: number;
    uiLabel?: string;
    uiTooltip?: string;
    fitToContent?: boolean;
    labelInline?: boolean;
}

export function ProgressBar({ 
    value, 
    uiLabel, 
    uiTooltip,
    fitToContent = false,
    labelInline = true 
}: ProgressBarProps) {
    // Ensure value is between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100);
    
    return (
        <div className={`input-container progress-bar-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {uiLabel && !labelInline && (
                <label className="input-label progress-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className="input-wrapper progress-track-container">
                {uiLabel && labelInline && (
                    <label className="input-label progress-label">
                        <span>{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </label>
                )}
                <div 
                    className="progress-track"
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div 
                        className="progress-fill"
                        style={{ width: `${clampedValue}%` }}
                    />
                </div>
                <div className="progress-value">{Math.round(clampedValue)}%</div>
            </div>
        </div>
    );
}
