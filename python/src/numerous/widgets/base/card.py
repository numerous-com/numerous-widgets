"""Module providing a card widget for the numerous library."""

import anywidget


def card(
    content: str | anywidget.AnyWidget | list[str | anywidget.AnyWidget],
    title: str | None = None,
    direction: str = "column",
    hidden: bool = False,
) -> str:
    """
    Create a card widget with optional title and flow direction.

    Args:
        content: Single content element or list of elements to display in the card
        title: Optional card title
        direction: Flow direction of elements ("row" or "column", defaults to "column")
        hidden: Whether the card is hidden (defaults to False)

    """
    title_html = f"<h5 class='card-title'>{title}</h5>" if title else ""

    # Handle content list or single element
    if isinstance(content, list):
        content_html = "\n".join(
            content.text if hasattr(content, "text") else str(content)
            for content in content
        )
    else:
        content_html = content.text if hasattr(content, "text") else str(content)

    # Add flexbox styling based on direction
    flex_direction = "row" if direction.lower() == "row" else "column"

    return f"""
    <div class="card" style="display: {'none' if hidden else 'block'};">
        <div class="card-body" style="display: flex; flex-direction: {flex_direction};">
            {title_html}
            {content_html}
        </div>
    </div>
    """
