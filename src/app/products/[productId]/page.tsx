"use client";
import Image from "next/image";
import { useFetchProducts } from "@/src/features/products/useFetchProducts";
import { generateMetadata } from "./meta";

type Props = {
  params: {
    productId: number;
  };
};

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

generateMetadata;

export default function ProductDetails({ params }: Props) {
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const {
    data: products,
    isPending: productsPending,
    error: errorProducts,
  } = useFetchProducts(); // Fetch Api products

  if (productsPending)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );

  if (errorProducts) return "An error has occurred: " + errorProducts.message;

  const productValidation: Product = products?.find((val: Product) => {
    return val.id == params.productId;
  });

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
    <>
      <div className="flex flex-col md:px-32 lg:hidden w-full">
        {productValidation && (
          <>
            <Image
              src={`${getStorePicture(productValidation.id)}`}
              alt=""
              width={600}
              height={600}
              className="w-full object-cover"
            />
            <div className="flex gap-3 flex-col w-full p-3">
              <div className="flex items-center justify-between">
                <p className="font-bold">
                  {Rupiah.format(productValidation.price)}
                </p>
                <p className="text-sm">Stock: {productValidation.stock}</p>
              </div>
              <p className="text-sm">{productValidation.name}</p>
              <span className="font-semibold text-xs">Description:</span>
              <p className="text-xs pl-3">{productValidation.description}</p>
              <div className="flex flex-row gap-2 justify-end w-full">
                <button
                  className="bg-green-400 text-sm px-3 py-2 rounded-md text-white font-bold"
                  disabled
                >
                  Buy
                </button>
                <button
                  className="bg-blue-400 text-sm px-3 py-2 rounded-md text-white font-bold"
                  disabled
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:flex w-full items-center h-screen px-20">
        {productValidation && (
          <>
            <Image
              src={`${getStorePicture(productValidation.id)}`}
              alt=""
              width={200}
              height={200}
              className="w-full max-h-60 object-center object-contain"
            />
            <div className="flex gap-3 flex-col w-full p-3">
              <div className="flex items-center justify-between">
                <p className="font-bold">
                  {Rupiah.format(productValidation.price)}
                </p>
                <p className="text-sm">Stock: {productValidation.stock}</p>
              </div>
              <p className="text-sm">{productValidation.name}</p>
              <span className="font-semibold text-xs">Description:</span>
              <p className="text-xs pl-3">{productValidation.description}</p>
              <div className="flex flex-row gap-2 justify-end w-full">
                <button
                  className="bg-green-400 text-sm px-3 py-2 rounded-md text-white font-bold"
                  disabled
                >
                  Buy
                </button>
                <button
                  className="bg-blue-400 text-sm px-3 py-2 rounded-md text-white font-bold"
                  disabled
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
