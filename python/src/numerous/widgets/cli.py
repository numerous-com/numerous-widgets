"""Command line interface for numerous-widgets."""

import argparse
import sys

from numerous.widgets.base.config import export_default_css


def main() -> None:
    """Entry point for the numerous-widgets CLI."""
    parser = argparse.ArgumentParser(
        description="Numerous Widgets CLI tools", prog="numerous-widgets"
    )

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Export CSS command
    export_parser = subparsers.add_parser(
        "export-css", help="Export the default CSS to a file for customization"
    )
    export_parser.add_argument(
        "-o",
        "--output",
        default="numerous-widgets.css",
        help="Output file path for the CSS (default: numerous-widgets.css)",
    )

    args = parser.parse_args()

    if args.command == "export-css":
        export_default_css(args.output)

    elif args.command is None:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
