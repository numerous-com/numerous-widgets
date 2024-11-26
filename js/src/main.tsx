import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ProjectMenu } from './components/ProjectMenu';
import './css/styles.css';

const App = () => {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Sample Project', description: 'A sample project description' },
    { id: '2', name: 'Another Project', description: 'Another project to show' },
  ]);

  const [scenarios] = useState([
    { id: '1', name: 'Scenario 1', projectId: '1' },
    { id: '2', name: 'Scenario 2', projectId: '1' },
    { id: '3', name: 'Scenario 1', projectId: '2' },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  const handleUpdateProject = (projectId: string, name: string, description: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, name, description }
        : project
    ));
    setChanged(true);
  };

  const handleSave = () => {
    // Implement save logic here
    setChanged(false);
  };

  return (
    <div className="app">
      <ProjectMenu
        selectedProjectName={selectedProject?.name}
        selectedScenarioName={selectedScenario?.name}
        projects={projects}
        scenarios={scenarios}
        onUpdateProject={handleUpdateProject}
        onSelectProject={setSelectedProjectId}
        onSelectScenario={setSelectedScenarioId}
        onOpenModal={() => setIsModalOpen(true)}
        onSave={handleSave}
        changed={changed}
        hasSelection={!!selectedProjectId}
      />
    </div>
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
