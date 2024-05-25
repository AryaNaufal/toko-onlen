"use client"
import CardProduct from "./components/Fragments/CardProduct"
import CardTrend from "./components/Fragments/CardTrend"
import Carousel from "./components/Fragments/Carousel"
import Navbar from "./components/Fragments/Navbar"

interface getData {
  id: number,
  title: string,
  image: string,
  price: number
}

export default function Home() {
  const image_product = [
    "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2022/10/12/42d797e8-ca2c-4e2f-8633-aad7af869469.jpg",
    "https://images.tokopedia.net/img/cache/200-square/hDjmkQ/2022/4/8/7739f961-04c6-474c-9cdc-39ac7560bcc7.jpg",
    "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/6/17/017e3e96-be17-43a1-b23f-13b55ab4f0df.jpg",
    "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/12/4/92f17ef4-a58c-4c05-93b6-2cbde8416d7d.jpg",
    "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/5/19/9e3848ee-c1ed-4d64-9773-997e00ded75a.jpg",
    "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/1/24/536ec1c5-46b2-4f05-8f1c-b1e8428501dc.png"
  ]

  const image_trend = [
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/12/27/363b18c6-c960-47e9-bb11-ba761c92fca1.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2024/3/13/eda8e990-6a5f-43a0-9a06-438d8fb036c5.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/8/cd954cee-9123-4d4c-b926-b611807bd306.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/6/9/553b9f55-66a3-4ade-a0a5-5e7914267059.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/11/8/c0afcf9c-4623-4608-96f1-ecf451994c22.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/5/16/73504aca-dc1b-4741-b5fc-f280a6ff5dd6.png.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/3/31/d750a474-1b9d-4423-9deb-e4dc9f5aea8b.jpg.webp?ect=4g",
    "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/3/30/e15077b7-b860-451b-b36e-3da50913cf0d.jpg.webp?ect=4g"
  ]

  return (
    <>
      <Navbar />
      <main className="container">
        <section className='flex flex-col main-section'>
          {/* Promotion */}
          <div className="">
            <Carousel />
          </div>
        </section>

        <section>
          <div className="card_trend">
            <h1 className='text-xl font-bold'>Sedang Trend</h1>
            <div className='grid grid-cols-4 gap-4 my-5'>
              {image_trend.map((image, index) => (
                <CardTrend key={index} src={image} nama_barang="Nama Barang" qty_barang={100} />
              ))}
            </div>
          </div>

          <div className="card_product">
            <h1 className='text-xl font-bold'>Recomended</h1>
            <div className="flex gap-2 my-5">
              {image_product.map((image, index) => (
                <CardProduct key={index} src={image} nama_barang="Nama Barang" harga={1000} />
              ))}
            </div>
          </div>

        </section>
      </main>
    </>

  )
}