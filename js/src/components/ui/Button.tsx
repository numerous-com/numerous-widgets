import * as React from "react";

interface ButtonProps {
    label: string;
    tooltip: string;
    onClick: () => void;
    disabled?: boolean;
    value?: boolean;
    className?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'process-step';
    fitToContent?: boolean;
}

export function Button({ 
    label, 
    tooltip, 
    onClick,
    disabled = false,
    value = false,
    className = '',
    icon,
    variant = 'default',
    fitToContent = false
}: ButtonProps) {
    const baseStyles = className ? className : (
        variant === 'process-step' 
            ? "relative w-16 h-16 rounded-full bg-white/20 border border-white/10 transition-all group"
            : `widget-button${fitToContent ? ' fit-to-content' : ''}`
    );

    return (
        <div className={`button-container${fitToContent ? ' fit-to-content' : ''}`}>
            <button 
                className={baseStyles}
                onClick={onClick}
                disabled={disabled}
                title={tooltip}
            >
                {variant === 'process-step' ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                        {icon || label}
                    </span>
                ) : (
                    <>
                        {icon && <span className="button-icon">{icon}</span>}
                        {label}
                    </>
                )}
            </button>
        </div>
    );
} 