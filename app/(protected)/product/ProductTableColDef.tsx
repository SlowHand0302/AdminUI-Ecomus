'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/models/product.model';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LuPackageSearch, LuPackageOpen, LuCopy } from 'react-icons/lu';
import { Checkbox } from '@/components/ui/checkbox';
import { useMemo } from 'react';

export const useProductColumns = () => {
    return useMemo<ColumnDef<Product, any>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'name',
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-1 group cursor-pointer"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Product Name
                            <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'gender',
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-1 group cursor-pointer"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Gender
                            <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'description',
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-1 group cursor-pointer"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Description
                            <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    );
                },
                cell: ({ row }) => {
                    return <div className="line-clamp-3">{row.getValue('description')}</div>;
                },
            },
            {
                accessorKey: 'price',
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-1 group cursor-pointer"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Price
                            <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const amount = parseFloat(row.getValue('price'));
                    const formatted = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(amount);

                    return <div className="font-medium">{formatted}</div>;
                },
            },
            {
                accessorKey: 'stock',
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-1 group cursor-pointer"
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Stock
                            <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                enableHiding: false,
                cell: ({ row }) => {
                    const products = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 ">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(products.name)}>
                                    <LuCopy />
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LuPackageSearch />
                                    View product details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LuPackageOpen />
                                    Edit product details
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );
};
