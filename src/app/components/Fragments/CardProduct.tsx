import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

export default function CardProduct({ src, nama_barang, harga }: Params) {

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer outline outline-1 outline-slate-200">
      <Image src={src} alt="image" width={100} height={100} />
      <div className="flex flex-col p-2">
        <span className="text-sm">{nama_barang}</span>
        <span className="font-bold">{harga}</span>
      </div>
    </div>



  )
}

{/* <div className="flex-none w-64 p-4 border rounded-md">
<img src={src} alt={nama_barang} width={100} height={100} className="w-full h-48 object-cover" />
<h2 className="mt-2 text-lg font-bold">{nama_barang}</h2>
<p className="mt-1 text-sm">${harga}</p>
</div> */}