import { z } from 'zod';

// 1️⃣ Zod schema for ProductVariant (only the input part, not the related objects)
export const productVariantSchema = z.object({
    productId: z.number().int().min(1, 'Product is required'),
    size: z.string().min(1, 'Size is required'),
    color: z.string().min(1, 'Color is required'),
    stock: z.number().int().min(0, 'Stock cannot be negative'),
});

// 2️⃣ Type inference
export type ProductVariantFormData = z.infer<typeof productVariantSchema>;
