# Numerous Widgets

Welcome to the widgets project.

The project consists of widgets in Python apps, as well as python libraries for app state management and running tasks.

To install the python package, run:

```sh
pip install numerous-widgets
```

Import the package in your python app:

```python
import numerous.widgets as wi
```

Prerequisites:

- Python

Consider creating a virtual environment:

```sh
python -m venv .venv
```

## Developing Numerous Widgets

The project is partly frontend for the widgets developed in typescript React, and partly python code to implement the widgets. All widgets are developed according to the AnyWidget framework (see https://www.anywidget.dev).

The frontend is developed in the `js` directory, and the python code is developed in the `python` directory.

The frontend is developed using Vite and React.

### Installation of the development dependencies

To install the development dependencies, from the `python` directory, run:

```sh
pip install -e ".[dev]"
```

Configure python environment by creating a .env file.

Create a `.env` file in the `python` directory with the following content:

```
WIDGET_ENV=production
VITE_DEV_SERVER=http://localhost:5173
```

### Development using Marimo

Marimo is a notebook-like interface for python code which can be used to create apps based on the widgets.

To install Marimo run:

```sh
pip install marimo
```

You can start developing the widgets by editing the `app.py` file in the `python/examples/marimo` directory.

Go to the `python/examples/marimo` directory and run:

```sh
marimo edit app.py
```

This starts a development server and opens a browser window with the Marimo interface. From there you can inspect the widgets and experiment with them.

Now you are setup to develop the Python side of the widgets. To develop the frontend, you need to run the development server, see below.

### Development using Vite

The widgets are developed using Vite and React.

To install the development dependencies, from the `js` directory, run:

```sh
npm install
```

Prerequisites:

- Node.js
- npm

To run the development server, from the `js` directory, run:

```sh
npx vite
```
Now, to use the development version of the widgets in Python and Marimo, change the `WIDGET_ENV` in the `.env` file to `development`. This will make the Python code connect to the development server for the latest changes, so you can see the changes immediately by restarting the marimo notebook.

The widgets js folder are structured as React components, which are then imported in Widget.tsx files which wraps the AnyWidget React interface. This means you can use the Widgets in a standalone React app for testing and development as well.

### Build

To build the JavaScript code, from the `js` directory, run:

On windows, run:
```sh
build-widgets.ps1
```

On Linux/Mac, run:

```sh
build-widgets.sh
```

To use the built JavaScript code, change the `WIDGET_ENV` in the `.env` file to `production`.

Now you are all setup to develop the widgets. Happy coding!
