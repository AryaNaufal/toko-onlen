import { Metadata } from "next"
import style from './_Details.module.scss'
import Image from "next/image"

type Props = {
  params: {
    productId: string
  }
}

// Generate Metadata with params
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const title = await new Promise(resolve => {
    setTimeout(() => resolve(`iPhone ${params.productId}`), 100);
  });
  return {
    title: `Product ${title}`,
    description: 'Generated by create next app',
  }
}

export default function ProductDetails({ params }: Props) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>

        <div className={style.product}>
          <Image src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'} width={300} height={300} alt="product image" />
          <p className={style.price}>Rp 100.000</p>
          <h1 className={style.name}>{params.productId}</h1>
          <p className={style.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate error eligendi, vero esse tenetur aliquid ea, ullam quidem quae corrupti natus aperiam! Velit cumque distinctio delectus voluptatibus ex alias, commodi sed omnis at accusantium repellendus nam dicta, voluptas quia aut suscipit ullam et culpa odit voluptatum. Velit odit soluta provident at, adipisci et! Ea hic nihil asperiores cupiditate eveniet! Illum rem unde vero accusamus alias enim magni. Quibusdam iure sed non deserunt error quod beatae nulla itaque voluptates eligendi quis quae consequatur aliquid, fuga facere voluptatum aliquam placeat amet deleniti unde nemo maiores. Ullam ducimus dolor possimus facilis at consequuntur.
          </p>
        </div>

        <div className={style.buyrate}>
          <div className={style.rating}>

            <div>
              <p>Ulasan Pembeli</p>
              <p>Lihat Semua</p>
            </div>

            <div className={style.ratenum}>
              <svg className="unf-icon" viewBox="0 0 24 24" width="20" height="20" fill="var(--YN300, #FFC400)" arial-label="rating" style={{ "display": "inline-block", "marginRight": "6px", "verticalAlign": "middle", }}><path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path></svg>

              <span>4.9</span>
              <span>150 rating</span>
              <span></span>
              <span>45 ulasan</span>
            </div>

            <div className={style.ratetype}>
              <p>Kualitas Barang (20)</p>
              <p>Pelayanan Penjual (20)</p>
            </div>

          </div>

          <div className={style.slider}></div>
          <div className={style.comment}></div>
        </div>

      </div>
    </div>
  )
}