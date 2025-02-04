#!/bin/bash

# Ensure the script is run with bash
if [ -z "$BASH_VERSION" ]; then
    echo "This script must be run with bash" >&2
    exit 1
fi

# Read widgets from config file
widgets=($(cat widget-config.json | jq -r '.widgets[]'))


# Create output directory if it doesn't exist
outputDir="../python/src/numerous/widgets/static"
mkdir -p "$outputDir"

# Copy styles.css if it exists
if [ -f "dist/styles.css" ]; then
    cp dist/styles.css "$outputDir/"
fi

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