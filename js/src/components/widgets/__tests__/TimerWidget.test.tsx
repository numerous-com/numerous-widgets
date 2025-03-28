import React from 'react';
import TimerWidget from '../TimerWidget';
import { Timer } from '../../ui/Timer';

// Import the TimerWidget function directly
import * as TimerWidgetModule from '../TimerWidget';

// Mock dependencies
jest.mock('../../ui/Timer', () => ({
  Timer: jest.fn(() => null)
}));

jest.mock('../../css/styles.scss', () => ({}));

jest.mock('@anywidget/react', () => ({
  createRender: jest.fn(comp => comp),
  useModelState: jest.fn()
}));

// Mock date for consistent testing
const originalDateNow = Date.now;
const mockDateNow = jest.fn(() => 1000000);

// Create mocks for the handlers
const mockSetIsActive = jest.fn();
const mockSetLastTick = jest.fn();

describe('TimerWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Date.now = mockDateNow;
    
    // Mock the useModelState implementation
    (jest.requireMock('@anywidget/react').useModelState).mockImplementation((key: string) => {
      switch (key) {
        case 'interval': return [1000];
        case 'is_active': return [false, mockSetIsActive];
        case 'ui_label': return ['Timer'];
        case 'last_tick': return [0, mockSetLastTick];
        default: return [undefined, jest.fn()];
      }
    });
  });
  
  afterEach(() => {
    Date.now = originalDateNow;
  });
  
  it('properly renders the Timer component', () => {
    // Create a mock instance for the useCallback
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    // Get the actual widget function and call it
    const TimerWidgetFunction = (TimerWidgetModule as any).default.render;
    const timerWidget = TimerWidgetFunction();
    
    // Check properties of the rendered Timer component
    expect(timerWidget.type).toBe(Timer);
    expect(timerWidget.props.interval).toBe(1000);
    expect(timerWidget.props.isActive).toBe(false);
    expect(timerWidget.props.uiLabel).toBe('Timer');
    expect(typeof timerWidget.props.onTick).toBe('function');
    expect(typeof timerWidget.props.onToggle).toBe('function');
    
    // Test the callback functionality
    timerWidget.props.onTick();
    expect(mockSetLastTick).toHaveBeenCalledWith(1000);
    
    timerWidget.props.onToggle(true);
    expect(mockSetIsActive).toHaveBeenCalledWith(true);
    
    // Clean up
    useCallbackSpy.mockRestore();
  });
}); 