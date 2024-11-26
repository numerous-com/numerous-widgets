import importlib.metadata
from .project_widget import ProjectsMenuWidget

try:
    __version__ = importlib.metadata.version("widget")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"
