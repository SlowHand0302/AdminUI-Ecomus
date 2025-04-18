// constants/product-group.ts

export enum ProductGroup {
    JEWELRY = '1',
    CLOTHING = '2',
    SHOES = '3',
}

export const ProductGroupSlugMap: Record<string, ProductGroup> = {
    jewelry: ProductGroup.JEWELRY,
    clothing: ProductGroup.CLOTHING,
    shoes: ProductGroup.SHOES,
};

