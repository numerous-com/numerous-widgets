import React from 'react';
import { ItemDetails } from './ItemDetails';

interface ScenarioDetailsProps {
  scenario: {
    id: string;
    name: string;
    description: string;
  };
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

export const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({
  scenario,
  onClose,
  onSave,
}) => {
  return (
    <ItemDetails
      name={scenario.name}
      description={scenario.description}
      onSave={onSave}
      onClose={onClose}
      title="Scenario Details"
    />
  );
};
