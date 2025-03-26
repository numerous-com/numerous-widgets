import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Table } from "../ui/Table";
import '../../css/styles.scss';

function TableWidget() {
    const [data] = useModelState<any[]>("data");
    const [columns] = useModelState<any[]>("columns");
    const [pageSize] = useModelState<number>("page_size");
    const [className] = useModelState<string>("class_name");
    const [selectedRows, setSelectedRows] = useModelState<number[]>("selected_rows");

    // Add filtering configuration to the columns
    const columnsWithFilters = React.useMemo(() => {
        return columns.map(column => ({
            ...column,
            enableColumnFilter: true,
            filterFn: 'exact',
        }));
    }, [columns]);

    return (
        <Table
            data={data}
            columns={columnsWithFilters}
            pageSize={pageSize}
            className={className}
            onSelectionChange={setSelectedRows}
        />
    );
}

export default {
    render: createRender(TableWidget)
} 