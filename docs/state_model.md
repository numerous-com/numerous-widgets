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

model_widget.val = 55
model.revert()
# model.number = 10

new_model = MyModel(number=150)
# raises ValidationError

new_model.number = 20
model.apply_values(new_model)
# model.number = 20
# number_widget.val = 20
```


