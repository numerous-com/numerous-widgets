from jinja2 import Template

def render_template(template, **kwargs):
    """
    Renders a Jinja2 template with processed keyword arguments.
    
    Args:
        template: Either a template string or a file-like object containing the template
        **kwargs: Keyword arguments where values can be either single items or lists
                 Each item should have a .text attribute
    
    Returns:
        str: The rendered template
    """
    # Convert template string or file to Jinja2 Template object
    if hasattr(template, 'read'):  # File-like object
        template = Template(template.read())
    elif isinstance(template, str):
        template = Template(template)
    
    processed_kwargs = {}
    
    for key, value in kwargs.items():
        if isinstance(value, list):
            processed_kwargs[key] = [item.text for item in value]
        else:
            processed_kwargs[key] = (value.text if hasattr(value, 'text') else value) if value is not None else None
            
    return template.render(**processed_kwargs)

