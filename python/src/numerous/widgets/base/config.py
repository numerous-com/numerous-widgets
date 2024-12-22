"""Configuration module for numerous widgets."""

import logging
import os
import pathlib


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
    with pathlib.Path(ROOT_DIR / "js" / "src" / "css" / "styles.css").open() as f:
        CSS = f.read()

    # Development server configuration
    DEV_SERVER = os.getenv("VITE_DEV_SERVER", "http://localhost:5173")
    DEV_COMPONENT_PATH = f"{DEV_SERVER}/components/widgets"

    logging.info(
        "RUNNING NUMEROUS WIDGETS IN DEVELOPMENT MODE\n"
        f"Please ensure dev server running on {DEV_SERVER} using 'npx vite'"
    )
else:
    with pathlib.Path(STATIC_DIR / "styles.css").open() as f:
        CSS = f.read()


def get_widget_paths(
    component_name: str,
) -> tuple[str | pathlib.Path, str | pathlib.Path]:
    """
    Return the ESM and CSS paths for a widget based on environment.

    Args:
        component_name: Name of the component (e.g., 'NumberInputWidget')

    Returns:
        tuple: (esm_path, css_path) for the current environment

    """
    if IS_DEV:
        esm = f"{DEV_COMPONENT_PATH}/{component_name}.tsx?anywidget"
        css = CSS

    else:
        esm = str(STATIC_DIR / f"{component_name}.mjs")
        css = CSS

    return esm, css
