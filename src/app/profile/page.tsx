"use client"
import Link from "next/link"
import Image from "next/image"

export default function Profile() {
  const getSessionStorage = sessionStorage.getItem('user');
  const user = getSessionStorage ? JSON.parse(getSessionStorage) : [];
  return (
    <>
      <section>
        <div className="flex justify-center items-center h-screen">

          <div className="bg-white w-11/12 p-5 rounded-md">

            <div className="foto-profile flex flex-col py-5 justify-center items-center">
              <Image src='' width={150} alt="" className="bg-gray-100 w-36 h-36 rounded-full overflow-hidden object-contain" />
              <h3 className="font-bold text-lg">{user.name}</h3>
            </div>
            <hr />

            {/* Info Profile */}
            <div className="py-3  flex flex-col gap-1">
              <h3 className="font-bold text-lg">Info Profile</h3>
              <div className="flex">
                <span>Nama:</span>
                <p>{user.name}</p>
              </div>

              <div className="flex">
                <span>Tanggal Lahir:</span>
                <p>1 January 1999</p>
              </div>

              <div className="flex">
                <span>Jenis Kelamin:</span>
                <p>Pria</p>
              </div>
            </div>

            {/* Info Pribadi */}
            <div className="py-3 flex flex-col gap-1">
              <h3 className="font-bold text-lg">Info Pribadi</h3>
              <div className="flex">
                <span>UserID:</span>
                <p>{user.id}</p>
              </div>

              <div className="flex">
                <span>Email:</span>
                <p>{user.email}</p>
              </div>

              <div className="flex">
                <span>Nomor Hp:</span>
                <p>08123</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
