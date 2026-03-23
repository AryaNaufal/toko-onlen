"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdCart } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { FetchCart, FetchCartProduct } from "@/src/hooks/carts/useCart";
import { useMemo } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const { user } = useUser();
  const authPage = pathName === "/sign-in" || pathName === "/sign-up";

  const { data: cartData } = FetchCart();
  const { data: cartProductData } = FetchCartProduct();

  const cartItemCount = useMemo(() => {
    if (!user || !cartData || !cartProductData) return 0;
    const userCart = cartData.find((cart: any) => cart.user_id === user.id);
    if (!userCart) return 0;
    return cartProductData.filter((cp: any) => cp.cart_id === userCart.id)
      .length;
  }, [user, cartData, cartProductData]);

  return (
    <nav
      className={`sticky w-full top-0 shadow-md h-16 z-40 bg-white flex justify-between items-center overflow-hidden
        ${authPage && "hidden"} `}
    >
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/">
          <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            Toko Pak Edi
          </h1>
        </Link>
        <div className="flex gap-4 items-center h-full">
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
    </nav>
  );
}
