"use client";
import { FormEvent, useState, useEffect } from "react";
import { AddStore, UpdateStore } from "../hooks/stores/useStore";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface FormAddStoreProps {
  userId: string;
  store?: Store;
}

export default function FormAddStore({ userId, store }: FormAddStoreProps) {
  const [name, setName] = useState(store?.name || "");
  const [alamat, setAlamat] = useState(store?.alamat || "");
  const router = useRouter();
  const isEdit = !!store;

  const { mutate: addMutate, isPending: isAdding } = AddStore();
  const { mutate: updateMutate, isPending: isUpdating } = UpdateStore();

  const isPending = isAdding || isUpdating;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = { id: store?.id, name, user_id: userId, alamat };

    try {
      if (isEdit) {
        updateMutate(data, {
          onSuccess: () => {
            toast({ description: "Toko berhasil diperbarui" });
            window.location.reload();
          }
        });
      } else {
        addMutate(data, {
          onSuccess: () => {
            toast({ description: "Toko berhasil dibuat" });
            window.location.reload();
          }
        });
      }
    } catch (error) {
      toast({ variant: "destructive", description: "Terjadi kesalahan" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-slate-100">
      <h1 className="font-bold text-xl md:text-2xl text-slate-800 mb-6 text-center">
        {isEdit ? "Edit Informasi Toko" : "Buka Toko Baru"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Toko</label>
          <Input
            id="name"
            value={name}
            type="text"
            placeholder="Masukkan nama tokomu"
            onChange={(e) => setName(e.target.value)}
            required
            className="border-slate-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="alamat" className="text-sm font-medium text-slate-700">Alamat Toko</label>
          <Input
            id="alamat"
            value={alamat}
            type="text"
            placeholder="Masukkan alamat lengkap toko"
            onChange={(e) => setAlamat(e.target.value)}
            required
            className="border-slate-300"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          {isPending ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Buka Toko Sekarang"}
        </Button>
      </form>
    </div>
  );
}
