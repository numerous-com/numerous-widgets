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
  return (
    <ItemDetails
      name={project.name}
      description={project.description}
      onSave={onSave}
      onClose={onClose}
      title="Project Details"
    >
      <ScenarioList
        scenarios={scenarios}
        projectId={project.id}
        onSelectScenario={onSelectScenario}
        selectedScenarioId={selectedScenarioId}
      />
    </ItemDetails>
  );
};

