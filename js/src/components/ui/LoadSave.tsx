import React, { useState, useEffect, useRef } from 'react';
import { MarkdownDisplay } from './MarkdownDisplay';

// Icons for the UI
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="loadsave-search-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Component interfaces
interface Item {
  id: string;
  label: string;
  [key: string]: any;
}

interface Note {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface LoadSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
  onSave: () => void;
  onNew: (name: string) => void;
  onReset: () => void;
  onSearch: (query: string) => void;
  isModified: boolean;
  disableLoad: boolean;
  disableSave: boolean;
  searchResults: Item[];
  note: Note | null;
}

interface LoadSaveProps {
  items: Item[];
  selectedItemId: string | null;
  isModified: boolean;
  modificationNote: string | null;
  disableLoad: boolean;
  disableSave: boolean;
  disableSaveAs: boolean;
  disableSaveReason: string | null;
  onLoad: (itemId: string) => void;
  onSave: () => void;
  onReset: () => void;
  onNew: (name: string) => void;
  onSaveAs: (name: string) => void;
  onSaveAsWithId: (itemId: string) => void;
  onRename: (itemId: string, newName: string) => void;
  onSearch: (query: string) => void;
  searchResults: Item[];
  note: string | null;
  isSuccess: boolean;
  defaultNewItemName: string;
}

// New Item Dialog Component
const NewItemDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName: string;
}> = ({ isOpen, onClose, onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setName(defaultName);
      setIsSubmitting(false);
      inputRef.current.focus();
    }
  }, [isOpen, defaultName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(name);
    // Close the dialog immediately to indicate the item is being created and loaded
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="loadsave-modal-overlay" onClick={onClose}>
      <div 
        className="loadsave-modal-content loadsave-new-item-dialog" 
        onClick={e => e.stopPropagation()}
      >
        <div className="loadsave-modal-header">
          <h2 className="loadsave-modal-title">Create New Item</h2>
          <button className="loadsave-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="loadsave-modal-body">
          <form className="loadsave-new-item-form" onSubmit={handleSubmit}>
            <div className="loadsave-form-group">
              <label className="loadsave-form-label" htmlFor="new-item-name">
                Name
              </label>
              <input
                id="new-item-name"
                ref={inputRef}
                className="loadsave-form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="loadsave-modal-footer">
          <div></div>
          <div className="loadsave-footer-right">
            <button 
              className="loadsave-button-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="loadsave-button-primary" 
              onClick={() => {
                setIsSubmitting(true);
                onSubmit(name);
                onClose();
              }}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Save As Dialog Component
const SaveAsDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName: string;
}> = ({ isOpen, onClose, onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setName(defaultName);
      setIsSubmitting(false);
      inputRef.current.focus();
    }
  }, [isOpen, defaultName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="loadsave-modal-overlay" onClick={onClose}>
      <div 
        className="loadsave-modal-content loadsave-new-item-dialog" 
        onClick={e => e.stopPropagation()}
      >
        <div className="loadsave-modal-header">
          <h2 className="loadsave-modal-title">Save As</h2>
          <button className="loadsave-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="loadsave-modal-body">
          <form className="loadsave-new-item-form" onSubmit={handleSubmit}>
            <div className="loadsave-form-group">
              <label className="loadsave-form-label" htmlFor="save-as-name">
                Name
              </label>
              <input
                id="save-as-name"
                ref={inputRef}
                className="loadsave-form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="loadsave-modal-footer">
          <div></div>
          <div className="loadsave-footer-right">
            <button 
              className="loadsave-button-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="loadsave-button-primary" 
              onClick={() => {
                setIsSubmitting(true);
                onSubmit(name);
                onClose();
              }}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Dialog Component
const ConfirmationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="loadsave-modal-overlay" onClick={onClose}>
      <div 
        className="loadsave-modal-content loadsave-new-item-dialog" 
        onClick={e => e.stopPropagation()}
      >
        <div className="loadsave-modal-header">
          <h2 className="loadsave-modal-title">{title}</h2>
          <button className="loadsave-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="loadsave-modal-body">
          <p>{message}</p>
        </div>
        <div className="loadsave-modal-footer">
          <div></div>
          <div className="loadsave-footer-right">
            <button 
              className="loadsave-button-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="loadsave-button-primary" 
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rename Dialog Component
const RenameDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName: string;
}> = ({ isOpen, onClose, onSubmit, defaultName }) => {
  const [name, setName] = useState(defaultName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setName(defaultName);
      setIsSubmitting(false);
      inputRef.current.focus();
    }
  }, [isOpen, defaultName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="loadsave-modal-overlay" onClick={onClose}>
      <div 
        className="loadsave-modal-content loadsave-new-item-dialog" 
        onClick={e => e.stopPropagation()}
      >
        <div className="loadsave-modal-header">
          <h2 className="loadsave-modal-title">Rename Item</h2>
          <button className="loadsave-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="loadsave-modal-body">
          <form className="loadsave-new-item-form" onSubmit={handleSubmit}>
            <div className="loadsave-form-group">
              <label className="loadsave-form-label" htmlFor="rename-item-name">
                New Name
              </label>
              <input
                id="rename-item-name"
                ref={inputRef}
                className="loadsave-form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="loadsave-modal-footer">
          <div></div>
          <div className="loadsave-footer-right">
            <button 
              className="loadsave-button-secondary" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              className="loadsave-button-primary" 
              onClick={() => {
                setIsSubmitting(true);
                onSubmit(name);
                onClose();
              }}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Renaming...' : 'Rename'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
export const LoadSaveModal: React.FC<LoadSaveModalProps & { 
  isSaveAsMode?: boolean;
  showSaveConfirmation?: (message: string, action: () => void, title?: string) => void;
  onSaveAsWithId?: (itemId: string) => void;
  disableSaveReason?: string | null;
}> = ({
  isOpen,
  onClose,
  items,
  selectedItemId,
  onSelectItem,
  onSave,
  onNew,
  onReset,
  onSearch,
  isModified,
  disableLoad,
  disableSave,
  searchResults,
  note,
  isSaveAsMode = false,
  showSaveConfirmation,
  onSaveAsWithId,
  disableSaveReason
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(selectedItemId);
  const [isSaveAsDialogOpen, setIsSaveAsDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedId(selectedItemId);
  }, [selectedItemId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSelectItem = (itemId: string) => {
    // Just select the item visually, don't load it yet
    setSelectedId(itemId);
  };
  
  const handleLoad = () => {
    if (selectedId) {
      // No need to check for unsaved changes since Browse button is hidden when modified
      onSelectItem(selectedId);
      onClose();
    }
  };

  const handleNewItem = (name: string) => {
    // Create new item and close the modal
    onNew(name);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReset = () => {
    if (showSaveConfirmation) {
      showSaveConfirmation(
        "Are you sure you want to reset? This will discard all unsaved changes.", 
        () => {
          onReset();
        },
        "Confirm Reset"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="loadsave-modal-overlay" onClick={handleOverlayClick}>
        <div className="loadsave-modal-content" onClick={e => e.stopPropagation()}>
          <div className="loadsave-modal-header">
            <h2 className="loadsave-modal-title">
              {isSaveAsMode ? "Select Destination or Create New" : "Select Item to Load"}
            </h2>
            <button className="loadsave-modal-close" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="loadsave-modal-body">
            <div className="loadsave-search">
              <SearchIcon />
              <input
                type="text"
                className="loadsave-search-input"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div 
              className="loadsave-items-list"
              style={{ height: '300px' }}
            >
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <div
                    key={item.id}
                    className={`loadsave-item ${item.id === selectedId ? 'selected' : ''}`}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    <div className="loadsave-item-label">{item.label}</div>
                  </div>
                ))
              ) : (
                <div className="loadsave-item" style={{ cursor: 'default' }}>
                  <div className="loadsave-item-label" style={{ color: 'var(--ui-widget-secondary-text)' }}>
                    No items found
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="loadsave-modal-footer">
            <div className="loadsave-footer-left">
              {isSaveAsMode && (
                <button 
                  className="loadsave-button-secondary"
                  onClick={() => setIsSaveAsDialogOpen(true)}
                >
                  Save with New Name
                </button>
              )}
            </div>
            <div className="loadsave-footer-right">
              {isModified && !isSaveAsMode && (
                <>
                  <button
                    className={`loadsave-button-secondary ${!selectedId ? 'disabled' : ''}`}
                    onClick={handleReset}
                    disabled={!selectedId}
                  >
                    Reset
                  </button>
                  <button
                    className={`loadsave-button-secondary ${disableSave || !selectedId ? 'disabled' : ''}`}
                    onClick={() => {
                      if (showSaveConfirmation) {
                        showSaveConfirmation(
                          "Are you sure you want to save? This will overwrite the current data.", 
                          () => {
                            onSave();
                            onClose();
                          },
                          "Confirm Save"
                        );
                      }
                    }}
                    disabled={disableSave || !selectedId}
                    title={disableSave && disableSaveReason ? disableSaveReason : "Save changes"}
                  >
                    Save Current
                  </button>
                </>
              )}
              <button
                className={`loadsave-button-primary ${(isSaveAsMode && disableSave) || (!isSaveAsMode && disableLoad) ? 'disabled' : ''}`}
                onClick={isSaveAsMode ? 
                  () => {
                    if (selectedId && showSaveConfirmation) {
                      const targetItem = items.find(item => item.id === selectedId);
                      const targetName = targetItem ? targetItem.label : "selected item";
                      showSaveConfirmation(
                        `Are you sure you want to save to "${targetName}"? This will overwrite the existing data.`, 
                        () => {
                          if (onSaveAsWithId) {
                            onSaveAsWithId(selectedId);
                            onClose();
                          }
                        },
                        "Confirm Save As"
                      );
                    }
                  } : 
                  handleLoad
                }
                disabled={!selectedId || (isSaveAsMode ? (disableSave || false) : disableLoad)}
                title={isSaveAsMode && disableSave && disableSaveReason 
                  ? disableSaveReason 
                  : (isSaveAsMode ? "Save to selected item" : "Load selected item")}
              >
                {isSaveAsMode ? "Save" : "Load"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <NewItemDialog
        isOpen={isNewItemDialogOpen}
        onClose={() => setIsNewItemDialogOpen(false)}
        onSubmit={handleNewItem}
        defaultName="New Item"
      />

      <SaveAsDialog
        isOpen={isSaveAsDialogOpen}
        onClose={() => setIsSaveAsDialogOpen(false)}
        onSubmit={(name) => {
          if (showSaveConfirmation) {
            showSaveConfirmation(
              `Are you sure you want to save as "${name}"? This will create a new item with your current data.`, 
              () => {
                onNew(name);
                onClose();
              },
              "Confirm Save As"
            );
          } else {
            onNew(name);
            onClose();
          }
        }}
        defaultName={selectedId ? 
          (items.find(item => item.id === selectedId)?.label || "") + " (Copy)" : 
          "New Item"}
      />
    </>
  );
};

// Toast Notification Component
const Toast: React.FC<{
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`loadsave-toast ${type}`}>
      <MarkdownDisplay content={message} />
    </div>
  );
};

// Main LoadSave Component
export const LoadSave: React.FC<LoadSaveProps> = ({
  items,
  selectedItemId,
  isModified,
  modificationNote,
  disableLoad,
  disableSave,
  disableSaveAs,
  disableSaveReason,
  onLoad,
  onSave,
  onReset,
  onNew,
  onSaveAs,
  onSaveAsWithId,
  onRename,
  onSearch,
  searchResults,
  note,
  isSuccess,
  defaultNewItemName
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [isSaveAsDialogOpen, setIsSaveAsDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isSaveAsMode, setIsSaveAsMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [pendingSaveAction, setPendingSaveAction] = useState<() => void>(() => {});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("Confirm Action");
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
    message: '',
    type: 'info'
  });
  
  // Show toast when note changes
  useEffect(() => {
    if (note) {
      setToastMessage({
        message: note,
        type: isSuccess ? 'success' : 'error'
      });
      setIsToastVisible(true);
    }
  }, [note, isSuccess]);

  const selectedItem = items.find(item => item.id === selectedItemId);

  const handleOpenModal = (saveAsMode = false) => {
    setIsSaveAsMode(saveAsMode);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSaveAsMode(false);
  };

  const showSaveConfirmation = (message: string, action: () => void, title: string = "Confirm Action") => {
    setConfirmationMessage(message);
    setPendingSaveAction(() => action);
    setConfirmationTitle(title);
    setIsSaveConfirmOpen(true);
  };

  const handleSave = () => {
    showSaveConfirmation(
      "Are you sure you want to save? This will overwrite the current data.", 
      () => {
        onSave();
        setIsMenuOpen(false);
      },
      "Confirm Save"
    );
  };

  const handleReset = () => {
    showSaveConfirmation(
      "Are you sure you want to reset? This will discard all unsaved changes.", 
      () => {
        onReset();
        setIsMenuOpen(false);
      },
      "Confirm Reset"
    );
  };
  
  const handleSaveAs = (name: string) => {
    showSaveConfirmation(`Are you sure you want to save as "${name}"? This will create a new item with your current data.`, () => {
      onSaveAs(name);
    });
  };

  const handleRename = (name: string) => {
    if (selectedItemId) {
      onRename(selectedItemId, name);
    }
    setIsMenuOpen(false);
  };

  // Method to save current content to an existing item
  const handleSaveAsWithId = (itemId: string) => {
    // Use the new dedicated function for saving to an existing ID
    onSaveAsWithId(itemId);
  };

  return (
    <>
      <div className="inline-block relative">
        <div className="loadsave-container">
          <div className="loadsave-item-display">
            {isModified && <div className="loadsave-status-indicator modified" title="Modified" />}
            {selectedItem ? (
              <div className="loadsave-item-name selected">{selectedItem.label}</div>
            ) : (
              <div className="loadsave-item-name no-selection">No item selected</div>
            )}
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="loadsave-button"
            title="Menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="dropdown-menu">
            {!isModified && (
              <button
                className="dropdown-item"
                onClick={() => handleOpenModal(false)}
                disabled={disableLoad}
                title={disableLoad ? "Loading is currently disabled" : "Load items"}
              >
                Load
              </button>
            )}
            
            {(selectedItemId || isModified) && (
              <button
                className={`dropdown-item ${disableSaveAs ? 'disabled' : ''}`}
                onClick={() => handleOpenModal(true)}
                disabled={disableSaveAs}
                title={disableSaveAs && disableSaveReason ? disableSaveReason : "Save as new item"}
              >
                Save As
              </button>
            )}
            
            {selectedItemId && (
              <button
                className="dropdown-item"
                onClick={() => setIsRenameDialogOpen(true)}
                title="Rename current item"
              >
                Rename
              </button>
            )}
            
            {isModified && (
              <>
                <button
                  className="dropdown-item"
                  onClick={handleReset}
                  title="Reset changes"
                >
                  Reset
                </button>
                {selectedItemId && (
                  <button
                    className={`dropdown-item ${disableSave ? 'disabled' : ''}`}
                    onClick={handleSave}
                    disabled={disableSave}
                    title={disableSave && disableSaveReason ? disableSaveReason : "Save changes"}
                  >
                    Save
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <LoadSaveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        items={items}
        selectedItemId={selectedItemId}
        onSelectItem={onLoad}
        onSave={onSave}
        onNew={onNew}
        onReset={onReset}
        onSearch={onSearch}
        isModified={isModified}
        disableLoad={disableLoad}
        disableSave={disableSave}
        searchResults={searchResults}
        note={note ? { type: isSuccess ? 'success' : 'error', message: note } : null}
        isSaveAsMode={isSaveAsMode}
        showSaveConfirmation={showSaveConfirmation}
        onSaveAsWithId={handleSaveAsWithId}
        disableSaveReason={disableSaveReason}
      />

      <NewItemDialog
        isOpen={isNewItemDialogOpen}
        onClose={() => setIsNewItemDialogOpen(false)}
        onSubmit={name => {
          showSaveConfirmation(
            `Are you sure you want to create a new item named "${name}"?`,
            () => onNew(name),
            "Confirm Create"
          );
        }}
        defaultName={defaultNewItemName}
      />
      
      <SaveAsDialog
        isOpen={isSaveAsDialogOpen}
        onClose={() => setIsSaveAsDialogOpen(false)}
        onSubmit={(name) => {
          if (showSaveConfirmation) {
            showSaveConfirmation(
              `Are you sure you want to save as "${name}"? This will create a new item with your current data.`, 
              () => {
                onNew(name);
                onClose();
              },
              "Confirm Save As"
            );
          } else {
            onNew(name);
            onClose();
          }
        }}
        defaultName={selectedItem ? `${selectedItem.label} (Copy)` : defaultNewItemName}
      />

      <RenameDialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        onSubmit={handleRename}
        defaultName={selectedItem ? selectedItem.label : ""}
      />

      <ConfirmationDialog 
        isOpen={isSaveConfirmOpen}
        onClose={() => setIsSaveConfirmOpen(false)}
        onConfirm={() => {
          pendingSaveAction();
          setIsSaveConfirmOpen(false);
        }}
        title={confirmationTitle}
        message={confirmationMessage}
      />

      {isToastVisible && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </>
  );
}; 