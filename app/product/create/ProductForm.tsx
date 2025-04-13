import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ProductFormData, productSchema } from '@/validations/product.validation';
import ProductImageForm from './ProductImageForm';
import { FormType } from '@/constants/form.constant';
import { useState } from 'react';
import { X, Plus, icons } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ProductForm() {
    const [formType, setFormType] = useState<FormType>(FormType.CREATE);
    const [openModal, setOpenModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            gender: 'Male',
            currency: 'USD',
            stock: 1,
            brandId: 0,
            categoryId: 0,
        },
    });

    const onSubmit = (data: ProductFormData) => {
        console.log('Product Data:', data);
    };

    const handleSelectImage = (selectedFile: File) => {
        setSelectedFiles((prevFiles) => [...prevFiles, selectedFile]);
        setOpenModal(!openModal);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input {...register('name')} placeholder="Enter product name" />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="flex gap-3">
                            <div className="basis-1/2 space-y-2">
                                <Label>Currency</Label>
                                <Input {...register('currency')} placeholder="USD" />
                                {errors.currency && <p className="text-sm text-red-500">{errors.currency.message}</p>}
                            </div>
                            <div className="basis-1/2 space-y-2">
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...register('price', { valueAsNumber: true })}
                                    placeholder="0.00"
                                />
                                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="basis-1/2 space-y-2">
                                <Label>Gender</Label>
                                <Select {...register('gender')}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
                            </div>
                            <div className="basis-1/2 space-y-2">
                                <Label>Stock</Label>
                                <Input type="number" {...register('stock', { valueAsNumber: true })} placeholder="0" />
                                {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="basis-1/2 space-y-2">
                                <Label>Category ID</Label>
                                <Input
                                    type="number"
                                    {...register('categoryId', { valueAsNumber: true })}
                                    placeholder="1"
                                />
                                {errors.categoryId && (
                                    <p className="text-sm text-red-500">{errors.categoryId.message}</p>
                                )}
                            </div>
                            <div className="basis-1/2 space-y-2">
                                <Label>Brand ID</Label>
                                <Input
                                    type="number"
                                    {...register('brandId', { valueAsNumber: true })}
                                    placeholder="1"
                                />
                                {errors.brandId && <p className="text-sm text-red-500">{errors.brandId.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input {...register('description')} placeholder="Enter description" />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <Label>Images</Label>
                                <Button variant="outline" onClick={() => setOpenModal(true)} size={'icon'}>
                                    <Plus />
                                </Button>
                            </div>
                            {selectedFiles.length > 0 && (
                                <ul className="mt-2 list-disc list-inside text-sm ">
                                    {selectedFiles.map((file) => (
                                        <li key={file.name} className="flex items-center justify-between">
                                            {file.name}
                                            <X size={13} className="cursor-pointer" />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Button type="submit">Save Product</Button>
                    </form>
                </CardContent>
            </Card>
            <ProductImageForm
                type={formType}
                open={openModal}
                onClose={() => setOpenModal(!openModal)}
                onSubmit={handleSelectImage}
            />
        </>
    );
}
