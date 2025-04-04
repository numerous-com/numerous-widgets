import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { useModelState } from "@anywidget/react";

interface Item {
  id: string;
  label: string;
  [key: string]: any;
}

interface LoadSaveContextType {
  // Required states
  items: Item[];
  selectedItemId: string | null;
  isModified: boolean;
  
  // Optional states
  modificationNote: string | null;
  disableLoad: boolean;
  disableSave: boolean;
  disableSaveAs: boolean;
  disableSaveReason: string | null;
  defaultNewItemName: string;
  searchResults: Item[];
  actionNote: string | null;
  successStatus: boolean;
  
  // Actions
  handleLoad: (itemId: string) => void;
  handleSave: () => void;
  handleReset: () => void;
  handleNew: (name: string) => void;
  handleSaveAs: (name: string) => void;
  handleSaveAsWithId: (itemId: string) => void;
  handleSearch: (query: string) => void;
  handleRename: (itemId: string, newName: string) => void;
}

const LoadSaveContext = createContext<LoadSaveContextType | null>(null);

export const useLoadSave = () => {
  const context = useContext(LoadSaveContext);
  if (!context) {
    throw new Error('useLoadSave must be used within a LoadSaveProvider');
  }
  return context;
};

export const LoadSaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Required model states
  const [items, setItems] = useModelState<Item[]>("items");
  const [selectedItemId, setSelectedItemId] = useModelState<string | null>("selected_item_id");
  const [isModified, setIsModified] = useModelState<boolean>("is_modified");
  
  // Optional model states
  const [modificationNote] = useModelState<string | null>("modification_note");
  const [disableLoad] = useModelState<boolean>("disable_load");
  const [disableSave] = useModelState<boolean>("disable_save");
  const [disableSaveAs] = useModelState<boolean>("disable_save_as");
  const [disableSaveReason] = useModelState<string | null>("disable_save_reason");
  const [defaultNewItemName] = useModelState<string>("default_new_item_name");
  
  // Action triggers
  const [doSave, setDoSave] = useModelState<boolean>("do_save");
  const [doReset, setDoReset] = useModelState<boolean>("do_reset");
  const [doLoad, setDoLoad] = useModelState<boolean>("do_load");
  
  // Response states
  const [actionNote, setActionNote] = useModelState<string | null>("action_note");
  const [successStatus, setSuccessStatus] = useModelState<boolean>("success_status");
  
  // New item creation
  const [newItemName, setNewItemName] = useModelState<string | null>("new_item_name");
  const [createNewItem, setCreateNewItem] = useModelState<boolean>("create_new_item");
  const [isSaveAs, setIsSaveAs] = useModelState<boolean>("is_save_as");

  // Local state for tracking operations
  const [saveInProgress, setSaveInProgress] = React.useState(false);
  const saveTargetRef = useRef<string | null>(null);
  
  // Local state for search (no Python sync)
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  // Local state for search results (no Python sync)
  const [clientSearchResults, setClientSearchResults] = useState<Item[]>([]);

  // Handle effects for save operations
  useEffect(() => {
    if (saveInProgress && !doSave) {
      setSaveInProgress(false);
      
      if (saveTargetRef.current) {
        const targetItem = items?.find(item => item.id === saveTargetRef.current);
        const targetName = targetItem ? targetItem.label : "Selected item";
        setActionNote(`Saved to "${targetName}" successfully`);
        setSuccessStatus(true);
        saveTargetRef.current = null;
      }
    }
  }, [doSave, saveInProgress, items, setActionNote, setSuccessStatus]);
  
  // Initialize search results when items change
  useEffect(() => {
    if (items) {
      setClientSearchResults(items);
    }
  }, [items]);
  
  // Client-side search implementation
  useEffect(() => {
    if (!items) return;
    
    if (!currentSearchQuery.trim()) {
      // If search query is empty, show all items
      setClientSearchResults(items);
      return;
    }
    
    // Perform client-side search with case-insensitive matching
    const searchTerms = currentSearchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    const filteredItems = items.filter(item => {
      const label = item.label.toLowerCase();
      // Check if all search terms are contained in the label
      return searchTerms.every(term => label.includes(term));
    });
    
    setClientSearchResults(filteredItems);
  }, [currentSearchQuery, items]);

  const handleSave = useCallback(() => {
    setDoSave(true);
  }, [setDoSave]);

  const handleReset = useCallback(() => {
    setDoReset(true);
    if (!selectedItemId) {
      setSelectedItemId(null);
    }
  }, [selectedItemId, setDoReset, setSelectedItemId]);

  const handleLoad = useCallback((itemId: string) => {
    if (itemId === selectedItemId) return;
    setSelectedItemId(itemId);
    setDoLoad(true);
  }, [selectedItemId, setSelectedItemId, setDoLoad]);

  const handleNew = useCallback((name: string) => {
    setNewItemName(name);
    setCreateNewItem(true);
  }, [setNewItemName, setCreateNewItem]);

  const handleSaveAs = useCallback((name: string) => {
    setNewItemName(name);
    setIsSaveAs(true);
    setCreateNewItem(true);
  }, [setNewItemName, setIsSaveAs, setCreateNewItem]);

  const handleSaveAsWithId = useCallback((itemId: string) => {
    saveTargetRef.current = itemId;
    setSelectedItemId(itemId);
    setSaveInProgress(true);
    setDoSave(true);
  }, [setSelectedItemId, setDoSave]);

  // Search handler only updates local state, no Python communication
  const handleSearch = useCallback((query: string) => {
    setCurrentSearchQuery(query);
  }, []);

  const handleRename = useCallback((itemId: string, newName: string) => {
    const updatedItems = items?.map(item => 
      item.id === itemId ? { ...item, label: newName } : item
    );
    
    if (updatedItems) {
      setItems(updatedItems);
      
      // Also update local search results to reflect the name change
      setClientSearchResults(prev => 
        prev.map(item => item.id === itemId ? { ...item, label: newName } : item)
      );
    }
    
    setActionNote(`Item renamed to "${newName}"`);
    setSuccessStatus(true);
  }, [items, setItems, setActionNote, setSuccessStatus]);

  const value = {
    // States
    items: items || [],
    selectedItemId,
    isModified: isModified || false,
    modificationNote,
    disableLoad: disableLoad || false,
    disableSave: disableSave || false,
    disableSaveAs: disableSaveAs || false,
    disableSaveReason,
    defaultNewItemName: defaultNewItemName || "New Item",
    searchResults: clientSearchResults,
    actionNote,
    successStatus: successStatus === undefined ? true : successStatus,
    
    // Actions
    handleLoad,
    handleSave,
    handleReset,
    handleNew,
    handleSaveAs,
    handleSaveAsWithId,
    handleSearch,
    handleRename,
  };

  return (
    <LoadSaveContext.Provider value={value}>
      {children}
    </LoadSaveContext.Provider>
  );
}; 