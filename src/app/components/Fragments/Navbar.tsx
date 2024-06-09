"use client"
import { useState } from 'react'
import { BiMenu, BiX, BiSearch } from 'react-icons/bi'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import AuthBtn from './AuthBtn';
import style from './nav.module.sass';
import { Button } from '../Elements/Button';

export default function Navbar() {
  const [NavButton, setNavButton]: any = useState(true);
  const pathName = usePathname();
  const authPage = pathName === '/login' || pathName === '/register';

  return (
    <nav className={` top-0 z-50 w-full p-5 bg-white shadow-md ${authPage ? 'hidden' : 'sticky'}`}>
      <div className='flex flex-row items-center justify-between'>
        
        {/* <h1 className='hidden md:block text-[18px] font-bold text-green-500 md:text-lg'><Link href={"/"}>Tokopedia Clone</Link></h1> */}
        <div className="flex items-center p-0 overflow-hidden bg-white border rounded text-slate-400 border-slate-400">
          <BiSearch className='mx-2' />
          <input type="text" className='flex-1 h-8 truncate border-none outline-none w-60 hover:truncate' placeholder='Cari di Disini' />
        </div>
        
        <div className='hidden md:flex md:gap-3'>
          <AuthBtn />
        </div>

        {/* Navbar Button For Mobile */}
        <button className='text-3xl md:hidden' onClick={() => setNavButton(!NavButton)}>
          {NavButton ? <BiMenu /> : <BiX />}
        </button>
      </div>

      {/* Navbar Menu For Mobile */}
      <ul className={`${NavButton ? 'hidden' : 'block'} md:hidden p-2 rounded w-full absolute bg-slate-100 shadow-md`}>

        <AuthBtn />
      </ul>

    </nav>
  );
};