import React from 'react';

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
        {projectScenarios.map((scenario) => (
          <button
            key={scenario.id}
            className={`w-full text-left p-2 hover:bg-gray-50 ${
              selectedScenarioId === scenario.id 
                ? 'bg-blue-100 border-l-4 border-blue-500' 
                : ''
            }`}
            onClick={() => onSelectScenario?.(scenario.id)}
            aria-selected={selectedScenarioId === scenario.id}
            role="option"
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </div>
  );
};