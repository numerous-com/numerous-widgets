import React from 'react';
import ButtonWidget from '../ButtonWidget';
import { Button } from '../../ui/Button';
import { useModelState, createRender } from '@anywidget/react';

// Import the ButtonWidget function directly
import * as ButtonWidgetModule from '../ButtonWidget';

// Mock dependencies
jest.mock('../../ui/Button', () => ({
  Button: jest.fn(() => null)
}));

jest.mock('../../css/styles.scss', () => ({}));

jest.mock('@anywidget/react', () => ({
  createRender: jest.fn(comp => comp),
  useModelState: jest.fn()
}));

// Create mocks for the handlers
const mockSetClicked = jest.fn();
const mockSetValue = jest.fn();

describe('ButtonWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the useModelState implementation
    (jest.requireMock('@anywidget/react').useModelState).mockImplementation((key: string) => {
      switch (key) {
        case 'ui_label': return ['Test Button'];
        case 'ui_tooltip': return ['Button tooltip'];
        case 'clicked': return [0, mockSetClicked];
        case 'disabled': return [false];
        case 'value': return [false, mockSetValue];
        case 'className': return [''];
        case 'variant': return ['default'];
        case 'icon_svg': return [''];
        case 'fit_to_content': return [false];
        default: return [undefined, jest.fn()];
      }
    });
  });
  
  it('properly renders the Button component and handles clicks', () => {
    // Create a mock instance for the useCallback
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    // Get the actual widget function and call it
    const ButtonWidgetFunction = (ButtonWidgetModule as any).default.render;
    const buttonWidget = ButtonWidgetFunction();
    
    // Check properties of the rendered Button component
    expect(buttonWidget.type).toBe(Button);
    expect(buttonWidget.props.label).toBe('Test Button');
    expect(buttonWidget.props.tooltip).toBe('Button tooltip');
    expect(typeof buttonWidget.props.onClick).toBe('function');
    
    // Test the onClick functionality
    buttonWidget.props.onClick();
    
    // Verify state was updated
    expect(mockSetClicked).toHaveBeenCalledWith(1);
    expect(mockSetValue).toHaveBeenCalledWith(true);
    
    // Clean up
    useCallbackSpy.mockRestore();
  });
}); 