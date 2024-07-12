import Image from "next/image";

export default function myShop() {
  return (
    <div className="flex h-screen">
      <div>
        <Image src={'https://i.pinimg.com/736x/12/f8/4f/12f84f1d59ba2916fb56704a59a2771c.jpg'} alt={''} width={50} height={50} />
      </div>
      <div>
        <p>Hallo, user ayo isi detail tokomu!</p>

        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Masukkan No. HP-mu</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">+62 696969</p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Masukan Nama Toko dan Domain</h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
          </li>
          <li className="ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Masukkan Alamat Tokomu</h3>
          </li>
        </ol>

      </div>
    </div>
  )
}