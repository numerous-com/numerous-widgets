import React from 'react';
import { ProjectModal } from './ProjectModal';

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  projectId: string;
}

interface ProjectMenuProps {
  selectedProjectName?: string;
  selectedScenarioName?: string;
  projects: Project[];
  scenarios: Scenario[];
  onUpdateProject: (projectId: string, name: string, description: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectScenario: (scenarioId: string | null) => void;
  changed: boolean;
  hasSelection: boolean;
  onSave: () => void;
  selectedProjectId: string | null;
  selectedScenarioId: string | null;
}

export const ProjectMenu: React.FC<ProjectMenuProps> = ({
  selectedProjectName,
  selectedScenarioName,
  projects,
  scenarios,
  onUpdateProject,
  onSelectProject,
  onSelectScenario,
  changed,
  hasSelection,
  onSave,
  selectedProjectId,
  selectedScenarioId,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const handleSave = () => {
    setIsMenuOpen(false);
    if (selectedProjectName) {
      onSave();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="inline-block relative">
      <div className="flex items-center h-9 border rounded-lg bg-white shadow-sm">
        <div className="flex items-center px-2 h-full border-r">
          {selectedProjectName ? (
            <div className="flex items-center gap-1.5">
              {changed && (
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              )}
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                {selectedProjectName}
              </span>
              {selectedScenarioName && (
                <>
                  <span className="text-gray-400 text-sm">/</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                    {selectedScenarioName}
                  </span>
                </>
              )}
            </div>
          ) : (
            <span className="text-gray-500 italic text-xs">No project selected</span>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-full px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 text-xs font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="dropdown-item"
          >
            Save as...
          </button>
          {hasSelection && changed && (
            <button
              onClick={handleSave}
              className="dropdown-item"
            >
              Save
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projects={projects}
          scenarios={scenarios}
          onUpdateProject={onUpdateProject}
          onSelectProject={onSelectProject}
          onSelectScenario={onSelectScenario}
          selectedProjectId={selectedProjectId}
          selectedScenarioId={selectedScenarioId}
        />
      )}
    </div>
  );
};

