'use client';
import React from 'react';
import DataGridView from './DataGridView';
import { mockProducts } from '@/mockups/product.mockup';

const page = () => {
    return (
        <main className="p-3">
            <DataGridView products={mockProducts} />
        </main>
    );
};

export default page;
