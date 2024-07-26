"use client";
import { useState } from "react";
import { useSessionUser } from "@/src/features/session/useSessionUser";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useFetchStores } from "@/src/features/stores/useFetchStores";

interface Store {
  id?: number;
  name: string;
  user_id: number;
  alamat: string;
}

async function addStore(newStore: Store) {
  const response = await fetch("/api/stores/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStore),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export default function MyShop() {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const {
    data: sessions,
    isLoading: sessionLoading,
    error: sessionError,
  } = useSessionUser();
  const { data: stores } = useFetchStores();

  const sessionUser = sessions?.[0];

  const mutation = useMutation<Store, Error, any>({
    mutationFn: addStore,
  });

  if (sessionLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p>loading...</p>
      </div>
    );

  if (sessionError) return "An error has occurred: " + sessionError.message;

  if (!sessionUser) redirect("/login"); // Harusnya di middleware

  const handleSubmit = () => {
    const newStore = {
      name: storeName,
      user_id: Number(sessionUser.id),
      alamat: storeAddress,
    };
    mutation.mutate(newStore);
  };

  const userStore: Store = stores?.find(
    (store: Store) => store.user_id === Number(sessionUser.id)
  );

  return (
    <>
      {userStore ? (
        <>
          <h1 className="font-bold">Store Profile:</h1>
          <p>Store Name: {userStore.name}</p>
          <p>Location: {userStore.alamat}</p>
        </>
      ) : (
        <div className="flex h-screen justify-center items-center gap-10">
          <div>
            <Image
              src={
                "https://i.pinimg.com/736x/12/f8/4f/12f84f1d59ba2916fb56704a59a2771c.jpg"
              }
              alt={""}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="mb-5">
              Hallo,
              <span className="font-semibold mx-2">{sessionUser.email}</span>
              ayo isi detail tokomu!
            </p>

            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Masukan Nama Toko
                </h3>
                <input
                  type="text"
                  className="rounded-md w-full mt-3"
                  placeholder="example: my store"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </li>
              <li className="ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Masukkan Alamat Tokomu
                </h3>
                <input
                  type="text"
                  className="rounded-md w-full mt-3"
                  placeholder="example: Jakarta"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />
              </li>
            </ol>

            <button
              onClick={handleSubmit}
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add Store"}
            </button>
            {mutation.isError && (
              <p className="text-red-500 mt-3">
                Error: {mutation.error.message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
