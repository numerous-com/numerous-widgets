import * as React from "react";
import ReactMarkdown from 'react-markdown';

interface Item {
    id: string;
    label: string;
}

interface SaveLoadProps {
    items: Item[];
    filteredItems: Item[];
    searchQuery: string;
    currentItem: Item | null;
    modified: boolean;
    changeNote: string;
    canSave: boolean;
    canLoad: boolean;
    defaultNewName: string;
    className?: string;
    onSearch: (query: string) => void;
    onLoad: (item: Item) => void;
    onSave: () => void;
    onReset: () => void;
    onNew: (label: string) => void;
}

export function SaveLoad({
    items,
    filteredItems,
    searchQuery,
    currentItem,
    modified,
    changeNote,
    canSave,
    canLoad,
    defaultNewName = "New Item",
    className = "",
    onSearch,
    onLoad,
    onSave,
    onReset,
    onNew,
}: SaveLoadProps) {
    const [isNewModalOpen, setIsNewModalOpen] = React.useState(false);
    const [newItemName, setNewItemName] = React.useState(defaultNewName || "New Item");
    const [isConfirmLoadModalOpen, setIsConfirmLoadModalOpen] = React.useState(false);
    const [itemToLoad, setItemToLoad] = React.useState<Item | null>(null);
    const [showNoteModal, setShowNoteModal] = React.useState(false);
    const [noteModalContent, setNoteModalContent] = React.useState("");
    const [noteModalTitle, setNoteModalTitle] = React.useState("");

    // Debug log for props
    React.useEffect(() => {
        console.log("SaveLoad Props - items:", items);
        console.log("SaveLoad Props - filteredItems:", filteredItems);
        console.log("SaveLoad Props - defaultNewName:", defaultNewName);
    }, [items, filteredItems, defaultNewName]);

    // Update new item name when the default changes
    React.useEffect(() => {
        if (defaultNewName) {
            setNewItemName(defaultNewName);
        }
    }, [defaultNewName]);

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    // Handle load request
    const handleLoadRequest = (item: Item) => {
        if (!item) {
            console.error("Attempted to load undefined/null item");
            return;
        }
        
        if (modified && canLoad) {
            // If there are unsaved changes, show confirmation dialog
            setItemToLoad(item);
            setIsConfirmLoadModalOpen(true);
        } else if (canLoad) {
            // Otherwise, load directly
            onLoad(item);
        }
    };

    // Handle confirmed load
    const handleConfirmLoad = () => {
        if (itemToLoad) {
            onLoad(itemToLoad);
            setIsConfirmLoadModalOpen(false);
            setItemToLoad(null);
        }
    };

    // Handle save request
    const handleSave = () => {
        if (canSave && currentItem) {
            onSave();
        }
    };

    // Handle reset request
    const handleReset = () => {
        onReset();
    };

    // Handle new item request
    const handleNewRequest = () => {
        setNewItemName(defaultNewName || "New Item");
        setIsNewModalOpen(true);
    };

    // Handle new item creation
    const handleCreateNewItem = () => {
        onNew(newItemName);
        setIsNewModalOpen(false);
    };

    // Show a note in a modal
    const showNote = (title: string, content: string) => {
        setNoteModalTitle(title);
        setNoteModalContent(content);
        setShowNoteModal(true);
    };

    // Ensure we're working with valid arrays
    const safeItems = Array.isArray(items) ? items : [];
    const safeFilteredItems = Array.isArray(filteredItems) ? filteredItems : safeItems;

    return (
        <div className={`save-load-container ${className}`}>
            {/* Main widget UI */}
            <div className="save-load-header">
                <div className="save-load-search">
                    <input
                        type="text"
                        value={searchQuery || ""}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="save-load-search-input"
                    />
                </div>
                <div className="save-load-actions">
                    <button
                        className="save-load-button new-button"
                        onClick={handleNewRequest}
                    >
                        New
                    </button>
                    <button
                        className="save-load-button save-button"
                        onClick={handleSave}
                        disabled={!canSave || !currentItem}
                    >
                        Save
                    </button>
                    <button
                        className="save-load-button reset-button"
                        onClick={handleReset}
                        disabled={!currentItem}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Current item display */}
            <div className="save-load-current">
                {currentItem ? (
                    <div className={`save-load-current-item ${modified ? 'modified' : ''}`}>
                        <span className="save-load-current-label">
                            {currentItem.label}
                            {modified && <span className="save-load-modified-indicator">*</span>}
                        </span>
                        {modified && changeNote && (
                            <button 
                                className="save-load-note-button"
                                onClick={() => showNote("Changes", changeNote)}
                            >
                                View changes
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="save-load-no-item">
                        No item loaded
                    </div>
                )}
            </div>

            {/* Items list */}
            <div className="save-load-items-list">
                {safeFilteredItems.length > 0 ? (
                    safeFilteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={`save-load-item ${currentItem && currentItem.id === item.id ? 'active' : ''}`}
                            onClick={() => handleLoadRequest(item)}
                        >
                            {item.label}
                        </div>
                    ))
                ) : (
                    <div className="save-load-no-items">
                        {safeItems.length > 0 ? 'No matching items' : 'No items available'}
                    </div>
                )}
            </div>

            {/* New item modal */}
            {isNewModalOpen && (
                <div className="save-load-modal-overlay">
                    <div className="save-load-modal">
                        <h3>Create New Item</h3>
                        <div className="save-load-modal-content">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    className="save-load-modal-input"
                                    autoFocus
                                />
                            </label>
                        </div>
                        <div className="save-load-modal-actions">
                            <button
                                className="save-load-modal-button cancel"
                                onClick={() => setIsNewModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-load-modal-button create"
                                onClick={handleCreateNewItem}
                                disabled={!newItemName || !newItemName.trim()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm load modal */}
            {isConfirmLoadModalOpen && (
                <div className="save-load-modal-overlay">
                    <div className="save-load-modal">
                        <h3>Unsaved Changes</h3>
                        <div className="save-load-modal-content">
                            <p>You have unsaved changes. Loading a new item will discard these changes.</p>
                            {changeNote && (
                                <div className="save-load-modal-note">
                                    <h4>Changes:</h4>
                                    <ReactMarkdown>{changeNote}</ReactMarkdown>
                                </div>
                            )}
                            <p>Do you want to continue?</p>
                        </div>
                        <div className="save-load-modal-actions">
                            <button
                                className="save-load-modal-button cancel"
                                onClick={() => setIsConfirmLoadModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-load-modal-button confirm"
                                onClick={handleConfirmLoad}
                            >
                                Load Anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Note modal */}
            {showNoteModal && (
                <div className="save-load-modal-overlay">
                    <div className="save-load-modal">
                        <h3>{noteModalTitle}</h3>
                        <div className="save-load-modal-content">
                            <div className="save-load-modal-note">
                                <ReactMarkdown>{noteModalContent || ""}</ReactMarkdown>
                            </div>
                        </div>
                        <div className="save-load-modal-actions">
                            <button
                                className="save-load-modal-button confirm"
                                onClick={() => setShowNoteModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 