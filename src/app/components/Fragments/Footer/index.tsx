'use client'
import Image from "next/image";
import style from "./_Footer.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  const authPage = pathName === '/login' || pathName === '/register';

  return (
    <footer className={style.footer} style={{ 'display': `${authPage ? 'none' : 'block'}` }}>
      <ul className={style.wrapper}>
        <li>
          <Link href={'/'} className={`${pathName === '/' && style.active}`}>
            <Image
              src={
                `${pathName === '/'
                  ? "https://images.tokopedia.net/img/iEWsxH/2024/4/21/6dad9310-318c-49ca-8a33-e26f5a84979c.png?ect=4g"
                  : "https://images.tokopedia.net/img/iEWsxH/2024/4/21/9ffc8d54-59a2-4a15-84eb-183e7f9196a3.png?ect=4g"
                }`}
              alt="transaction"
              width={20}
              height={20}
            />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href={'/feed'} className={`${pathName === '/feed' && style.active}`}>
            <Image
              src={
                `${pathName === '/feed'
                  ? "https://images.tokopedia.net/img/iEWsxH/2024/4/21/4fe11f37-0822-4a96-af55-2230aba0222d.png?ect=4g"
                  : "https://images.tokopedia.net/img/iEWsxH/2024/4/21/636aa35b-4ba1-4fab-9ea2-6d44ec2dd021.png?ect=4g"
                }`}
              alt="transaction"
              width={20}
              height={20}
            />
            <p>Feed</p>
          </Link>
        </li>
        <li>
          <Link href={'/official-store'}>
            <Image
              src={
                `${pathName === '/official-store'
                  ? "https://assets.tokopedia.net/assets-tokopedia-lite/v2/poseidon/kratos/1200192a.svg"
                  : "https://images.tokopedia.net/img/iEWsxH/2024/4/21/96c4167d-0e11-4404-8e70-e302b3545d47.png?ect=4g"
                }`}
              alt="transaction"
              width={20}
              height={20}
            />
            <p>Official Store</p>
          </Link>
        </li>
        <li>
          <Link href={'/wishlist'} className={`${pathName === '/wishlist' && style.active}`}>
            <Image
              src={
                `${pathName === '/wishlist'
                  ? "https://images.tokopedia.net/img/iEWsxH/2024/4/21/29a1583b-5d9c-4289-87cc-c0566c9bc730.png?ect=4g"
                  : "https://images.tokopedia.net/img/iEWsxH/2024/4/21/ab1d3e96-78d0-4868-9c4b-845a8278daf8.png?ect=4g"
                }`}
              alt="transaction"
              width={20}
              height={20}
            />
            <p>Whishlist</p>
          </Link>
        </li>
        <li>
          <Link href={'/transaction'} className={`${pathName === '/transaction' && style.active}`}>
            <Image
              src={
                `${pathName === '/transaction'
                  ? "https://images.tokopedia.net/img/iEWsxH/2024/4/21/bedeec40-de62-4398-aef7-aede4a4b9fa3.png?ect=4g"
                  : "https://images.tokopedia.net/img/iEWsxH/2024/4/21/3b10de4f-3cf6-416e-ac51-b3cc73d92f35.png?ect=4g"
                }`}
              alt="transaction"
              width={20}
              height={20}
            />
            <p>Transaction</p>
          </Link>
        </li>
      </ul>
    </footer>
  )
}