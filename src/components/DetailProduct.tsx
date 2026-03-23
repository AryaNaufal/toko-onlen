"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { FetchProducts } from "../hooks/products/useProducts";
import { FetchStores } from "../hooks/stores/useStore";
import Loading from "./Loading";
import Image from "next/image";
import { useState } from "react";
import {
  PostCartProduct,
  FetchCart,
  FetchCartProduct,
  updateCartProduct,
  PostCart,
} from "../hooks/carts/useCart";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { ShoppingCart, Plus, Minus, Store } from "lucide-react";

export default function DetailProduct({ userId }: { userId: string | null }) {
  const params = useSearchParams();
  const id = params?.get("id");
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | string>(1);

  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: StoreData, isLoading: StoreLoading } = FetchStores();
  const { data: cartData, isLoading: CartLoading } = FetchCart();
  const { data: cartProductData, isLoading: CartProductLoading } =
    FetchCartProduct();
  const { mutate: cartProductUpdate, isPending: UpdatePending } =
    updateCartProduct();
  const { mutate: cartProductAdd, isPending: ProductAddPending } =
    PostCartProduct();
  const { mutate: cartAdd, isPending: CartAddPending } = PostCart();

  if (ProductLoading || CartLoading || CartProductLoading || CartAddPending || StoreLoading)
    return <Loading />;

  // format mata uang indonesia
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  // Cari Producct berdasarkan id params
  const ProductItem = ProductData?.find(
    (product: Product) => product.id === Number(id)
  );

  if (!ProductItem) return <div className="p-10 text-center">Product not found.</div>;

  // Cari Store berdasarkan user_id produk
  const ProductStore = StoreData?.find((store: any) => store.user_id === ProductItem.user_id);

  // Cari keranjang yang cocok dengan user yang login
  const isUserCart = cartData?.find((item: any) => item.user_id === userId);

  // Cari product di keranjang
  const checkProductOnCart = cartProductData?.find(
    (item: any) =>
      item.cart_id === Number(isUserCart?.id) &&
      item.product_id === ProductItem.id
  );

  const handleAddToCart = () => {
    if (userId === null) {
      toast({
        description: "Please Login To Add Product To Cart",
        title: "Error",
        variant: "destructive"
      });
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
      return;
    }

    const buyQty = typeof quantity === "string" ? 1 : quantity;
    const currentOnCart = checkProductOnCart?.qty || 0;

    if (currentOnCart + buyQty > ProductItem.stock) {
      toast({
        description: `Stok tidak cukup. Anda sudah memiliki ${currentOnCart} di keranjang.`,
        title: "Gagal",
        variant: "destructive"
      });
      return;
    }

    const addCart = {
      user_id: userId,
    };

    const cartProductDataInput = {
      cart_id: Number(isUserCart?.id),
      product_id: ProductItem.id,
      qty: buyQty,
    };

    // Tambah keranjang user jika belum ada
    if (isUserCart === undefined) {
      cartAdd(addCart);
    }

    // Cek product di keranjang jika tidak ada tambahkan dan jika sudah ada tambahkan qty
    if (checkProductOnCart === undefined) {
      cartProductAdd(cartProductDataInput, {
        onSuccess: () => {
          toast({ description: "Berhasil menambahkan ke keranjang", title: "Success" });
        }
      });
    } else {
      cartProductUpdate({
        id: checkProductOnCart.id,
        qty: currentOnCart + buyQty,
      }, {
        onSuccess: () => {
          toast({ description: "Keranjang diperbarui", title: "Success" });
        }
      });
    }
  };

  const handleIncrement = () => {
    const q = typeof quantity === "string" ? 0 : quantity;
    if (q < ProductItem.stock) setQuantity(q + 1);
  };

  const handleDecrement = () => {
    const q = typeof quantity === "string" ? 2 : quantity;
    if (q > 1) setQuantity(q - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setQuantity("");
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      setQuantity(Math.min(ProductItem.stock, Math.max(1, num)));
    }
  };

  const handleBlur = () => {
    if (quantity === "" || (typeof quantity === "number" && quantity < 1)) {
      setQuantity(1);
    }
  };

  const displayQuantity = typeof quantity === "number" ? quantity : 0;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
                <Image
                  src={`https://utfs.io/f/${ProductItem.picture}`}
                  alt={ProductItem.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Middle: Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                {ProductItem.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-500">Terjual <span className="text-slate-800">100+</span></span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-slate-800 font-semibold">4.8</span>
                  <span className="text-xs text-slate-500">(45 rating)</span>
                </div>
              </div>
            </div>

            <div className="text-3xl font-bold text-slate-900">
              {Rupiah.format(ProductItem.price)}
            </div>

            <div className="h-[1px] bg-slate-100 w-full" />

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-slate-800">Detail</h3>
              <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                {ProductItem.description}
              </p>
            </div>

            <div className="h-[1px] bg-slate-100 w-full" />

            {/* Store Info */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00AA5B]/10 flex items-center justify-center text-[#00AA5B]">
                  <Store size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">{ProductStore?.name || "Official Store"}</div>
                  <div className="text-xs text-[#00AA5B] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00AA5B]" />
                    Online
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#00AA5B] text-[#00AA5B] hover:bg-[#00AA5B]/5">
                Follow
              </Button>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <div className="sticky top-24 border border-slate-200 rounded-2xl p-4 flex flex-col gap-4 shadow-sm bg-white">
              <h3 className="font-bold text-slate-800">Atur jumlah dan catatan</h3>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg h-9">
                  <button 
                    onClick={handleDecrement}
                    disabled={displayQuantity <= 1}
                    className="px-2 text-slate-400 disabled:opacity-30 hover:text-[#00AA5B]"
                  >
                    <Minus size={18} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-12 text-center text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button 
                    onClick={handleIncrement}
                    disabled={displayQuantity >= ProductItem.stock}
                    className="px-2 text-slate-400 disabled:opacity-30 hover:text-[#00AA5B]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="text-sm text-slate-600">
                  Stok: <span className="font-bold text-slate-800">{ProductItem.stock}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-500 text-sm">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">{Rupiah.format(ProductItem.price * displayQuantity)}</span>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#00AA5B] hover:bg-[#00924e] text-white font-bold h-11 rounded-lg flex items-center justify-center gap-2"
                  disabled={ProductAddPending || UpdatePending}
                >
                  <Plus size={18} />
                  Keranjang
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-[#00AA5B] text-[#00AA5B] hover:bg-[#00AA5B]/5 font-bold h-11 rounded-lg"
                >
                  Beli Langsung
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

