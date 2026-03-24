"use client";
import Loading from "@/src/components/Loading";
import { toast } from "@/src/components/ui/use-toast";
import {
  DeleteCartProduct,
  DeleteManyCartProducts,
  FetchCart,
  FetchCartProduct,
  updateCartProduct,
} from "@/src/hooks/carts/useCart";
import { FetchProducts } from "@/src/hooks/products/useProducts";
import { FetchStores } from "@/src/hooks/stores/useStore";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Trash2, Plus, Minus, Store, ChevronRight, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function CartList({ userId }: { userId: string }) {
  const { data: cartData, isLoading: cartLoading } = FetchCart();
  const { data: cartProductData, isLoading: cartProductLoading } = FetchCartProduct();
  const { data: productData, isLoading: productLoading } = FetchProducts();
  const { data: storeData, isLoading: storeLoading } = FetchStores();
  
  const { mutate: deleteProduct, isPending: isDeletePending } = DeleteCartProduct();
  const { mutate: deleteManyProducts } = DeleteManyCartProducts();
  
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [localQuantities, setLocalQuantities] = useState<{ [key: number]: number }>({});

  // Sinkronisasi data awal dari server ke state lokal
  React.useEffect(() => {
    if (cartProductData) {
      const initialQtys: { [key: number]: number } = {};
      cartProductData.forEach((cp: any) => {
        initialQtys[cp.id] = cp.qty;
      });
      setLocalQuantities(initialQtys);
    }
  }, [cartProductData]);

  // format mata uang indonesia
  const Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const matchedProducts = useMemo(() => {
    if (!cartData || !cartProductData || !productData) return [];
    
    const userCart = cartData.find((item: any) => item.user_id === userId);
    if (!userCart) return [];

    const userCartProducts = cartProductData.filter(
      (item: any) => item.cart_id === userCart.id
    );

    return userCartProducts.map((cartProduct: any) => {
      const productDetails = productData.find(
        (product: any) => product.id === cartProduct.product_id
      );
      return {
        ...cartProduct,
        productDetails,
      };
    });
  }, [cartData, cartProductData, productData, userId]);

  // Group by Store
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    matchedProducts.forEach((item: any) => {
      const storeId = item.productDetails?.user_id || "unknown";
      if (!groups[storeId]) groups[storeId] = [];
      groups[storeId].push(item);
    });
    return groups;
  }, [matchedProducts]);

  if (cartLoading || cartProductLoading || productLoading || storeLoading) return <Loading />;

  const handleUpdateQty = (id: number, delta: number, stock: number) => {
    const currentQty = localQuantities[id] || 0;
    const newQty = currentQty + delta;
    if (newQty < 1 || newQty > stock) return;
    
    setLocalQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const handleInputChange = (id: number, value: string, stock: number) => {
    if (value === "") {
      setLocalQuantities(prev => ({ ...prev, [id]: 0 }));
      return;
    }
    const num = parseInt(value);
    if (!isNaN(num)) {
      const sanitized = Math.min(stock, Math.max(0, num));
      setLocalQuantities(prev => ({ ...prev, [id]: sanitized }));
    }
  };

  const handleBlur = (id: number) => {
    if (!localQuantities[id] || localQuantities[id] < 1) {
      setLocalQuantities(prev => ({ ...prev, [id]: 1 }));
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast({ title: "Produk dihapus", description: "Produk telah dihapus dari keranjang." });
      }
    });
  };

  const handleDeleteMany = () => {
    if (selectedItems.size === 0) return;
    const idsToDelete = Array.from(selectedItems);
    deleteManyProducts(idsToDelete, {
      onSuccess: () => {
        toast({ title: "Produk dihapus", description: `${selectedItems.size} produk telah dihapus.` });
        setSelectedItems(new Set());
      }
    });
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === matchedProducts.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(matchedProducts.map((p: any) => p.id)));
    }
  };

  const totalPrice = matchedProducts
    .filter((item: any) => selectedItems.has(item.id))
    .reduce((acc: number, item: any) => {
      const qty = localQuantities[item.id] || item.qty;
      return acc + (item.productDetails?.price || 0) * qty;
    }, 0);

  if (matchedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white min-h-[60vh] rounded-2xl border border-slate-100">
        <div className="w-48 h-48 relative mb-4 opacity-50">
          <Image src="/next.svg" alt="Empty" fill className="object-contain" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Wah, keranjang belanjamu kosong</h2>
        <p className="text-slate-500 mt-2 mb-6 text-center max-w-xs">
          Yuk, isi dengan barang-barang impianmu!
        </p>
        <Button onClick={() => window.location.href = "/"} className="bg-[#00AA5B] hover:bg-[#00924e]">
          Mulai Belanja
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Keranjang</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main List */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Header / Select All */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div 
                  onClick={toggleSelectAll}
                  className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                    selectedItems.size > 0 && selectedItems.size === matchedProducts.length
                    ? "bg-[#00AA5B] border-[#00AA5B]"
                    : "border-slate-300"
                  }`}
                >
                  {selectedItems.size > 0 && <Check size={14} className="text-white" />}
                </div>
                <span className="text-sm font-bold text-slate-700">Pilih Semua ({matchedProducts.length})</span>
              </div>
              {selectedItems.size > 0 && (
                <button 
                  onClick={handleDeleteMany}
                  className="text-sm font-bold text-[#00AA5B] hover:text-[#00924e]"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Store Groups */}
            {Object.keys(groupedProducts).map((storeUserId) => {
              const store = storeData?.find((s: any) => s.user_id === storeUserId);
              const items = groupedProducts[storeUserId];
              
              return (
                <div key={storeUserId} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                    <div 
                      className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                        items.every(item => selectedItems.has(item.id))
                        ? "bg-[#00AA5B] border-[#00AA5B]"
                        : "border-slate-300"
                      }`}
                      onClick={() => {
                        const allStoreItemsSelected = items.every(item => selectedItems.has(item.id));
                        const next = new Set(selectedItems);
                        items.forEach(item => {
                          if (allStoreItemsSelected) next.delete(item.id);
                          else next.add(item.id);
                        });
                        setSelectedItems(next);
                      }}
                    >
                      {items.every(item => selectedItems.has(item.id)) && <Check size={14} className="text-white" />}
                    </div>
                    <Store size={18} className="text-slate-600 ml-1" />
                    <span className="font-bold text-slate-800 ml-1">{store?.name || "Store"}</span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  
                  <div className="flex flex-col">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 flex gap-4 border-b border-slate-50 last:border-0">
                        <div 
                          className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer flex-shrink-0 mt-8 ${
                            selectedItems.has(item.id)
                            ? "bg-[#00AA5B] border-[#00AA5B]"
                            : "border-slate-300"
                          }`}
                          onClick={() => toggleSelect(item.id)}
                        >
                          {selectedItems.has(item.id) && <Check size={14} className="text-white" />}
                        </div>

                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                          <Image
                            src={`https://utfs.io/f/${item.productDetails?.picture}`}
                            alt={item.productDetails?.name || "product"}
                            fill
                            className="object-cover bg-slate-100"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base text-slate-800 line-clamp-2 leading-snug">
                            {item.productDetails?.name}
                          </h3>
                          <div className="mt-1 font-bold text-slate-900">
                            {Rupiah.format(item.productDetails?.price || 0)}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between gap-4">
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                          
                          <div className="flex items-center border border-slate-200 rounded-lg h-8 px-1">
                            <button 
                              onClick={() => handleUpdateQty(item.id, -1, item.productDetails?.stock)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-[#00AA5B]"
                              disabled={(localQuantities[item.id] || item.qty) <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <input 
                              type="number"
                              value={localQuantities[item.id] !== undefined ? localQuantities[item.id] : item.qty}
                              onChange={(e) => handleInputChange(item.id, e.target.value, item.productDetails?.stock)}
                              onBlur={() => handleBlur(item.id)}
                              className="w-10 text-center text-xs font-bold text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button 
                              onClick={() => handleUpdateQty(item.id, 1, item.productDetails?.stock)}
                              className="w-6 h-6 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-[#00AA5B]"
                              disabled={(localQuantities[item.id] || item.qty) >= item.productDetails?.stock}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[350px]">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 text-lg">Ringkasan belanja</h3>
              
              <div className="flex justify-between items-center text-slate-600">
                <span>Total Harga ({selectedItems.size} barang)</span>
                <span>{Rupiah.format(totalPrice)}</span>
              </div>
              
              <div className="h-[1px] bg-slate-100 w-full" />
              
              <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                <span>Total Harga</span>
                <span>{Rupiah.format(totalPrice)}</span>
              </div>

              <Button 
                disabled={selectedItems.size === 0}
                className="w-full bg-[#00AA5B] hover:bg-[#00924e] text-white font-bold h-12 rounded-xl text-lg mt-2"
              >
                Beli ({selectedItems.size})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}