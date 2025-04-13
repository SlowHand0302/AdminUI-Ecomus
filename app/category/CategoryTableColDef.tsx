import { Category } from '@/models/category.model';
import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal, Copy, PackageSearch, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const columns = (onEdit: (category: Category) => void): ColumnDef<Category>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center gap-1 group cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Task
                    <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                        <ArrowUpDown size={16} />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center gap-1 group cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <div className="px-1.5 py-1 group-hover:bg-slate-200 group-hover:text-black rounded-lg">
                        <ArrowUpDown size={16} />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.name}</div>;
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return <div className="flex items-center gap-1 group cursor-pointer">Description</div>;
        },
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.description}</div>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original;
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id.toString())}>
                            <Copy />
                            Copy task ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <PackageSearch />
                            View task details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(category)}>
                            <PackageOpen size={16} />
                            Edit task details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
