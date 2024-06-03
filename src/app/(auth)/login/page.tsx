"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/src/app/components/Elements/button';
import { Input } from '@/src/app/components/Elements/input';
import { BiUser, BiKey } from "react-icons/bi";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}

export default function Login({ searchParams }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.error) {
      setError('Email or Password is wrong!');
      const timer = setTimeout(() => {
        setError('');
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: '/'
    });
    setIsSubmit(false);
  }

  return (
    <>
      {error && (
        <p className='text-sm bg-red-500 font-semibold p-2 mb-4 rounded text-white flex justify-center'>
          {error}
        </p>
      )}

      <form onSubmit={handleLogin} className='flex flex-col gap-4'>
        <Input
          logo={<BiUser />}
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <Input
          logo={<BiKey />}
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />
        <Button className='bg-blue-500 hover:bg-blue-700' type='submit' disabled={isSubmit}>
          {isSubmit ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </>
  );
}
