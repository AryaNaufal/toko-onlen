"use client"
import { usePathname } from "next/navigation";
import { Button } from '@/src/components/Elements/Button';
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <div className="bg-white p-4 rounded-lg shadow-md">
        {pathname === "/register" ? (
          <h1 className="text-center font-bold text-2xl my-3">Daftar</h1>
        ) : (
          <h1 className="text-center font-bold text-2xl my-3">Masuk</h1>
        )}

        {children}

        {pathname === "/register" ? (
          <Link href={"/login"}>
            <Button variant='danger' type={""} style={{'width': '100%', 'marginTop': '10px'}}>
              Back
            </Button>
          </Link>
        ) : (
          <Link href={"/register"}>
            <Button variant='warning' type={""} style={{'width': '100%', 'marginTop': '10px'}}>
              Register
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};