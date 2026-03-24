"use client";
import ProductList from "@/src/components/Fragments/ProductList";
import { useAuth } from '@clerk/nextjs'

export default function Example() {
  const { userId } = useAuth()

  return (
    <section className="container mx-auto overflow-hidden h-full p-3">
      <ProductList />
    </section>
  );
}
