import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { CopyToClipboard } from "../ui/CopyToClipboard";
import '../../css/styles.scss';

function CopyToClipboardWidget() {
    // Model states from Python
    const [value] = useModelState<string>("value");
    const [label] = useModelState<string>("label");
    const [tooltip] = useModelState<string>("tooltip");
    const [successMessage] = useModelState<string>("success_message");
    const [disabled] = useModelState<boolean>("disabled");
    const [showValue] = useModelState<boolean>("show_value");
    const [timeout] = useModelState<number>("timeout");
    const [variant] = useModelState<string>("variant");
    const [className] = useModelState<string>("class_name");
    
    // State that gets updated to notify Python
    const [copied, setCopied] = useModelState<number>("copied");
    const [isCopying, setIsCopying] = useModelState<boolean>("is_copying");
    const [copySuccess, setCopySuccess] = useModelState<boolean>("copy_success");

    const handleCopy = React.useCallback(() => {
        setIsCopying(true);
        // Increment copied counter to trigger Python callback
        setCopied(copied + 1);
    }, [copied, setCopied, setIsCopying]);

    const handleCopySuccess = React.useCallback((success: boolean) => {
        setIsCopying(false);
        setCopySuccess(success);
        
        // Reset success state after a short delay
        setTimeout(() => {
            setCopySuccess(false);
        }, 100);
    }, [setIsCopying, setCopySuccess]);

    return (
        <CopyToClipboard
            value={value}
            label={label}
            tooltip={tooltip}
            successMessage={successMessage}
            disabled={disabled}
            showValue={showValue}
            timeout={timeout}
            variant={variant}
            className={className}
            onCopy={handleCopy}
            onCopySuccess={handleCopySuccess}
        />
    );
}

export default {
    render: createRender(CopyToClipboardWidget)
}; 