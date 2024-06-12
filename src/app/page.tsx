import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import CardProduct from "./components/Fragments/Card";
import Link from "next/link";

const product = [
  {
    src: 'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg',
    name: 'Tas',
    price: '70.000'
  },
  {
    src: 'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg',
    name: 'Sepatu',
    price: '200.000'
  },
  {
    src: 'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg',
    name: 'Baju',
    price: '100.000'
  }
]

export default async function Home(name: string) {
  const session: any = await getServerSession(authOptions as any);
  return (
    <main className="mt-10 flex justify-center h-screen overflow-hidden">

      <div className="container flex gap-2 overflow-scroll">
        {product.map((item, index) => (
          <Link href={{ pathname: `/products/${item.name}` }} key={index}>
            <CardProduct
              src={item.src}
              name={item.name}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};