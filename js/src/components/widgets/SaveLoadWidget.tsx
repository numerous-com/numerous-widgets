import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { SaveLoad } from "../ui/SaveLoad";
import '../../css/components/SaveLoad.scss';

function SaveLoadWidget() {
    // Define model state variables with better error handling
    const [items, setItems] = useModelState<any[]>("items");
    const [filteredItems, setFilteredItems] = useModelState<any[]>("filtered_items");
    const [searchQuery, setSearchQuery] = useModelState<string>("search_query");
    const [currentItem, setCurrentItem] = useModelState<any | null>("current_item");
    const [modified, setModified] = useModelState<boolean>("modified");
    const [changeNote, setChangeNote] = useModelState<string>("change_note");
    const [canSave, setCanSave] = useModelState<boolean>("can_save");
    const [canLoad, setCanLoad] = useModelState<boolean>("can_load");
    const [defaultNewName, setDefaultNewName] = useModelState<string>("default_new_name");
    const [className, setClassName] = useModelState<string>("class_name");
    
    // Action triggers
    const [loadRequest, setLoadRequest] = useModelState<any | null>("load_request");
    const [saveRequest, setSaveRequest] = useModelState<any | null>("save_request");
    const [resetRequest, setResetRequest] = useModelState<boolean>("reset_request");
    const [newRequest, setNewRequest] = useModelState<any | null>("new_request");
    
    // Responses
    const [loadResponse, setLoadResponse] = useModelState<any | null>("load_response");
    const [saveResponse, setSaveResponse] = useModelState<any | null>("save_response");
    const [resetResponse, setResetResponse] = useModelState<any | null>("reset_response");
    const [newResponse, setNewResponse] = useModelState<any | null>("new_response");
    
    // Response notification state
    const [notification, setNotification] = React.useState<{
        type: string;
        title: string;
        message: string;
    } | null>(null);
    
    // Add a state to detect if widget has loaded yet
    const [isLoaded, setIsLoaded] = React.useState(false);
    
    // Use a state for manual refresh
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);
    
    // Track sync issues
    const [syncIssues, setSyncIssues] = React.useState<string[]>([]);
    
    // Debug state
    React.useEffect(() => {
        console.log("Items from Python:", items);
        console.log("Filtered items from Python:", filteredItems);
        console.log("Default new name from Python:", defaultNewName);
        console.log("Current item from Python:", currentItem);
        
        // Check if we've loaded yet
        if (items !== undefined && !isLoaded) {
            setIsLoaded(true);
            console.log("SaveLoadWidget is now loaded with data from Python");
        }
        
        // Check for sync issues
        const issues: string[] = [];
        if (items === undefined) issues.push("items");
        if (filteredItems === undefined) issues.push("filteredItems");
        if (defaultNewName === undefined) issues.push("defaultNewName");
        setSyncIssues(issues);
        
        if (issues.length > 0) {
            console.warn("Sync issues detected with:", issues.join(", "));
            
            // If we've been loaded for a while but still have sync issues, try to force a refresh
            if (isLoaded && refreshTrigger < 3) {
                const timer = setTimeout(() => {
                    console.log("Forcing a refresh to try to resolve sync issues");
                    setRefreshTrigger(prev => prev + 1);
                    
                    // Try to manually set some values if they're still undefined
                    if (items === undefined) setItems([]);
                    if (filteredItems === undefined) setFilteredItems([]);
                    if (defaultNewName === undefined) setDefaultNewName("New Item");
                }, 500);
                
                return () => clearTimeout(timer);
            }
        }
    }, [items, filteredItems, defaultNewName, currentItem, isLoaded, refreshTrigger]);
    
    // Handle responses from Python
    React.useEffect(() => {
        if (loadResponse) {
            console.log("Received load response:", loadResponse);
            if (loadResponse.note) {
                setNotification({
                    type: loadResponse.success ? "success" : "error",
                    title: loadResponse.success ? "Load Successful" : "Load Failed",
                    message: loadResponse.note
                });
            }
        }
    }, [loadResponse]);
    
    React.useEffect(() => {
        if (saveResponse) {
            console.log("Received save response:", saveResponse);
            if (saveResponse.note) {
                setNotification({
                    type: saveResponse.success ? "success" : "error",
                    title: saveResponse.success ? "Save Successful" : "Save Failed",
                    message: saveResponse.note
                });
            }
        }
    }, [saveResponse]);
    
    React.useEffect(() => {
        if (resetResponse) {
            console.log("Received reset response:", resetResponse);
            if (resetResponse.note) {
                setNotification({
                    type: resetResponse.success ? "success" : "error",
                    title: resetResponse.success ? "Reset Successful" : "Reset Failed",
                    message: resetResponse.note
                });
            }
        }
    }, [resetResponse]);
    
    React.useEffect(() => {
        if (newResponse) {
            console.log("Received new item response:", newResponse);
            if (newResponse.note) {
                setNotification({
                    type: newResponse.success ? "success" : "error",
                    title: newResponse.success ? "Item Created" : "Creation Failed",
                    message: newResponse.note
                });
            }
        }
    }, [newResponse]);
    
    // Handle search
    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
        setSearchQuery(query);
    };
    
    // Handle load
    const handleLoad = (item: any) => {
        console.log("Loading item:", item);
        setLoadRequest(item);
    };
    
    // Handle save
    const handleSave = () => {
        console.log("Saving current item:", currentItem);
        setSaveRequest({ timestamp: new Date().toISOString() });
    };
    
    // Handle reset
    const handleReset = () => {
        console.log("Resetting current item");
        setResetRequest(true);
    };
    
    // Handle new
    const handleNew = (label: string) => {
        console.log("Creating new item with label:", label);
        setNewRequest({ label });
    };
    
    // Ensure we have valid arrays for items and filteredItems
    const safeItems = Array.isArray(items) ? items : [];
    const safeFilteredItems = Array.isArray(filteredItems) ? filteredItems : safeItems;
    const safeDefaultNewName = defaultNewName || "New Item";
    const safeClassName = className || "";
    const safeCanSave = canSave !== undefined ? canSave : true;
    const safeCanLoad = canLoad !== undefined ? canLoad : true;
    const safeSearchQuery = searchQuery || "";
    const safeModified = modified !== undefined ? modified : false;
    const safeChangeNote = changeNote || "";
    
    // Force refresh of items list if empty but we know there should be items
    React.useEffect(() => {
        // If items is empty but we're getting a non-empty array from Python, refresh
        if (safeItems.length === 0 && items !== undefined && refreshTrigger < 3) {
            console.log("Forcing refresh of items list");
            setRefreshTrigger(prev => prev + 1);
            // This forces communication with Python
            setSearchQuery(safeSearchQuery);
        }
    }, [items, safeItems, refreshTrigger]);
    
    return (
        <div className="save-load-widget-container">
            <SaveLoad
                items={safeItems}
                filteredItems={safeFilteredItems}
                searchQuery={safeSearchQuery}
                currentItem={currentItem}
                modified={safeModified}
                changeNote={safeChangeNote}
                canSave={safeCanSave}
                canLoad={safeCanLoad}
                defaultNewName={safeDefaultNewName}
                className={safeClassName}
                onSearch={handleSearch}
                onLoad={handleLoad}
                onSave={handleSave}
                onReset={handleReset}
                onNew={handleNew}
            />
            
            {/* Notification display */}
            {notification && (
                <div className={`save-load-notification ${notification.type}`}>
                    <div className="save-load-notification-header">
                        <h4>{notification.title}</h4>
                        <button 
                            className="save-load-notification-close"
                            onClick={() => setNotification(null)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="save-load-notification-content">
                        <p>{notification.message}</p>
                    </div>
                </div>
            )}
            
            {/* Sync issues warning - only visible in development */}
            {syncIssues.length > 0 && process.env.NODE_ENV !== 'production' && (
                <div className="save-load-sync-warning">
                    <p>Warning: Sync issues with Python - {syncIssues.join(", ")}</p>
                </div>
            )}
        </div>
    );
}

export default {
    render: createRender(SaveLoadWidget)
} 