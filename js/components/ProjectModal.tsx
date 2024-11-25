import React from 'react';
import { ProjectBrowser } from './ProjectBrowser';
import { Project, Scenario } from './ProjectBrowser';

interface ProjectModalProps {
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

export const ProjectModal: React.FC<ProjectModalProps> = ({
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="modal-close-button" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="modal-content">
          <ProjectBrowser
            projects={projects}
            scenarios={scenarios}
            onUpdateProject={onUpdateProject}
            onSelectProject={onSelectProject}
            onSelectScenario={onSelectScenario}
            selectedProjectId={selectedProjectId}
            selectedScenarioId={selectedScenarioId}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

