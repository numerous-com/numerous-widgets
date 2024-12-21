import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { ModalDialog } from "../ui/ModalDialog";
import '../../css/styles.css';

function ModalDialogWidget() {
    const [isOpen] = useModelState<boolean>("is_open");
    const [title] = useModelState<string>("title");
    const [message] = useModelState<string>("message");
    const [showCancel] = useModelState<boolean>("show_cancel");
    const [okLabel] = useModelState<string>("ok_label");
    const [cancelLabel] = useModelState<string>("cancel_label");
    const [className] = useModelState<string>("class_name");
    const [, setResult] = useModelState<string | null>("result");

    const handleResult = (result: 'ok' | 'cancel') => {
        setResult(result);
    };

    return (
        <ModalDialog
            isOpen={isOpen}
            title={title}
            message={message}
            showCancel={showCancel}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            className={className}
            onResult={handleResult}
        />
    );
}

export default {
    render: createRender(ModalDialogWidget)
} 