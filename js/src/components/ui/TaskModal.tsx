import * as React from 'react';
import { ProgressBar } from './ProgressBar';

interface LogEntry {
    timestamp: string;
    type: string;
    source: string;
    message: string;
}

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskName: string;
    progress: number;
    status: 'idle' | 'running' | 'completed' | 'failed';
    logs?: [string, string, string, string][];  // [timestamp, type, source, message][]
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    error?: {
        message: string;
        traceback?: string;
        timestamp: string;
    };
    autoScroll?: boolean;
}

export function TaskDetailModal({
    isOpen,
    onClose,
    taskName,
    progress,
    logs = [],
    error,
    autoScroll = true,
}: TaskDetailModalProps) {
    const logsContainerRef = React.useRef<HTMLDivElement>(null);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = React.useState(autoScroll);

    React.useEffect(() => {
        if (isAutoScrollEnabled && logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, [logs, isAutoScrollEnabled]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString();
        } catch (e) {
            return timestamp;
        }
    };

    const getLogTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'error':
                return 'text-red-500';
            case 'warning':
                return 'text-yellow-500';
            case 'success':
                return 'text-green-500';
            default:
                return 'text-blue-500';
        }
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
            onClick={handleOverlayClick}
        >
            <div className="modal-container bg-white rounded-xl shadow-2xl w-1/2 min-w-[500px] max-w-2xl relative z-50">
                <div className="task-detail-modal p-8 flex flex-col items-center space-y-6">
                    <div className="w-3/4 flex justify-center">
                        <ProgressBar value={progress * 100} />
                    </div>

                    {error && error.message && (
                        <div className="w-full">
                            <div className="error-container bg-red-50 rounded-lg p-4 border border-red-200">
                                {error.timestamp && (
                                    <p className="text-red-500 text-xs mb-2">
                                        {formatTimestamp(error.timestamp)}
                                    </p>
                                )}
                                <div className="flex items-start gap-3">
                                    <svg className="w-8 h-8 text-red-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="text-red-700 font-bold text-xl">
                                            {typeof error.message === 'object' 
                                                ? JSON.stringify(error.message) 
                                                : error.message}
                                        </p>
                                        {error.traceback && (
                                            <pre className="mt-2 text-red-600 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                                                {error.traceback}
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full">
                        <div 
                            ref={logsContainerRef}
                            className="logs-container bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto border border-gray-100"
                        >
                            {logs.map(([timestamp, type, source, message], index) => (
                                <div key={index} className="log-entry py-1 font-mono text-sm flex gap-2">
                                    <span className="text-gray-400">{formatTimestamp(timestamp)}</span>
                                    <span className={`font-medium ${getLogTypeColor(type)}`}>[{type}]</span>
                                    <span className="text-gray-500">{source}:</span>
                                    <span className="text-gray-700">{message}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={isAutoScrollEnabled}
                                onChange={(e) => setIsAutoScrollEnabled(e.target.checked)}
                                className="rounded text-blue-500 focus:ring-blue-500"
                            />
                            <span>Track updates</span>
                        </label>
                        <button 
                            className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 font-medium text-white shadow-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}