'use client';
import { Brand } from '@/models/brand.model';
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnDef,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { columnsBuilder } from './BrandTableColDef';
import { DataTable } from '@/components/DataGridView/DataTable';
import { DataTablePagination } from '@/components/DataGridView/DataTablePagination';
import { DataTableViewOptions } from '@/components/DataGridView/DataTableViewOptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface DataViewProps {
    brands: Brand[];
    handleEditBrand: (brand: Brand) => void;
    openModal: () => void
}

const DataGridView = ({ brands, handleEditBrand,openModal }: DataViewProps) => {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const builder: ColumnDef<Brand>[] = columnsBuilder(handleEditBrand);

    const table = useReactTable({
        data: brands,
        columns: builder,
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
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        state: {
            sorting,
            rowSelection,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <>
            <section className="w-full space-y-2">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Filter Brand Name..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                        className="max-w-sm h-8"
                    />
                    <Button variant="outline" onClick={openModal}>
                        Create New
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
                            <X />
                            Reset
                        </Button>
                    ) : null}
                    <div className="ml-auto">
                        <DataTableViewOptions table={table} />
                    </div>
                </div>
                <DataTable table={table} stickyHeader={true} />
                <DataTablePagination table={table} pageSizes={[5, 10, 15, 20, 30]} />
            </section>
        </>
    );
};

export default DataGridView;
