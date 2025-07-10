import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyToClipboard } from '../CopyToClipboard';

// Mock the Tooltip component
jest.mock('../Tooltip', () => ({
  Tooltip: ({ tooltip }: { tooltip: string }) => <div data-testid="tooltip">{tooltip}</div>
}));

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

// Mock execCommand for fallback
const mockExecCommand = jest.fn();
Object.assign(document, {
  execCommand: mockExecCommand,
});

describe('CopyToClipboard', () => {
  const defaultProps = {
    value: 'Test value to copy',
    label: 'Copy',
    successMessage: 'Copied!',
    timeout: 1000,
    onCopy: jest.fn(),
    onCopySuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockWriteText.mockResolvedValue(undefined);
    mockExecCommand.mockReturnValue(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with default props', () => {
    render(<CopyToClipboard {...defaultProps} />);
    
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with custom label and className', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        label="Copy URL"
        className="custom-class"
      />
    );
    
    expect(screen.getByText('Copy URL')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('copy-to-clipboard-button');
  });

  it('shows value when showValue is true', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        showValue={true}
      />
    );
    
    expect(screen.getByText('Test value to copy')).toBeInTheDocument();
    expect(screen.getByRole('code')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        disabled={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows tooltip when provided', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        tooltip="Click to copy text"
      />
    );
    
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toHaveTextContent('Click to copy text');
  });

  it('handles successful copy with modern clipboard API', async () => {
    render(<CopyToClipboard {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.onCopy).toHaveBeenCalled();
    expect(mockWriteText).toHaveBeenCalledWith('Test value to copy');

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    expect(defaultProps.onCopySuccess).toHaveBeenCalledWith(true);

    // Fast-forward time to test reset
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('Copy')).toBeInTheDocument();
    });
  });

  it('handles fallback copy method when clipboard API fails', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard API not supported'));
    
    render(<CopyToClipboard {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    expect(defaultProps.onCopySuccess).toHaveBeenCalledWith(true);
  });

  it('handles copy failure', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard API not supported'));
    mockExecCommand.mockReturnValue(false);
    
    render(<CopyToClipboard {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to copy to clipboard')).toBeInTheDocument();
    });

    expect(defaultProps.onCopySuccess).toHaveBeenCalledWith(false);
  });

  it('does not copy when disabled', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        disabled={true}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.onCopy).not.toHaveBeenCalled();
    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('does not copy when value is empty', () => {
    render(
      <CopyToClipboard
        {...defaultProps}
        value=""
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.onCopy).not.toHaveBeenCalled();
    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('shows copying state during copy operation', async () => {
    let resolveClipboard: Function;
    mockWriteText.mockImplementation(() => new Promise(resolve => {
      resolveClipboard = resolve;
    }));
    
    render(<CopyToClipboard {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Copying...')).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Resolve the clipboard promise
    resolveClipboard();
    
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('displays different icons for different states', () => {
    render(<CopyToClipboard {...defaultProps} />);
    
    const button = screen.getByRole('button');
    
    // Check default state icon (copy icon)
    expect(button.querySelector('svg')).toBeInTheDocument();
    
    fireEvent.click(button);
    
    // The success state would show a checkmark icon
    // This would need to be tested after the async operation completes
  });
}); 