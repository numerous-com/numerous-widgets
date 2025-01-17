import * as React from "react";

interface TreeItem {
    id: string;
    label: string;
    parent_id: string | null;
    is_expanded: boolean;
    _trait_values?: {
        id: string;
        label: string;
        parent_id: string | null;
        is_expanded: boolean;
    };
}

interface TreeBrowserProps {
    items: { [key: string]: TreeItem };
    selectedIds: string[];
    selectionMode: 'none' | 'single' | 'multiple';
    onChange: (selectedIds: string[]) => void;
    disabled?: boolean;
    label_update: { [key: string]: string };
    onLabelUpdate: (nodeId: string, newLabel: string) => void;
    model?: any;
    move_update: { item_id: string; parent_id: string | null };
    onMoveUpdate: (itemId: string, newParentId: string | null) => Promise<boolean>;
}

export function TreeBrowser({
    items,
    selectedIds,
    selectionMode,
    onChange,
    disabled = false,
    label_update,
    onLabelUpdate,
    move_update,
    onMoveUpdate,
    model,
}: TreeBrowserProps) {
    const processedItems = React.useMemo(() => {
        const result: { [key: string]: TreeItem } = {};
        Object.entries(items).forEach(([key, item]) => {
            result[key] = {
                ...item,
                id: item.id || key,
                is_expanded: item.is_expanded ?? false
            };
        });
        return result;
    }, [items]);

    const [expanded, setExpanded] = React.useState<Set<string>>(
        new Set(Object.values(processedItems)
            .filter(item => item.is_expanded)
            .map(item => item.id!))
    );

    // Update expanded state when items change
    React.useEffect(() => {
        setExpanded(new Set(Object.values(processedItems)
            .filter(item => item.is_expanded)
            .map(item => item.id!)));
    }, [processedItems]);

    const handleSelect = (nodeId: string) => {
        if (disabled || selectionMode === 'none') return;
        
        let newSelected: string[];
        if (selectionMode === 'single') {
            newSelected = [nodeId];
        } else {
            newSelected = selectedIds.includes(nodeId)
                ? selectedIds.filter(id => id !== nodeId)
                : [...selectedIds, nodeId];
        }
        
        onChange(newSelected);
    };

    const toggleExpand = (nodeId: string) => {
        setExpanded(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
    };

    const [editingNodeId, setEditingNodeId] = React.useState<string | null>(null);
    const [editingLabel, setEditingLabel] = React.useState("");

    const handleClick = (e: React.MouseEvent, nodeId: string) => {
        e.stopPropagation();
        if (!disabled && !editingNodeId) {
            handleSelect(nodeId);
        }
    };

    const handleDoubleClick = (e: React.MouseEvent, nodeId: string, label: string) => {
        e.stopPropagation();
        if (!disabled) {
            setEditingNodeId(nodeId);
            setEditingLabel(label);
        }
    };

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingLabel(e.target.value);
    };

    const handleLabelSubmit = async (nodeId: string) => {
        if (editingLabel.trim()) {
            try {
                // Wait for the update to be confirmed by the backend
                await onLabelUpdate(nodeId, editingLabel.trim());
                // Only reset editing state after successful update
                setEditingNodeId(null);
            } catch (error) {
                console.error('Failed to update label:', error);
                setEditingLabel(items[nodeId].label);
                setEditingNodeId(null);
            }
        } else {
            setEditingNodeId(null);
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && editingNodeId) {
            // Immediately prevent default to stop multiple submissions
            e.preventDefault();
            e.stopPropagation();
            
            // Store the current editing node ID as it might change during await
            const nodeId = editingNodeId;
            const currentLabel = editingLabel;
            
            // Clear editing state immediately
            setEditingNodeId(null);
            
            // Then process the update
            if (currentLabel.trim()) {
                try {
                    await onLabelUpdate(nodeId, currentLabel.trim());
                } catch (error) {
                    console.error('Failed to update label:', error);
                }
            }
        } else if (e.key === 'Escape') {
            setEditingNodeId(null);
            setEditingLabel(items[editingNodeId!]?.label || '');
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const [draggedId, setDraggedId] = React.useState<string | null>(null);
    const [dropTarget, setDropTarget] = React.useState<string | null>(null);
    const [dropPosition, setDropPosition] = React.useState<'above' | 'below' | 'child' | null>(null);

    // Helper function to check if nodeId is a descendant of potentialAncestor
    const isDescendant = (nodeId: string, potentialAncestor: string): boolean => {
        let current = items[nodeId]?.parent_id;
        while (current) {
            if (current === potentialAncestor) return true;
            current = items[current]?.parent_id;
        }
        return false;
    };

    const handleDragStart = (e: React.DragEvent, nodeId: string) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        e.stopPropagation();
        setDraggedId(nodeId);
        e.dataTransfer.setData('text/plain', nodeId);
        e.dataTransfer.effectAllowed = 'move';
        
        // Add a drag image or use the default
        const dragImage = document.createElement('div');
        dragImage.textContent = items[nodeId]?.label || '';
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    };

    const handleDragOver = (e: React.DragEvent, nodeId: string) => {
        if (disabled || !draggedId) return;
        
        // Prevent dropping on self or descendants
        if (draggedId === nodeId || isDescendant(nodeId, draggedId)) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Get the target element's bounding rectangle
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const mouseY = e.clientY;
        const relativeY = mouseY - rect.top;
        
        // Determine drop position based on mouse position
        // Top 25% = above, bottom 25% = below, middle 50% = child
        if (relativeY < rect.height * 0.25) {
            setDropPosition('above');
        } else if (relativeY > rect.height * 0.75) {
            setDropPosition('below');
        } else {
            setDropPosition('child');
        }

        setDropTarget(nodeId);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
        }
        setDropTarget(null);
        setDropPosition(null);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedId(null);
        setDropTarget(null);
        setDropPosition(null);
    };

    const handleDrop = async (e: React.DragEvent, targetId: string | null) => {
        e.preventDefault();
        e.stopPropagation();
        
        const sourceId = draggedId;
        const position = dropPosition;
        setDropTarget(null);
        setDropPosition(null);
        setDraggedId(null);

        if (!sourceId || sourceId === targetId || isDescendant(targetId!, sourceId)) {
            return;
        }

        try {
            // Get the target's parent for 'above' and 'below' positions
            const targetParentId = position === 'child' ? targetId : items[targetId!].parent_id;
            const success = await onMoveUpdate(sourceId, targetParentId);
            if (!success) {
                console.log('Move validation failed');
            }
        } catch (error) {
            console.error('Failed to move item:', error);
        }
    };

    const renderTreeNode = (nodeId: string, depth: number = 0) => {
        const node = processedItems[nodeId];
        if (!node) return null;

        const children = Object.values(processedItems)
            .filter(item => item.parent_id === nodeId);
        const hasChildren = children.length > 0;
        const isExpanded = expanded.has(nodeId);
        const isEditing = editingNodeId === nodeId;
        const isDragging = draggedId === nodeId;
        const isDropTarget = dropTarget === nodeId;
        const isValidDropTarget = draggedId && draggedId !== nodeId && !isDescendant(nodeId, draggedId);

        return (
            <div 
                key={nodeId} 
                className={`tree-node-wrapper 
                    ${isDragging ? 'dragging' : ''} 
                    ${isDropTarget && isValidDropTarget ? `drop-target drop-${dropPosition}` : ''}`}
                >
                <div
                    className={`tree-node ${selectedIds.includes(nodeId) ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${isEditing ? 'editing' : ''}`}
                    style={{ paddingLeft: `${depth * 24}px` }}
                    draggable={!disabled && !isEditing}
                    onClick={(e) => handleClick(e, nodeId)}
                    onDoubleClick={(e) => handleDoubleClick(e, nodeId, node.label)}
                    onDragStart={(e) => handleDragStart(e, nodeId)}
                    onDragOver={(e) => handleDragOver(e, nodeId)}
                    onDragLeave={handleDragLeave}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, nodeId)}
                >
                    {hasChildren && (
                        <span
                            className={`tree-toggle ${isExpanded ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
                            onClick={(e) => {
                                if (!disabled) {
                                    e.stopPropagation();
                                    toggleExpand(nodeId);
                                }
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </span>
                    )}
                    {isEditing ? (
                        <input
                            type="text"
                            value={editingLabel}
                            onChange={handleLabelChange}
                            onKeyDown={handleKeyDown}
                            onBlur={async () => await handleLabelSubmit(nodeId)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            className="tree-label-input"
                        />
                    ) : (
                        <span className="tree-label">{node.label}</span>
                    )}
                </div>
                {hasChildren && isExpanded && (
                    <div className="tree-children">
                        {children.map(child => renderTreeNode(child.id!, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    // Get root nodes (nodes with no parent)
    const rootNodes = Object.values(processedItems)
        .filter(item => !item.parent_id)
        .map(item => item.id!);

    return (
        <div className="tree-browser">
            <div className="tree-root">
                {rootNodes.map(nodeId => renderTreeNode(nodeId))}
            </div>
        </div>
    );
} 