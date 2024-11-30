import * as React from "react";

interface TaskButtonProps {
    isRunning: boolean;
    isCompleted: boolean;
    isFailed: boolean;
    isDisabled: boolean;
    started: boolean;
    progress: number;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
}

export function TaskButton({ 
    isRunning, 
    isCompleted,
    isFailed,
    isDisabled,
    started,
    progress, 
    onStart, 
    onStop,
    onReset
}: TaskButtonProps) {
    const size = 40;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference * (1 - progress);

    const [isHovering, setIsHovering] = React.useState(false);

    const getButtonState = () => {
        if (isDisabled) return 'disabled';
        if (isCompleted) return 'completed';
        if (isFailed) return 'failed';
        if (isRunning) return 'running';
        return 'idle';
    };

    const handleClick = () => {
        if (isRunning) {
            onStop();
        } else if ((isCompleted || isFailed) || (started && !isRunning)) {
            onReset();
        } else if (!started) {
            onStart();
        }
    };

    return (
        <div className="task-button-container">
            <button
                className={`task-button ${getButtonState()} ${isHovering ? 'hovering' : ''}`}
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ width: size, height: size }}
                disabled={isDisabled}
            >
                <svg
                    className="progress-ring"
                    width={size}
                    height={size}
                >
                    {/* Background circle */}
                    <circle
                        className="progress-ring-background"
                        strokeWidth={strokeWidth}
                        fill="none"
                        r={radius}
                        cx={center}
                        cy={center}
                    />
                    {/* Progress circle */}
                    <circle
                        className="progress-ring-circle"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="none"
                        r={radius}
                        cx={center}
                        cy={center}
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: progressOffset,
                        }}
                    />
                </svg>
                
                {/* Modified Icon logic */}
                <div className="button-icon">
                    {(isCompleted || isFailed) && isHovering ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="reset-icon">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                    ) : isCompleted ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    ) : isFailed ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="x-icon">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    ) : isRunning ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="stop-icon">
                            <path d="M7 7h10v10H7z" />
                        </svg>
                    ) : started && !isRunning && !isCompleted && !isFailed ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="reset-icon">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </div>
            </button>
        </div>
    );
} 