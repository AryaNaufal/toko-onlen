import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

export default function CardTrend({ src, nama_barang, qty_barang }: Params) {
  return (
    <div className="flex overflow-hidden rounded-lg cursor-pointer outline outline-1 outline-slate-200">
      <Image src={src} alt="image" width={100} height={100} />
      <div className="flex flex-col items-start justify-center w-full ml-5">
        <span>{nama_barang}</span>
        <span>{qty_barang}</span>
      </div>

    </div>
  )
}