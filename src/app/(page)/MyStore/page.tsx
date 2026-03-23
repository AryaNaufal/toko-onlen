"use client";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import UserStore from '@/src/components/Fragments/UserStore';
import { useEffect } from 'react';

export default function MyShop() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) return null;

  return (
    <div className="container mx-auto py-5">
      <UserStore userId={userId as string} />
    </div>
  );
}
