import { ProductColor } from './productColor.model';
import { ProductSize } from './productSize.model';

export interface ProductVariant {
    id: number;
    productId: number;
    sizeId: number;
    size: ProductSize;
    colorId: number;
    color: ProductColor;
    stock: number;
}
