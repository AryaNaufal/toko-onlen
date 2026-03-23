"use client";
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import UserStore from '@/src/components/Fragments/UserStore';

export default function MyShop() {
  const { userId } = useAuth();
  const router = useRouter();

  if (userId === null) {
    router.push('/sign-in');
  }

  return (
    <div className="container mx-auto py-5">
      <UserStore userId={userId as string} />
    </div>
  );
}
