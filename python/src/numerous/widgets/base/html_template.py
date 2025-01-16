"""Module providing an HTML template widget for the numerous library."""

from typing import Any

import anywidget
import traitlets
from jinja2 import Template

from .config import get_widget_paths


# Get environment-appropriate paths
ESM, CSS = get_widget_paths("HTMLTemplateWidget")


class HTMLTemplate(anywidget.AnyWidget):  # type: ignore[misc]
    """
    A widget that renders HTML templates with variables.

    Args:
        template: The HTML template string with variables in {{ var }} format
        variables: Dictionary of variables to insert into the template
        class_name: Optional CSS class name for styling (default: "")

    """

    # Define traitlets for the widget properties
    template = traitlets.Unicode("").tag(sync=True)
    variables = traitlets.Dict().tag(sync=True)
    rendered_html = traitlets.Unicode("").tag(sync=True)
    class_name = traitlets.Unicode("").tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        template: str = "",
        variables: dict[str, Any] | None = None,
        class_name: str = "",
    ) -> None:
        if variables is None:
            variables = {}

        # Initialize widget with empty values
        super().__init__()

        # Set initial values
        self.template = template
        self.variables = dict(variables)
        self.class_name = class_name

        # Force initial render
        self._render()

    def _render_template(self, template: str, variables: dict[str, Any]) -> str:
        """Render the template with the given variables using Jinja2."""
        jinja_template = Template(template)
        return str(jinja_template.render(**variables))

    @traitlets.observe("template", "variables")  # type: ignore[misc]
    def _on_change(self, change: dict[str, Any]) -> None:  # noqa: ARG002
        """React to changes in template or variables."""
        self._render()

    def _render(self) -> None:
        """Update the rendered HTML."""
        new_html = self._render_template(self.template, self.variables)
        self.rendered_html = new_html

    def update_template(self, template: str) -> None:
        """Update the template."""
        self.template = template

    def update_variables(self, variables: dict[str, Any]) -> None:
        """Update the variables dictionary."""
        self.variables = dict(variables)

    def update_variable(self, key: str, value: Any) -> None:  # noqa: ANN401
        """Update a single variable."""
        new_variables = dict(self.variables)
        new_variables[key] = value
        self.variables = new_variables
