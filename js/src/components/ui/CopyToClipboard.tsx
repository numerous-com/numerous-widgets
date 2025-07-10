import * as React from "react";
import { Tooltip } from './Tooltip';

interface CopyToClipboardProps {
    value: string;
    label: string;
    tooltip?: string;
    successMessage: string;
    disabled?: boolean;
    showValue?: boolean;
    timeout: number;
    variant?: string;
    className?: string;
    onCopy: () => void;
    onCopySuccess: (success: boolean) => void;
}

export function CopyToClipboard({ 
    value, 
    label, 
    tooltip = "",
    successMessage,
    disabled = false,
    showValue = false,
    timeout = 2000,
    variant = "default",
    className = "",
    onCopy,
    onCopySuccess
}: CopyToClipboardProps) {
    const [copyState, setCopyState] = React.useState<'idle' | 'copying' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleCopy = async () => {
        if (disabled || !value) return;

        setCopyState('copying');
        onCopy();

        try {
            // Check if clipboard API is available
            if (!navigator.clipboard) {
                throw new Error("Clipboard API not supported");
            }

            await navigator.clipboard.writeText(value);
            setCopyState('success');
            onCopySuccess(true);
            
            // Reset state after timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setCopyState('idle');
            }, timeout);

        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            setCopyState('error');
            onCopySuccess(false);
            
            // Try fallback method
            try {
                await fallbackCopyToClipboard(value);
                setCopyState('success');
                onCopySuccess(true);
                
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    setCopyState('idle');
                }, timeout);
            } catch (fallbackError) {
                setErrorMessage("Failed to copy to clipboard");
                setTimeout(() => {
                    setCopyState('idle');
                    setErrorMessage("");
                }, timeout);
            }
        }
    };

    // Fallback method for older browsers
    const fallbackCopyToClipboard = async (text: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    resolve();
                } else {
                    reject(new Error('execCommand copy failed'));
                }
            } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
            }
        });
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getButtonText = () => {
        switch (copyState) {
            case 'copying':
                return 'Copying...';
            case 'success':
                return successMessage;
            case 'error':
                return errorMessage || 'Error';
            default:
                return label;
        }
    };

    const getButtonIcon = () => {
        switch (copyState) {
            case 'copying':
                return (
                    <svg className="copy-icon spinning" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                );
            case 'success':
                return (
                    <svg className="copy-icon success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                );
            case 'error':
                return (
                    <svg className="copy-icon error" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m15 9-6 6"/>
                        <path d="m9 9 6 6"/>
                    </svg>
                );
            default:
                return (
                    <svg className="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                );
        }
    };

    return (
        <div className={`copy-to-clipboard-container ${className}`}>
            <div className="copy-to-clipboard-wrapper">
                <button 
                    className={`copy-to-clipboard-button ${variant} ${copyState}`}
                    onClick={handleCopy}
                    disabled={disabled || copyState === 'copying'}
                    title={tooltip}
                >
                    {getButtonIcon()}
                    <span className="copy-button-text">{getButtonText()}</span>
                </button>
                
                {showValue && value && (
                    <div className="copy-value-display">
                        <code className="copy-value">{value}</code>
                    </div>
                )}
            </div>
            
            {tooltip && <Tooltip tooltip={tooltip} />}
        </div>
    );
} 