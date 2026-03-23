"use client";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import CartList from '@/src/components/Fragments/CartList';

export default function Cart() {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    router.push('/sign-in');
  }
  return (
    <section className="overflow-hidden h-full p-3">
      <CartList userId={userId as string} />
    </section>
  );
}
