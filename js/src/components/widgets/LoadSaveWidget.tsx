import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { LoadSave } from "../ui/LoadSave";

import '../../css/styles.scss';

function LoadSaveWidget() {
	// Only log once when the component mounts
	React.useEffect(() => {
		console.log("LoadSaveWidget loaded");
	}, []);
	
	// Required model states
	const [items, setItems] = useModelState<Array<{
		id: string;
		label: string;
	}>>("items");
	const [selectedItemId, setSelectedItemId] = useModelState<string | null>("selected_item_id");
	const [isModified, setIsModified] = useModelState<boolean>("is_modified");
	
	// Optional model states
	const [modificationNote, setModificationNote] = useModelState<string | null>("modification_note");
	const [disableLoad, setDisableLoad] = useModelState<boolean>("disable_load");
	const [disableSave, setDisableSave] = useModelState<boolean>("disable_save");
	const [disableSaveAs, setDisableSaveAs] = useModelState<boolean>("disable_save_as");
	const [disableSaveReason, setDisableSaveReason] = useModelState<string | null>("disable_save_reason");
	const [defaultNewItemName, setDefaultNewItemName] = useModelState<string>("default_new_item_name");
	
	// Action triggers
	const [doSave, setDoSave] = useModelState<boolean>("do_save");
	const [doReset, setDoReset] = useModelState<boolean>("do_reset");
	const [doSearch, setDoSearch] = useModelState<string>("do_search");
	const [doLoad, setDoLoad] = useModelState<boolean>("do_load");
	
	// Response states
	const [actionNote, setActionNote] = useModelState<string | null>("action_note");
	const [successStatus, setSuccessStatus] = useModelState<boolean>("success_status");
	const [searchResults, setSearchResults] = useModelState<Array<{
		id: string;
		label: string;
	}>>("search_results");
	
	// New item creation
	const [newItemName, setNewItemName] = useModelState<string | null>("new_item_name");
	const [createNewItem, setCreateNewItem] = useModelState<boolean>("create_new_item");
	const [isSaveAs, setIsSaveAs] = useModelState<boolean>("is_save_as");

	// Local state for tracking operations
	const [saveInProgress, setSaveInProgress] = React.useState(false);
	const saveTargetRef = React.useRef<string | null>(null);
	
	// Handle effects for save operations
	React.useEffect(() => {
		// When a save operation completes (doSave resets to false)
		if (saveInProgress && !doSave) {
			setSaveInProgress(false);
			
			// If we had a save target ID, handle the custom message
			if (saveTargetRef.current) {
				const targetItem = items?.find(item => item.id === saveTargetRef.current);
				const targetName = targetItem ? targetItem.label : "Selected item";
				setActionNote(`Saved to "${targetName}" successfully`);
				setSuccessStatus(true);
				
				// Clear the save target
				saveTargetRef.current = null;
			}
		}
	}, [doSave, saveInProgress, items, setActionNote, setSuccessStatus]);

	// Handle save action
	const handleSave = () => {
		setDoSave(true);
	};

	// Handle reset action
	const handleReset = () => {
		setDoReset(true);
		
		// If no item is selected, make sure selectedItemId is null
		if (!selectedItemId) {
			setSelectedItemId(null);
		}
	};

	// Handle load action
	const handleLoad = (itemId: string) => {
		if (itemId === selectedItemId) return; // Don't reload the same item
		
		// Set the ID which will be used by the Python-side load callback
		setSelectedItemId(itemId);
		
		// Trigger the load callback on the Python side
		setDoLoad(true);
		
		// Loading feedback is handled automatically through the actionNote mechanism
		// which shows a toast notification when action_note is set by Python
	};

	// Handle new item creation
	const handleNew = (name: string) => {
		setNewItemName(name);
		setCreateNewItem(true);
		// Note: isModified state will be handled by the Python side
		// If we're creating a new item with changes, we want to stay in modified state
	};

	// Handle save-as action
	const handleSaveAs = (name: string) => {
		console.log(`Performing Save As operation with name: "${name}"`);
		
		// Set the flags for the Python side to handle correctly
		setNewItemName(name);
		setIsSaveAs(true); // Mark that this is a Save As operation
		setCreateNewItem(true); // Trigger the new item creation
		
		// The Python side will observe these property changes in proper sequence:
		// 1. It will see create_new_item=true and execute _create_new_item_changed
		// 2. Inside that method, it will check is_save_as to determine behavior
		// 3. It will create the item and automatically save it
	};
	
	// Handle save-as to an existing item ID
	const handleSaveAsWithId = (itemId: string) => {
		console.log(`Performing direct save to existing ID: "${itemId}"`);
		
		// Store the target ID for our save operation
		saveTargetRef.current = itemId;
		
		// Get the original ID to restore after save
		const originalId = selectedItemId;
		
		// Temporarily set the selected ID to our target without triggering load
		// This is handled imperatively - we'll update ID without triggering load
		setSelectedItemId(itemId);
		
		// Mark that we've started a save operation
		setSaveInProgress(true);
		
		// Trigger the save
		setDoSave(true);
	};

	// Handle search
	const handleSearch = (query: string) => {
		setDoSearch(query);
	};

	// Handle rename action
	const handleRename = (itemId: string, newName: string) => {
		// Find the item in the items array
		const updatedItems = items?.map(item => 
			item.id === itemId ? { ...item, label: newName } : item
		);
		
		// Update the items list
		if (updatedItems) {
			setItems(updatedItems);
			
			// Also update search results to reflect the name change
			const updatedSearchResults = searchResults?.map(item => 
				item.id === itemId ? { ...item, label: newName } : item
			);
			
			if (updatedSearchResults) {
				setSearchResults(updatedSearchResults);
			}
		}
		
		// Set a success note
		setActionNote(`Item renamed to "${newName}"`);
		setSuccessStatus(true);
	};

	return (
		<div className="widget">
			<LoadSave
				items={items || []}
				selectedItemId={selectedItemId}
				isModified={isModified || false}
				modificationNote={modificationNote}
				disableLoad={disableLoad || false}
				disableSave={disableSave || false}
				disableSaveAs={disableSaveAs || false}
				disableSaveReason={disableSaveReason}
				onLoad={handleLoad}
				onSave={handleSave}
				onReset={handleReset}
				onNew={handleNew}
				onSaveAs={handleSaveAs}
				onSaveAsWithId={handleSaveAsWithId}
				onSearch={handleSearch}
				searchResults={searchResults || items || []}
				note={actionNote}
				isSuccess={successStatus === undefined ? true : successStatus}
				defaultNewItemName={defaultNewItemName || "New Item"}
				onRename={handleRename}
			/>
		</div>
	);
}

export default {
    render: createRender(LoadSaveWidget)
} 