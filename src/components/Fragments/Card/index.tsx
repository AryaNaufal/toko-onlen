import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

export default function CardProduct({ src, name, price, address }: Params) {
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div className="block relative border border-slate-200 rounded-md w-36 md:w-60 xl:w-96 overflow-hidden">
      <div className="w-full h-auto">
        <Image
          src={`https://utfs.io/f/${src}`}
          width={600}
          height={600}
          className="w-full h-full object-fill"
          alt="product"
          priority={true}
        />
      </div>

      <div className="p-2">
        <div className="font-bold">
          <p>{name}</p>
        </div>

        <div className="">
          <p>{Rupiah.format(price)}</p>
        </div>

        <div className="flex items-center text-sm gap-1">
          <div className="w-auto flex gap-1">
            <Image
              src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/phoenix/kratos/de64305b.svg"
              width={300}
              height={300}
              alt="product"
              className="w-4"
            />
            <p>4.9</p>
          </div>
          <span className="rounded-[100px]"></span>
          <p>100+ terjual</p>
        </div>

        <div className="flex text-xs">
          <Image
            src="https://images.tokopedia.net/ta/icon/badge/OS-Badge-80.png"
            width={300}
            height={300}
            alt="product"
            className="w-4"
          />
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}
