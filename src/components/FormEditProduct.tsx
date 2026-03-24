"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "./ui/textarea";
import { UpdateProduct } from "@/src/hooks/products/useProducts";
import { toast } from "./ui/use-toast";
import { uploadFiles } from "../app/(page)/Example/imageUploader";
import { FaEdit } from "react-icons/fa";

interface EditProductProps {
  userId: string;
  product: Product;
}

export default function FormEditProduct({ userId, product }: EditProductProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock.toString(),
    price: product.price.toString(),
  });
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: updateMutate } = UpdateProduct();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let pictureKey = product.picture;

      // Handle optional image update
      if (file) {
        const uploadData = new FormData();
        uploadData.append("product_image", file);
        const uploadRes = await uploadFiles(uploadData);
        if (uploadRes?.[0]?.data?.key) {
          pictureKey = uploadRes[0].data.key;
        }
      }

      const productData = {
        id: product.id,
        user_id: userId,
        name: formData.name,
        description: formData.description,
        stock: parseInt(formData.stock),
        price: parseInt(formData.price),
        picture: pictureKey,
      };

      await updateMutate(productData);
      toast({ description: "Produk berhasil diperbarui" });
      setOpen(false);
      window.location.reload();
    } catch (error: any) {
      toast({ variant: "destructive", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 w-full flex gap-2">
          <FaEdit />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[450px] md:h-auto overflow-auto">
        <DialogTitle>Edit Produk</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nama Produk</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Stok</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Harga</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 flex justify-between">
              <span>Ganti Gambar</span>
              <span className="text-[10px]">*Kosongkan jika tidak ingin mengubah</span>
            </label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Memperbarui..." : "Update Produk"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
