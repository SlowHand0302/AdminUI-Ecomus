import { z } from "zod";

export const BrandFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    description: z.string().optional(),
});

export type BrandFormValues = z.infer<typeof BrandFormSchema>;