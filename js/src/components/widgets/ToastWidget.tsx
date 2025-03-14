import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Toast } from "../ui/Toast";
import '../../css/styles.scss';

function ToastWidget() {
    const [message] = useModelState<string>("message");
    const [duration] = useModelState<number>("duration");
    const [visible, setVisible] = useModelState<boolean>("visible");

    const handleDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    return (
        <Toast
            message={message}
            duration={duration}
            visible={visible}
            onDismiss={handleDismiss}
        />
    );
}

export default {
    render: createRender(ToastWidget)
} 