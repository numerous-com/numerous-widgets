import * as React from 'react';

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskName: string;
    progress: number;
    status: 'idle' | 'running' | 'completed' | 'failed';
    logs?: string[];
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
}

export function TaskDetailModal({
    isOpen,
    onClose,
    taskName,
    progress,
    status,
    logs = [],
    onStart,
    onStop,
    onReset
}: TaskDetailModalProps) {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="task-detail-modal">
                    <div className="modal-header">
                        <h2 className="text-lg font-semibold">{taskName}</h2>
                        <button className="modal-close-button" onClick={onClose}>×</button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                        Task status: {status} - Progress: {Math.round(progress * 100)}%
                    </div>
                    
                    <div className="progress-section">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                        <span className="progress-text">{Math.round(progress * 100)}%</span>
                    </div>

                    <div className="controls-section">
                        <button
                            className="control-button"
                            onClick={status === 'running' ? onStop : onStart}
                            disabled={status === 'completed'}
                        >
                            {status === 'running' ? 'Stop' : 'Start'}
                        </button>
                        <button
                            className="control-button"
                            onClick={onReset}
                            disabled={status === 'running'}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="logs-section">
                        <h3>Logs</h3>
                        <div className="logs-container">
                            {logs.map((log, index) => (
                                <div key={index} className="log-entry">
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}