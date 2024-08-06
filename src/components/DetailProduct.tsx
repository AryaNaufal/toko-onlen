"use client";
import { useSearchParams } from "next/navigation";
import { FetchProducts } from "../hooks/products/useProducts";
import Loading from "./Loading";
import Image from "next/image";
import {
  PostCartProduct,
  FetchCart,
  FetchCartProduct,
  updateCartProduct,
  PostCart,
} from "../hooks/carts/useCart";
import { toast } from "./ui/use-toast";

export default function DetailProduct({ userId }: { userId: string | null }) {
  const params = useSearchParams();
  const id = params?.get("id");

  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: cartData, isLoading: CartLoading } = FetchCart();
  const { data: cartProductData, isLoading: CartProductLoading } =
    FetchCartProduct();
  const { mutate: cartProductUpdate, isPending: UpdatePending } =
    updateCartProduct();
  const { mutate: cartProductAdd, isPending: ProductAddPending } =
    PostCartProduct();
  const { mutate: cartAdd, isPending: CartAddPending } = PostCart();

  if (ProductLoading || CartLoading || CartProductLoading || CartAddPending)
    return <Loading />;
  if (ProductAddPending || UpdatePending) {
    toast({
      description: "Product Added To Cart...",
      title: "Success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  // format mata uang indonesia
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // Cari Producct berdasarkan id params
  const ProductId = ProductData?.find(
    (product: Product) => product.id === Number(id)
  );

  // Cari keranjang yang cocok dengan user yang login
  const isUserCart = cartData?.find((item: any) => item.user_id === userId);

  // Cari product di keranjang
  const checkProductOnCart = cartProductData?.find(
    (item: any) =>
      item.cart_id === Number(isUserCart?.id) &&
      item.product_id === ProductId?.id
  );

  const handleAddToCart = () => {
    const addCart = {
      user_id: userId,
    };

    const data = {
      cart_id: Number(isUserCart?.id),
      product_id: ProductId?.id,
      qty: 1,
    };

    // Tambah keranjang user jika belum ada
    if (isUserCart === undefined) {
      cartAdd(addCart);
    }

    // Cek product di keranjang jika tidak ada tambahkan dan jika sudah ada tambahkan qty
    if (checkProductOnCart === undefined) {
      cartProductAdd(data);
    } else if (checkProductOnCart.product_id > 1) {
      cartProductUpdate({
        id: checkProductOnCart.id,
        qty: checkProductOnCart.qty + 1,
      });
    }
    return;
  };

  return (
    <>
      {ProductId && (
        <section className="overflow-hidden bg-slate-100 h-full md:h-[calc(100vh_-_4rem)]">
          <div className="flex flex-col w-full md:hidden">
            <div>
              <div>
                <Image
                  src={`https://utfs.io/f/${ProductId.picture}`}
                  alt="product"
                  width={300}
                  height={300}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-1 p-5">
                <div className="flex justify-between">
                  <p className="font-bold text-xl">
                    {Rupiah.format(ProductId.price)}
                  </p>
                  <div className="flex font-semibold">
                    <span>Stock:</span>
                    <p>{ProductId.stock}</p>
                  </div>
                </div>
                <p className="font-semibold text-xl">{ProductId.name}</p>
                <div className="flex flex-col gap-2">
                  <span>Description:</span>
                  <p className="pl-5">{ProductId.description}</p>
                </div>
                <div className="flex w-full justify-end gap-3 mt-3 font-semibold">
                  <button
                    className="bg-black text-white px-3 py-2 rounded-md"
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full hidden md:flex items-center p-5"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div className="flex items-center w-full shadow-md bg-white">
              <div>
                <Image
                  src={`https://utfs.io/f/${ProductId.picture}`}
                  alt="product"
                  width={300}
                  height={300}
                  className="w-[500px] lg:w-[700px] rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 p-5 md:w-full">
                <div className="flex justify-between">
                  <p className="font-bold text-xl">
                    {Rupiah.format(ProductId.price)}
                  </p>
                  <div className="flex font-semibold">
                    <span>Stock:</span>
                    <p>{ProductId.stock}</p>
                  </div>
                </div>
                <p className="font-semibold text-xl">{ProductId.name}</p>
                <div className="flex flex-col gap-2">
                  <span>Description:</span>
                  <p className="pl-5">{ProductId.description}</p>
                </div>
                <div className="flex w-full justify-end gap-3 mt-3 font-semibold">
                  <button
                    className="bg-black text-white px-3 py-2 rounded-md"
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
