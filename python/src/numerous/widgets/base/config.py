import os
import pathlib
from typing import Union

try:
    from dotenv import load_dotenv

    # Load environment variables from .env file
    load_dotenv()
    # Default to production mode if not set
    IS_DEV = os.getenv("WIDGET_ENV", "production").lower() == "development"
    
except ImportError:
    IS_DEV = False

# Base paths
STATIC_DIR = pathlib.Path(__file__).parent.parent / "static"

if IS_DEV:
    ROOT_DIR = pathlib.Path(__file__).parent.parent.parent.parent.parent.parent
    CSS = open(ROOT_DIR / "js" / "src" / "css" / "styles.css", "r").read()

    # Development server configuration
    DEV_SERVER = os.getenv("VITE_DEV_SERVER", "http://localhost:5173")
    DEV_COMPONENT_PATH = f"{DEV_SERVER}/components/widgets"

    print(f"RUNNING NUMEROUS WIDGETS IN DEVELOPMENT MODE\n\nPlease ensure dev server running on {DEV_SERVER} using 'npx vite'\n")
else:
    CSS = open(STATIC_DIR / "styles.css", "r").read()

def get_widget_paths(component_name: str) -> tuple[Union[str, pathlib.Path], Union[str, pathlib.Path]]:
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
        esm = str(STATIC_DIR / f"{component_name}.mjs")
        css = CSS
    
    return esm, css