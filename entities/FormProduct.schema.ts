import { z } from 'zod';

export const FormProductSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    material: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0, { message: 'Price must be a positive number.' }),
    gender: z.string().refine((val) => !val || ['Men', 'Women', 'Unisex'].includes(val), {
        message: 'Gender must be Men, Women, or Unisex.',
    }),
    currency: z.string().refine((val) => ['USD', 'EUR', 'GBP'].includes(val), {
        message: 'Currency must be USD, EUR, or GBP.',
    }),
    stock: z.number().min(0, { message: 'Stock must be a positive number.' }),
    categoryId: z.number().min(1, { message: 'Category ID is required.' }),
    brandId: z.number().min(1, { message: 'Brand ID is required.' }),
    productImages: z
        .array(
            z.object({
                file: z
                    .instanceof(File, { message: 'A file is required' })
                    .refine((file) => file.type.startsWith('image/'), {
                        message: 'File must be an image',
                    })
                    .refine((file) => file.size > 0, {
                        message: 'File must not be empty',
                    }),
            }),
        )
        .min(1, { message: 'At least one image is required.' }),
    variants: z
        .array(
            z.object({
                sizeId: z.number().min(1, { message: 'Size is required.' }),
                colorId: z.number().min(1, { message: 'Color is required.' }),
                stock: z.number().min(0, { message: 'Stock must be a positive number.' }),
            }),
        )
        .min(1, { message: 'At least one variant is required.' }),
});

export type FormProductValues = z.infer<typeof FormProductSchema>;
