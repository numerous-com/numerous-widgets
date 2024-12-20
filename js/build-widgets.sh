#!/bin/bash

# Ensure the script is run with bash
if [ -z "$BASH_VERSION" ]; then
    echo "This script must be run with bash" >&2
    exit 1
fi

# List of widget names (without the .tsx extension)
widgets=(
    "ButtonWidget",
    "ChartWidget",
    "CheckBoxWidget",
    "DropDownWidget",
    "MapSelectorWidget",
    "MarkdownDrawerWidget",
    "NumberInputWidget",
    "PlotWidget",
    "ProgressBarWidget",
    "ProjectMenuWidget",
    "TabsWidget",
    "TaskWidget",
    "TimerWidget",
    "TableWidget",
    "ChatWidget",
    "MarkdownDisplayWidget",
    "StringInputWidget",
    "AccordionWidget",
    "RadioButtonsWidget",
    "SliderWidget",
    "DateTimePickerWidget",
    "DateTimeRangePickerWidget"
)

# Create output directory if it doesn't exist
outputDir="../python/src/widgets/static"
mkdir -p "$outputDir"

# Build each widget
for widget in "${widgets[@]}"; do
    echo "Building $widget..."
    export WIDGET_NAME="$widget"
    npm run build
    if [ $? -ne 0 ]; then
        echo "Build failed for $widget" >&2
        exit 1
    fi

    # Rename the output file to match the widget name
    outputFile="$outputDir/index.mjs"
    targetFile="$outputDir/$widget.mjs"
    if [ -f "$outputFile" ]; then
        mv -f "$outputFile" "$targetFile"
    fi
done

echo -e "\nAll widgets built successfully!" 