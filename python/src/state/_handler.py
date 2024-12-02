from typing import Any, Callable, Dict, Optional, List
from dataclasses import dataclass, field

def dict_hash(d):
    """
    Approximate a hash for a dictionary assuming:
    - Keys are strings.
    - Values are hashable.
    """
    if not isinstance(d, dict):
        raise TypeError("Input must be a dictionary.")
    return hash(tuple(sorted((k, (dict_hash(v) if isinstance(v, dict) else hash(v))) for k, v in d.items())))

def compare_with_dict(d1: Any|Dict[str, Any], d2: Any|Dict[str, Any]):
    if isinstance(d1, dict) and isinstance(d2, dict):
        return all(compare_with_dict(v1, v2) for v1, v2 in zip(d1.values(), d2.values()))
    elif isinstance(d1, list) and isinstance(d2, list):
        return all(compare_with_dict(v1, v2) for v1, v2 in zip(d1, d2))
    else:
        return d1 == d2

@dataclass
class Input:
    name: str
    get_value: Callable[[], Any]
    set_value: Callable[[Any], None]
    value_at_commit: Dict[str, Any] = field(default_factory=dict)

    @property
    def value(self):
        return self.get_value()
    
    @value.setter
    def value(self, value: Any):
        self.set_value(value)

@dataclass
class Output:
    name: str
    get_value: Callable[[], Any]
    set_value: Callable[[Any], None]
    value_at_commit: Dict[str, Any] = field(default_factory=dict)

    @property
    def value(self):
        if isinstance(self.get_value, Callable):
            return self.get_value()
        else:
            raise ValueError(f"Invalid get_value type: {type(self.get_value)}, must be a callable")
    
    @value.setter
    def value(self, value: Any):
        if isinstance(self.set_value, Callable):
            self.set_value(value)
        else:
            raise ValueError(f"Invalid set_value type: {type(self.set_value)}, must be a callable")

class StateHandler:
    def __init__(self):

        self._inputs: Dict[str, Input] = {}
        self._inputs_hash_commit: Dict[str, str] = {}

        self._outputs: Dict[str, Output] = {}
        self._outputs_hash_commit: Dict[str, str] = {}

        self._combined_hash_commit: Dict[str, str] = {}
    
    def register_input(self, name: str, get_value: Callable[[], Any], set_value: Callable[[Any], None]):
        if name in self._inputs:
            raise ValueError(f"Input {name} already registered")
        
        self._inputs[name] = Input(name, get_value, set_value)

    def register_output(self, name: str, get_value: Callable[[], Any], set_value: Callable[[Any], None]):
        if name in self._outputs:
            raise ValueError(f"Output {name} already registered")
        
        self._outputs[name] = Output(name, get_value, set_value)

    def register(self, io):
        if io.is_input:
            self.register_input(io.name, io.get_value, io.set_value)
        else:
            self.register_output(io.name, io.get_value, io.set_value)
    
    def roll_back_inputs(self, commit_id: str, inputs: Optional[List[str]] = None):
        for input in self._inputs.values():
            if inputs is None or input.name in inputs:
                input.value = input.value_at_commit[commit_id]

    def roll_back_outputs(self, commit_id: str, outputs: Optional[List[str]] = None):
        for output in self._outputs.values():
            if outputs is None or output.name in outputs:
                output.value = output.value_at_commit[commit_id]

    def roll_back(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None):
        self.roll_back_inputs(commit_id, inputs)
        self.roll_back_outputs(commit_id, outputs)

    def get_inputs(self, commit_id: str, inputs: Optional[List[str]] = None) -> Dict[str, Any]:
        input_values = {}
        
        for input in self._inputs.values():
            if inputs is None or input.name in inputs:
                input_values[input.name] = input.value
                input.value_at_commit[commit_id] = input_values[input.name]
        
        self._inputs_hash_commit[dict_hash(input_values)] = commit_id
        
        return input_values
    
    def commit_outputs(self, commit_id: str, output_values: Dict[str, Output]):
        for output in output_values.values():
            output.value_at_commit[commit_id] = output.value
        
        self._outputs_hash_commit[dict_hash(output_values)] = commit_id


    def inputs_valid_for_commit(self, commit_id: str, inputs: Optional[List[str]] = None) -> List[str]:
        valid_inputs = {}
        if inputs is None:
            inputs = list(self._inputs.keys())

        for _input_name in inputs:
            if commit_id in self._inputs[_input_name].value_at_commit:
                valid_inputs[_input_name] = compare_with_dict(self._inputs[_input_name].value_at_commit[commit_id], self._inputs[_input_name].value)
            else:
                valid_inputs[_input_name] = False

        return all(valid_inputs.values())
    
    def outputs_valid_for_commit(self, commit_id: str, outputs: Optional[List[str]] = None) -> List[str]:
        valid_outputs = {}
        if outputs is None:
            outputs = list(self._outputs.keys())

        for output_name in outputs:
            output = self._outputs[output_name]
            if commit_id in output.value_at_commit:
                valid_outputs[output.name] = compare_with_dict(output.value_at_commit[commit_id], output.value)
            else:
                valid_outputs[output_name] = False

        return all(valid_outputs.values())
    
    def valid_for_commit(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None) -> bool:
        return self.inputs_valid_for_commit(commit_id, inputs) and self.outputs_valid_for_commit(commit_id, outputs)
    

    def set_inputs(self, inputs: Dict[str, Any], commit_id: str):
        for input in self._inputs.values():
            input.value = inputs[input.name]
            input.value_at_commit[commit_id] = inputs[input.name]
        
        self._inputs_hash_commit[dict_hash(inputs)] = commit_id
    
    def set_outputs(self, outputs: Dict[str, Any], commit_id: str):
        for output in self._outputs.values():
            output.value = outputs[output.name]
            output.value_at_commit[commit_id] = outputs[output.name]
        
        self._outputs_hash_commit[dict_hash(outputs)] = commit_id

    def get_outputs(self, commit_id: str, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        output_values = {}

        for output in self._outputs.values():
            if outputs is None or output.name in outputs:
                output_values[output.name] = output.value
                output.value_at_commit[commit_id] = output_values[output.name]
        
        self._outputs_hash_commit[dict_hash(output_values)] = commit_id

        return output_values

    def get_combined(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        combined_values = {}

        self.get_inputs(commit_id, inputs)
        self.get_outputs(commit_id, outputs)

        return combined_values

    def from_dict(self, dict_data: Dict[str, Any]):
        if "commit_id" not in dict_data:
            raise ValueError("Commit id is required")
        
        commit_id = dict_data["commit_id"]

        self.set_inputs(dict_data["inputs"], commit_id)
        self.set_outputs(dict_data["outputs"], commit_id)

    def to_dict(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        return {
            "inputs": self.get_inputs(commit_id, inputs),
            "outputs": self.get_outputs(commit_id, outputs),
            "commit_id": commit_id
        }

if __name__ == "__main__":

    class IO:

        def __init__(self, value: Any, name: str):
            self._value = value
            self._name = name
        
        @property
        def value(self):
            return self._value
        
        @value.setter
        def value(self, value: Any):
            self._value = value

        def get_value(self):
            return self._value
        
        def set_value(self, value: Any):
            self._value = value

        @property
        def name(self):
            return self._name

    handler = StateHandler()
    
    input1 = IO(1, "input1")
    output1 = IO({"a": 1, "b": 2}, "output1")

    handler.register_input("input1", input1.get_value, input1.set_value)
    handler.register_output("output1", output1.get_value, output1.set_value)

    assert not handler.inputs_valid_for_commit("run1", ["input1"])

    handler.get_inputs("run1", ["input1"])

    assert handler.inputs_valid_for_commit("run1", ["input1"])

    handler.set_outputs({"output1": {"a": 1, "b": 3}}, "run1")

    assert handler.valid_for_commit("run1", ["input1"], ["output1"])

    handler.set_inputs({"input1": 2}, "run2")

    assert not handler.inputs_valid_for_commit("run1", ["input1"])
    assert handler.inputs_valid_for_commit("run2", ["input1"])

    assert handler.outputs_valid_for_commit("run1", ["output1"])

    handler.roll_back_inputs("run1", ["input1"])

    assert handler.valid_for_commit("run1", ["input1"], ["output1"])

    print(handler.to_dict("run1"))

