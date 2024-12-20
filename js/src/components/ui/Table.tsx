import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnResizeMode,
} from '@tanstack/react-table';

interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    pageSize: number;
    className?: string;
    onSelectionChange: (selectedIndexes: number[]) => void;
}

export function Table({
    data,
    columns,
    pageSize,
    className = "",
    onSelectionChange,
}: TableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
    const [columnResizeMode] = React.useState<ColumnResizeMode>('onChange');

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode,
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
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={header.column.getCanSort() ? 'sortable' : ''}
                                    style={{
                                        width: header.getSize(),
                                        position: 'relative',
                                    }}
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