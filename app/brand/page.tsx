'use client';
import React, { useEffect, useState } from 'react';
import DataGridView from './DataGridView';
import { mockups } from '@/mockups/brand.mockup';
import { Brand } from '@/models/brand.model';
import { FormType } from '@/constants/form.constant';
import { BrandModalForm } from './BrandModalForm';

const page = () => {
    const [openModal, setOpenModal] = useState(false);
    const [brands, setBrands] = useState<Brand[]>(mockups);
    const [formType, setFormType] = useState<FormType>(FormType.CREATE);

    const handleEditBrand = (brand: Brand) => {
        console.log(brand);
        setFormType(FormType.EDIT);
        setOpenModal(true);
    };

    const handleCreateBrand = () => {
        setFormType(FormType.CREATE);
        setOpenModal(true);
    };

    useEffect(() => {
        setBrands(brands);
    }, []);
    return (
        <main className="p-3">
            {brands && <DataGridView brands={brands} handleEditBrand={handleEditBrand} openModal={handleCreateBrand} />}
            <BrandModalForm type={formType} open={openModal} onClose={() => setOpenModal(!openModal)}></BrandModalForm>
        </main>
    );
};

export default page;
