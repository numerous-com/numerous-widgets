import pytest
from typing import Any
from widgets.state import StateHandler

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

@pytest.fixture
def setup_handler():
    handler = StateHandler()
    input1 = IO(1, "input1")
    output1 = IO({"a": 1, "b": 2}, "output1")
    
    handler.register_input("input1", input1.get_value, input1.set_value)
    handler.register_output("output1", output1.get_value, output1.set_value)
    
    return handler, input1, output1

def test_initial_input_validity(setup_handler):
    handler, _, _ = setup_handler
    assert not handler.inputs_valid_for_commit("run1", ["input1"])

def test_input_validity_after_get(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    assert handler.inputs_valid_for_commit("run1", ["input1"])

def test_validity_after_set_outputs(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    handler.set_outputs({"output1": {"a": 1, "b": 3}}, "run1")
    assert handler.valid_for_commit("run1", ["input1"], ["output1"])

def test_input_validity_multiple_runs(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    handler.set_inputs({"input1": 2}, "run2")
    
    assert not handler.inputs_valid_for_commit("run1", ["input1"])
    assert handler.inputs_valid_for_commit("run2", ["input1"])

def test_output_validity(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    handler.set_outputs({"output1": {"a": 1, "b": 3}}, "run1")
    assert handler.outputs_valid_for_commit("run1", ["output1"])

def test_rollback_inputs(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    handler.set_outputs({"output1": {"a": 1, "b": 3}}, "run1")
    handler.set_inputs({"input1": 2}, "run2")
    
    handler.roll_back_inputs("run1", ["input1"])
    assert handler.valid_for_commit("run1", ["input1"], ["output1"])

def test_to_dict(setup_handler):
    handler, _, _ = setup_handler
    handler.get_inputs("run1", ["input1"])
    handler.set_outputs({"output1": {"a": 1, "b": 3}}, "run1")
    
    result = handler.to_dict("run1")
    assert isinstance(result, dict) 