import React from 'react';
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';
import { FormProductValues } from './page';
import { X } from 'lucide-react';

export interface ImageListProps {
    fields: FieldArrayWithId<FormProductValues, 'productImages', 'id'>[]; // Replace `any` with your form's type
    remove: UseFieldArrayRemove;
}

const ImageList = ({ fields, remove }: ImageListProps) => {
    return (
        fields.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm space-y-2 ">
                {fields.map((item, index) => (
                    <li key={item.file.name} className="flex items-center justify-between gap-2">
                        <p className="line-clamp-1">{item.file.name}</p>
                        <X size={13} className="cursor-pointer" onClick={() => remove(index)} />
                    </li>
                ))}
            </ul>
        )
    );
};

export default ImageList;
