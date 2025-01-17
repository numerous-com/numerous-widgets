# Styling Numerous Widgets

Numerous Widgets provides a flexible way to customize the appearance of widgets through CSS. The package includes a default stylesheet, but you can easily export and modify it to match your application's design.

## Command Line Interface

The `numerous-widgets` command line tool provides several commands for managing widget styles:

### View Available Commands

To see all available commands and options:

# Styling Numerous Widgets

Numerous Widgets provides a flexible way to customize the appearance of widgets through CSS. The package includes a default stylesheet, but you can easily customize it to match your application's design.

## Quick Start

The fastest way to start customizing widget styles is to export the default CSS:

```bash
export NUMEROUS_WIDGETS_CSS=/path/to/your/custom.css
```

Or in Python, before importing numerous widgets:

```python
import os
os.environ["NUMEROUS_WIDGETS_CSS"] = "/path/to/your/custom.css"
import numerous.widgets
```

### Export Default CSS

To export the default CSS to a file:

```bash
numerous-widgets export-css
```

Or specify a custom path

```bash
numerous-widgets export-css -o ~/my-custom-widgets.css
```

## CSS Structure

The stylesheet is organized by widget type. Each widget has its own class namespace to prevent style conflicts:

```css
.numerous-number-input {
/ Your custom styles here /
border: 1px solid #your-color;
background-color: #your-background;
}
```

## Best Practices

1. **Start with Default Styles**: Always begin by exporting the default CSS to understand the existing structure
2. **Use CSS Variables**: Leverage CSS variables for consistent theming across widgets
3. **Maintain Specificity**: Keep the original class structure to ensure proper styling
4. **Test Thoroughly**: Verify your customizations across different widgets and states (hover, focus, disabled)
5. **Keep a Backup**: Save the original CSS file before making modifications

## Troubleshooting

If your custom CSS isn't being applied:

1. Verify the path in `NUMEROUS_WIDGETS_CSS` is correct and absolute
2. Check file permissions
3. Ensure the CSS file exists before importing numerous widgets
4. Look for warning messages in your application logs

## Additional Resources

- [CSS Variables Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
