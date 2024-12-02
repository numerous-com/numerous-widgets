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
    """
    Compare two values or dictionaries recursively.
    
    Args:
        d1: The first value or dictionary to compare.
        d2: The second value or dictionary to compare.
    
    Returns:
        True if the values or dictionaries are equal, False otherwise.
    """
    if isinstance(d1, dict) and isinstance(d2, dict):
        return all(compare_with_dict(v1, v2) for v1, v2 in zip(d1.values(), d2.values()))
    elif isinstance(d1, list) and isinstance(d2, list):
        return all(compare_with_dict(v1, v2) for v1, v2 in zip(d1, d2))
    else:
        return d1 == d2

@dataclass
class Input:
    """
    A class representing an input to the state handler.

    Args:
        name: The name of the input.
        get_value: A callable that returns the current value of the input.
        set_value: A callable that sets the value of the input.
    """
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
    """
    A class representing an output to the state handler.

    Args:
        name: The name of the output.
        get_value: A callable that returns the current value of the output.
        set_value: A callable that sets the value of the output.
    """
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
    """
    A class representing a state handler.

    Args:
        inputs: A dictionary of inputs.
        outputs: A dictionary of outputs.
    """
    def __init__(self, inputs: Optional[Dict[str, Input]] = None, outputs: Optional[Dict[str, Output]] = None):
        self._inputs: Dict[str, Input] = inputs if inputs is not None else {}
        self._inputs_hash_commit: Dict[str, str] = {}

        self._outputs: Dict[str, Output] = outputs if outputs is not None else {}
        self._outputs_hash_commit: Dict[str, str] = {}

        self._combined_hash_commit: Dict[str, str] = {}
    
    def register_input(self, name: str, get_value: Callable[[], Any], set_value: Callable[[Any], None]):
        """
        Register an input to the state handler.

        Args:
            name: The name of the input.
            get_value: A callable that returns the current value of the input.
            set_value: A callable that sets the value of the input.
        """
        if name in self._inputs:
            raise ValueError(f"Input {name} already registered")
        
        self._inputs[name] = Input(name, get_value, set_value)

    def register_output(self, name: str, get_value: Callable[[], Any], set_value: Callable[[Any], None]):
        """
        Register an output to the state handler.

        Args:
            name: The name of the output.
            get_value: A callable that returns the current value of the output.
            set_value: A callable that sets the value of the output.
        """
        if name in self._outputs:
            raise ValueError(f"Output {name} already registered")
        
        self._outputs[name] = Output(name, get_value, set_value)
    
    def roll_back_inputs(self, commit_id: str, inputs: Optional[List[str]] = None):
        """
        Roll back the inputs to a previous commit.

        Args:
            commit_id: The commit id to roll back to.
            inputs: The inputs to roll back. If None, all inputs are rolled back.
        """
        for input in self._inputs.values():
            if inputs is None or input.name in inputs:
                input.value = input.value_at_commit[commit_id]

    def roll_back_outputs(self, commit_id: str, outputs: Optional[List[str]] = None):
        """
        Roll back the outputs to a previous commit.

        Args:
            commit_id: The commit id to roll back to.
            outputs: The outputs to roll back. If None, all outputs are rolled back.
        """
        for output in self._outputs.values():
            if outputs is None or output.name in outputs:
                output.value = output.value_at_commit[commit_id]

    def roll_back(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None):
        """
        Roll back the inputs and outputs to a previous commit.

        Args:
            commit_id: The commit id to roll back to.
            inputs: The inputs to roll back. If None, all inputs are rolled back.
            outputs: The outputs to roll back. If None, all outputs are rolled back.
        """
        self.roll_back_inputs(commit_id, inputs)
        self.roll_back_outputs(commit_id, outputs)

    def get_inputs(self, commit_id: str, inputs: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Get the inputs at a previous commit.

        Args:
            commit_id: The commit id to get the inputs at.
            inputs: The inputs to get. If None, all inputs are returned.
        
        Returns:
            A dictionary of the inputs at the commit.
        """
        input_values = {}
        
        for input in self._inputs.values():
            if inputs is None or input.name in inputs:
                input_values[input.name] = input.value
                input.value_at_commit[commit_id] = input_values[input.name]
        
        self._inputs_hash_commit[dict_hash(input_values)] = commit_id
        
        return input_values
    
    def commit_outputs(self, commit_id: str, output_values: Dict[str, Output]):
        """
        Commit the outputs to a new commit.
        
        Args:
            commit_id: The commit id to commit to.
            output_values: The outputs to commit.
        """
        for output in output_values.values():
            output.value_at_commit[commit_id] = output.value
        
        self._outputs_hash_commit[dict_hash(output_values)] = commit_id


    def inputs_valid_for_commit(self, commit_id: str, inputs: Optional[List[str]] = None) -> List[str]:
        """
        Check if the inputs are valid for a commit.

        Args:
            commit_id: The commit id to check.
            inputs: The inputs to check. If None, all inputs are checked.
        
        Returns:
            True if the inputs are valid for the commit, False otherwise.
        """
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
        """
        Check if the outputs are valid for a commit.

        Args:
            commit_id: The commit id to check.
            outputs: The outputs to check. If None, all outputs are checked.
        
        Returns:
            True if the outputs are valid for the commit, False otherwise.
        """
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
        """
        Check if the inputs and outputs are valid for a commit.

        Args:
            commit_id: The commit id to check.
            inputs: The inputs to check. If None, all inputs are checked.
            outputs: The outputs to check. If None, all outputs are checked.
        """
        return self.inputs_valid_for_commit(commit_id, inputs) and self.outputs_valid_for_commit(commit_id, outputs)
    

    def set_inputs(self, inputs: Dict[str, Any], commit_id: str):
        """
        Set the inputs to a new commit.

        Args:
            inputs: The inputs to set.
            commit_id: The commit id to set the inputs to.
        """
        for input in self._inputs.values():
            input.value = inputs[input.name]
            input.value_at_commit[commit_id] = inputs[input.name]
        
        self._inputs_hash_commit[dict_hash(inputs)] = commit_id
    
    def set_outputs(self, outputs: Dict[str, Any], commit_id: str):
        """
        Set the outputs to a new commit.

        Args:
            outputs: The outputs to set.
            commit_id: The commit id to set the outputs to.
        """
        for output in self._outputs.values():
            output.value = outputs[output.name]
            output.value_at_commit[commit_id] = outputs[output.name]
        
        self._outputs_hash_commit[dict_hash(outputs)] = commit_id

    def get_outputs(self, commit_id: str, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Get the outputs at a previous commit.

        Args:
            commit_id: The commit id to get the outputs at.
            outputs: The outputs to get. If None, all outputs are returned.
        
        Returns:
            A dictionary of the outputs at the commit.
        """
        output_values = {}

        for output in self._outputs.values():
            if outputs is None or output.name in outputs:
                output_values[output.name] = output.value
                output.value_at_commit[commit_id] = output_values[output.name]
        
        self._outputs_hash_commit[dict_hash(output_values)] = commit_id

        return output_values

    def get_combined(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Get the combined inputs and outputs at a previous commit.

        Args:
            commit_id: The commit id to get the combined inputs and outputs at.
            inputs: The inputs to get. If None, all inputs are returned.
            outputs: The outputs to get. If None, all outputs are returned.
        """
        combined_values = {}

        self.get_inputs(commit_id, inputs)
        self.get_outputs(commit_id, outputs)

        return combined_values

    def from_dict(self, dict_data: Dict[str, Any]):
        """
        Set the state from a dictionary.

        Args:
            dict_data: The dictionary to set the state from.
        """
        if "commit_id" not in dict_data:
            raise ValueError("Commit id is required")
        
        commit_id = dict_data["commit_id"]

        self.set_inputs(dict_data["inputs"], commit_id)
        self.set_outputs(dict_data["outputs"], commit_id)

    def to_dict(self, commit_id: str, inputs: Optional[List[str]] = None, outputs: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Convert the state to a dictionary.

        Args:
            commit_id: The commit id to get the dictionary at.
            inputs: The inputs to get. If None, all inputs are returned.
            outputs: The outputs to get. If None, all outputs are returned.
        
        Returns:
            A dictionary of the state at the commit.
        """
        return {
            "inputs": self.get_inputs(commit_id, inputs),
            "outputs": self.get_outputs(commit_id, outputs),
            "commit_id": commit_id
        }


