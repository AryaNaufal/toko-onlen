"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdCart, IoMdSearch } from "react-icons/io";
import { FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { FetchCart, FetchCartProduct } from "@/src/hooks/carts/useCart";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import { FetchStores } from "@/src/hooks/stores/useStore";
import { useMemo, useState, useEffect, useRef } from "react";
import { Input } from "@/src/components/ui/input";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const authPage = pathName === "/sign-in" || pathName === "/sign-up";

  const { data: cartData } = FetchCart();
  const { data: cartProductData } = FetchCartProduct();
  const { data: productData } = FetchProducts();
  const { data: storeData } = FetchStores();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartItemCount = useMemo(() => {
    if (!user || !cartData || !cartProductData) return 0;
    const userCart = cartData.find((cart: any) => cart.user_id === user.id);
    if (!userCart) return 0;
    return cartProductData.filter((cp: any) => cp.cart_id === userCart.id)
      .length;
  }, [user, cartData, cartProductData]);

  const productSuggestions = useMemo(() => {
    if (!search || !productData) return [];
    return productData
      .filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 3);
  }, [search, productData]);

  const storeSuggestions = useMemo(() => {
    if (!search || !storeData) return [];
    return storeData
      .filter((s: Store) => s.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 2);
  }, [search, storeData]);

  const performSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setShowSuggestions(false);
    if (pathName !== "/") {
      router.push(`/?${params.toString()}`);
    } else {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(search);
    }
  };

  const SuggestionList = ({ isMobile = false }) => (
    <div className={`absolute top-full left-0 w-full bg-white border border-slate-200 rounded-b-md shadow-lg mt-1 overflow-hidden z-50`}>
      {productSuggestions.length > 0 && (
        <div className="p-2 border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Produk
        </div>
      )}
      {productSuggestions.map((product: Product) => (
        <div
          key={`prod-${product.id}`}
          className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-3 border-b border-slate-100 last:border-0"
          onClick={() => {
            performSearch(product.name);
            if (isMobile) document.getElementById("mobile-search")?.classList.add("hidden");
          }}
        >
          <IoMdSearch className="text-slate-400" />
          <span className="text-sm text-slate-700">{product.name}</span>
        </div>
      ))}

      {storeSuggestions.length > 0 && (
        <div className="p-2 border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Toko
        </div>
      )}
      {storeSuggestions.map((store: Store) => (
        <div
          key={`store-${store.id}`}
          className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 border-b border-slate-100 last:border-0"
          onClick={() => {
            performSearch(store.name);
            if (isMobile) document.getElementById("mobile-search")?.classList.add("hidden");
          }}
        >
          <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center text-green-600 flex-shrink-0">
            <FaStore className="text-xl" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-800 truncate">{store.name}</span>
            <div className="flex items-center gap-1 text-slate-500">
              <FaMapMarkerAlt className="text-[10px]" />
              <span className="text-[11px] truncate">{store.alamat}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <nav
      className={`sticky w-full top-0 shadow-md h-16 z-40 bg-white flex justify-between items-center overflow-visible
        ${authPage && "hidden"} `}
    >
      <div className="container flex justify-between items-center mx-auto gap-4 px-4 relative">
        <Link href="/" className="flex-shrink-0">
          <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 text-lg md:text-xl">
            Toko Pak Edi
          </h1>
        </Link>

        <div className="flex-1 max-w-md relative hidden md:block" ref={suggestionRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Cari produk atau toko..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 h-10 border-slate-200 focus:border-green-500"
            />
            <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          </div>

          {showSuggestions && (productSuggestions.length > 0 || storeSuggestions.length > 0) && (
            <SuggestionList />
          )}
        </div>

        <div className="flex gap-4 items-center h-full">
          <div className="md:hidden">
            <button
              onClick={() => {
                const searchInput = document.getElementById("mobile-search");
                searchInput?.classList.toggle("hidden");
              }}
              className="p-2 border border-slate-200 rounded-md"
            >
              <IoMdSearch className="text-xl" />
            </button>
          </div>

          <div className="flex gap-2">
            <Link href="/Cart">
              <button
                className={`font-semibold border border-slate-200 rounded-md p-2 relative ${
                  pathName === "/Cart" && "bg-green-500 text-white"
                }`}
              >
                <IoMdCart className="text-xl" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/MyStore">
              <button
                className={`font-semibold border border-slate-200 rounded-md p-2 ${
                  pathName === "/MyStore" && "bg-green-500 text-white"
                }`}
              >
                <FaStore className="text-xl" />
              </button>
            </Link>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "w-9 h-9 md:w-12 md:h-12" },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div
        id="mobile-search"
        className="hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md md:hidden z-50"
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari produk atau toko..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 h-10 border-slate-200 focus:border-green-500"
          />
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          
          {showSuggestions && (productSuggestions.length > 0 || storeSuggestions.length > 0) && (
            <SuggestionList isMobile={true} />
          )}
        </div>
      </div>
    </nav>
  );
}
