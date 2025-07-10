# Contributing to Numerous Widgets

Thank you for your interest in contributing to Numerous Widgets! This document provides comprehensive guidelines and instructions for contributing to this project.

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **npm**
- **Git**

### Initial Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/your-username/numerous-widgets.git
   cd numerous-widgets
   ```

2. **Set up Python environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -e ".[dev]"
   ```

3. **Set up JavaScript environment**:
   ```bash
   cd js
   npm install
   cd ..
   ```

4. **Install pre-commit hooks**:
   ```bash
   pre-commit install
   ```

5. **Create environment configuration**:
   ```bash
   # Create .env file in python/ directory
   echo "WIDGET_ENV=development" > python/.env
   echo "VITE_DEV_SERVER=http://localhost:5173" >> python/.env
   ```

## ⚡ Quality Requirements & Standards

**We maintain high code quality standards to ensure reliability and maintainability.** All contributions must meet these requirements before being merged. We're transparent about what's expected - check the configuration files for exact specifications.

### 📋 Code Quality Checklist

Before contributing, ensure your code meets these standards:

**Python Requirements:**
- ✅ **Linting**: Code passes [Ruff](https://github.com/astral-sh/ruff) checks
- ✅ **Formatting**: Code is formatted with Ruff
- ✅ **Type Safety**: All code has proper type annotations and passes MyPy strict mode
- ✅ **Testing**: All new code has comprehensive tests with good coverage
- ✅ **Documentation**: All public APIs are documented

**JavaScript/TypeScript Requirements:**
- ✅ **Type Safety**: All TypeScript compiles without errors
- ✅ **Testing**: All components have unit tests
- ✅ **Build**: Widgets build successfully

**Configuration Files** (see exact requirements here):
- 📁 [`.pre-commit-config.yaml`](.pre-commit-config.yaml) - Pre-commit hooks and quality checks
- 📁 [`pyproject.toml`](pyproject.toml) - Python project configuration, Ruff rules, MyPy settings
- 📁 [`js/package.json`](js/package.json) - JavaScript dependencies and scripts
- 📁 [`js/tsconfig.json`](js/tsconfig.json) - TypeScript configuration
- 📁 [`.github/workflows/release.yml`](.github/workflows/release.yml) - CI/CD pipeline requirements

### 🔧 Local Quality Checks

**Quick checks (run automatically on commit/push):**
```bash
# These run automatically via pre-commit hooks
git commit -m "your changes"  # Triggers basic formatting and linting
git push                      # Triggers basic tests
```

**Manual quality checks:**
```bash
# Run all basic checks
pre-commit run --all-files

# Run specific checks
cd js
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test           # Jest tests
```

**CI simulation (run before creating PR):**
```bash
# Simulate full CI pipeline locally - this is what runs on GitHub Actions
pre-commit run --hook-stage manual

# Or run individual CI checks:
pre-commit run --hook-stage manual ruff-check-strict    # Strict linting
pre-commit run --hook-stage manual mypy-strict          # Strict type checking
pre-commit run --hook-stage manual ci-check-python      # Python tests with coverage
pre-commit run --hook-stage manual ci-check-javascript  # JavaScript tests
pre-commit run --hook-stage manual ci-check-build-widgets  # Build verification
```

### 📈 Quality Philosophy

We follow these principles:

1. **Transparency**: All requirements are clearly documented in config files
2. **Developer Choice**: You control when to run strict checks
3. **Fast Feedback**: Basic checks run quickly on commit/push
4. **CI Confidence**: Local CI simulation helps avoid pipeline failures
5. **Comprehensive Coverage**: All code paths are tested

**💡 Pro Tip**: Run `pre-commit run --hook-stage manual` before creating a PR to ensure CI will pass!

## 🏗️ Development Workflow

### Development Environment

The project uses a dual-environment setup:

- **Development Mode**: JavaScript served from Vite dev server
- **Production Mode**: JavaScript served from built static files

#### Starting Development Environment

**Terminal 1 - Vite Development Server**:
```bash
cd js/src
npx vite
```

**Terminal 2 - Marimo Development**:
```bash
cd python/examples/marimo/numerous
marimo edit app.py
```

This setup enables hot-reloading for both Python and JavaScript changes.

### Code Style and Linting

The project enforces strict code quality standards. **See the [Quality Requirements & Standards](#-quality-requirements--standards) section above for complete details.**

Quick reference:
- **Python**: Ruff (linting/formatting), MyPy (type checking), pytest (testing)
- **JavaScript/TypeScript**: ESLint, TypeScript compiler, Jest (testing)
- **All quality checks**: See configuration files linked above for exact specifications

## 🎨 Creating New Widgets

### Widget Architecture

Each widget consists of three main components:

1. **Python Widget Class** (`python/src/numerous/widgets/base/`)
2. **React Widget Component** (`js/src/components/widgets/`)
3. **React UI Component** (`js/src/components/ui/`)

### Step-by-Step Widget Creation

Let's create a new widget called `ExampleWidget`:

#### 1. Create Python Widget Class

Create `python/src/numerous/widgets/base/example.py`:

```python
"""Module providing an example widget for the numerous library."""

import anywidget
import traitlets

from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("ExampleWidget")

class Example(anywidget.AnyWidget):  # type: ignore[misc]
    """
    An example widget for demonstration purposes.

    Args:
        value: The initial value
        label: The widget label
        on_change: Optional callback when value changes
    """

    # Define traitlets for the widget properties
    value = traitlets.Unicode().tag(sync=True)
    label = traitlets.Unicode().tag(sync=True)
    disabled = traitlets.Bool(default_value=False).tag(sync=True)

    # Load the JavaScript and CSS
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        value: str = "",
        label: str = "",
        disabled: bool = False,
    ) -> None:
        super().__init__(
            value=value,
            label=label,
            disabled=disabled,
        )

    @property
    def val(self) -> str:
        """Return the current value."""
        return str(self.value)

    @val.setter
    def val(self, value: str) -> None:
        """Set the current value."""
        self.value = value
```

#### 2. Create React UI Component

Create `js/src/components/ui/Example.tsx`:

```typescript
import * as React from "react";

interface ExampleProps {
    value: string;
    label: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export function Example({ 
    value, 
    label, 
    disabled = false,
    onChange 
}: ExampleProps) {
    return (
        <div className="example-container">
            <label className="example-label">{label}</label>
            <input
                type="text"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className="example-input"
            />
        </div>
    );
}
```

#### 3. Create React Widget Component

Create `js/src/components/widgets/ExampleWidget.tsx`:

```typescript
import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Example } from "../ui/Example";
import '../../css/styles.scss';

function ExampleWidget() {
    // Model states
    const [value, setValue] = useModelState<string>("value");
    const [label] = useModelState<string>("label");
    const [disabled] = useModelState<boolean>("disabled");

    return (
        <Example
            value={value}
            label={label}
            disabled={disabled}
            onChange={setValue}
        />
    );
}

export default {
    render: createRender(ExampleWidget)
};
```

#### 4. Register the Widget

**Add to `js/widget-config.json`**:
```json
{
  "widgets": [
    "ExampleWidget",
    // ... other widgets
  ]
}
```

**Add to `python/src/numerous/widgets/__init__.py`**:
```python
from .base.example import Example as Example
```

**Add to `docs/widgets.md`**:
```markdown
## ::: widgets.Example
    options:
        show_root_heading: true
```

#### 5. Build and Test

```bash
# Build the widget
cd js
./build-widgets.sh  # On Linux/Mac
# or
./build-widgets.ps1  # On Windows

# Test the widget
cd ..
python -c "
import numerous.widgets as wi
widget = wi.Example(value='Hello', label='Test')
print(f'Widget created: {widget.val}')
"
```

### Widget Testing

**IMPORTANT**: Every new widget must include comprehensive tests for both Python and JavaScript components.

#### Python Tests (Required)

Create `python/tests/test_example.py`:

```python
import pytest
from numerous.widgets import Example

def test_example_creation():
    """Test basic widget creation with default values."""
    widget = Example(value="test", label="Test Label")
    assert widget.value == "test"
    assert widget.label == "Test Label"
    assert widget.disabled is False

def test_example_with_custom_options():
    """Test widget creation with all custom options."""
    widget = Example(
        value="custom value",
        label="Custom Label",
        disabled=True,
        class_name="custom-class"
    )
    assert widget.value == "custom value"
    assert widget.label == "Custom Label"
    assert widget.disabled is True
    assert widget.class_name == "custom-class"

def test_example_val_property():
    """Test the val property getter and setter."""
    widget = Example(value="initial")
    assert widget.val == "initial"
    
    widget.val = "updated"
    assert widget.value == "updated"
    assert widget.val == "updated"

def test_example_callback():
    """Test callback functionality if widget has callbacks."""
    callback_calls = []
    
    def on_change_callback(change):
        callback_calls.append(change)
    
    widget = Example(
        value="test",
        on_change=on_change_callback
    )
    
    # Clear initial calls (initialization triggers observers)
    callback_calls.clear()
    
    # Simulate state change
    widget.some_state = "new_value"
    
    assert len(callback_calls) == 1
    assert callback_calls[0]["new"] == "new_value"

def test_example_edge_cases():
    """Test edge cases like empty values, unicode, etc."""
    # Empty value
    widget = Example(value="")
    assert widget.value == ""
    
    # Unicode characters
    unicode_text = "Hello 🌍! Unicode: αβγ"
    widget = Example(value=unicode_text)
    assert widget.value == unicode_text
```

#### JavaScript Tests (Required)

**Create Widget Component Test**: `js/src/components/widgets/__tests__/ExampleWidget.test.tsx`:

```typescript
import React from 'react';
import ExampleWidget from '../ExampleWidget';
import { Example } from '../../ui/Example';
import * as ExampleWidgetModule from '../ExampleWidget';

// Mock dependencies
jest.mock('../../ui/Example', () => ({
  Example: jest.fn(() => null)
}));

jest.mock('../../css/styles.scss', () => ({}));

jest.mock('@anywidget/react', () => ({
  createRender: jest.fn(comp => comp),
  useModelState: jest.fn()
}));

const mockSetValue = jest.fn();

describe('ExampleWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (jest.requireMock('@anywidget/react').useModelState)
      .mockImplementation((key: string) => {
        switch (key) {
          case 'value': return ['test value', mockSetValue];
          case 'label': return ['Test Label'];
          case 'disabled': return [false];
          default: return [undefined, jest.fn()];
        }
      });
  });
  
  it('renders Example component with correct props', () => {
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    const ExampleWidgetFunction = (ExampleWidgetModule as any).default.render;
    const exampleWidget = ExampleWidgetFunction();
    
    expect(exampleWidget.type).toBe(Example);
    expect(exampleWidget.props.value).toBe('test value');
    expect(exampleWidget.props.label).toBe('Test Label');
    expect(exampleWidget.props.disabled).toBe(false);
    expect(typeof exampleWidget.props.onChange).toBe('function');
    
    useCallbackSpy.mockRestore();
  });
  
  it('handles value changes correctly', () => {
    const useCallbackSpy = jest.spyOn(React, 'useCallback');
    useCallbackSpy.mockImplementation(fn => fn);
    
    const ExampleWidgetFunction = (ExampleWidgetModule as any).default.render;
    const exampleWidget = ExampleWidgetFunction();
    
    exampleWidget.props.onChange('new value');
    
    expect(mockSetValue).toHaveBeenCalledWith('new value');
    
    useCallbackSpy.mockRestore();
  });
});
```

**Create UI Component Test**: `js/src/components/ui/__tests__/Example.test.tsx`:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Example } from '../Example';

describe('Example UI Component', () => {
  const defaultProps = {
    value: 'test value',
    label: 'Test Label',
    disabled: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Example {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    render(<Example {...defaultProps} />);
    
    const input = screen.getByDisplayValue('test value');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('new value');
  });

  it('respects disabled state', () => {
    render(<Example {...defaultProps} disabled={true} />);
    
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Example {...defaultProps} className="custom-class" />);
    
    const container = screen.getByText('Test Label').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
```

#### Testing Guidelines

1. **Python Test Coverage**:
   - Basic widget creation with default values
   - Widget creation with all custom options
   - Property getters and setters (especially `val` property)
   - Callback functionality (if applicable)
   - Edge cases: empty values, unicode, special characters
   - Error handling scenarios

2. **JavaScript Test Coverage**:
   - Widget component renders UI component correctly
   - All props are passed through correctly
   - State changes trigger correct Python model updates
   - User interactions work as expected
   - UI component respects all props (disabled, className, etc.)
   - Visual states and feedback work correctly

3. **Integration Tests**:
   - Widget can be imported and instantiated
   - Widget displays in development environment
   - Callbacks trigger correctly when user interacts
   - State synchronization between Python and JavaScript

#### Running Tests

```bash
# Run Python tests for specific widget
pytest python/tests/test_example.py -v

# Run JavaScript tests for specific widget
cd js
npm test -- Example

# Run all tests
pre-commit run --all-files
```

#### Test File Naming Convention

- **Python**: `python/tests/test_widget_name.py`
- **Widget Component**: `js/src/components/widgets/__tests__/WidgetNameWidget.test.tsx`
- **UI Component**: `js/src/components/ui/__tests__/ComponentName.test.tsx`

## 🧪 Testing

### Testing Strategy

We use a three-tier testing approach:

1. **Basic Tests** (run on pre-push): Fast, essential functionality
2. **Comprehensive Tests** (run manually): Full test suite with coverage
3. **CI Tests** (run on GitHub Actions): Production-ready validation

### Running Tests

**Basic testing** (fast, run automatically):
```bash
# Run basic tests (triggered on git push)
git push

# Or run manually
pre-commit run pytest-basic jest-basic
```

**Comprehensive testing** (full coverage):
```bash
# Run all tests with coverage (CI simulation)
pre-commit run --hook-stage manual ci-check-python ci-check-javascript

# Or run individual test suites
pytest python/tests/ -v                    # Python tests
cd js && npm test                          # JavaScript tests  
python -m coverage run -m pytest python/tests/  # Python with coverage
```

**CI simulation** (exact match to GitHub Actions):
```bash
# Run complete CI pipeline locally
pre-commit run --hook-stage manual

# This includes:
# - Strict linting (ruff --no-fix)
# - Strict type checking (mypy --strict)
# - Python tests with coverage reporting
# - JavaScript tests with npm ci
# - Widget build verification
```

### Test Requirements

- **Python**: Minimum 80% test coverage (measured in CI)
- **JavaScript**: All components should have unit tests
- **Integration**: Test widget creation and basic functionality
- **Type Safety**: All TypeScript must compile without errors
- **Build**: Widgets must build successfully without errors

### Test File Organization

Follow these naming conventions:
- **Python**: `python/tests/test_widget_name.py`
- **Widget Component**: `js/src/components/widgets/__tests__/WidgetNameWidget.test.tsx`
- **UI Component**: `js/src/components/ui/__tests__/ComponentName.test.tsx`

## 📋 Code Review Process

### Before Submitting

1. **Run CI simulation** (recommended):
   ```bash
   # This runs the same checks as GitHub Actions
   pre-commit run --hook-stage manual
   ```

2. **Alternative: Run individual checks**:
   ```bash
   # Basic quality checks
   pre-commit run --all-files
   
   # Test Python widgets
   pytest python/tests/
   
   # Test JavaScript components
   cd js && npm test
   
   # Build widgets
   cd js && bash build-widgets.sh
   ```

3. **Test in development environment**:
   ```bash
   # Start Vite dev server
   cd js && npm run dev
   
   # Test in Marimo
   cd python/examples/marimo/numerous
   marimo edit app.py
   ```

### 🎯 PR Readiness Checklist

Before creating your PR, ensure:

- ✅ **CI simulation passes**: `pre-commit run --hook-stage manual`
- ✅ **All tests pass**: Both Python and JavaScript
- ✅ **Widgets build successfully**: No build errors
- ✅ **Code is documented**: New widgets have proper docstrings
- ✅ **Tests are comprehensive**: New functionality is tested
- ✅ **Examples work**: Test your changes in the development environment

### Pull Request Guidelines

1. **Title**: Use conventional commits format
   - `feat: add new Example widget`
   - `fix: resolve button click issue`
   - `docs: update contributing guidelines`

2. **Description**: Include:
   - Summary of changes
   - Screenshots/videos for UI changes
   - Breaking changes (if any)
   - Testing instructions

3. **Checklist**:
   - [ ] All tests pass
   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] Backward compatibility maintained
   - [ ] Performance impact considered

## 🚢 Release Process

### Semantic Versioning

The project uses [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. **Development**: Work on feature branches
2. **Pull Request**: Submit PR to main branch
3. **Review**: Code review and approval
4. **Merge**: Merge to main triggers automated release
5. **Release**: GitHub Actions automatically:
   - Builds all widgets
   - Runs comprehensive tests
   - Determines version bump
   - Creates GitHub release
   - Publishes to PyPI

### Manual Release (if needed)

```bash
# Update version and create release
pip install python-semantic-release
semantic-release version
semantic-release publish
```

## 📝 Documentation

### Widget Documentation

All widgets must include:

1. **Docstrings**: Complete parameter documentation
2. **Examples**: Usage examples in docstrings
3. **Type Hints**: Full type annotations
4. **API Reference**: Auto-generated from docstrings

### Documentation Commands

```bash
# Build documentation locally
mkdocs serve

# Generate API reference
cd scripts
python gen_ref_pages.py
```

## 🐛 Issue Reporting

### Bug Reports

Include:
- **Environment**: Python version, browser, OS
- **Steps to reproduce**: Minimal example
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Error messages**: Full stack traces

### Feature Requests

Include:
- **Use case**: Why is this needed?
- **Proposal**: How should it work?
- **Examples**: Mock code or wireframes
- **Alternatives**: Other solutions considered

## 🤝 Community

### Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: [support@numerous.com](mailto:support@numerous.com)

### Code of Conduct

Please be respectful and inclusive. We welcome contributors from all backgrounds and experience levels.

## 📚 Additional Resources

- **AnyWidget Documentation**: https://anywidget.dev/
- **React Documentation**: https://react.dev/
- **TypeScript Documentation**: https://www.typescriptlang.org/
- **Vite Documentation**: https://vitejs.dev/
- **Marimo Documentation**: https://marimo.io/

Thank you for contributing to Numerous Widgets! 🎉