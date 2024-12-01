# Ensure we can run scripts
$currentPolicy = Get-ExecutionPolicy
if ($currentPolicy -eq "Restricted") {
    Write-Host "Current execution policy is Restricted. Attempting to set to RemoteSigned for current process..."
    try {
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
    } catch {
        Write-Error "Failed to set execution policy. Please run PowerShell as Administrator and set execution policy manually."
        exit 1
    }
}

# List of widget names (without the .tsx extension)
$widgets = @(
    "ButtonWidget",
    "CheckBoxWidget",
    "DropDownWidget",
    "MapSelectorWidget",
    "MarkdownDrawerWidget",
    "NumberInputWidget",
    "ProgressBarWidget",
    "ProjectMenuWidget",
    "TabsWidget",
    "TaskWidget",
    "TimerWidget"
)

# Create output directory if it doesn't exist
$outputDir = "../python/src/widgets/static"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Build each widget
foreach ($widget in $widgets) {
    Write-Host "Building $widget..." -ForegroundColor Green
    try {
        $env:WIDGET_NAME = $widget
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw "Build failed for $widget"
        }
        
        # Rename the output file to match the widget name
        $outputFile = Join-Path $outputDir "index.mjs"
        $targetFile = Join-Path $outputDir "$widget.mjs"
        if (Test-Path $outputFile) {
            Move-Item -Path $outputFile -Destination $targetFile -Force
        }
    } catch {
        Write-Error ("Error building " + $widget + ": " + $_.Exception.Message)
        exit 1
    }
}

Write-Host "`nAll widgets built successfully!" -ForegroundColor Green 