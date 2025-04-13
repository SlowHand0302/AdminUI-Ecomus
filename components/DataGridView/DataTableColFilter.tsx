'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import { Column, Table } from '@tanstack/react-table';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TbFilterPlus, TbFilterMinus, TbFilterCheck, TbFilterX, TbFilterCancel } from 'react-icons/tb';

interface DataTableColFilterProps<TData> {
    column: Column<TData, unknown> | undefined;
    variant: 'range' | 'single' | 'multiple';
}

export function DataTableColFilter<TData>({ column, variant }: DataTableColFilterProps<TData>) {
    const [radioState, setRadioState] = useState('');
    const [multipleState, setMultipleState] = useState<string[]>([]);
    const columnFilterValue = column?.getFilterValue();

    const sortedUniqueValues =
        column && variant !== 'range'
            ? useMemo(
                  () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
                  [column.getFacetedUniqueValues()],
              )
            : [];

    const handleSingleFilterOptionsChange = (value: string) => {
        setRadioState(value);
        column?.setFilterValue(value);
    };

    const handleOnMultipleFilterOptionsChange = (value: string, checked: boolean) => {
        if (checked) {
            setMultipleState((prev) => [...prev, value]);
            column?.setFilterValue((old: string[]) => {
                if (old) {
                    return [...old, value];
                }
                return [value];
            });
        } else {
            setMultipleState((prev) => prev.filter((item) => item !== value));
            column?.setFilterValue((old: string[]) => old?.filter((item) => item !== value));
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden capitalize lg:flex">
                    <TbFilterPlus />
                    {column?.id}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuLabel className="capitalize">{column?.id} Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {variant === 'single' && (
                    <SingleFilterCol
                        radioState={radioState}
                        onChange={handleSingleFilterOptionsChange}
                        content={sortedUniqueValues}
                    />
                )}
                {variant === 'multiple' && (
                    <MultipleFilterCol
                        multipleState={multipleState}
                        content={sortedUniqueValues}
                        onChange={handleOnMultipleFilterOptionsChange}
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface SingleFilterColProps {
    radioState: string;
    onChange: (value: string) => void;
    content: any[];
}

function SingleFilterCol({ radioState, onChange, content }: SingleFilterColProps) {
    return (
        <DropdownMenuRadioGroup value={radioState} onValueChange={onChange}>
            <DropdownMenuRadioItem defaultChecked value="" Icon={<Check size={16} />}>
                All
            </DropdownMenuRadioItem>
            {content?.map((value, index) => {
                return (
                    <DropdownMenuRadioItem className="capitalize" key={index} value={value} Icon={<Check size={16} />}>
                        {value}
                    </DropdownMenuRadioItem>
                );
            })}
        </DropdownMenuRadioGroup>
    );
}

interface MultipleFilterColProps {
    multipleState: string[];
    onChange: (value: string, checked: boolean) => void;
    content: any[];
}

function MultipleFilterCol({ content, multipleState, onChange }: MultipleFilterColProps) {
    return (
        <>
            {content?.map((value, index) => {
                return (
                    <DropdownMenuCheckboxItem
                        key={index}
                        checked={multipleState.includes(value)}
                        onCheckedChange={(checked) => onChange(value, checked)}
                    >
                        {value}
                    </DropdownMenuCheckboxItem>
                );
            })}
        </>
    );
}
