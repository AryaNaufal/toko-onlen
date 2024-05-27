"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/src/app/components/Elements/button';
import { Input } from '@/src/app/components/Elements/input';
import { BiUser, BiKey } from 'react-icons/bi';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) });
    setIsSubmit(false);
    if (!res.ok) {
      alert('Register failed');
    } else if (email == '' || password == '') {
      alert('Email dan Password does not empty');
    } else {
      alert('Register success');
      router.push('/login');
    }
  }

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-4'>
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
      <Button className={'bg-blue-500 hover:bg-blue-700'} type={"submit"} disabled={isSubmit}>Register</Button>
    </form>
  );
};