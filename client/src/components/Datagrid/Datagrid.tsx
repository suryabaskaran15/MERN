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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Input } from "../ui/input";

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
    interface CustomColumnProperties {
        filterOptions?: Array<{ value: string; label: string }>;
    }

    type ExtendedColumnDef<T> = ColumnDef<T> & CustomColumnProperties;

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
                <Table className="table table-striped table-bordered datagrifd2Table">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead className="datagrifd2Table-headerCell" key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    {isLoading ? (
                        <TableBody className="datagrifd2Table-body">
                            <tr>
                                <td colSpan={table.getVisibleFlatColumns().length}>
                                    Loading....
                                </td>
                            </tr>
                        </TableBody>
                    ) : (
                        <TableBody className="datagrifd2Table-body">
                            {table.getRowModel().rows.map((row) => (
                                <TableRow className="datagrifd2Table-row" key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="datagrifd2Table-cell" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
            {!isLoading && data.length === 0 && <div className="datagrifd2Table-noData">{noResults}</div>}
            {table.getPageCount() > 1 && (
                <Pagination className="d-flex align-items-center justify-content-between mt-3 tablePageControls-container">
                    <PaginationContent>
                        <PaginationItem className="d-flex">
                            <div
                                className="tablePageControls-goToStartEnd"
                                onClick={() => {
                                    if (table.getCanPreviousPage()) table.firstPage();
                                }}
                            >
                                <span className="icon-new icon-chevron-left-grey icon-blue icon-24" />
                                <span className="icon-new icon-chevron-left-grey icon-blue icon-24" />
                            </div>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => {
                                if (table.getCanPreviousPage()) table.previousPage();
                            }} />
                        </PaginationItem>
                        <PaginationItem className="tablePageControls-count">{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</PaginationItem>
                        <PaginationItem className="d-flex">
                            <PaginationNext
                                className="tablePageControls-prevNext"
                                onClick={() => {
                                    if (table.getCanNextPage()) table.nextPage();
                                }}
                            >
                                <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                            </PaginationNext>
                            <PaginationItem
                                className="tablePageControls-goToStartEnd"
                                onClick={() => {
                                    if (table.getCanNextPage()) table.lastPage();
                                }}
                            >
                                <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                                <span className="icon-new icon-chevron-right-grey icon-blue icon-24" />
                            </PaginationItem>
                        </PaginationItem>
                        <div className="tablePageControls-goTo">
                            <Input
                                className="form-control tablePageControls-input"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                type="number"
                                min={1}
                                max={table.getPageCount()}
                            />
                        </div>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
