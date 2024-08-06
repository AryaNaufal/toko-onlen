"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdCart } from "react-icons/io";
import { FaStore } from "react-icons/fa";

export default function Navbar() {
  const pathName = usePathname();
  const authPage = pathName === "/sign-in" || pathName === "/sign-up";

  return (
    <nav
      className={`sticky w-full top-0 shadow-md p-4 h-16 z-40 bg-white flex justify-between items-center overflow-hidden
        ${authPage && "hidden"} `}
    >
      <Link href="/">
        <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Toko Pak Edi
        </h1>
      </Link>
      <div className="flex gap-4 items-center h-full">
        <div className="flex gap-2">
          <Link href="/Cart">
            <button
              className={`font-semibold border border-slate-200 rounded-md p-2 ${
                pathName === "/Cart" && "bg-green-500 text-white"
              }`}
            >
              <IoMdCart />
            </button>
          </Link>
          <Link href="/MyStore">
            <button
              className={`font-semibold border border-slate-200 rounded-md p-2 ${
                pathName === "/MyStore" && "bg-green-500 text-white"
              }`}
            >
              <FaStore />
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
    </nav>
  );
}
