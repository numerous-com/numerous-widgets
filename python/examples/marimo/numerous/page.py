from pathlib import Path

from numerous.widgets import CSS, render_template
from numerous.widgets.base.config import IS_DEV


with open(Path(__file__).parent.joinpath("page.html.j2")) as f:
    page_html_template = f.read()

logo = open(Path(__file__).parent.joinpath("logo.svg")).read()


def page(**page_variables) -> str:
    page_variables["css"] = CSS
    page_variables["logo"] = logo

    if IS_DEV:
        with open(Path(__file__).parent.joinpath("page.html.j2")) as f:
            page_html_template_dev = f.read()

    return render_template(
        page_html_template_dev if IS_DEV else page_html_template, **page_variables
    )
