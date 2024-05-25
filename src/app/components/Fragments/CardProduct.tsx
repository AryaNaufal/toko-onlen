import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

export default function CardProduct({ src, nama_barang, harga }: Params) {

  return (
    <div className="w-1/5 h-auto overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer outline outline-1 outline-slate-200">
      <Image src={src} alt="image" width={300} height={100} />
      <div className="flex flex-col p-2">
        <span className="text-sm">{nama_barang}</span>
        <span className="font-bold">{harga}</span>
      </div>
    </div>
  )
}