"use client";
import CardProduct from "@/src/components/Fragments/Card";
import Loading from "@/src/components/Loading";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import { FetchStores } from "@/src/hooks/stores/useStore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductList() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: StoreData, isLoading: StoreLoading } = FetchStores();
  if (ProductLoading || StoreLoading) return <Loading />;

  const filteredProducts = ProductData?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const syncProductsWithStoreAddress = filteredProducts?.map((product: Product) => {
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
      <div className="flex w-full justify-center overflow-hidden gap-2 flex-wrap my-5">
        {syncProductsWithStoreAddress && syncProductsWithStoreAddress.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-slate-500">
            <p className="text-xl font-semibold">Produk tidak ditemukan</p>
            <p>Coba cari kata kunci lain</p>
          </div>
        )}
      </div>
    </>
  );
}
