'use client';
import React, { useEffect, useState } from 'react';
import DataGridView from './DataGridView';
import { mockCategories } from '@/mockups/category.mockup';
import { Category } from '@/models/category.model';
import { FormType } from '@/constants/form.constant';
import { CategoryModalForm } from './CategoryModalForm';

const page = () => {
    const [formType, setFormType] = useState<FormType>(FormType.CREATE);
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const handleEditCategory = (brand: Category) => {
        console.log(brand);
        setFormType(FormType.EDIT);
        setOpenModal(true);
    };

    const handleCreateCategory = () => {
        setFormType(FormType.CREATE);
        setOpenModal(true);
    };
    useEffect(() => {
        setCategories(categories);
    }, []);
    return (
        <main className="p-3">
            {categories && (
                <DataGridView
                    categories={categories}
                    handleEditCategory={handleEditCategory}
                    openModal={handleCreateCategory}
                />
            )}
            <CategoryModalForm type={formType} open={openModal} onClose={() => setOpenModal(!openModal)}></CategoryModalForm>
        </main>
    );
};

export default page;
