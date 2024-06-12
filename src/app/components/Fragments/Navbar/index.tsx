"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation';
import style from './_Navbar.module.scss'
import { BiSearch } from 'react-icons/bi';
import { CiMail, CiBellOn, CiShoppingCart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import BurgerMenu from '../BurgerMenu';

export default function Navbar() {
  const [NavButton, setNavButton]: any = useState(true);
  const pathName = usePathname();
  const authPage = pathName === '/login' || pathName === '/register';

  return (
    <nav className={style.navbar} style={{ 'display': `${authPage ? 'none' : 'block'}` }}>
      <div className={style.wrapper}>
        <div className={style.search}>
          <BiSearch className={style.searchIcon} />
          <input type="text" className={style.input} placeholder='Cari di Disini' />
        </div>
        <div className={style.menu}>
          <CiMail />
          <CiBellOn />
          <CiShoppingCart />
          <button onClick={() => setNavButton(!NavButton)}>
            {NavButton ? <LuMenu /> : <LuMenu />}
          </button>
        </div>
        <div className={`${style.profileMenu} ${NavButton ? style.hide : style.show}`}  >
          <div className={style.heading}>
            <button className={style.closeBtn} onClick={() => setNavButton(!NavButton)}>
              <IoClose />
            </button>
            <h1>Menu Utama</h1>
          </div>
          <div className={style.content}>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};