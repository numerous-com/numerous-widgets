import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Chat } from "../ui/Chat";
import '../../css/components/Chat.scss';

function ChatWidget() {
    const [messages] = useModelState<any[]>("messages");
    const [placeholder] = useModelState<string>("placeholder");
    const [className] = useModelState<string>("class_name");
    const [, setNewMessage] = useModelState<any>("new_message");
    const [thinkingStates] = useModelState<Record<string, boolean>>("thinking_states");

    const handleNewMessage = (message: any) => {
        setNewMessage(message);
    };

    return (
        <Chat
            messages={messages}
            placeholder={placeholder}
            className={className}
            onNewMessage={handleNewMessage}
            thinkingStates={thinkingStates}
        />
    );
}

export default {
    render: createRender(ChatWidget)
} 