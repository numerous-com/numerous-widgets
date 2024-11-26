import pathlib

_DEV = True  # switch to False for production

if _DEV:
    # from `npx vite`
    ESM = "http://localhost:5173/js/components/ProjectMenuWidget.tsx?anywidget"
    CSS = pathlib.Path(__file__).parent / ".." / ".." / "css" / "styles.css"
else:
    ESM = pathlib.Path(__file__).parent / "static" / "ProjectMenuWidget.mjs"
    CSS = pathlib.Path(__file__).parent / "static" / "style.css"
