import { z } from "zod";

export const ProductImageFormSchema = z.object({
    picture: z
        .instanceof(File, { message: 'A file is required' })
        .refine((file) => file.type.startsWith('image/'), {
            message: 'File must be an image',
        })
        .refine((file) => file.size > 0, { message: 'File must not be empty' }),
});

export type ProductImageFormValues = z.infer<typeof ProductImageFormSchema>;