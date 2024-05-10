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
import GoogleSignInButton from '@/src/components/auth/GoogleSignInButton';
import { registerUserSchema } from '@/src/lib/shemas';
import { useRouter } from 'next/navigation';


const RegisterForm = () => {
  const router = useRouter(); 

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerUserSchema>) => {
    const response = await fetch("/api/user", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })

    if(response.ok){
      router.push('/auths/login')
      console.log('user created.')
    }else{
      console.log('Registration failed')

    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-24 self-center">
      <div className="flex min-h-screen md:w-1/2 flex-col items-center justify-center self-center">

        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder='john doe'  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Re-Enter your password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full mt-6' type='submit'>
              Sign up
            </Button>
          </form>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you don&apos;t have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/auths/login'>
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;