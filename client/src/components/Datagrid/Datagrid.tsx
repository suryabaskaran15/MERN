import type React from "react";
import { type ReactNode, useMemo } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type RowData,
    type PaginationState,
    type HeaderContext,
} from "@tanstack/react-table";

export interface SimpleColumn<T> {
    key: keyof T;
    id?: string;
    header: string | ((info: HeaderContext<T, unknown>) => ReactNode);
    cell?: (value: T[keyof T], row: T) => ReactNode;
}

type TableProps<T extends RowData> = {
    noResults: string;
    data: T[];
    simpleColumns: SimpleColumn<T>[];
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    pageCount: number;
    isLoading?: boolean;
};

export default function DatagridV2<T extends RowData>({
    noResults,
    data,
    simpleColumns,
    pagination,
    pageCount,
    setPagination,
    isLoading = false,
}: TableProps<T>) {
    interface CustomColumnProperties<T> {
        filterOptions?: Array<{ value: string; label: string }>;
    }

    type ExtendedColumnDef<T> = ColumnDef<T> & CustomColumnProperties<T>;

    const columns: ExtendedColumnDef<T>[] = useMemo(
        () =>
            simpleColumns.map((col) => ({
                accessorKey: col.key as keyof T,
                header: typeof col.header === "string" ? col.header : (info) => (col.header as (info: HeaderContext<T, unknown>) => ReactNode)(info),
                cell: col.cell ? (info) => col.cell?.(info.getValue() as T[keyof T], info.row.original) : (info) => info.getValue(),
            })),
        [simpleColumns],
    );

    const table = useReactTable({
        data: data,
        pageCount: pageCount,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered datagrifd2Table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th className="datagrifd2Table-headerCell" key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {isLoading ? (
                        <tbody className="datagrifd2Table-body">
                            <tr>
                                <td colSpan={table.getVisibleFlatColumns().length}>
                                    Loading....
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="datagrifd2Table-body">
                            {table.getRowModel().rows.map((row) => (
                                <tr className="datagrifd2Table-row" key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td className="datagrifd2Table-cell" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            {!isLoading && data.length === 0 && <div className="datagrifd2Table-noData">{noResults}</div>}
            {table.getPageCount() > 1 && (
                <div className="d-flex align-items-center justify-content-between mt-3 tablePageControls-container">
                    <div className="d-flex">
                        <div
                            className="tablePageControls-goToStartEnd"
                            onClick={() => {
                                if (table.getCanPreviousPage()) table.firstPage();
                            }}
                        >
                            <span className="icon-new icon-chevron-left-grey icon-blue icon-24" />
                            <span className="icon-new icon-chevron-left-grey icon-blue icon-24" />
                        </div>
                        <div
                            className="tablePageControls-prevNext"
                            onClick={() => {
                                if (table.getCanPreviousPage()) table.previousPage();
                            }}
                        >
                            <span className="icon-new icon-chevron-left-grey icon-blue icon-24" />
                        </div>
                    </div>
                    <div className="tablePageControls-count">{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</div>
                    <div className="d-flex">
                        <div
                            className="tablePageControls-prevNext"
                            onClick={() => {
                                if (table.getCanNextPage()) table.nextPage();
                            }}
                        >
                            <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                        </div>
                        <div
                            className="tablePageControls-goToStartEnd"
                            onClick={() => {
                                if (table.getCanNextPage()) table.lastPage();
                            }}
                        >
                            <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                            <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                        </div>
                    </div>
                    <div className="tablePageControls-goTo">
                        <input
                            className="form-control tablePageControls-input"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            type="number"
                            min={1}
                            max={table.getPageCount()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
