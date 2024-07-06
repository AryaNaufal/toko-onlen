import Image from 'next/image';
import style from './_BurgerMenu.module.scss';
import { BiChevronRight } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { useEffect, useState } from 'react';
import { Session } from '@/src/lib/session';

interface MainMenuProps {
  initialCookies: userSession[] | null;
}

export default function MainMenu<T extends MainMenuProps>({ initialCookies }: T) {
  const [cookies, setCookies] = useState(initialCookies);

  useEffect(() => {
    if (!initialCookies) {
      const fetchData = async () => {
        const sessionCookies = await Session();
        setCookies(sessionCookies);
      };

      fetchData();
    }
  }, [initialCookies]);

  const handleSubmit = async () => {
    const id = cookies?.map(user => user?.id).toLocaleString();
    const StoreName: any = window.prompt("Masukan nama toko")

    if (!StoreName) {
      return;
    }

    if (StoreName.length < 3) {
      return alert('Store Name must at least 8 characters');
    }

    try {
      const res = await fetch('/api/store/', {
        method: "POST",
        body: JSON.stringify({ name: StoreName, userId: Number(id) })
      });
      if (res.ok) {
        alert('Success');
        return res
      }
    } catch (error) {
      return alert(error);
    }
  }

  return (
    <div className={style.mainMenu}>
      <div className={style.container1}>
        <div className={style.headProfile}>
          <Image src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'} width={200} height={200} alt='profile' className={style.imgProfile} />
          <div className={style.infoProfile}>
            <div>
              <Image src={'https://images.tokopedia.net/img/img/HThbdi/2023/01/13/pakai_promo_member_silver.png'} width={200} height={200} alt='profile' className={style.imgProfile} />
              {cookies && cookies.length > 0 ? (
                <>
                  {cookies.map((user: userSession) => (
                    <p key={user.id}>
                      {user.email}
                    </p>
                  ))}
                </>

              ) : (
                <p>No users found</p>
              )}
            </div>
            <div>
              <Image src={'https://assets.tokopedia.net/asts/navigation-v2/global-menu/icon/gopay.svg'} width={200} height={200} alt='profile' className={style.imgProfile} />
              <p>GoPay & GoPay Coins Belum Aktif</p>
            </div>
            <div>
              <Image src={'https://assets.tokopedia.net/asts/navigation-v2/global-menu/icon/saldo_icon.svg'} width={200} height={200} alt='profile' className={style.imgProfile} />
              <p>Saldo Rp0</p>
            </div>
          </div>
          <GoGear />
        </div>

        <div className={style.plus}>
          <Image src={'https://images.tokopedia.net/img/plus/logo/account/globalmenu/checkout/Logo%20Area%20Entrypoints@4x.png'} width={200} height={200} alt='plus' className={style.imgPlus} />
          <div>
            <p>Nikmatin Bebas Ongkir tanpa batas!</p>
            <p>Min. belanja Rp0, bebas biaya aplikasi~</p>
          </div>
          <BiChevronRight />
        </div>

        <div className={style.store}>
          { }
          <button onClick={handleSubmit}>
            <h1>Buka Toko</h1>
            <BiChevronRight />
          </button>
          <div>
            <h1>Daftar Affiliate</h1>
            <BiChevronRight />
          </div>
        </div>
      </div>

      <div className={style.container2}>
        <ul>
          <li>
            <div>
              <div className="icon">
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path d="M18 2.25H6A1.76 1.76 0 0 0 4.25 4v15.13A1.75 1.75 0 0 0 7 20.59l1-.67 1.28.95a1.23 1.23 0 0 0 1.5 0l1.22-.93 1.25.93c.216.164.48.252.75.25.27.003.535-.085.75-.25l1.25-.95 1 .67a1.75 1.75 0 0 0 2.72-1.46V4A1.76 1.76 0 0 0 18 2.25Zm.25 16.88a.23.23 0 0 1-.13.22.24.24 0 0 1-.26 0l-1.44-1a.75.75 0 0 0-.87 0L14 19.56l-1.55-1.16a.75.75 0 0 0-.9 0L10 19.56 8.45 18.4a.75.75 0 0 0-.87 0l-1.44 1a.24.24 0 0 1-.26 0 .23.23 0 0 1-.13-.22V4A.25.25 0 0 1 6 3.75h12a.25.25 0 0 1 .25.25v15.13Z"></path><path d="M15.5 6.25h-7a.75.75 0 0 0 0 1.5h7a.75.75 0 1 0 0-1.5Zm0 4h-7a.75.75 0 1 0 0 1.5h7a.75.75 0 1 0 0-1.5Zm-3.5 4H8.5a.75.75 0 1 0 0 1.5H12a.75.75 0 1 0 0-1.5Z"></path></svg>
              </div>
              <p>Daftar Transaksi</p>
            </div>
          </li>
          <li>
            <div>
              <div className="icon">
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path d="M7.62 20.74A2.381 2.381 0 0 1 5.27 18l.64-3.73-2.71-2.69a2.39 2.39 0 0 1 1.32-4.07L8.27 7 10 3.57a2.38 2.38 0 0 1 4.27 0L15.9 7l3.74.54A2.39 2.39 0 0 1 21 11.58l-2.72 2.64.61 3.78a2.37 2.37 0 0 1-.89 2.29 2.41 2.41 0 0 1-2.52.18l-3.35-1.76-3.4 1.76a2.42 2.42 0 0 1-1.11.27Zm4.46-17a.87.87 0 0 0-.79.5l-2 4.1L4.74 9a.89.89 0 0 0-.49 1.51l3.27 3.19-.77 4.51a.87.87 0 0 0 .35.86.89.89 0 0 0 .94.07l4-2.13 4 2.13a.89.89 0 0 0 1.29-.93l-.78-4.51 3.28-3.19a.89.89 0 0 0-.4-1.51l-4.53-.66-2-4.1a.88.88 0 0 0-.82-.5Z"></path></svg>
              </div>
              <p>Ulasan</p>
            </div>
          </li>
          <li>
            <div>
              <div className="icon">
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path d="M21.68 7.56a1.908 1.908 0 0 0-.35-.66 1.71 1.71 0 0 0-.58-.46 1.85 1.85 0 0 0-.75-.19H6.17a1.82 1.82 0 0 0-.57.13l-.06-.3a1.91 1.91 0 0 0-2-1.83h-1a.75.75 0 0 0 0 1.5h1c.42 0 .49.07.57.59l1.09 5.54.54 2.78A3.86 3.86 0 0 0 7 16.89a3.76 3.76 0 0 0 1.54.75A2 2 0 0 0 8 19a2 2 0 0 0 4 0 2 2 0 0 0-.46-1.25h2.88a2 2 0 1 0 3.06-.12 3.8 3.8 0 0 0 1.46-.7 3.71 3.71 0 0 0 1.32-2.1l1.47-6.46V8.3a1.68 1.68 0 0 0-.05-.74Zm-2.89 6.93a2.24 2.24 0 0 1-2.2 1.76H9.38a2.25 2.25 0 0 1-2.19-1.82L6 8.1A.62.62 0 0 1 6 8v-.14a.39.39 0 0 1 .1-.08H20a.28.28 0 0 1 .13 0 .389.389 0 0 1 .1.08c.03.03.05.069.06.11a.405.405 0 0 1 0 .11l-1.5 6.41Z"></path></svg>
              </div>
              <p>Beli lagi</p>
              <BiChevronRight />
            </div>
          </li>
          <li>
            <div>
              <div className="icon">
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path d="M12.11 20.81a1.61 1.61 0 0 1-.92-.28c-2.14-1.28-6-4-7.92-7.64a6.8 6.8 0 0 1 0-7.12 5.39 5.39 0 0 1 4.6-2.54A5.1 5.1 0 0 1 12 5.55a5.14 5.14 0 0 1 4.24-2.32 5.5 5.5 0 0 1 4.56 2.56 7.62 7.62 0 0 1 .15 7c-2.31 4.17-7 7.15-8 7.7a1.63 1.63 0 0 1-.84.32ZM7.87 4.73a3.89 3.89 0 0 0-3.4 1.87c-.18.27-1.6 2.45.13 5.59 1.7 3.32 5.4 5.86 7.4 7.08a.19.19 0 0 0 .2 0c.56-.34 5.29-3.25 7.43-7.1a6.11 6.11 0 0 0-.09-5.6 4 4 0 0 0-3.29-1.86 4.12 4.12 0 0 0-3.57 2.61L12 8.68l-.67-1.34c-.84-1.68-2.07-2.61-3.46-2.61Z"></path></svg>
              </div>
              <p>Wishlist</p>
            </div>
          </li>
          <li>
            <div>
              <div className="icon">
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path fillRule="evenodd" clipRule="evenodd" d="M21.648 4.552a5.5 5.5 0 0 1 .394 5.14 5.509 5.509 0 0 1-1.292 1.828V19A1.76 1.76 0 0 1 19 20.75H5A1.76 1.76 0 0 1 3.29 19v-6.47a3.7 3.7 0 0 1-1-2.53.67.67 0 0 1 0-.24l1.77-5.31a1.75 1.75 0 0 1 1.66-1.2h7.78a5.5 5.5 0 0 1 8.148 1.302Zm-1.322 5.17a4 4 0 1 0-6.652-4.444 4 4 0 0 0 6.652 4.444ZM5.48 4.92l-1.73 5.19a2.25 2.25 0 0 0 4.5-.11.75.75 0 0 1 1.5 0A2.25 2.25 0 0 0 12 12.25a2.17 2.17 0 0 0 1.44-.56 5.49 5.49 0 0 1-1.2-6.94H5.72a.26.26 0 0 0-.24.17ZM10.75 17v2.25h2.5V17a.25.25 0 0 0-.25-.25h-2a.25.25 0 0 0-.25.25Zm8.427 2.177A.25.25 0 0 0 19.25 19v-6.48a5.509 5.509 0 0 1-4.5 0A3.712 3.712 0 0 1 9 12.23a3.67 3.67 0 0 1-4.25 1.29V19a.25.25 0 0 0 .25.25h4.25V17A1.76 1.76 0 0 1 11 15.25h2A1.76 1.76 0 0 1 14.75 17v2.25H19a.25.25 0 0 0 .177-.073Zm-2.147-9.36a.76.76 0 0 1-.42-.127 5.41 5.41 0 0 1-1.85-1.84 1.67 1.67 0 0 1 0-1.74 1.24 1.24 0 0 1 2.24.22 1.31 1.31 0 0 1 1.2-.83 1.27 1.27 0 0 1 1.07.61 1.88 1.88 0 0 1 0 1.74 5.9 5.9 0 0 1-1.82 1.84.76.76 0 0 1-.42.127Z"></path></svg>
              </div>
              <p>Toko yang di-follow</p>
            </div>
          </li>
        </ul>
      </div>

      <div className={style.container3}>
        <ul>
          <li>
            <div>
              <div className='icon'>
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path d="M16.48 2a5.49 5.49 0 0 0-5.14 3.55 4.22 4.22 0 0 0-1.59-.32A4.26 4.26 0 0 0 5.5 9.5a4.21 4.21 0 0 0 1.62 3.31 6.49 6.49 0 0 0-3.87 5.94V20A1.76 1.76 0 0 0 5 21.75h9.5A1.76 1.76 0 0 0 16.25 20v-1a6.8 6.8 0 0 0-3.89-6.16 4.27 4.27 0 0 0 .86-.89A5.43 5.43 0 0 0 16.48 13a5.5 5.5 0 0 0 0-11Zm-.75 3.3a.75.75 0 1 1 1.5 0v2.2a.75.75 0 1 1-1.5 0V5.3Zm-6 1.43a2.67 2.67 0 0 1 1.27.34v.45a5.51 5.51 0 0 0 1.14 3.35 2.74 2.74 0 1 1-2.39-4.12l-.02-.02Zm5 12.24v1a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.22v-1.25a5 5 0 0 1 5-5h.15A5.16 5.16 0 0 1 14.75 19l-.02-.03Zm1.73-8.71a.77.77 0 1 1 .77-.77.76.76 0 0 1-.75.79l-.02-.02Z"></path></svg>
              </div>
              <p>Pesanan Dikomplain</p>
            </div>
          </li>
          <li>
            <div>
              <div className='icon'>
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path fillRule="evenodd" clipRule="evenodd" d="M21.71 9.29a2.28 2.28 0 0 0-2.33-2 1.13 1.13 0 0 0-.55.15 7.73 7.73 0 0 0-13.7 0 1.16 1.16 0 0 0-.55-.15 2.27 2.27 0 0 0-2.35 2.13v2.15a2.26 2.26 0 0 0 2.35 2.17h.15a7.75 7.75 0 0 0 14.5 0h.15c.318 0 .633-.057.93-.17A8.75 8.75 0 0 1 17 18.42a7.842 7.842 0 0 1-1.82 1.09.762.762 0 1 0 .32 1.49.66.66 0 0 0 .3-.07A8.62 8.62 0 0 0 18 19.6c2.89-2.17 4.3-5.31 4.3-9.61a.74.74 0 0 0-.59-.7ZM4.23 12.18a.7.7 0 0 1-.5-.61V9.42a.71.71 0 0 1 .5-.61v3.37ZM12 17.24a6.25 6.25 0 1 1-.04-12.5 6.25 6.25 0 0 1 .04 12.5Zm8.25-5.67a.7.7 0 0 1-.5.61V8.81a.71.71 0 0 1 .5.61v2.15ZM15 11.24a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0 .75.75 0 1 0-1.5 0 3.75 3.75 0 1 0 7.5 0 .76.76 0 0 0-.75-.75Zm-4.53 8.72a.75.75 0 0 1 .53-.22h2a.75.75 0 1 1 0 1.5h-2a.75.75 0 0 1-.53-1.28Z"></path></svg>
              </div>
              <p>Bantuan Tokopedia Care</p>
            </div>
          </li>
          <li>
            <div>
              <div className='icon'>
                <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="var(--NN950, #212121)" style={{ "display": "inline-block", "verticalAlign": "middle" }}><path fillRule="evenodd" clipRule="evenodd" d="M19.8 2.24h-2.2a.75.75 0 0 0 0 1.5h2.2c.26 0 .45.15.45.36v2.2a.75.75 0 1 0 1.5 0V4.1a1.89 1.89 0 0 0-1.95-1.86ZM21 16.85a.75.75 0 0 0-.75.75v2.2a.35.35 0 0 1-.35.34h-2.2a.75.75 0 1 0 0 1.5h2.2a1.84 1.84 0 0 0 1.85-1.84v-2.2a.75.75 0 0 0-.75-.75ZM3.527 6.827A.76.76 0 0 1 3 7.05a.76.76 0 0 1-.75-.75V4.1A1.86 1.86 0 0 1 4.1 2.24h2.3a.75.75 0 0 1 0 1.5H4.1a.36.36 0 0 0-.35.36v2.2a.76.76 0 0 1-.223.527ZM6.3 20.24H4.1c-.2 0-.35-.18-.35-.44v-2.2a.75.75 0 1 0-1.5 0v2.2a1.87 1.87 0 0 0 1.85 1.94h2.2a.75.75 0 1 0 0-1.5Zm11.7-9.5h-4a.75.75 0 0 1-.75-.75v-4a.76.76 0 0 1 .75-.75h4a.75.75 0 1 1 0 1.5h-3.25v2.5H18a.75.75 0 1 1 0 1.5Zm-8-5.5H6a.76.76 0 0 0-.75.76v4a.75.75 0 1 0 1.5 0V6.74h2.5V10a.75.75 0 1 0 1.5 0V6a.76.76 0 0 0-.75-.76Zm-4 8h4a.76.76 0 0 1 .75.76v3.99a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-4a.76.76 0 0 1 .75-.75Zm.75 4h2.5v-2.5h-2.5v2.5Zm11.78 1.29a.75.75 0 0 0 .22-.53v-4a.75.75 0 1 0-1.5 0v3.25H14a.75.75 0 1 0 0 1.5h4a.75.75 0 0 0 .53-.22ZM13.5 14.5a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5Z"></path></svg>
              </div>
              <p>Scan Kode QR</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};