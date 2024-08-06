"use client";
import Loading from "@/src/components/Loading";
import { toast } from "@/src/components/ui/use-toast";
import {
  DeleteCartProduct,
  FetchCart,
  FetchCartProduct,
} from "@/src/hooks/carts/useCart";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import Image from "next/image";
import { useState, useEffect, cache } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function CartProductList({ userId }: { userId: string | null }) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { data: cartData, isLoading: cartLoading } = FetchCart();
  const { data: cartProductData, isLoading: cartProductLoading } =
    FetchCartProduct();
  const { data: productData, isLoading: productLoading } = FetchProducts();
  const { mutate, isPending, isSuccess } = DeleteCartProduct();

  useEffect(() => {
    if (cartProductData) {
      const initialQuantities = cartProductData.reduce(
        (acc: any, cartProduct: any) => {
          acc[cartProduct.id] = cartProduct.qty;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
    }
  }, [cartProductData]);

  if (cartLoading || cartProductLoading || productLoading) return <Loading />;

  if (isPending) {
    toast({
      description: "Product deleted...",
      title: "Success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const cartProductList = () => {
    const cart = cartData?.find((item: any) => item.user_id === userId);
    const cartProduct = cartProductData?.filter(
      (item: any) => item.cart_id === cart?.id
    );
    return cartProduct;
  };

  const matchedProducts = cartProductList().map((cartProduct: any) => {
    const productDetails = productData?.find(
      (product: any) => product.id === cartProduct.product_id
    );
    return {
      ...cartProduct,
      productDetails,
    };
  });

  const handleIncrement = (id: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1),
    }));
  };

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <>
      <h1>Keranjang</h1>
      <div className="flex flex-col gap-4">
        {matchedProducts && matchedProducts.length > 0
          ? matchedProducts.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-row gap-1 border rounded-md"
              >
                <Image
                  src={`https://utfs.io/f/${item.productDetails?.picture}`}
                  width={200}
                  height={200}
                  alt="cart list picture"
                  className="w-20 h-20"
                />
                <div className="flex flex-col justify-between w-full py-2 px-2 md:px-5">
                  <div className="flex items-center justify-between">
                    <p>{item.productDetails?.name}</p>
                    <p className="font-bold">{item.productDetails?.price}</p>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <button onClick={() => handleDelete(item.id)}>
                      <FaTrashCan className="text-xs text-red-400" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDecrement(item.id)}>
                        -
                      </button>
                      <p>{quantities[item.id]}</p>
                      <button onClick={() => handleIncrement(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
