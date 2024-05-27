"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/src/app/components/Elements/button';
import { Input } from '@/src/app/components/Elements/input';
import { BiUser, BiKey } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    const res = await fetch('/api/auth/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    setIsSubmit(false);

    if (email === '' || password === '') {
      alert('Email and Password cant be empty!');
      return;
    }

    if (res.status === 200) {
      alert('Login success');
      router.push('/');
    } else {
      alert('Login failed');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
      <Input
        logo={<BiUser />}
        placeholder={'Email'}
        type={'email'}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        logo={<BiKey />}
        placeholder={'Password'}
        type={'password'}
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button className={'bg-blue-500 hover:bg-blue-700'} type={"submit"} disabled={isSubmit}>Login</Button>
    </form>
  );
};