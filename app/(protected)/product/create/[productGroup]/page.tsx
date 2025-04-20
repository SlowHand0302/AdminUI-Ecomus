'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import ImageList from './ImageList';
import VariantTable from './VariantTable';
import ProductImageForm from './ProductImageForm';
import { FormType } from '@/constants/form.constant';
import ProductVariantsForm from './ProductVariantForm';
import { FormProductValues, FormProductSchema } from '@/entities/FormProduct.schema';
import { ProductGroupSlugMap } from '@/constants/productGroup.constant';

const page = () => {
    const params = useParams<{ productGroup: string }>();
    const [productGroupID, setProductGroupID] = useState(ProductGroupSlugMap[params['productGroup']]);
    const [openModalVariants, setOpenModalVariants] = useState(false);
    const [openModalImage, setOpenModalImage] = useState(false);

    const form = useForm<FormProductValues>({
        resolver: zodResolver(FormProductSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            gender: '',
            currency: 'USD',
            stock: 0,
            categoryId: 0,
            brandId: 0,
            productImages: [],
            variants: [],
            material: '',
        },
    });

    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage,
    } = useFieldArray({
        control: form.control,
        name: 'productImages',
    });

    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant,
    } = useFieldArray({
        control: form.control,
        name: 'variants',
    });

    function onSubmitForm(values: FormProductValues) {
        console.log(values);
        // Handle form submission (e.g., send to API)
    }
    
    return (
        <>
            <main className="p-3 flex gap-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full space-y-3">
                        <main className="flex gap-3">
                            <section className="basis-1/2">
                                <Card>
                                    <CardHeader className="flex justify-between">
                                        <Link href={'/product'} className="text-lg font-medium flex gap-2 items-center">
                                            <ArrowLeft size={14} />
                                            Create New
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Product name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-5">
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Price"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(parseFloat(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="currency"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Currency</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select currency" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="USD">USD</SelectItem>
                                                                    <SelectItem value="EUR">EUR</SelectItem>
                                                                    <SelectItem value="GBP">GBP</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex gap-5">
                                            <FormField
                                                control={form.control}
                                                name="stock"
                                                render={({ field }) => (
                                                    <FormItem className="basis-1/2">
                                                        <FormLabel>Total Stock</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Stock"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(parseInt(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem className="basis-1/2">
                                                        <FormLabel>Gender</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue
                                                                        className="min-w-full"
                                                                        placeholder="Select gender"
                                                                    />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Men">Men</SelectItem>
                                                                    <SelectItem value="Women">Women</SelectItem>
                                                                    <SelectItem value="Unisex">Unisex</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex gap-5">
                                            <FormField
                                                control={form.control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <FormItem className="basis-1/2">
                                                        <FormLabel>Category ID</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Category ID"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(parseInt(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="brandId"
                                                render={({ field }) => (
                                                    <FormItem className="basis-1/2">
                                                        <FormLabel>Brand ID</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Brand ID"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(parseInt(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {productGroupID === '1' && (
                                            <FormField
                                                control={form.control}
                                                name="material"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Material</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Material" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Product description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </section>
                            <section className="basis-1/2 space-y-3">
                                <Card>
                                    <CardHeader className="flex gap-3 items-center justify-between">
                                        <h3 className="text-lg font-medium">Product Images</h3>
                                        <Button type="button" variant="outline" onClick={() => setOpenModalImage(true)}>
                                            <Plus size={16} />
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <ImageList fields={imageFields} remove={removeImage} />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex gap-3 items-center justify-between">
                                        <h3 className="text-lg font-medium">Product Variants</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpenModalVariants(true)}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <VariantTable fields={variantFields} remove={removeVariant} />
                                    </CardContent>
                                </Card>
                            </section>
                        </main>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </main>
            <ProductVariantsForm
                type={FormType.CREATE}
                onSubmit={appendVariant}
                open={openModalVariants}
                onClose={() => setOpenModalVariants(false)}
            />
            <ProductImageForm
                type={FormType.CREATE}
                open={openModalImage}
                onClose={() => setOpenModalImage(false)}
                onSubmit={appendImage}
            />
        </>
    );
};

export default page;
