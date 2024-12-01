# widget

## Installation of Python Package


From the `python` directory, run:
```sh
pip install widgets
```

Prerequisites:

- Python

Consider creating a virtual environment:

```sh
python -m venv .venv
```

## Development

To install the development dependencies, from the `python` directory, run:

```sh
pip install -e ".[dev]"
```

### Configure environment

Create a `.env` file in the `python` directory with the following content:

```
WIDGET_ENV=production
VITE_DEV_SERVER=http://localhost:5173
```

### Development using Marimo
Install Marimo:

```sh
pip install marimo
```

Go to the `python/examples/marimo` directory and run:

```sh
marimo edit app.py
```

### Development using Vite


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
Change the `WIDGET_ENV` in the `.env` file to `development` to connect to the development server.

### Build

To build the JavaScript code, from the `js` directory, run:

```sh
npx vite build
```

To use the built JavaScript code, change the `WIDGET_ENV` in the `.env` file to `production`.
