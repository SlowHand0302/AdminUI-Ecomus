import { Product } from '../models/product.model';

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Classic White T-Shirt',
        description: 'A timeless classic for everyday wear.',
        price: 19.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 120,
        categoryId: 1,
        brandId: 1,
        variants: [
            {
                id: 1,
                productId: 1,
                sizeId: 1,
                size: { id: 1, size: 'M', productGroupId: 1 },
                colorId: 1,
                color: { id: 1, color: 'White', rgb: '#FFFFFF' },
                stock: 50,
            },
            {
                id: 2,
                productId: 1,
                sizeId: 2,
                size: { id: 2, size: 'L', productGroupId: 1 },
                colorId: 1,
                color: { id: 1, color: 'White', rgb: '#FFFFFF' },
                stock: 70,
            },
        ],
        productImages: [
            {
                id: 1,
                productId: 1,
                imageUrl: 'https://via.placeholder.com/400x400.png?text=White+T-Shirt',
                isPrimary: true,
                displayOrder: 1,
            },
        ],
    },
    {
        id: 2,
        name: 'Denim Jeans',
        description: 'Comfortable straight fit denim jeans.',
        price: 49.99,
        gender: 'Men',
        currency: 'USD',
        stock: 200,
        categoryId: 1,
        brandId: 2,
        variants: [
            {
                id: 3,
                productId: 2,
                sizeId: 3,
                size: { id: 3, size: '32', productGroupId: 1 },
                colorId: 2,
                color: { id: 2, color: 'Blue', rgb: '#0000FF' },
                stock: 80,
            },
        ],
        productImages: [
            {
                id: 2,
                productId: 2,
                imageUrl: 'https://via.placeholder.com/400x400.png?text=Denim+Jeans',
                isPrimary: true,
                displayOrder: 1,
            },
        ],
    },
    {
        id: 3,
        name: 'Running Sneakers',
        description: 'Designed for comfort and durability.',
        price: 89.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 75,
        categoryId: 2,
        brandId: 3,
        variants: [
            {
                id: 4,
                productId: 3,
                sizeId: 4,
                size: { id: 4, size: '9', productGroupId: 2 },
                colorId: 3,
                color: { id: 3, color: 'Black', rgb: '#000000' },
                stock: 35,
            },
        ],
        productImages: [
            {
                id: 3,
                productId: 3,
                imageUrl: 'https://via.placeholder.com/400x400.png?text=Running+Sneakers',
                isPrimary: true,
                displayOrder: 1,
            },
        ],
    },
    {
        id: 4,
        name: 'Leather Jacket',
        description: 'Stylish and warm leather jacket.',
        price: 149.99,
        gender: 'Men',
        currency: 'USD',
        stock: 30,
        categoryId: 4,
        brandId: 4,
        variants: [],
        productImages: [],
    },
    {
        id: 5,
        name: 'Summer Dress',
        description: 'Lightweight dress perfect for summer days.',
        price: 59.99,
        gender: 'Women',
        currency: 'USD',
        stock: 45,
        categoryId: 1,
        brandId: 5,
        variants: [],
        productImages: [],
    },
    {
        id: 6,
        name: 'Formal Suit',
        description: 'Elegant formal suit for events.',
        price: 199.99,
        gender: 'Men',
        currency: 'USD',
        stock: 12,
        categoryId: 4,
        brandId: 6,
        variants: [],
        productImages: [],
    },
    {
        id: 7,
        name: 'Sports Shorts',
        description: 'Breathable shorts ideal for exercise.',
        price: 24.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 80,
        categoryId: 5,
        brandId: 7,
        variants: [],
        productImages: [],
    },
    {
        id: 8,
        name: 'Woolen Scarf',
        description: 'Soft and warm scarf for winter.',
        price: 29.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 60,
        categoryId: 4,
        brandId: 8,
        variants: [],
        productImages: [],
    },
    {
        id: 9,
        name: 'Casual Sneakers',
        description: 'Classic casual wear sneakers.',
        price: 64.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 50,
        categoryId: 2,
        brandId: 9,
        variants: [],
        productImages: [],
    },
    {
        id: 10,
        name: 'Graphic Tee',
        description: 'Trendy printed graphic T-shirt.',
        price: 25.99,
        gender: 'Unisex',
        currency: 'USD',
        stock: 100,
        categoryId: 1,
        brandId: 10,
        variants: [],
        productImages: [],
    },
];
