"""Templating is for rendering Jinja2 templates."""

from typing import IO

from anywidget import AnyWidget
from jinja2 import Template


def render_template(template: str | IO[str], **kwargs: dict[str, AnyWidget]) -> str:
    """
    Render a Jinja2 template with marimo widgets.

    Args:
        template: Either a template string or a file-like object containing the template
        **kwargs: Keyword arguments where values can be either single items or lists
                 Each item should have a .text attribute

    Returns:
        str: The rendered template

    """
    # Convert template string or file to Jinja2 Template object
    if hasattr(template, "read"):  # File-like object
        _template = Template(template.read())
    elif isinstance(template, str):
        _template = Template(template)

    processed_kwargs = {}

    for key, value in kwargs.items():
        if isinstance(value, list):
            processed_kwargs[key] = [item.text for item in value]
        else:
            processed_kwargs[key] = (
                (value.text if hasattr(value, "text") else value)
                if value is not None
                else None
            )

    content = _template.render(**processed_kwargs)
    if not isinstance(content, str):
        raise TypeError("Template rendering returned a non-string value")
    return content
