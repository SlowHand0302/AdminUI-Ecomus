import { z } from 'zod';

// 1️⃣ Define schema based on your interface
export const productImageSchema = z.object({
    isPrimary: z.boolean(),
    displayOrder: z.number().int().min(0, 'Display order must be 0 or higher'),
});

// 2️⃣ Infer type
export type ProductImageFormData = z.infer<typeof productImageSchema>;
