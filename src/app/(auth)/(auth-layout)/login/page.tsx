"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    // const data = await res.json();
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
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={isSubmit}>Login</button>
    </form>
  );
};