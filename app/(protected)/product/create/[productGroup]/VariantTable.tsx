'use client';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trash2Icon } from 'lucide-react';
import React from 'react';
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';
import { FormProductValues } from './page';

export interface VariantTableProps {
    fields: FieldArrayWithId<FormProductValues, 'variants', 'id'>[]; // Replace `any` with your form's type
    remove: UseFieldArrayRemove;
}

const VariantTable = ({ fields, remove }: VariantTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{field.sizeId}</TableCell>
                            <TableCell>{field.colorId}</TableCell>
                            <TableCell className="text-right">{1}</TableCell>
                            <TableCell className="flex justify-end gap-2">
                                {/* <Button variant="outline" size={'icon'}>
                                    <Edit2 size={16} />
                                </Button> */}
                                <Button variant="outline" size={'icon'} onClick={() => remove(index)}>
                                    <Trash2Icon size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default VariantTable;
