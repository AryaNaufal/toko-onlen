"use client";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import CartList from '@/src/components/Fragments/CartList';
import { useEffect } from 'react';

export default function Cart() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) return null;

  return (
    <section className="bg-[#F0F3F7] overflow-hidden min-h-svh p-3">
      <CartList userId={userId as string} />
    </section>
  );
}
