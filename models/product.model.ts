import { ProductImage } from "./productImage.model";
import { ProductVariant } from "./productVariant.model";

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;

    gender: string;
    currency: string; // Default in C# was "USD", here you should set it when creating the object
    stock: number;

    categoryId: number;
    brandId: number;

    variants: ProductVariant[];
    productImages: ProductImage[];
}