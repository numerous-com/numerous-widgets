# State Model

The StateModel is a pydantic model that can be used to generate a ui from a pydantic model and sync the ui with the model.

## Example Usage

```python
from numerous.widgets.state import StateModel, number_field

class MyModel(StateModel):
    number: int = number_field(label="Number", tooltip="A number", start=0, stop=100, default=0, multiple_of=1)

model = MyModel()
number_widget = model.get_widget("number")

model.number = 10

model.changed()
# True

model.update_widgets()
model.changed()
# False

model.validate("number", 10)
# True

model.validate("number", 101)
# False
```

## ::: numerous.widgets.state.StateModel
    options:
        show_root_heading: true

## ::: numerous.widgets.state.number_field
    options:
        show_root_heading: true

