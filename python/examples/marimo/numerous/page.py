from numerous.widgets import render_template
from numerous.widgets.base._config import IS_DEV
from pathlib import Path
from typing import Dict, Any


with open(Path(__file__).parent.joinpath("page.html.j2"), "r") as f:
    page_html_template = f.read()   

def page(**page_variables):
    page_variables["css"] = open(Path(__file__).parent.joinpath("styles.css"), "r").read()
    page_variables["logo"] = open(Path(__file__).parent.joinpath("logo.svg"), "r").read()
    print("logo")
    print(page_variables["logo"])
    if IS_DEV:
        with open(Path(__file__).parent.joinpath("page.html.j2"), "r") as f:
            page_html_template = f.read()   

    return render_template(page_html_template, **page_variables)