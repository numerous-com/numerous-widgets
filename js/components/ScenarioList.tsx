import React from 'react';
import ItemsList from './ItemsList'; // Import the new ItemsList component

interface Scenario {
  id: string;
  name: string;
  projectId: string;
}

interface ScenarioListProps {
  scenarios: Scenario[];
  projectId: string;
  onSelectScenario: (scenarioId: string | null) => void;
  selectedScenarioId: string | null;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({
  scenarios,
  projectId,
  onSelectScenario,
  selectedScenarioId,
}) => {
  const projectScenarios = scenarios.filter(
    (scenario) => scenario.projectId === projectId
  );

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Scenarios</h3>
      <div className="border rounded" role="listbox">
        <ItemsList 
          items={projectScenarios} 
          onSelectItem={onSelectScenario} 
          selectedItemId={selectedScenarioId} 
        />
      </div>
    </div>
  );
};