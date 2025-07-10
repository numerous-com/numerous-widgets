import React from 'react';
import CopyToClipboardWidget from '../CopyToClipboardWidget';
import { CopyToClipboard } from '../../ui/CopyToClipboard';
import { useModelState, createRender } from '@anywidget/react';

// Import the CopyToClipboardWidget function directly
import * as CopyToClipboardWidgetModule from '../CopyToClipboardWidget';

// Mock dependencies
jest.mock('../../ui/CopyToClipboard', () => ({
  CopyToClipboard: jest.fn(() => null)
}));

jest.mock('../../css/styles.scss', () => ({}));

jest.mock('@anywidget/react', () => ({
  createRender: jest.fn(comp => comp),
  useModelState: jest.fn()
}));

// Create mocks for the state setters
const mockSetCopied = jest.fn();
const mockSetIsCopying = jest.fn();
const mockSetCopySuccess = jest.fn();

describe('CopyToClipboardWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the useModelState implementation
    (jest.requireMock('@anywidget/react').useModelState).mockImplementation((key: string) => {
      switch (key) {
        case 'value': return ['Test value to copy'];
        case 'label': return ['Copy'];
        case 'tooltip': return ['Click to copy'];
        case 'success_message': return ['Copied!'];
        case 'disabled': return [false];
        case 'show_value': return [true];
        case 'timeout': return [2000];
        case 'variant': return ['default'];
        case 'class_name': return ['test-class'];
        case 'copied': return [0, mockSetCopied];
        case 'is_copying': return [false, mockSetIsCopying];
        case 'copy_success': return [false, mockSetCopySuccess];
        default: return [undefined, jest.fn()];
      }
    });
  });
  
  it('properly renders the CopyToClipboard component with correct props', () => {
    // Create a mock instance for the useCallback
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    // Get the actual widget function and call it
    const CopyToClipboardWidgetFunction = (CopyToClipboardWidgetModule as any).default.render;
    const copyWidget = CopyToClipboardWidgetFunction();
    
    // Check properties of the rendered CopyToClipboard component
    expect(copyWidget.type).toBe(CopyToClipboard);
    expect(copyWidget.props.value).toBe('Test value to copy');
    expect(copyWidget.props.label).toBe('Copy');
    expect(copyWidget.props.tooltip).toBe('Click to copy');
    expect(copyWidget.props.successMessage).toBe('Copied!');
    expect(copyWidget.props.disabled).toBe(false);
    expect(copyWidget.props.showValue).toBe(true);
    expect(copyWidget.props.timeout).toBe(2000);
    expect(copyWidget.props.variant).toBe('default');
    expect(copyWidget.props.className).toBe('test-class');
    expect(typeof copyWidget.props.onCopy).toBe('function');
    expect(typeof copyWidget.props.onCopySuccess).toBe('function');
    
    // Clean up
    useCallbackSpy.mockRestore();
  });
  
  it('handles copy action correctly', () => {
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    const CopyToClipboardWidgetFunction = (CopyToClipboardWidgetModule as any).default.render;
    const copyWidget = CopyToClipboardWidgetFunction();
    
    // Test the onCopy functionality
    copyWidget.props.onCopy();
    
    // Verify state was updated
    expect(mockSetIsCopying).toHaveBeenCalledWith(true);
    expect(mockSetCopied).toHaveBeenCalledWith(1);
    
    useCallbackSpy.mockRestore();
  });
  
  it('handles copy success correctly', () => {
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    const CopyToClipboardWidgetFunction = (CopyToClipboardWidgetModule as any).default.render;
    const copyWidget = CopyToClipboardWidgetFunction();
    
    // Test the onCopySuccess functionality with success
    copyWidget.props.onCopySuccess(true);
    
    // Verify state was updated
    expect(mockSetIsCopying).toHaveBeenCalledWith(false);
    expect(mockSetCopySuccess).toHaveBeenCalledWith(true);
    
    // Test with failure
    copyWidget.props.onCopySuccess(false);
    
    expect(mockSetIsCopying).toHaveBeenCalledWith(false);
    expect(mockSetCopySuccess).toHaveBeenCalledWith(false);
    
    useCallbackSpy.mockRestore();
  });
  
  it('resets copy success state after timeout', () => {
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    
    useCallbackSpy.mockImplementation(fn => fn);
    setTimeoutSpy.mockImplementation((fn: Function) => {
      fn();
      return 123 as any;
    });
    
    const CopyToClipboardWidgetFunction = (CopyToClipboardWidgetModule as any).default.render;
    const copyWidget = CopyToClipboardWidgetFunction();
    
    // Test the onCopySuccess functionality
    copyWidget.props.onCopySuccess(true);
    
    // Verify setTimeout was called and the reset function works
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(mockSetCopySuccess).toHaveBeenCalledWith(false);
    
    useCallbackSpy.mockRestore();
    setTimeoutSpy.mockRestore();
  });
}); 