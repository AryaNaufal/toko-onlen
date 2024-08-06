"use client";
import CardProduct from "@/src/components/Fragments/Card";
import Loading from "@/src/components/Loading";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import { FetchStores } from "@/src/hooks/stores/useStore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ProductList() {
  const { user } = useUser();
  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: StoreData, isLoading: StoreLoading } = FetchStores();
  if (ProductLoading || StoreLoading) return <Loading />;

  const syncProductsWithStoreAddress = ProductData?.map((product: Product) => {
    const store = StoreData?.find(
      (store: Store) => store.user_id === product.user_id
    );
    return {
      ...product,
      address: store?.alamat,
    };
  });

  return (
    <>
      {user && (
        <h1 className="font-bold text-base md:text-3xl">
          Welcome {user?.fullName}
        </h1>
      )}
      <div className="flex w-full justify-center overflow-hidden gap-2 flex-wrap mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {syncProductsWithStoreAddress?.map((product: any) => (
            <Link
              href={`/Product/${product.name}?id=${product.id} `}
              key={product.id}
            >
              <CardProduct
                src={product.picture}
                name={product.name}
                price={product.price}
                address={product.address}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
