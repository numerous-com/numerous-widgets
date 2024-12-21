import * as React from "react";
import ReactMarkdown from 'react-markdown';

interface ModalDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    showCancel: boolean;
    okLabel: string;
    cancelLabel: string;
    className?: string;
    onResult: (result: 'ok' | 'cancel') => void;
}

export function ModalDialog({
    isOpen,
    title,
    message,
    showCancel,
    okLabel,
    cancelLabel,
    className = "",
    onResult,
}: ModalDialogProps) {
    if (!isOpen) return null;

    const handleOk = () => {
        onResult('ok');
    };

    const handleCancel = () => {
        onResult('cancel');
    };

    // Prevent clicks inside the modal from closing it
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div 
                className={`modal-dialog ${className}`}
                onClick={handleModalClick}
            >
                <div className="modal-header">
                    {title && <h3 className="modal-title">{title}</h3>}
                </div>
                <div className="modal-content">
                    <ReactMarkdown>
                        {message}
                    </ReactMarkdown>
                </div>
                <div className="modal-footer">
                    <button 
                        className="modal-button primary"
                        onClick={handleOk}
                    >
                        {okLabel}
                    </button>
                    {showCancel && (
                        <button 
                            className="modal-button secondary"
                            onClick={handleCancel}
                        >
                            {cancelLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 