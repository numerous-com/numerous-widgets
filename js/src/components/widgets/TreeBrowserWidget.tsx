import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { TreeBrowser } from "../ui/TreeBrowser";
import '../../css/styles.css';

function TreeBrowserWidget({ model }: { model?: any }) {
    const [items] = useModelState("items");
    const [selectedIds, setSelectedIds] = useModelState<string[]>("selected_ids");
    const [selectionMode] = useModelState<'none' | 'single' | 'multiple'>("selection_mode");
    const [disabled] = useModelState<boolean>("disabled");

    const handleChange = (newSelectedIds: string[]) => {
        if (!disabled) {
            setSelectedIds(newSelectedIds);
        }
    };

    return (
        <TreeBrowser
            items={items}
            selectedIds={selectedIds}
            selectionMode={selectionMode}
            onChange={handleChange}
            disabled={disabled}
        />
    );
}

export default {
    render: createRender(TreeBrowserWidget)
} 