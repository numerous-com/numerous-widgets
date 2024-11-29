import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { ProjectMenu } from "../ProjectMenu";

import '../../css/styles.css';

function ProjectMenuWidget() {
	console.log("ProjectMenuWidget loaded");
	const [projects, setProjects] = useModelState<Array<{
		id: string;
		name: string;
		description: string;
	}>>("projects");

	const [selectedProjectId, setSelectedProjectId] = useModelState<string | null>("selected_project_id");
	const [selectedScenarioId, setSelectedScenarioId] = useModelState<string | null>("selected_scenario_id");
	const [changed, setChanged] = useModelState<boolean>("changed");
	const [scenarios, setScenarios] = useModelState<Array<{
		id: string;
		name: string;
		description: string;
		projectId: string;
	}>>("scenarios");
	const [doSave, setDoSave] = useModelState<boolean>("do_save");
	
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const selectedProject = projects?.find(p => p.id === selectedProjectId);
	const selectedScenario = scenarios?.find(s => s.id === selectedScenarioId);

	const handleUpdateProject = (projectId: string, name: string, description: string) => {
		const updatedProjects = projects?.map(p => 
			p.id === projectId ? { ...p, name, description } : p
		);
		setProjects(updatedProjects || []);
		setIsModalOpen(false);
	};

	const handleSelectProject = (projectId: string) => {
		setSelectedProjectId(projectId);
	};

	const handleSelectScenario = (scenarioId: string | null) => {
		setSelectedScenarioId(scenarioId);
	};

	const handleSave = () => {
		setDoSave(true);
		// Reset the flag after a short delay
		setTimeout(() => setDoSave(false), 100);
	};

	return (
		<div className="widget">
			<ProjectMenu 
				selectedProjectName={selectedProject?.name}
				selectedScenarioName={selectedScenario?.name}
				projects={projects || []}
				scenarios={scenarios || []}
				onUpdateProject={handleUpdateProject}
				onSelectProject={handleSelectProject}
				onSelectScenario={handleSelectScenario}
				onSave={handleSave}
				changed={changed || false}
				hasSelection={Boolean(selectedProjectId && selectedScenarioId)}
				selectedProjectId={selectedProjectId}
				selectedScenarioId={selectedScenarioId}
			/>
		</div>
	);
}

export default {
    render: createRender(ProjectMenuWidget)
}
