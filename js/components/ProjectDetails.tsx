import React, { useState, useEffect } from 'react';
import { ScenarioList } from './ScenarioList';

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
  }[];
  selectedScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  scenarios,
  selectedScenarioId,
  onSelectScenario,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  React.useEffect(() => {
    setName(project.name);
    setDescription(project.description);
  }, [project]);

  const handleCancel = () => {
    setName(project.name);
    setDescription(project.description);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, description);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
      
      <ScenarioList
        scenarios={scenarios}
        projectId={project.id}
        onSelectScenario={onSelectScenario}
        selectedScenarioId={selectedScenarioId}
      />
    </div>
  );
};

