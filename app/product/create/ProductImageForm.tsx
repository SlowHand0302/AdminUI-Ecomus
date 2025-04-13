import { Button } from '@/components/ui/button';
import { FormType } from '@/constants/form.constant';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface ProductImageFormProps {
    type: FormType;
    open: boolean;
    onClose: () => void;
    onSubmit: (file: File) => void;
}

export default function ProductImageForm({ type, open, onClose, onSubmit }: ProductImageFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            console.log(event.target.files);
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{type} ProductVariant</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4">
                    <div className="space-y-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-black
                        hover:file:bg-blue-100"
                        />
                    </div>

                    <Button type="button" onClick={() => selectedFile && onSubmit(selectedFile)}>
                        Select Image
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
