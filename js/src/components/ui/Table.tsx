import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnResizeMode,
    FilterFn,
    Column,
    ColumnFiltersState,
} from '@tanstack/react-table';

interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    pageSize: number;
    className?: string;
    onSelectionChange: (selectedIndexes: number[]) => void;
}

interface FilterDropdownProps {
    column: Column<any>;
    onClose: () => void;
}

function FilterDropdown({ column, onClose }: FilterDropdownProps) {
    const [filterValue, setFilterValue] = React.useState(column.getFilterValue() as string || '');
    const uniqueValues = React.useMemo(() => {
        const values = new Set<string>();
        column.getFacetedUniqueValues().forEach((count, value) => {
            values.add(String(value));
        });
        return Array.from(values).sort();
    }, [column.getFacetedUniqueValues()]);

    const handleFilterChange = (value: string) => {
        column.setFilterValue(value || undefined);
        setFilterValue(value);
    };

    return (
        <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="filter-dropdown-content">
                <select
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All values</option>
                    {uniqueValues.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export function Table({
    data,
    columns,
    pageSize,
    className = "",
    onSelectionChange,
}: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
    const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange');
    const [openFilterColumn, setOpenFilterColumn] = React.useState<string | null>(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        columnResizeMode,
        enableFilters: true,
        filterFns: {
            exact: (row, columnId, filterValue) => {
                const value = row.getValue(columnId);
                return value === filterValue;
            },
        },
    });

    React.useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize]);

    const toggleRowSelection = (index: number) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        setSelectedRows(newSelection);
        onSelectionChange(Array.from(newSelection));
    };

    // Close filter dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setOpenFilterColumn(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className={`table-container ${className}`}>
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            <th className="selection-cell">
                                <input
                                    type="checkbox"
                                    checked={table.getRowModel().rows.every(row => 
                                        selectedRows.has(row.index)
                                    )}
                                    onChange={(e) => {
                                        const newSelection = new Set<number>();
                                        if (e.target.checked) {
                                            table.getRowModel().rows.forEach(row => 
                                                newSelection.add(row.index)
                                            );
                                        }
                                        setSelectedRows(newSelection);
                                        onSelectionChange(Array.from(newSelection));
                                    }}
                                />
                            </th>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    style={{
                                        width: header.getSize(),
                                        position: 'relative',
                                    }}
                                >
                                    <div className="header-content">
                                        <div
                                            className={header.column.getCanSort() ? 'sortable' : ''}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && (
                                                <span className="sort-indicator">
                                                    {header.column.getIsSorted() === 'asc' ? ' ↑' : 
                                                     header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↕'}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className={`filter-button ${header.column.getFilterValue() ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenFilterColumn(openFilterColumn === header.id ? null : header.id);
                                            }}
                                        >
                                            ⚟
                                        </button>
                                        {openFilterColumn === header.id && (
                                            <FilterDropdown
                                                column={header.column}
                                                onClose={() => setOpenFilterColumn(null)}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="resizer"
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr 
                            key={row.id}
                            className={selectedRows.has(row.index) ? 'selected' : ''}
                        >
                            <td className="selection-cell">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.has(row.index)}
                                    onChange={() => toggleRowSelection(row.index)}
                                />
                            </td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
} 