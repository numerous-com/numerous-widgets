import * as React from "react";
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    content: string;
    type: 'user' | 'system';
    timestamp: string;
}

interface ChatProps {
    messages: Message[];
    placeholder: string;
    maxHeight: string;
    className?: string;
    onNewMessage: (message: Message) => void;
    thinkingStates: Record<string, boolean>;
}

export function Chat({
    messages,
    placeholder,
    maxHeight,
    className = "",
    onNewMessage,
    thinkingStates,
}: ChatProps) {
    const [input, setInput] = React.useState("");
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const message: Message = {
                id: String(messages.length),
                content: input.trim(),
                type: 'user',
                timestamp: new Date().toISOString(),
            };
            onNewMessage(message);
            setInput("");
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getLastMessageByType = (type: string) => {
        return messages.filter(msg => msg.type === type).pop();
    };

    return (
        <div 
            className={`chat-container ${className}`}
            style={{ maxHeight }}
        >
            <div className="chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.type}`}
                    >
                        <div className="message-content">
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                        <div className="message-timestamp">
                            {formatTimestamp(message.timestamp)}
                        </div>
                    </div>
                ))}
                {Object.entries(thinkingStates).map(([userType, thinking]) => (
                    thinking && getLastMessageByType(userType) && (
                        <div 
                            key={`thinking-${userType}`}
                            className={`chat-message ${userType}`}
                        >
                            <div className="thinking-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="chat-input-field"
                />
                <button 
                    type="submit"
                    className="chat-submit-button"
                    disabled={!input.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
} 