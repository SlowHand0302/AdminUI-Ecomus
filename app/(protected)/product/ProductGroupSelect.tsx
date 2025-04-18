import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductGroup } from '@/constants/productGroup.constant';
import Link from 'next/link';

export const ProductGroupSelect = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden lg:flex">
                    Create
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.entries(ProductGroup).map(([key]) => (
                    <DropdownMenuItem asChild key={key}>
                        <Link href={`/product/create/${key.toLowerCase()}`}>
                            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
