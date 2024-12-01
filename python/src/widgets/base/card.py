from typing import Union
import anywidget

def card(content: Union[str, anywidget.AnyWidget] = None, title: str = None):
    title_html = f"<h5 class='card-title'>{title}</h5>" if title else ""
    return f"""
    <div class="card">
        {title_html}
        <div class="card-body">
            {content.text if hasattr(content, "text") else str(content)}
        </div>
    </div>
    """
