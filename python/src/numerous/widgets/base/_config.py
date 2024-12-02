import os
import pathlib
from typing import Union

try:
    from dotenv import load_dotenv

    # Load environment variables from .env file
    load_dotenv()

    # Default to development mode if not set
    IS_DEV = os.getenv("WIDGET_ENV", "production").lower() == "development"

except ImportError:
    IS_DEV = False

# Base paths
STATIC_DIR = pathlib.Path(__file__).parent.parent / "static"

if IS_DEV:
    ROOT_DIR = pathlib.Path(__file__).parent.parent.parent.parent.parent
    CSS = open(ROOT_DIR / "js" / "src" / "css" / "styles.css", "r").read()

    # Development server configuration
    DEV_SERVER = os.getenv("VITE_DEV_SERVER", "http://localhost:5173")
    DEV_COMPONENT_PATH = f"{DEV_SERVER}/src/components/widgets"

else:
    CSS = STATIC_DIR / "style.css"

def get_widget_paths(component_name: str) -> tuple[Union[str, pathlib.Path], pathlib.Path]:
    """
    Returns the ESM and CSS paths for a widget based on environment.
    
    Args:
        component_name: Name of the component (e.g., 'NumberInputWidget')
    
    Returns:
        tuple: (esm_path, css_path) for the current environment
    """
    if IS_DEV:
        esm = f"{DEV_COMPONENT_PATH}/{component_name}.tsx?anywidget"
        css = CSS
        #css = STATIC_DIR / "style.css"

    else:
        esm = STATIC_DIR / f"{component_name}.mjs"
        css = STATIC_DIR / f"{component_name}.css"
    
    return esm, css