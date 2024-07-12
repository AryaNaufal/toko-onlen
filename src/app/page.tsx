"use client";
import CardProduct from "@/src/components/Fragments/Card";
import Link from "next/link";
import { useFetchStores } from "../features/stores/useFetchStores";
import { useFetchProducts } from "../features/products/useFetchProducts";
import { useSessionUser } from "../features/session/useSessionUser";

export default function Home() {
  const {
    data: session,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSessionUser(); // Fetch session

  const id = session?.map((val: userSession) => {
    return val.id; // session id
  });

  const {
    data: stores,
    isLoading: storesLoading,
    error: errorStores,
  } = useFetchStores(); // Fetch Api stores

  const {
    data: products,
    isLoading: productsLoading,
    error: errorProducts,
  } = useFetchProducts(); // Fetch Api products

  if (storesLoading && productsLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );

  if (sessionError) return "An error has occurred: " + sessionError.message;
  if (errorStores) return "An error has occurred: " + errorStores.message;
  if (errorProducts) return "An error has occurred: " + errorProducts.message;

  const matchStore = stores?.find((val: Store) => val.user_id === Number(id));

  return (
    <main className="mt-10 flex justify-center h-screen overflow-hidden">
      <div className="container flex gap-2 overflow-scroll">
        {products?.map((val: Product) => (
          <Link href={{ pathname: `/products/${val.name}` }} key={val.id}>
            <CardProduct
              src={
                "https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg"
              }
              name={val.name}
              price={val.price}
            />
          </Link>
        ))}
      </div>
      <div>
        <ul>
          {matchStore && (
            <li key={matchStore.id} className="w-32">
              <p>StoreId: {matchStore.id}</p>
              <p>StoreName: {matchStore.name}</p>
              <p>UserId: {matchStore.user_id}</p>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
