import * as React from "react";

interface ToastProps {
    message: string;
    duration?: number;
    onDismiss: () => void;
    visible: boolean;
}

export function Toast({ 
    message, 
    duration = 3000, 
    onDismiss,
    visible 
}: ToastProps) {
    const [progress, setProgress] = React.useState(100);
    
    React.useEffect(() => {
        if (!visible) {
            setProgress(100);
            return;
        }

        const startTime = Date.now();
        const endTime = startTime + duration;

        const updateProgress = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            const newProgress = (remaining / duration) * 100;
            
            if (newProgress <= 0) {
                onDismiss();
            } else {
                setProgress(newProgress);
                requestAnimationFrame(updateProgress);
            }
        };

        const animationFrame = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animationFrame);
    }, [visible, duration, onDismiss]);

    if (!visible) return null;

    return (
        <div className="toast-container">
            <div className="toast-content">
                <button 
                    onClick={onDismiss}
                    className="toast-dismiss"
                    aria-label="Dismiss toast"
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p className="toast-message">{message}</p>
                <div className="toast-progress">
                    <div 
                        className="toast-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
} 