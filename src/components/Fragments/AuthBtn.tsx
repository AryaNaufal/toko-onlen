"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiUser, BiSolidStore} from "react-icons/bi";
import { useState, useEffect } from "react";

export default function AuthBtn() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return null;
  }

  if (session) {
    return (
      <>
        <Link href="/profile" className="items-center flex gap-2 p-2 rounded hover:bg-slate-100">
          <BiUser />
          <span>{session.user?.email}</span>
        </Link>
        <Link href="/profile" className="items-center flex gap-2 p-2 rounded hover:bg-slate-100">
          <BiSolidStore />
          <span>store</span>
        </Link>
        <button className="text-white font-semibold bg-red-500 p-2 rounded" onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>
          SignOut
        </button>
      </>
    );
  } else {
    return (
      <Link className="text-white font-semibold bg-blue-500 p-2 rounded" href={"/login"}>
        SignIn
      </Link>
    );
  }
}
