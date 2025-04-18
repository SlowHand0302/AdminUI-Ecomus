'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseFieldArrayAppend, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormType } from '@/constants/form.constant';
import { Input } from '@/components/ui/input';
import { FormVariantSchema, FormVariantValues } from '@/entities/FormVariant.schema';
import { FormProductValues } from '@/entities/FormProduct.schema';
interface ProductVariantsFormProps {
    type: FormType;
    open: boolean;
    onClose: () => void;
    onSubmit: UseFieldArrayAppend<FormProductValues, 'variants'>; // Replace `any` with your form's type
}

const mockSizes = [
    { id: 1, size: 'S' },
    { id: 2, size: 'M' },
    { id: 3, size: 'L' },
];
const mockColors = [
    { id: 1, color: 'Red', rgb: '#FF0000' },
    { id: 2, color: 'Blue', rgb: '#0000FF' },
    { id: 3, color: 'Green', rgb: '#00FF00' },
];

export default function ProductVariantsForm({ type = FormType.CREATE, open, onClose, onSubmit: handleAppend }: ProductVariantsFormProps) {
    const form = useForm<FormVariantValues>({
        resolver: zodResolver(FormVariantSchema),
        defaultValues: {
            stock: 0,
        },
    });

    function onSubmit(data: FormVariantValues) {
        const transformed = {
            stock: data.stock,
            sizeId: Number(data.size),
            colorId: Number(data.color),
        };
        handleAppend(transformed);
        form.reset()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{type} Category</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-full">
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {mockSizes.map((size) => (
                                                <SelectItem key={size.id} value={size.id.toString()}>
                                                    {size.size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {mockColors.map((color) => (
                                                <SelectItem key={color.id} value={color.id.toString()}>
                                                    {color.color}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
