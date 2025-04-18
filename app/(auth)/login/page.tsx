'use client';
import React, { useState } from 'react';

import { TbLoader2 } from 'react-icons/tb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import LoginForm from './LoginForm';
import GoogleLogin from './GoogleLogin';
import Overlay from '@/components/Overlay';
import { User } from '@/models/User.entity';
import { toast } from 'react-toastify';

const page = () => {
    const [isPending, setIsPending] = useState(false);

    const handleOnSubmitForm = (values: Pick<User, 'email' | 'password'>): void => {
        setIsPending(true);
        toast.success('Login Google Success', {
            autoClose: 2000,
            onClose: () => {
                setIsPending(false);
            },
        });
    };

    return (
        <div className="w-full flex flex-col min-h-screen justify-center items-center">
            <div className="flex flex-col gap-4 w-[400px] relative">
                <Overlay
                    classname={`absolute bg-white bg-opacity-90 items-center justify-center max-w-full max-h-full ${
                        isPending ? 'flex' : 'hidden'
                    }`}
                >
                    <TbLoader2 className="text-[50px] text-blue-500 animate-spin" />
                </Overlay>
                <Card className="mx-auto w-full max-w-md">
                    <CardHeader className="items-center">
                        <CardTitle className="text-xl">Log in with your email</CardTitle>
                        <CardDescription>Enter your information to login</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-col">
                        <LoginForm onSubmit={handleOnSubmitForm} />
                        <div className="flex justify-center items-center gap-4 w-full">
                            <Separator className="my-2 max-w-[40%]" />
                            <span className="text-xs text-muted-foreground">OR</span>
                            <Separator className="my-2 max-w-[40%]" />
                        </div>
                        <GoogleLogin onPending={setIsPending} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default page;
