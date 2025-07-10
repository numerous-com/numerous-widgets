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

The project enforces strict code quality standards:

#### Python
- **Ruff**: Linting and formatting
- **MyPy**: Type checking
- **Coverage**: Test coverage reporting

#### JavaScript/TypeScript
- **ESLint**: Linting
- **TypeScript**: Type checking
- **Jest**: Testing framework

#### Running Quality Checks

```bash
# Run all checks (recommended before committing)
pre-commit run --all-files

# Run specific checks
cd js
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test           # Jest tests

# Python checks are handled by pre-commit hooks
```

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

#### Python Tests

Create `python/tests/test_example.py`:

```python
import pytest
from numerous.widgets import Example

def test_example_creation():
    widget = Example(value="test", label="Test Label")
    assert widget.value == "test"
    assert widget.label == "Test Label"
    assert widget.disabled is False

def test_example_val_property():
    widget = Example(value="initial")
    assert widget.val == "initial"
    
    widget.val = "updated"
    assert widget.value == "updated"
```

#### JavaScript Tests

Create `js/src/components/widgets/__tests__/ExampleWidget.test.tsx`:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Example } from '../../ui/Example';

describe('Example Component', () => {
    test('renders with correct props', () => {
        const mockOnChange = jest.fn();
        render(
            <Example
                value="test value"
                label="Test Label"
                disabled={false}
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
});
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pre-commit run --all-files

# Run Python tests only
pytest python/tests/ -v

# Run JavaScript tests only
cd js
npm test

# Run tests with coverage
cd js
npm run test:coverage
```

### Test Requirements

- **Python**: Minimum 80% test coverage
- **JavaScript**: All components should have unit tests
- **Integration**: Test widget creation and basic functionality
- **Type Safety**: All TypeScript must compile without errors

## 📋 Code Review Process

### Before Submitting

1. **Run all quality checks**:
   ```bash
   pre-commit run --all-files
   ```

2. **Test your changes**:
   ```bash
   # Test Python widgets
   pytest python/tests/
   
   # Test JavaScript components
   cd js && npm test
   ```

3. **Build widgets**:
   ```bash
   cd js
   ./build-widgets.sh  # or build-widgets.ps1 on Windows
   ```

4. **Test in development environment**:
   ```bash
   # Start Vite dev server
   cd js && npm run dev
   
   # Test in Marimo
   cd python/examples/marimo/numerous
   marimo edit app.py
   ```

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