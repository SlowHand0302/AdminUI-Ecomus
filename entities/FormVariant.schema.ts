import { z } from 'zod';

export const FormVariantSchema = z.object({
    size: z.string({
        required_error: 'Please select an size',
    }),
    color: z.string({
        required_error: 'Please select an color',
    }),
    stock: z.number().min(1, { message: 'Stock must be larger than 0' }),
});

export type FormVariantValues = z.infer<typeof FormVariantSchema>;
