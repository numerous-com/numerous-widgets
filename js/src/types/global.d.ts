interface Window {
    showSaveFilePicker(options?: {
        suggestedName?: string;
    }): Promise<FileSystemFileHandle>;
} 