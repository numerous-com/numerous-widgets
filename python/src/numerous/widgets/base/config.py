"""Configuration module for numerous widgets."""

import logging
import os
import pathlib


try:
    # Only set IS_DEV to True if WIDGET_ENV is explicitly set to "development"
    widget_env = os.getenv("WIDGET_ENV", "production").lower()
    IS_DEV = widget_env == "development"

except ImportError:
    IS_DEV = False

# Base paths
STATIC_DIR = pathlib.Path(__file__).parent.parent / "static"

# Allow users to specify custom CSS file path through environment variable
CUSTOM_CSS_PATH = os.getenv("NUMEROUS_WIDGETS_CSS")

if IS_DEV:
    ROOT_DIR = pathlib.Path(__file__).parent.parent.parent.parent.parent.parent
    with pathlib.Path(ROOT_DIR / "js" / "src" / "css" / "styles.css").open() as f:
        DEFAULT_CSS = f.read()

    # Development server configuration
    DEV_SERVER = os.getenv("VITE_DEV_SERVER", "http://localhost:5173")
    DEV_COMPONENT_PATH = f"{DEV_SERVER}/components/widgets"

    logging.info(
        "RUNNING NUMEROUS WIDGETS IN DEVELOPMENT MODE\n"
        f"Please ensure dev server running on {DEV_SERVER} using 'npx vite'"
    )
else:
    with pathlib.Path(STATIC_DIR / "styles.css").open() as f:
        DEFAULT_CSS = f.read()

# Load custom CSS if provided, otherwise use default
if CUSTOM_CSS_PATH:
    with pathlib.Path(CUSTOM_CSS_PATH).expanduser().resolve().open() as f:
        CSS = f.read()
    logging.info(f"Loaded custom CSS from {CUSTOM_CSS_PATH}")

else:
    CSS = DEFAULT_CSS


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


def export_default_css(output_path: str | pathlib.Path | None = None) -> str:
    """
    Export the default CSS to a file or return it as a string.

    Args:
        output_path: Optional path where to save the CSS file.
        If None, returns the CSS as a string.

    Returns:
        str: The default CSS content

    Examples:
        # Save to file
        export_default_css("~/my_custom_widgets.css")

        # Get CSS as string
        css_content = export_default_css()

    """
    if output_path:
        output_path = pathlib.Path(output_path).expanduser().resolve()
        output_path.write_text(DEFAULT_CSS)
        logging.info(f"Default CSS exported to: {output_path}")

    return DEFAULT_CSS
