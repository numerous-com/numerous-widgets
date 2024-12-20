import * as React from "react";
import { Tooltip } from './Tooltip';

interface AccordionProps {
    title: string;
    isExpanded: boolean;
    uiLabel?: string;
    uiTooltip?: string;
    onChange: () => void;
}

export function Accordion({
    title,
    isExpanded,
    uiLabel,
    uiTooltip,
    onChange,
}: AccordionProps) {
    return (
        <div className="accordion-button">
            {uiLabel && (
                <label className="accordion-label">
                    <span>{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            
            <div
                className={`accordion-header ${isExpanded ? 'active' : ''}`}
                onClick={onChange}
            >
                <span>{title}</span>
                <svg
                    className={`accordion-icon ${isExpanded ? 'active' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    );
} 