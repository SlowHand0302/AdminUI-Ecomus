import { Button } from '@/components/ui/button';
import { FormType } from '@/constants/form.constant';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFieldArrayAppend } from 'react-hook-form';
import { ProductImageFormSchema, ProductImageFormValues } from '@/entities/FormFile.schema';
import { FormProductValues } from '@/entities/FormProduct.schema';

interface ProductImageFormProps {
    type: FormType;
    open: boolean;
    onClose: () => void;
    onSubmit: UseFieldArrayAppend<FormProductValues, 'productImages'>;
}

export default function ProductImageForm({ type, open, onClose, onSubmit: handleAppend }: ProductImageFormProps) {
    const form = useForm<ProductImageFormValues>({
        resolver: zodResolver(ProductImageFormSchema),
        defaultValues: {
            picture: undefined,
        },
    });

    const onSubmit = (data: ProductImageFormValues) => {
        handleAppend({ file: data.picture });
        form.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{type} ProductVariant</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="picture"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <FormLabel>Picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            placeholder="Picture"
                                            type="file"
                                            accept="image/*, application/pdf"
                                            onChange={(event) => onChange(event.target.files && event.target.files[0])}
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
