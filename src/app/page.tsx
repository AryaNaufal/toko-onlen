"use client"
import CardProduct from "./components/Fragments/CardProduct"

export default function Home() {
  return (
    <main className="container mx-auto items-center justify-center flex pt-5">
      <section className='w-52 sm:w-80 md:w-[27rem] lg:w-[35rem'>
        <div className="flex flex-row flex-wrap gap-2">
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </section>
    </main>
  );
};