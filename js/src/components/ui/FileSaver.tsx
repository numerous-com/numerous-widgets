import * as React from "react";
import { useState, useEffect } from "react";
import { Tooltip } from './Tooltip';

interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: Array<{
        description: string;
        accept: Record<string, string[]>;
    }>;
}

declare global {
    interface Window {
        showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
    }
}

interface FileSaverProps {
    uiLabel: string;
    uiTooltip: string;
    content: Uint8Array;
    suggestedFilename?: string;
    mimeType?: string;
    fileExtension?: string;
}

export function FileSaver({ 
    uiLabel, 
    uiTooltip, 
    content, 
    suggestedFilename,
    mimeType = 'application/octet-stream',
    fileExtension = ''
}: FileSaverProps) {
    const [isInstalled, setIsInstalled] = useState<boolean>(false);

    useEffect(() => {
        const checkInstallStatus = async () => {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            const isInWebAPKMode = window.matchMedia('(display-mode: minimal-ui)').matches;
            const isServiceWorkerRegistered = await navigator.serviceWorker.getRegistration() !== undefined;
            
            let isInstalledApp = false;
            if ('getInstalledRelatedApps' in navigator) {
                const installedApps = await (navigator as any).getInstalledRelatedApps();
                isInstalledApp = installedApps.length > 0;
            }
            
            setIsInstalled(isStandalone || isInWebAPKMode || isServiceWorkerRegistered || isInstalledApp);
        };

        checkInstallStatus();
        window.addEventListener('resize', checkInstallStatus);

        return () => {
            window.removeEventListener('resize', checkInstallStatus);
        };
    }, []);

    const handleClick = async () => {
        if (isInstalled && 'showSaveFilePicker' in window) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: suggestedFilename,
                    types: [{
                        description: 'File',
                        accept: {
                            [mimeType]: [fileExtension]
                        }
                    }]
                });

                const writable = await handle.createWritable();
                await writable.write(content);
                await writable.close();
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Error saving file:', err);
                    // Fallback to legacy method if modern method fails
                    useLegacySaveMethod();
                }
            }
        } else {
            useLegacySaveMethod();
        }
    };

    const useLegacySaveMethod = () => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = suggestedFilename || 'download' + fileExtension;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="file-saver-container">
            <button 
                onClick={handleClick} 
                className="file-saver-button"
                disabled={!content}
            >
                {uiLabel}
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </button>
        </div>
    );
} 