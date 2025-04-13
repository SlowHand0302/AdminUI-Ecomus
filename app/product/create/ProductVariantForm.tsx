import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormType } from '@/constants/form.constant';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ProductVariantFormData, productVariantSchema } from '@/validations/productVariant.validation';

interface ProductVariantFormProps {
    type: FormType;
    open: boolean;
    onClose: () => void;
}

export default function ProductVariantForm({ type, open, onClose }: ProductVariantFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm<ProductVariantFormData>({
        resolver: zodResolver(productVariantSchema),
        defaultValues: {
            color: '',
            size: '',
            stock: 1,
        },
    });

    const onSubmit = (data: ProductVariantFormData) => {
        console.log('Product Variant:', data);
        reset();
        onClose();
    };

    console.log(watch());
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{type} ProductVariant</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="gr gap-4 space-y-2">
                    <div className="space-y-2">
                        <Label>Size:</Label>
                        <Controller
                            control={control}
                            name="size"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sizes</SelectLabel>
                                            <SelectItem value="S">S</SelectItem>
                                            <SelectItem value="M">M</SelectItem>
                                            <SelectItem value="L">L</SelectItem>
                                            <SelectItem value="XL">XL</SelectItem>
                                            <SelectItem value="XXL">XXL</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.size && <p className="text-sm text-red-500">{errors.size.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Color </Label>
                        <Controller
                            control={control}
                            name="color"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sizes</SelectLabel>
                                            <SelectItem value="Red">Red</SelectItem>
                                            <SelectItem value="Blue">Blue</SelectItem>
                                            <SelectItem value="Green">Green</SelectItem>
                                            <SelectItem value="Yellow">Yellow</SelectItem>
                                            <SelectItem value="Black">Black</SelectItem>
                                            <SelectItem value="White">White</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" {...register('stock', { valueAsNumber: true })} placeholder="0" />
                        {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                    </div>

                    <Button type="submit">Save Variant</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
