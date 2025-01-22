import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { TreeBrowser } from "../ui/TreeBrowser";
import '../../css/styles.scss';

function TreeBrowserWidget({ model }: { model?: any }) {
    const [items] = useModelState("items");
    const [selectedIds, setSelectedIds] = useModelState<string[]>("selected_ids");
    const [selectionMode] = useModelState<'none' | 'single' | 'multiple'>("selection_mode");
    const [disabled] = useModelState<boolean>("disabled");
    const [labelUpdate, setLabelUpdate] = useModelState<{[key: string]: string}>("label_update");
    const [moveUpdate, setMoveUpdate] = useModelState<{
        item_id: string;
        parent_id: string | null;
    }>("move_update");

    const handleChange = (newSelectedIds: string[]) => {
        if (!disabled) {
            setSelectedIds(newSelectedIds);
        }
    };

    const handleLabelUpdate = async (nodeId: string, newLabel: string) => {
        console.log('Updating label:', nodeId, newLabel);
        await setLabelUpdate({ [nodeId]: newLabel });
        // Wait for the items to update before returning
        return new Promise<void>((resolve) => {
            const initialLabel = items[nodeId]?.label;
            const checkUpdate = setInterval(() => {
                if (items[nodeId]?.label === newLabel) {
                    clearInterval(checkUpdate);
                    resolve();
                }
            }, 100);
            // Timeout after 2 seconds
            setTimeout(() => {
                clearInterval(checkUpdate);
                resolve();
            }, 2000);
        });
    };

    const handleMoveUpdate = async (itemId: string, newParentId: string | null) => {
        await setMoveUpdate({ item_id: itemId, parent_id: newParentId });
        // Wait for the items to update before returning
        return new Promise<boolean>((resolve) => {
            const initialParentId = items[itemId]?.parent_id;
            const checkUpdate = setInterval(() => {
                if (items[itemId]?.parent_id === newParentId) {
                    clearInterval(checkUpdate);
                    resolve(true);
                }
            }, 100);
            // Timeout after 2 seconds
            setTimeout(() => {
                clearInterval(checkUpdate);
                resolve(false);
            }, 2000);
        });
    };

    return (
        <TreeBrowser
            items={items}
            selectedIds={selectedIds}
            selectionMode={selectionMode}
            onChange={handleChange}
            disabled={disabled}
            label_update={labelUpdate}
            onLabelUpdate={handleLabelUpdate}
            model={model}
            move_update={moveUpdate}
            onMoveUpdate={handleMoveUpdate}
        />
    );
}

export default {
    render: createRender(TreeBrowserWidget)
} 