import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    VisibilityState,
    ColumnFiltersState,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    Table,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/DataGridView/DataTable';
import { DataTablePagination } from '@/components/DataGridView/DataTablePagination';
import { DataTableViewOptions } from '@/components/DataGridView/DataTableViewOptions';
import { IoCloseOutline } from 'react-icons/io5';
import { useProductColumns } from './ProductTableColDef';
import { Product } from '@/models/product.model';
import Link from 'next/link';

interface DataViewProps {
    products: Product[];
}

const DataView = ({ products }: DataViewProps) => {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const columns = useProductColumns();

    const table = useReactTable({
        data: products,
        columns,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // for columns sorting
        getFilteredRowModel: getFilteredRowModel(), // for columns filtering
        getPaginationRowModel: getPaginationRowModel(), // for table pagination
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting, must have this model to implement 2 funcs below
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        // getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        state: {
            sorting,
            rowSelection,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <section className="w-full space-y-2">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Filter Product Name..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm h-8"
                />
                <Button variant="outline" asChild>
                    <Link href={'/product/create'}>Create New</Link>
                </Button>
                {columnFilters.length > 0 || Object.keys(columnVisibility).length > 0 ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden capitalize lg:flex"
                        onClick={() => {
                            table.resetColumnFilters(true);
                            table.resetColumnVisibility(true);
                        }}
                    >
                        <IoCloseOutline />
                        Reset
                    </Button>
                ) : null}
                <div className="ml-auto">
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <DataTable table={table} stickyHeader={true} />
            <DataTablePagination table={table} pageSizes={[10, 20, 30, 40, 50]} />
        </section>
    );
};

export default DataView;
