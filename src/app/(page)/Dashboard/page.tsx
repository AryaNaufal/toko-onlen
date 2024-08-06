"use client"

import Loading from "@/src/components/Loading";
import { FetchProducts } from "@/src/hooks/products/useProducts";

export default function Dashboard() {
  const { data, isLoading } = FetchProducts();
  if (isLoading) return <Loading />;
  console.log(data);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}