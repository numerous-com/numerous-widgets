import * as React from "react";
import { Tooltip } from './Tooltip';

interface FileLoaderProps {
    uiLabel: string;
    uiTooltip: string;
    accept: string;
    onFileLoad: (content: Uint8Array, filename: string, encoding: string) => void;
    encoding: string;
}

export function FileLoader({ uiLabel, uiTooltip, accept, onFileLoad }: FileLoaderProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Detect encoding from the file content
            const detectedEncoding = detectEncoding(uint8Array);
            console.log(file.name);
            console.log(detectedEncoding);
            
            // Pass both content and detected encoding back
            onFileLoad(uint8Array, file.name, detectedEncoding);
        } catch (error) {
            console.error('Error loading file:', error);
        }
    };

    // Simple encoding detection function
    const detectEncoding = (data: Uint8Array): string => {
        // Check for UTF-8 BOM
        if (data.length >= 3 && data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
            return 'utf-8';
        }
        // Check for UTF-16 LE BOM
        if (data.length >= 2 && data[0] === 0xFF && data[1] === 0xFE) {
            return 'utf-16le';
        }
        // Check for UTF-16 BE BOM
        if (data.length >= 2 && data[0] === 0xFE && data[1] === 0xFF) {
            return 'utf-16be';
        }
        // Default to UTF-8
        return 'utf-8';
    };

    return (
        <div className="file-loader-container">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept={accept}
                onChange={handleFileChange}
            />
            <button onClick={handleClick} className="file-loader-button">
                {uiLabel}
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </button>
        </div>
    );
} 