"use client";
import { FormEvent, useState } from "react";
import { AddStore } from "../hooks/stores/useStore";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function FormAddStore({ userId }: any) {
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const router = useRouter();

  const { mutate, isPending } = AddStore();

  if (isPending) return <Loading />;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = { name, user_id: userId, alamat };

    try {
      mutate(data);
      window.location.reload();
      router.push("/MyStore");
    } catch (error) {
      throw new Error("Error adding product");
    }
  };

  return (
    <>
      <h1 className="ml-4 font-bold text-base md:text-xl">
        Create your Store:
      </h1>
      <div className="flex justify-center w-full px-5">
        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-3 w-72">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Store Name: </label>
              <input
                id="name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border h-7 rounded-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address">Store Address: </label>
              <input
                id="alamat"
                value={alamat}
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                className="border h-7 rounded-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 rounded-md w-24 h-10 mt-2"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
