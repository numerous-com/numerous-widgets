from typing import Union, List
import anywidget

def container(content: Union[str, anywidget.AnyWidget, list] = None,
              hidden: bool = False,
              classes: str = "",
              styles: str = ""
              ):
    """
    Create a card widget with optional title and flow direction.
    
    Args:
        content: Single content element or list of elements to display in the card
        hidden: Whether the card is hidden (defaults to False)
        classes: List of CSS classes to add to the container
    """
    
    # Handle content list or single element
    if isinstance(content, list):
        content_html = "\n".join(
            content.text if hasattr(content, "text") else str(content)
            for content in content
        )
    else:
        content_html = content.text if hasattr(content, "text") else str(content)

    
    return f"""
        <div class="{classes}" style="display: {'none' if hidden else 'block'};{styles}">
            {content_html}
        </div>
    """ 