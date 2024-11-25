import React from 'react';
import { ProjectList } from './ProjectList';
import { ProjectDetails } from './ProjectDetails';

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Scenario {
  id: string;
  name: string;
  projectId: string;
}

interface ProjectBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  scenarios: Scenario[];
  onUpdateProject: (projectId: string, name: string, description: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectScenario: (scenarioId: string | null) => void;
  selectedProjectId: string | null;
  selectedScenarioId: string | null;
}

export const ProjectBrowser: React.FC<ProjectBrowserProps> = ({
  isOpen,
  onClose,
  projects,
  scenarios,
  onUpdateProject,
  onSelectProject,
  onSelectScenario,
  selectedProjectId,
  selectedScenarioId,
}) => {
  if (!isOpen) return null;

  // Store the initial project and scenario IDs
  const initialProjectId = React.useRef(selectedProjectId);
  const initialScenarioId = React.useRef(selectedScenarioId);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectScenarios = React.useMemo(() => 
    scenarios.filter(s => s.projectId === selectedProjectId),
    [scenarios, selectedProjectId]
  );

  const handleSelectProject = (projectId: string | null) => {
    if (projectId === null) {
      // Restore original selection when canceling
      onSelectProject(initialProjectId.current ?? null);
      onSelectScenario(initialScenarioId.current);
      onClose();
    } else {
      onSelectProject(projectId);
      if (projectId !== selectedProjectId) {
        onSelectScenario(null);
      }
    }
  };

  const handleSave = (name: string, description: string) => {
    if (selectedProjectId) {
      onUpdateProject(selectedProjectId, name, description);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h1 className="text-2xl font-bold">Project Browser</h1>
          <button className="modal-close-button" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        
          <div className="flex">
            <div className="project-list-container">
              <ProjectList
                projects={projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={selectedProjectId ?? undefined}
              />
            </div>
            
            {selectedProject && (
              <div className="project-details-container">
                <ProjectDetails
                  project={selectedProject}
                  scenarios={projectScenarios}
                  selectedScenarioId={selectedScenarioId}
                  onSelectScenario={onSelectScenario}
                  onClose={() => handleSelectProject(null)}
                  onSave={handleSave}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    
  );
};

