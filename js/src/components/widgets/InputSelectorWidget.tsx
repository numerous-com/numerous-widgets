import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import '../../css/styles.scss';

function ProjectMenuWidget() {
	const [projects] = useModelState<Array<{
		id: string;
		name: string;
		description: string;
	}>>("projects");

	const [selectedProjectId] = useModelState<string | null>("selected_project_id");
	const [selectedScenarioId] = useModelState<string | null>("selected_scenario_id");
	const [changed] = useModelState<boolean>("changed");
	const [scenarios] = useModelState<Array<{
		id: string;
		name: string;
		description: string;
		projectId: string;
	}>>("scenarios");

	return (
		<div className="widget">
			<div className="placeholder-widget">
				<h3>Project Menu Widget</h3>
				<p>Selected Project ID: {selectedProjectId || 'None'}</p>
				<p>Selected Scenario ID: {selectedScenarioId || 'None'}</p>
				<p>Number of Projects: {projects?.length || 0}</p>
				<p>Number of Scenarios: {scenarios?.length || 0}</p>
				<p>Changes Pending: {changed ? 'Yes' : 'No'}</p>
			</div>
		</div>
	);
}

export default {
	render: createRender(ProjectMenuWidget)
};
