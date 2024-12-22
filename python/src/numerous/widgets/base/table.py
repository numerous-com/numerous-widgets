import anywidget
import traitlets
from typing import List, Dict, Any
from .config import get_widget_paths

# Get environment-appropriate paths
ESM, CSS = get_widget_paths("TableWidget")

class Table(anywidget.AnyWidget):
    """
    A table widget with sorting, pagination, and column resizing capabilities.
    
    Args:
        data: List of dictionaries containing the table data
        columns: List of column configurations
        page_size: Number of rows per page (default: 10)
        className: Optional CSS class name for styling
    """
    # Define traitlets for the widget properties
    data = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    columns = traitlets.List(trait=traitlets.Dict()).tag(sync=True)
    page_size = traitlets.Int(default_value=10).tag(sync=True)
    class_name = traitlets.Unicode().tag(sync=True)
    selected_rows = traitlets.List(trait=traitlets.Int()).tag(sync=True)

    # Load the JavaScript and CSS from external files
    _esm = ESM
    _css = CSS

    def __init__(
        self,
        data: List[Dict[str, Any]],
        columns: List[Dict[str, str]],
        page_size: int = 10,
        className: str = "",
    ):
        """
        Initialize the table widget.
        
        Column configuration example:
        [
            {"accessorKey": "name", "header": "Name"},
            {"accessorKey": "age", "header": "Age"},
        ]
        """
        if not isinstance(data, list):
            raise ValueError("Data must be a list of dictionaries")
        
        if not isinstance(columns, list):
            raise ValueError("Columns must be a list of dictionaries")
        
        if page_size < 1:
            raise ValueError("Page size must be positive")

        # Validate column configuration
        for col in columns:
            if not isinstance(col, dict):
                raise ValueError("Each column must be a dictionary")
            if "accessorKey" not in col:
                raise ValueError("Each column must have an 'accessorKey'")
            if "header" not in col:
                col["header"] = col["accessorKey"].capitalize()

        super().__init__(
            data=data,
            columns=columns,
            page_size=page_size,
            class_name=className,
            selected_rows=[],
        )

    def update_data(self, data: List[Dict[str, Any]]) -> None:
        """Update the table data."""
        if not isinstance(data, list):
            raise ValueError("Data must be a list of dictionaries")
        self.data = data

    def get_selected_rows(self) -> List[Dict[str, Any]]:
        """Get the currently selected rows."""
        return [self.data[i] for i in self.selected_rows]

    def clear_selection(self) -> None:
        """Clear the current row selection."""
        self.selected_rows = [] 