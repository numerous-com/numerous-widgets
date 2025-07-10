import * as React from "react";

interface TextProps {
    value: string;
    disabled?: boolean;
    multiline?: boolean;
    height?: number;
    className?: string;
}

export function Text({ 
    value, 
    disabled = true,
    multiline = false,
    height,
    className = ""
}: TextProps) {
    
    const style: React.CSSProperties = {
        ...(height && { height: `${height}px` }),
        ...(multiline && { 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
        })
    };
    
    if (multiline) {
        return (
            <div className={`text-display-container ${className}`}>
                <textarea 
                    value={value}
                    disabled={disabled}
                    readOnly={disabled}
                    style={style}
                    className={`text-display text-display-multiline ${disabled ? 'disabled' : ''}`}
                />
            </div>
        );
    }
    
    return (
        <div className={`text-display-container ${className}`}>
            <input 
                type="text"
                value={value}
                disabled={disabled}
                readOnly={disabled}
                style={style}
                className={`text-display text-display-single ${disabled ? 'disabled' : ''}`}
            />
        </div>
    );
} 