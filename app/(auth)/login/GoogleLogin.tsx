import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastOptions } from 'react-toastify';

interface GoogleLoginProps {
    onPending: (state: boolean) => void;
}

const GoogleLogin = ({ onPending }: GoogleLoginProps) => {
    const handleSigninGoogle = () => {
        onPending(true);
        toast.success('Login Google Success', {
            autoClose: 2000,
            onClose: () => {
                onPending(false);
            },
        });
    };
    return (
        <Button variant="outline" className="w-full" onClick={handleSigninGoogle}>
            <FcGoogle className="mr-2 size-4" />
            Sign up with Google
        </Button>
    );
};

export default GoogleLogin;
