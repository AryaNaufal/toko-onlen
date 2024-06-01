"use client"
import Link from "next/link"
import Image from "next/image"
import { BiChevronRight } from "react-icons/bi";

export default function Profile() {
  // const getSessionStorage = sessionStorage.getItem('user');
  // const user = getSessionStorage ? JSON.parse(getSessionStorage) : [];
  return (
    <>
      <div className="flex justify-center h-screen overflow-hidden">

        <div className="bg-white rounded-md">

          <div className="foto-profile flex flex-col py-5 justify-center items-center">
            <Image
              src={'https://i.pinimg.com/736x/85/fa/d1/85fad1ebf58dedcc2ff2010021465e03.jpg'}
              width={150}
              height={150}
              alt=""
              className="bg-gray-100 w-40 h-40 rounded-full overflow-hidden object-cover"
            />
            <Link href={"/profile"} className="font-bold text-lg text-green-500 pt-5">Ubah Foto Profile</Link>
          </div>
          <hr />

          {/* Info Profile */}
          <div className="py-3 flex flex-col gap-1">
            <h3 className="font-bold text-lg">Info Profile</h3>

            <Link href={"/profile/nama"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Nama:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">Tono Sutono Sujoyo</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile/username"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Username:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">Tono Keren</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile/bio"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Bio:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, explicabo!</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>
          </div>

          {/* Info Pribadi */}
          <div className="py-3 flex flex-col gap-1">
            <h3 className="font-bold text-lg">Info Pribadi</h3>
            <Link href={"/profile"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">User ID:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">12345678</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Email:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">Tono@example.com</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">No HP:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">08123456789</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Jenis Kelamin:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">Pria</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

            <Link href={"/profile"} className="p-1 flex justify-between text-slate-500 items-center rounded hover:bg-slate-100">
              <div className="flex text-sm">
                <span className="w-28 min-w-28">Tanggal Lahir:</span>
                <p className="text-black text-wrap line-clamp-1 w-36 sm:w-64">23 Agustus 2003</p>
              </div>
              <BiChevronRight className="text-xl font-bold" />
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}
