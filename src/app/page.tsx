import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import CardProduct from "./components/Fragments/CardProduct";

export default async function Home() {
  const session: any = await getServerSession(authOptions as any);
  return (
    <main className="-z-50 container mx-auto justify-center items-center flex py-5 overflow-hidden h-screen">
      <section>
        <div className="flex justify-center sm:justify-start flex-wrap gap-2">
          <CardProduct src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'} nama_barang='Sepatu' harga='Rp 200.000' />
          <CardProduct src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'} nama_barang='Sepatu' harga='Rp 200.000' />
          <CardProduct src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'} nama_barang='Sepatu' harga='Rp 200.000' />
        </div>
      </section>
    </main>
  );
};