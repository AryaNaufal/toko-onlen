"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { GoGear } from "react-icons/go";
import { useSessionUser } from "@/src/features/session/useSessionUser";
import Link from "next/link";
import { useFetchStores } from "@/src/features/stores/useFetchStores";
import SearchInput from "../../Elements/Search";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const [NavButton, setNavButton]: any = useState(true);
  const { data: session } = useSessionUser();
  const { data: store } = useFetchStores();

  const pathName = usePathname();
  const router = useRouter();
  const authPage = pathName === "/login" || pathName === "/register";

  const sessionId = session?.map((session: userSession) => session.id);
  const sessionEmail = session?.map((session: userSession) => session.email);

  const storeValidation: Store = store?.find(
    (store: Store) => store.user_id == Number(sessionId)
  );

  const handleClick: any = (e: any) => {
    e.preventDefault();
    router.refresh();
    router.push("/myshop");
    setNavButton(true);
  };

  const handleSearch = (query: any) => {
    router.push(`/result?search=${query}`);
  };

  return (
    <section className={`sticky top-0 z-50 ${authPage && "hidden"}`}>
      <nav className="bg-white h-16 w-full shadow-md">
        <div className="container flex items-center justify-end h-full">
          <div className="flex w-full items-center gap-5 md:gap-10">
            <Link href={"/"}>
              <h2 className="hidden sm:block text-md md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-purple-400 to-red-400">
                Toko Pak Edi
              </h2>
            </Link>
            {/* Search */}
            <div className="flex items-center h-fit w-fit border border-solid border-slate-500 p-1 rounded-md text-slate-500 text-xl">
              {/* <SearchInput /> */}
              <SearchInput onSearch={handleSearch} />
            </div>
          </div>
          {/* Menu */}
          <div className="flex items-center gap-1">
            <div className="relative pr-2">
              <FaShoppingCart className="text-2xl" />
              <div className="drawer absolute top-0 right-0 text-white flex items-center justify-center bg-red-500 rounded-full h-3 w-3 p-2">
                <p style={{ fontSize: "7px" }}>10</p>
              </div>
            </div>
            <button onClick={() => setNavButton(!NavButton)}>
              {NavButton && <LuMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Display */}
      <div
        className={`fixed bottom-0 z-40 w-full h-full bg-slate-200 transition-transform transform  ${
          NavButton ? "translate-y-full" : "translate-y-0"
        } ease-out duration-300`}
      >
        <nav className="bg-white w-full h-14 border-b">
          {/* Close Button */}
          <div className="container flex items-center justify-end h-full">
            <button onClick={() => setNavButton(!NavButton)}>
              <IoClose className="rounded-full right-0 top-4 text-3xl" />
            </button>
          </div>
        </nav>
        <div className="bg-white py-3 mb-5">
          {/* Head profile */}
          <div className="container mb-3">
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-3 md:gap-5">
                {/* Profile image */}
                <Image
                  src={
                    "https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg"
                  }
                  alt=""
                  width={200}
                  height={200}
                  className="rounded-full w-16"
                />
                <div className="flex flex-col gap-1">
                  {/* Profile email */}
                  <div className="flex gap-1 items-center">
                    <Image
                      src={
                        "https://images.tokopedia.net/img/img/HThbdi/2023/01/13/pakai_promo_member_silver.png"
                      }
                      width={200}
                      height={200}
                      alt="profile"
                      className="rounded-full w-4"
                    />
                    <p className="text-sm font-bold">
                      {sessionId ? (
                        sessionEmail
                      ) : (
                        <Link href={"/login"}>Login</Link>
                      )}
                    </p>
                  </div>
                  {/* Gopay */}
                  <div className="flex gap-1 items-center">
                    <Image
                      src={
                        "https://assets.tokopedia.net/asts/navigation-v2/global-menu/icon/gopay.svg"
                      }
                      width={200}
                      height={200}
                      alt="profile"
                      className="rounded-full w-4"
                    />
                    <p className="text-xs">GoPay & GoPay Coins Belum Aktif</p>
                  </div>
                  {/* Saldo */}
                  <div className="flex gap-1 items-center">
                    <Image
                      src={
                        "https://assets.tokopedia.net/asts/navigation-v2/global-menu/icon/saldo_icon.svg"
                      }
                      width={200}
                      height={200}
                      alt="profile"
                      className="rounded-full w-4"
                    />
                    <p className="text-xs">Saldo Rp999.999.999</p>
                  </div>
                </div>
              </div>
              <GoGear className="text-xl right-0" />
            </div>
          </div>
          {/* Plus */}
          <div className="container mb-3">
            <div className="border flex items-center justify-between border-slate-300 rounded-md px-2">
              <div className="flex gap-2 items-center">
                <Image
                  src={
                    "https://images.tokopedia.net/img/plus/logo/account/globalmenu/checkout/Logo%20Area%20Entrypoints@4x.png"
                  }
                  width={200}
                  height={200}
                  alt="profile"
                  className="rounded-full w-10"
                />
                <div className="flex flex-col text-xs">
                  <p>Nikmatin Bebas Ongkir tanpa batas!</p>
                  <p>Min. belanja Rp0, bebas biaya aplikasi~</p>
                </div>
              </div>
              <BiChevronRight className="text-lg md:text-xl lg:text-2xl" />
            </div>
          </div>
          <div className="container">
            <div className="flex justify-between gap-3">
              {storeValidation ? (
                <button
                  onClick={handleClick}
                  className="border border-slate-300 p-2 flex items-center justify-between rounded-md w-[50%] text-xs"
                >
                  <p className="font-semibold">{storeValidation.name}</p>
                  <BiChevronRight className="text-lg md:text-xl lg:text-2xl" />
                </button>
              ) : (
                <button
                  onClick={handleClick}
                  className="border border-slate-300 p-2 flex items-center justify-between rounded-md w-[50%] text-xs"
                >
                  <p className="font-semibold">Buka Toko</p>
                  <BiChevronRight className="text-lg md:text-xl lg:text-2xl" />
                </button>
              )}
              <button
                className="border border-slate-300 p-2 flex items-center justify-between rounded-md w-[50%] text-xs"
                disabled
              >
                <p className="font-semibold">Daftar Affiliate</p>
                <BiChevronRight className="text-lg md:text-xl lg:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
