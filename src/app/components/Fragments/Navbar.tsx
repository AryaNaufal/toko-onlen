"use client"
import { useState } from 'react'
import { BiMenu, BiX, BiSolidUser, BiSolidStore, BiSearch, BiUser } from 'react-icons/bi'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import AuthBtn from './AuthBtn';

export default function Navbar() {
  const [NavButton, setNavButton]: any = useState(true);
  const pathName = usePathname();
  const authPage = pathName === '/login' || pathName === '/register';

  return (
    <nav className={` top-0 z-50 w-full p-5 bg-white shadow-md ${authPage ? 'hidden' : 'sticky'}`}>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-[18px] font-bold text-green-500 md:text-lg'><Link href={"/"}>Tokopedia Clone</Link></h1>
        <div className='hidden md:flex md:gap-3'>          
          <AuthBtn />
        </div>

        {/* Navbar Button For Mobile */}
        <button className='text-3xl md:hidden' onClick={() => setNavButton(!NavButton)}>
          {NavButton ? <BiMenu /> : <BiX />}
        </button>
      </div>

      {/* Navbar Menu For Mobile */}
      <ul className={`${NavButton ? 'hidden' : 'block'} md:hidden p-2 rounded w-52 absolute bg-slate-100 right-5 shadow-md`}>
        <div className="flex items-center p-0 overflow-hidden bg-white border rounded border-slate-300">
          <BiSearch className='mx-2' />
          <input type="text" className='flex-1 w-32 h-auto border-none outline-none' />
        </div>
        <li><Link className='flex items-center gap-2 px-2 rounded hover:bg-slate-300' href="/profile"><BiSolidUser /> Profile</Link></li>
        <li><Link className='flex items-center gap-2 px-2 rounded hover:bg-slate-300' href=""><BiSolidStore /> Store</Link></li>
        <AuthBtn />
      </ul>

    </nav>
  );
};