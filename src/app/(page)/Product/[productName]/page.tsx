"use client";
import DetailProduct from "@/src/components/DetailProduct";
import { useAuth } from '@clerk/nextjs'

type Props = {
  params: {
    productName: string;
  };
};

export default function ProductDetails() {
  const { userId } = useAuth();
  
  return (
    <section className="h-full overflow-hidden">
      <DetailProduct userId={userId as string} />
    </section>
  );
}
