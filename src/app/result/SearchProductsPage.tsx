import CardProduct from "@/src/components/Fragments/Card";
import Link from "next/link";
import { useFetchProducts } from "@/src/features/products/useFetchProducts";
import { useFetchStores } from "@/src/features/stores/useFetchStores";
import { useSearchParams } from "next/navigation";

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

export default function SearchProductsPage() {
  const router = useSearchParams();
  const query: any = router.get("search");

  const { data: stores } = useFetchStores(); // Fetch Api stores

  const {
    data: products,
    isLoading: productsLoading,
    error: errorProducts,
  } = useFetchProducts(); // Fetch Api Products

  if (productsLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );

  if (errorProducts) return <div>Error: {errorProducts.message}</div>;

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

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query)
  );
  return (
    <>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: Product) => (
          <Link href={{ pathname: `/products/${product.id}` }} key={product.id}>
            <CardProduct
              src={`${getStorePicture(product.id)}`}
              name={product.name}
              price={product.price}
              address={getStoreAddress(product.id)}
            />
          </Link>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </>
  );
}
