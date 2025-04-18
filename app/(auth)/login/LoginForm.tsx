import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User } from '@/models/User.entity';

interface LoginFormProps {
    onSubmit: (values: Pick<User, 'email' | 'password'>) => void;
}

const LoginFormSchema = z.object({
    email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
    password: z.string().min(1, { message: 'This field has to be filled.' }),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <div className="flex flex-col gap-2">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className={
                                            fieldState.invalid
                                                ? `bg-red-200 border-red-500 outline-none focus-visible:ring-0`
                                                : ''
                                        }
                                        placeholder="m@example.com"
                                        {...field}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            form.clearErrors('email');
                                        }}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <div className="flex flex-col gap-2">
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            {...field}
                                            className={
                                                fieldState.invalid
                                                    ? `bg-red-200 border-red-500 outline-none focus-visible:ring-0`
                                                    : 'w-full'
                                            }
                                            {...field}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                field.onChange(e);
                                                form.clearErrors('password');
                                            }}
                                        />
                                    </FormControl>
                                    {showPassword ? (
                                        <FaEyeSlash
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-0 right-0 translate-y-[60%] -translate-x-1/2 cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegEye
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-0 right-0 translate-y-[60%] -translate-x-1/2 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start">
                    <Link href={'/reset-password'} className="text-sm underline cursor-pointer">
                        Forgot Password
                    </Link>
                </div>
                <Button type="submit" className="w-full">
                    Log in
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
