import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import style from "./_Card.module.scss";

export default function CardProduct({ src, name, price }: Params) {
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div className={style.card}>
      <div className={style.productImage}>
        <Image src={src} width={300} height={300} alt="product" />
      </div>

      <div className={style.info}>
        <div className={style.name}>
          <p>{name}</p>
        </div>

        <div className={style.price}>
          <p>{Rupiah.format(price)}</p>
        </div>

        <div className={style.rate}>
          <div>
            <Image
              src={
                " https://assets.tokopedia.net/assets-tokopedia-lite/v2/phoenix/kratos/de64305b.svg"
              }
              width={300}
              height={300}
              alt="product"
            />
            <p>4.9</p>
          </div>
          <span></span>
          <p>100+ terjual</p>
        </div>

        <div className={style.location}>
          <Image
            src={" https://images.tokopedia.net/ta/icon/badge/OS-Badge-80.png"}
            width={300}
            height={300}
            alt="product"
          />
          <p>Jakarta Pusat</p>
        </div>
      </div>
    </div>
  );
}
