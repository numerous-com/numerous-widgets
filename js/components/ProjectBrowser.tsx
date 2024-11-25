import React from 'react';
import { ProjectList } from './ProjectList';
import { ProjectDetails } from './ProjectDetails';
import { ScenarioList } from './ScenarioList';

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
  projects: Project[];
  scenarios: Scenario[];
  onUpdateProject: (projectId: string, name: string, description: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectScenario: (scenarioId: string | null) => void;
  selectedProjectId: string | null;
  selectedScenarioId: string | null;
  onClose: () => void;
}

export const ProjectBrowser: React.FC<ProjectBrowserProps> = ({ projects, scenarios, onUpdateProject, onSelectProject, onSelectScenario, selectedProjectId, selectedScenarioId, onClose }) => {
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Project Browser</h1>
      <div className="flex gap-4 h-full">
        <div className="w-1/3 min-w-[250px]">
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            selectedProjectId={selectedProjectId ?? undefined}
          />
          {selectedProjectId && (
            <ScenarioList
              scenarios={projectScenarios}
              projectId={selectedProjectId}
              onSelectScenario={onSelectScenario}
              selectedScenarioId={selectedScenarioId ?? undefined}
            />
          )}
        </div>
                
        {selectedProject && (
          <div className="flex-1">
            <ProjectDetails
              project={selectedProject}
              isOpen={true}
              onClose={() => handleSelectProject(null)}
              onSave={handleSave}
            />
          </div>
        )}
      </div>
    </div>
  );
};

