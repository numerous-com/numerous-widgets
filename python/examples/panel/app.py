import panel as pn
import widgets as wi

# Enable the Panel extension for the notebook/browser
pn.extension("ipywidgets")

# Create some basic widgets
number_input = wi.Number(label='Number Input', default=5, start=0, stop=10)


# Create a layout
widgets_column = pn.Column(
    pn.pane.Markdown('## Widget Demo'),
    number_input,
    width=400
)

# Create the app
app = pn.template.FastListTemplate(
    title='Panel Widgets Demo',
    main=[widgets_column],
)

# Serve the app
if __name__ == '__main__':
    app.show()

