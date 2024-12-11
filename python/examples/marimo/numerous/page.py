from numerous.widgets import render_template, css
from numerous.widgets.base._config import IS_DEV
from pathlib import Path
from typing import Dict, Any


with open(Path(__file__).parent.joinpath("page.html.j2"), "r") as f:
    page_html_template = f.read()

logo = open(Path(__file__).parent.joinpath("logo.svg"), "r").read()

def page(**page_variables):
    page_variables["css"] = css
    page_variables["logo"] = logo

    if IS_DEV:
        with open(Path(__file__).parent.joinpath("page.html.j2"), "r") as f:
            page_html_template_dev = f.read()
            

    return render_template(page_html_template_dev if IS_DEV else page_html_template, **page_variables)