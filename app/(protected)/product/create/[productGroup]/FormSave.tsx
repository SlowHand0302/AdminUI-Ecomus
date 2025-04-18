import { useForm, useFieldArray, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for sizes and colors (replace with API calls if available)
const mockSizes = [
    { id: 1, size: 'S' },
    { id: 2, size: 'M' },
    { id: 3, size: 'L' },
];
const mockColors = [
    { id: 1, color: 'Red', rgb: '#FF0000' },
    { id: 2, color: 'Blue', rgb: '#0000FF' },
    { id: 3, color: 'Green', rgb: '#00FF00' },
];

const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
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
                imageUrl: z.string().url({ message: 'Must be a valid URL.' }),
                isPrimary: z.boolean(),
                displayOrder: z.number().min(0, { message: 'Display order must be positive.' }),
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

export default function ProductForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            gender: '',
            currency: 'USD',
            stock: 0,
            categoryId: 0,
            brandId: 0,
            productImages: [{ imageUrl: '', isPrimary: false, displayOrder: 0 }],
            variants: [{ sizeId: 0, colorId: 0, stock: 0 }],
        },
    });

    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage,
    } = useFieldArray({
        control: form.control,
        name: 'productImages',
    });

    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant,
    } = useFieldArray({
        control: form.control,
        name: 'variants',
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle form submission (e.g., send to API)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <main className='flex gap-3'>
                    <section className='basis-1/2'>    
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'name'> }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter the product name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'description'> }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Product description" {...field} />
                                    </FormControl>
                                    <FormDescription>Provide a detailed description (optional).</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex gap-5'>
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'price'> }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the price in the selected currency.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'currency'> }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="USD">USD</SelectItem>
                                                    <SelectItem value="EUR">EUR</SelectItem>
                                                    <SelectItem value="GBP">GBP</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>Select the currency for the price.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex gap-5'>
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'stock'> }) => (
                                    <FormItem className='basis-1/2'>
                                        <FormLabel>Total Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Stock"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the total stock available.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'gender'> }) => (
                                    <FormItem className='basis-1/2'>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue className='min-w-full' placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Men">Men</SelectItem>
                                                    <SelectItem value="Women">Women</SelectItem>
                                                    <SelectItem value="Unisex">Unisex</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>Target gender (optional).</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex gap-5'>
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'categoryId'> }) => (
                                    <FormItem className='basis-1/2'>
                                        <FormLabel>Category ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Category ID"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the category ID.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brandId"
                                render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, 'brandId'> }) => (
                                    <FormItem className='basis-1/2'>
                                        <FormLabel>Brand ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Brand ID"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the brand ID.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>
                    <section className='basis-1/2'>
                        <div>
                            <h3 className="text-lg font-medium">Product Images</h3>
                            {imageFields.map((field, index) => (
                                <div key={field.id} className="space-y-4 border p-4 rounded-md">
                                    <FormField
                                        control={form.control}
                                        name={`productImages.${index}.imageUrl`}
                                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `productImages.${typeof index}.imageUrl`> }) => (
                                            <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`productImages.${index}.isPrimary`}
                                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `productImages.${typeof index}.isPrimary`> }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <FormLabel className="font-normal">Is Primary Image</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`productImages.${index}.displayOrder`}
                                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `productImages.${typeof index}.displayOrder`> }) => (
                                            <FormItem>
                                                <FormLabel>Display Order</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeImage(index)}
                                        disabled={imageFields.length === 1}
                                    >
                                        Remove Image
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => appendImage({ imageUrl: '', isPrimary: false, displayOrder: 0 })}
                                className="mt-4"
                            >
                                Add Image
                            </Button>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Product Variants</h3>
                            {variantFields.map((field, index) => (
                                <div key={field.id} className="space-y-4 border p-4 rounded-md">
                                    <div className='flex'>
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.sizeId`}
                                            render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `variants.${typeof index}.sizeId`> }) => (
                                                <FormItem className='basis-1/2'>
                                                    <FormLabel>Size</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(parseInt(value))}
                                                            defaultValue={field.value?.toString()}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {mockSizes.map((size) => (
                                                                    <SelectItem key={size.id} value={size.id.toString()}>
                                                                        {size.size}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`variants.${index}.colorId`}
                                            render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `variants.${typeof index}.colorId`> }) => (
                                                <FormItem className='basis-1/2'>
                                                    <FormLabel>Color</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(parseInt(value))}
                                                            defaultValue={field.value?.toString()}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select color" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {mockColors.map((color) => (
                                                                    <SelectItem key={color.id} value={color.id.toString()}>
                                                                        {color.color}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`variants.${index}.stock`}
                                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof formSchema>, `variants.${typeof index}.stock`> }) => (
                                            <FormItem>
                                                <FormLabel>Variant Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeVariant(index)}
                                        disabled={variantFields.length === 1}
                                    >
                                        Remove Variant
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => appendVariant({ sizeId: 0, colorId: 0, stock: 0 })}
                                className="mt-4"
                            >
                                Add Variant
                            </Button>
                        </div>
                    </section>
                </main>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
