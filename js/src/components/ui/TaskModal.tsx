import * as React from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { CheckBox } from './CheckBox';

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
            return date.toLocaleTimeString([], { hour12: false });
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
            case '[warning]':
                return 'text-yellow-500';
            case 'success':
                return 'text-green-500';
            default:
                return 'text-blue-500';
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col border-2 border-gray-300">
                <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                        {taskName}
                    </h2>

                    <div className="w-full mb-6">
                        <ProgressBar value={progress * 100} />
                    </div>

                    {error && error.message && (
                        <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
                            {error.timestamp && (
                                <p className="text-red-500 text-xs mb-2">
                                    {formatTimestamp(error.timestamp)}
                                </p>
                            )}
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-red-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-red-700 font-medium text-sm">
                                        {typeof error.message === 'object' 
                                            ? JSON.stringify(error.message) 
                                            : error.message}
                                    </p>
                                    {error.traceback && (
                                        <pre className="mt-2 text-red-600 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                                            {error.traceback}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div 
                        ref={logsContainerRef}
                        className="bg-gray-50 rounded-lg p-4 overflow-y-auto border border-gray-200 mb-6"
                        style={{
                            height: '500px',
                            lineHeight: '25px'
                        }}
                    >
                        {logs.slice(-100).map(([timestamp, type, source, message], index) => (
                            <div key={index} className="py-1 font-mono text-xs flex gap-2 h-[25px] items-center">
                                <span className="text-gray-400">{formatTimestamp(timestamp)}</span>
                                <span className={`font-medium ${getLogTypeColor(type)}`}>[{type}]</span>
                                <span className="text-gray-500">{source}:</span>
                                <span className="text-gray-700">{message}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <CheckBox
                            value={isAutoScrollEnabled}
                            onChange={(checked) => setIsAutoScrollEnabled(checked)}
                            uiLabel="Auto-scroll"
                            uiTooltip="Automatically scroll to new log entries"
                        />
                        <Button 
                            label="Close"
                            tooltip="Close the task details"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}