'use client';
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductVariantForm from './ProductVariantForm';
import ProductImageForm from './ProductImageForm';
import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2Icon, Edit2 } from 'lucide-react';
import { FormType } from '@/constants/form.constant';

const page = () => {
    const [formType, setFormType] = useState<FormType>(FormType.CREATE);
    const [openModalVariants, setOpenModalVariants] = useState(false);

    return (
        <>
            <main className="p-3 flex gap-3">
                <section className="basis-1/2">
                    <ProductForm />
                </section>
                <section className="basis-1/2">
                    <Card>
                        <CardHeader className="flex gap-3 items-center justify-between">
                            <CardTitle>Variants</CardTitle>
                            <Button variant="outline" onClick={() => setOpenModalVariants(true)}>
                                Create New
                            </Button>
                        </CardHeader>
                        <CardContent>
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
                                    <TableRow>
                                        <TableCell className="font-medium">{'md'}</TableCell>
                                        <TableCell>{'red'}</TableCell>
                                        <TableCell className="text-right">{1}</TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Button variant="outline" size={"icon"} onClick={() => setOpenModalVariants(true)}>
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button variant="outline" size={"icon"}>
                                                <Trash2Icon size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>
            </main>
            <ProductVariantForm type={formType} open={openModalVariants} onClose={() => setOpenModalVariants(false)} />
        </>
    );
};

export default page;
