"use client";
import { FetchStores } from "@/src/hooks/stores/useStore";
import { useUser } from "@clerk/nextjs";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import Loading from "../../Loading";
import FormAddProduct from "../../FormAddProduct";
import CardProduct from "../Card";
import Slider from "../Slider";
import Link from "next/link";
import FormAddStore from "../../FormAddStore";

interface UserIdProps {
  userId: string;
}

export default function AuthPage({ userId }: UserIdProps) {
  const { user } = useUser();
  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: StoreData, isLoading: StoreLoading } = FetchStores();

  if (ProductLoading || StoreLoading) return <Loading />;

  const checkStore = StoreData?.find(
    (store: Store) => store.user_id === userId
  );

  const checkProduct = ProductData?.filter(
    (product: Product) => product.user_id === userId
  );

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
    <div>
      {checkStore ? (
        <>
          {checkStore && (
            <>
              <div className="flex gap-2">
                <label htmlFor="" className="font-semibold">
                  Store Name:{" "}
                </label>
                <p>{checkStore.name}</p>
              </div>
              <div className="flex gap-2">
                <label htmlFor="" className="font-semibold">
                  Address:{" "}
                </label>
                <p>{checkStore.alamat}</p>
              </div>
            </>
          )}
          <FormAddProduct userId={userId} />
          <div className="pt-10">
            <h1 className="ml-4 font-bold text-xl md:text-3xl">My Products:</h1>
            <div className="flex w-full justify-center overflow-hidden gap-2 py-5 flex-wrap">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {/* <StoreProductList userId={userId} /> */}
                {checkStore &&
                  checkProduct?.map((product: Product) => (
                    <Link
                      href={`/Product/${product.name}?id=${product.id} `}
                      key={product.id}
                    >
                      <CardProduct
                        src={product.picture}
                        name={product.name}
                        price={product.price}
                        address={checkStore?.alamat}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <FormAddStore userId={userId} />
        </>
      )}
    </div>
  );
}
