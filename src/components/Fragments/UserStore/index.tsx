"use client";
import { FetchStores } from "@/src/hooks/stores/useStore";
import { useUser } from "@clerk/nextjs";
import { FetchProducts, DeleteProduct } from "@/src/hooks/products/useProducts";
import Loading from "../../Loading";
import FormAddProduct from "../../FormAddProduct";
import FormEditProduct from "../../FormEditProduct";
import CardProduct from "../Card";
import Link from "next/link";
import FormAddStore from "../../FormAddStore";
import { useState } from "react";
import { FaTrash, FaStore, FaBox, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
import { Button } from "../../ui/button";
import { toast } from "../../ui/use-toast";

interface UserIdProps {
  userId: string;
}

export default function UserStore({ userId }: UserIdProps) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("products");
  const { data: ProductData, isLoading: ProductLoading } = FetchProducts();
  const { data: StoreData, isLoading: StoreLoading } = FetchStores();
  const { mutate: deleteMutate } = DeleteProduct();

  if (ProductLoading || StoreLoading) return <Loading />;

  const checkStore = StoreData?.find(
    (store: Store) => store.user_id === userId
  );

  const checkProduct = ProductData?.filter(
    (product: Product) => product.user_id === userId
  );

  const outOfStockCount = checkProduct?.filter((p: Product) => p.stock === 0).length || 0;

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      deleteMutate(productId, {
        onSuccess: () => {
          toast({ description: "Produk berhasil dihapus" });
          window.location.reload();
        }
      });
    }
  };

  if (!checkStore) {
    return <FormAddStore userId={userId} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <FaStore className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{checkStore.name}</h1>
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                <FaMapMarkerAlt />
                <span>{checkStore.alamat}</span>
              </div>
            </div>
          </div>
          <FormAddProduct userId={userId} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-md">
              <FaBox className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Produk</p>
              <p className="text-xl font-bold text-slate-800">{checkProduct?.length || 0}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-md">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Stok Habis</p>
              <p className="text-xl font-bold text-slate-800">{outOfStockCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-2 font-medium transition-colors ${
            activeTab === "products"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Daftar Produk
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 px-2 font-medium transition-colors ${
            activeTab === "settings"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Pengaturan Toko
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "products" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {checkProduct && checkProduct.length > 0 ? (
              checkProduct.map((product: Product) => (
                <div key={product.id} className="relative group bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
                  <Link href={`/Product/${product.name}?id=${product.id}`}>
                    <CardProduct
                      src={product.picture}
                      name={product.name}
                      price={product.price}
                      address={checkStore.alamat}
                    />
                  </Link>
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FormEditProduct userId={userId} product={product} />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="w-full flex gap-2"
                      onClick={() => handleDeleteProduct(product.id as number)}
                    >
                      <FaTrash className="text-sm" />
                      Hapus
                    </Button>
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                      STOK HABIS
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                <p className="text-slate-500">Belum ada produk. Tambahkan produk pertamamu!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <FormAddStore userId={userId} store={checkStore} />
          </div>
        )}
      </div>
    </div>
  );
}
