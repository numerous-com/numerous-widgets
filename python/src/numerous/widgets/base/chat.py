"""Chat is for creating chat widgets."""

from collections.abc import Callable
from datetime import datetime
from typing import Any

import anywidget
import traitlets
from anywidget import AnyWidget

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ChatWidget")


class Chat(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A chat widget that displays messages and handles user input.

    Args:
        messages: Initial list of messages
        placeholder: Placeholder text for the input field
        max_height: Maximum height of the chat container (default: "400px")
        className: Optional CSS class name for styling

    """

    # Define traitlets for the widget properties
    messages = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    placeholder = traitlets.Unicode().tag(sync=True)
    max_height = traitlets.Unicode().tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)
    new_message = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        messages: list[dict[str, Any]] | None = None,
        placeholder: str = "Type a message...",
        max_height: str = "400px",
        class_name: str = "",
    ) -> None:
        """
        Initialize the chat widget.

        Message format:
        {
            "id": str,
            "content": str,
            "type": "user" | "system",
            "timestamp": str (ISO format)
        }
        """
        if messages is None:
            messages = []

        # Validate message format
        for msg in messages:
            if not isinstance(msg, dict):
                raise TypeError("Each message must be a dictionary.")
            if "content" not in msg:
                raise TypeError("Each message must have 'content'.")
            if "type" not in msg:
                msg["type"] = "user"
            if "timestamp" not in msg:
                msg["timestamp"] = datetime.now().isoformat()
            if "id" not in msg:
                from uuid import uuid4

                msg["id"] = str(uuid4())

        super().__init__(
            messages=messages,
            placeholder=placeholder,
            max_height=max_height,
            class_name=class_name,
            new_message=None,
        )

    def add_message(self, content: str, msg_type: str = "user") -> None:
        """Add a new message to the chat."""
        message = {
            "id": str(len(self.messages)),
            "content": content,
            "type": msg_type,
            "timestamp": datetime.now().isoformat(),
        }
        self.messages = [*self.messages, message]

    def clear_messages(self) -> None:
        """Clear all messages from the chat."""
        self.messages = []

    @property
    def message_history(self) -> list[dict[str, Any]]:
        """Get the current message history."""
        return self.messages  # type: ignore[no-any-return]

    def observe_new_messages(self, handler: Callable[[AnyWidget], None]) -> None:
        """Observe new messages from the user."""
        self.observe(handler, names=["new_message"])
