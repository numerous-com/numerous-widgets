import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Chat } from "../ui/Chat";
import '../../css/styles.css';

function ChatWidget() {
    const [messages] = useModelState<any[]>("messages");
    const [placeholder] = useModelState<string>("placeholder");
    const [maxHeight] = useModelState<string>("max_height");
    const [className] = useModelState<string>("class_name");
    const [, setNewMessage] = useModelState<any>("new_message");

    const handleNewMessage = (message: any) => {
        setNewMessage(message);
    };

    return (
        <Chat
            messages={messages}
            placeholder={placeholder}
            maxHeight={maxHeight}
            className={className}
            onNewMessage={handleNewMessage}
        />
    );
}

export default {
    render: createRender(ChatWidget)
} 