"use client"
import { useEffect, useState } from 'react'
import { BiMenu, BiX, BiSolidUser, BiSolidStore, BiSearchAlt } from 'react-icons/bi'
import Link from 'next/link'

export default function Navbar() {
  const [NavButton, setNavButton]: any = useState(true);
  // const getsessionStorage = sessionStorage.getItem('user');
  // const user = getsessionStorage ? JSON.parse(getsessionStorage) : [];
  return (
    <nav className='sticky top-0 z-50 w-auto p-5 bg-white shadow-md'>

      <div className="flex">

        {/* Tittle */}
        <h1 className='flex p-1 text-xl font-bold text-emerald-400'><Link href="/">Tokopedia Clone</Link></h1>

        <div className='flex gap-2 items-center lg:w-[55%] md:w-[40%] mx-5 px-2 border rounded-md border-slate-300'>
          <BiSearchAlt className='text-xl ' />
          <input type="text" className='w-full outline-none h-7' />
        </div>
        {/* Navbar Menu Tab & Computer */}
        <div className='absolute hidden md:block right-10'>
          <ul className='flex flex-row gap-4 text-3xl'>
            <li><Link className='flex items-center text-[20px] gap-2 hover:bg-slate-300 rounded px-2' href="/toko"><BiSolidStore /><span>Store</span></Link></li>
            <li>
              <Link className='flex items-center text-[20px] gap-2 hover:bg-slate-300 rounded px-2' href="/login">
                <BiSolidUser />
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar Button For Mobile */}
        <div>
          <button className='text-3xl md:hidden' onClick={() => setNavButton(!NavButton)}>
            {NavButton ? <BiMenu /> : <BiX />}
          </button>
        </div>

      </div>

      {/* Navbar Menu For Mobile */}
      <ul className={`${NavButton ? 'hidden' : 'block'} md:hidden pt-7`}>
        <li><Link className='flex items-center gap-2 px-2 rounded hover:bg-slate-300' href="/profile"><BiSolidUser /> Profile</Link></li>
        <li><Link className='flex items-center gap-2 px-2 rounded hover:bg-slate-300' href=""><BiSolidStore /> Store</Link></li>
      </ul>

    </nav>
  )
}
