import * as React from "react";
import { createRender } from "@anywidget/react";
import { LoadSave } from "../ui/LoadSave";
import { LoadSaveProvider } from "./LoadSaveContext";

import '../../css/styles.scss';

function LoadSaveWidget() {
	// Only log once when the component mounts
	React.useEffect(() => {
		console.log("LoadSaveWidget loaded");
	}, []);

	return (
		<div className="widget">
			<LoadSaveProvider>
				<LoadSave />
			</LoadSaveProvider>
		</div>
	);
}

export default {
    render: createRender(LoadSaveWidget)
} 