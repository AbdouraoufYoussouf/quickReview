'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from '@/src/components/auth/GoogleSignInButton';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log('connexion...')
        const singInData = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        if (singInData?.error) {
            console.log('error:', singInData.error)
        } else {
            router.refresh(),
                router.push('/admin');
        }
    };


    return (
        <div className='flex flex-col w-full justify-center items-center self-center p-24'>
            <div className='flex flex-col md:w-1/2 justify-center items-center self-center '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='mail@example.com' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='Enter your password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='w-full mt-6' type='submit'>
                            Sign in
                        </Button>
                    </form>
                </Form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    If you don&apos;t have an account, please&nbsp;
                    <Link className='text-blue-500 hover:underline' href='/auths/register'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;