"""Module providing a container widget for the numerous library."""

import anywidget


def container(
    content: str | anywidget.AnyWidget | list[str | anywidget.AnyWidget] | None = None,
    hidden: bool = False,
    classes: str = "",
    styles: str = "",
) -> str:
    """
    Create a container widget for organizing content.

    Args:
        content: Single content element or list of elements to display in the container
        hidden: Whether the container is hidden (defaults to False)
        classes: List of CSS classes to add to the container
        styles: Additional CSS styles to apply to the container

    """
    # Handle content list or single element
    if content is None:
        content_html = ""
    elif isinstance(content, list):
        content_html = "\n".join(
            c.text if hasattr(c, "text") else str(c) for c in content
        )
    else:
        content_html = content.text if hasattr(content, "text") else str(content)

    # Build style string
    style_parts = []
    if hidden:
        style_parts.append("display: none")
    else:
        if len(style_parts) == 0:
            style_parts.append("display: flex; flex-direction: column")
        style_parts.append(styles)

    style_str = "; ".join(style_parts)

    return f"""
        <div class="widget-container{" "+classes}" style="{style_str}">
            {content_html}
        </div>
    """


def side_by_side_container(
    contents: list[tuple[str | anywidget.AnyWidget, float]],
    hidden: bool = False,
    classes: str = "",
    styles: str = "",
) -> str:
    """
    Create a container widget with contents arranged side by side.

    Args:
        contents: List of tuples, each containing content and its width fraction
        hidden: Whether the container is hidden (defaults to False)
        classes: List of CSS classes to add to the container
        styles: Additional CSS styles to apply to the container

    """
    # Build style string for the container
    style_parts = []
    if hidden:
        style_parts.append("display: none")
    else:
        style_parts.append("display: flex")
    if styles:
        style_parts.append(styles)

    container_style_str = "; ".join(style_parts)

    # Build HTML for each content item
    content_html = ""
    for content, width_fraction in contents:
        width_percentage = width_fraction * 100
        content_html += f"""
            <div style="flex: 0 0 {width_percentage}%; box-sizing: border-box;">
                {content.text if hasattr(content, "text") else str(content)}
            </div>
        """

    return f"""
        <div class="container {classes}" style="{container_style_str}">
            {content_html}
        </div>
    """
