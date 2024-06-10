import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { Button } from "../Elements/Button";

export default function CardProduct({ src, nama_barang, harga }: Params) {

  return (
    <div className="-z-10 overflow-hidden w-60 bg-white rounded-lg shadow-lg">
      <Image src={src} alt="image" priority={true} width={300} height={300} className="h-32 w-80 object-cover"/>
      <div className="flex flex-col p-2">
        <span className="text-sm">{nama_barang}</span>
        <div className="flex justify-between items-center">
          <span className="font-bold">{harga}</span>
          <Button className="bg-green-500">Buy</Button>
        </div>
      </div>
    </div>
  )
}