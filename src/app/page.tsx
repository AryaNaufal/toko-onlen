"use client";
import CardProduct from "@/src/components/Fragments/Card";
import Link from "next/link";
import { useFetchStores } from "../features/stores/useFetchStores";
import { useFetchProducts } from "../features/products/useFetchProducts";
import { useSessionUser } from "../features/session/useSessionUser";
import { useEffect, useState } from "react";

type Picture = {
  id: number;
  url: string;
};

const pictures = [
  {
    id: 1,
    url: "https://i.pinimg.com/564x/10/bf/4f/10bf4fd7050596b1124fce853cececb0.jpg",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/ba/ae/46/baae46f1377431b1c80db3f7f1de2625.jpg",
  },
];

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (storesLoading && productsLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );

  if (sessionError) return "An error has occurred: " + sessionError.message;
  if (errorStores) return "An error has occurred: " + errorStores.message;
  if (errorProducts) return "An error has occurred: " + errorProducts.message;

  const getStoreAddress = (productId: number): string | undefined => {
    // Cari product user_id berdasarkan parameter function
    const product: Product = products?.find((p: Product) => p.id === productId);
    if (!product) return undefined;

    // Cari store user_id berdasarkan user_id product
    const store: Store = stores?.find(
      (s: Store) => s.user_id === product.user_id
    );
    return store?.alamat;
  };

  const getStorePicture = (productId: number): string | undefined => {
    // Cari product user_id berdasarkan parameter function
    const product: Product = products?.find((p: Product) => p.id === productId);
    if (!product) return undefined;

    // Cari picture user_id berdasarkan user_id product
    const picture = pictures?.find(
      (pic: Picture) => pic.id === product.user_id
    );
    return picture?.url;
  };

  return (
    <main className="mt-10 flex justify-center">
      <div className="container flex gap-3 overflow-scroll h-fit">
        {products?.map((product: Product) => (
          <Link href={{ pathname: `/products/${product.id}` }} key={product.id}>
            <CardProduct
              src={getStorePicture(product.id)}
              name={product.name}
              price={product.price}
              address={getStoreAddress(product.id)}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
