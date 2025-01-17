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
}

export function TreeBrowser({
    items,
    selectedIds,
    selectionMode,
    onChange,
    disabled = false,
    label_update,
    onLabelUpdate,
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

    const handleDoubleClick = (nodeId: string, label: string) => {
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

    const renderTreeNode = (nodeId: string, depth: number = 0) => {
        const node = processedItems[nodeId];
        if (!node) return null;

        const children = Object.values(processedItems)
            .filter(item => item.parent_id === nodeId);
        const hasChildren = children.length > 0;
        const isExpanded = expanded.has(nodeId);
        const isEditing = editingNodeId === nodeId;

        return (
            <div key={nodeId} style={{ paddingLeft: `${depth * 24}px` }}>
                <div
                    className={`tree-node ${selectedIds.includes(nodeId) ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${isEditing ? 'editing' : ''}`}
                    onClick={() => handleSelect(nodeId)}
                    onDoubleClick={() => handleDoubleClick(nodeId, node.label)}
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