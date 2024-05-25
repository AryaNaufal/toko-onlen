"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <form onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={isSubmit}>Register</button>
    </form>
  );
};