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
}

export function TreeBrowser({
    items,
    selectedIds,
    selectionMode,
    onChange,
    disabled = false,
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

    const renderTreeNode = (nodeId: string, depth: number = 0) => {
        const node = processedItems[nodeId];
        if (!node) return null;

        const children = Object.values(processedItems)
            .filter(item => item.parent_id === nodeId);
        const hasChildren = children.length > 0;
        const isExpanded = expanded.has(nodeId);

        return (
            <div key={nodeId} style={{ paddingLeft: `${depth * 24}px` }}>
                <div
                    className={`tree-node ${selectedIds.includes(nodeId) ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => handleSelect(nodeId)}
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
                    <span className="tree-label">{node.label}</span>
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