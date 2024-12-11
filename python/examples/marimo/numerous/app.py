import marimo

__generated_with = "0.9.24"
app = marimo.App(width="medium")


@app.cell
def __():
    import marimo as mo
    import numerous.widgets as wi
    aw = mo.ui.anywidget
    ht = mo.Html
    from page import page
    return aw, ht, mo, page, wi


@app.cell
def __(counter, ht, increment_counter, map, page, selection_widget, tabs):
    ht(page(**{
        "tabs": tabs,
        "show_basic": tabs.active_tab == "Basic",
        "show_map": tabs.active_tab == "Map",
        "counter": counter,
        "increment_counter": increment_counter,
        "selection_widget": selection_widget,
        "map_widget": map

    }))
    return


@app.cell
def __(aw, wi):
    tabs = aw(wi.Tabs(["Basic", "Map"]))
    return (tabs,)


@app.cell
def __(mo):
    value, set_value = mo.state(0)
    return set_value, value


@app.cell
def __(aw, value, wi):
    counter = aw(wi.Number(default=value(), label="Counter:", fit_to_content=True))
    return (counter,)


@app.cell
def __(aw, set_value, value, wi):
    def on_click(event):
        set_value(value()+1)

    increment_counter = aw(wi.Button(label="Increment Counter", on_click=on_click))
    return increment_counter, on_click


@app.cell
def __(aw, wi):
    selection_widget = aw(wi.DropDown(["1", "2", "3"], label="Select Value", fit_to_content=True))
    return (selection_widget,)


@app.cell
def __(aw, wi):
    map = aw(wi.MapSelector(points={
            'New York': [-73.985428, 40.748817],    # New York
            'Paris': [2.294481, 48.858370],     # Paris
            'Tokyo': [139.839478, 35.652832]    # Tokyo
        }, center= [2.294481, 48.858370], zoom=0))
    return (map,)


@app.cell
def __():
    import numpy as np
    from numerous.widgets.base.plotly import Plot

    # Generate some sample data
    x = np.linspace(0, 10, 100)
    y = np.sin(x)

    # Create the scatter plot data
    data = [{
        'type': 'scatter',
        'x': x,
        'y': y,
        'mode': 'markers',
        'name': 'Sin Wave'
    }]

    # Configure the layout
    layout = {
        'title': 'Simple Scatter Plot',
        'xaxis': {'title': 'X'},
        'yaxis': {'title': 'sin(x)'}
    }

    # Optional configuration (e.g., disable the modebar)
    config = {
        'displayModeBar': False
    }

    # Create and display the plot
    plot = Plot(
        data=data,
        layout=layout,
        config=config
    )
    plot
    return Plot, config, data, layout, np, plot, x, y


@app.cell
def __():
    return


if __name__ == "__main__":
    app.run()
