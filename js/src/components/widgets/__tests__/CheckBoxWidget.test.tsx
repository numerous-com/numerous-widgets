import React from 'react';
import CheckBoxWidget from '../CheckBoxWidget';
import { CheckBox } from '../../ui/CheckBox';
import { useModelState, createRender } from '@anywidget/react';

// Import the CheckBoxWidget function directly
import * as CheckBoxWidgetModule from '../CheckBoxWidget';

// Mock dependencies
jest.mock('../../ui/CheckBox', () => ({
  CheckBox: jest.fn(() => null)
}));

jest.mock('../../css/styles.scss', () => ({}));

jest.mock('@anywidget/react', () => ({
  createRender: jest.fn(comp => comp),
  useModelState: jest.fn()
}));

// Create mocks for the handlers
const mockSetValue = jest.fn();

describe('CheckBoxWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the useModelState implementation
    (jest.requireMock('@anywidget/react').useModelState).mockImplementation((key: string) => {
      switch (key) {
        case 'value': return [false, mockSetValue];
        case 'ui_label': return ['Test CheckBox'];
        case 'ui_tooltip': return ['CheckBox tooltip'];
        default: return [undefined, jest.fn()];
      }
    });
  });
  
  it('properly renders the CheckBox component and handles changes', () => {
    // Get the actual widget function and call it
    const CheckBoxWidgetFunction = (CheckBoxWidgetModule as any).default.render;
    const checkboxWidget = CheckBoxWidgetFunction();
    
    // Check properties of the rendered CheckBox component
    expect(checkboxWidget.type).toBe(CheckBox);
    expect(checkboxWidget.props.value).toBe(false);
    expect(checkboxWidget.props.uiLabel).toBe('Test CheckBox');
    expect(checkboxWidget.props.uiTooltip).toBe('CheckBox tooltip');
    expect(typeof checkboxWidget.props.onChange).toBe('function');
    
    // Test the onChange functionality
    checkboxWidget.props.onChange(true);
    
    // Verify state was updated
    expect(mockSetValue).toHaveBeenCalledWith(true);
  });
}); 