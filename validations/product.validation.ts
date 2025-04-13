import * as z from 'zod';

// 1️⃣ Define Zod schema based on your Product model
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be a positive number'),
    gender: z.enum(['Male', 'Female', 'Unisex']).optional(),
    currency: z.string().min(1, 'Currency is required'),
    stock: z.number().int().min(0, 'Stock must be 0 or more'),
    categoryId: z.number().int().min(1, 'Category is required'),
    brandId: z.number().int().min(1, 'Brand is required'),
});

// 2️⃣ Infer the type from schema
export type ProductFormData = z.infer<typeof productSchema>;
