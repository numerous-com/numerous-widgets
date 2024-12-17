import React, { useState, useEffect } from 'react';
import { ScenarioList } from './ScenarioList';
import { ItemDetails } from './ItemDetails';

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    description: string;
  };
  scenarios: {
    id: string;
    name: string;
    projectId: string;
    description?: string;
  }[];
  selectedScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
  onClose: (reset: boolean) => void;
  onSave: (name: string, description: string) => void;
  onSaveScenario?: (scenarioId: string, name: string, description: string) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  scenarios,
  selectedScenarioId,
  onSelectScenario,
  onClose,
  onSave,
  onSaveScenario,
}) => {
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');
  
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  useEffect(() => {
    if (selectedScenario) {
      setScenarioName(selectedScenario.name);
      setScenarioDescription(selectedScenario.description || '');
    }
  }, [selectedScenario]);

  const handleCancel = () => {
    setProjectName(project.name);
    setProjectDescription(project.description);
    if (selectedScenario) {
      setScenarioName(selectedScenario.name);
      setScenarioDescription(selectedScenario.description || '');
    }
    onClose(true);
  };

  const handleSave = () => {
    if (selectedScenario) {
      onSaveScenario?.(selectedScenario.id, scenarioName, scenarioDescription);
    } else {
      onSave(projectName, projectDescription);
    }
    onClose(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex gap-6">
        <div className="flex-1">
          <ItemDetails
            name={projectName}
            description={projectDescription}
            onNameChange={setProjectName}
            onDescriptionChange={setProjectDescription}
            title="Project Details"
          />
          
          <div className="mt-6">
            <ScenarioList
              scenarios={scenarios}
              projectId={project.id}
              onSelectScenario={onSelectScenario}
              selectedScenarioId={selectedScenarioId}
            />
          </div>
        </div>

        <div className="flex-1">
          {selectedScenario ? (
            <ItemDetails
              name={scenarioName}
              description={scenarioDescription}
              onNameChange={setScenarioName}
              onDescriptionChange={setScenarioDescription}
              title="Scenario Details"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a scenario to view details
            </div>
          )}
        </div>
      </div>

      <div className="border-t mt-6 pt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!projectName || !selectedScenario}
          className={`px-4 py-2 rounded text-white ${
            !projectName || !selectedScenario
              ? 'bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

