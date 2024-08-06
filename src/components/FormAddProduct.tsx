"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { AddProduct } from "@/src/hooks/products/useProducts";
import { toast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import Loading from "@/src/components/Loading";
import { uploadFiles } from "../app/(page)/Example/imageUploader";

interface AddProductProps {
  userId: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // max 5MB

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 5 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 10 characters.",
  }),
  stock: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Price must be greater than 0.")
  ),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Price must be greater than 0.")
  ),
  product_image: z.custom(
    (files) => {
      if (!(files instanceof FileList) || files.length === 0) {
        return false;
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > MAX_FILE_SIZE) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Please upload a file not exceeding 5MB.",
    }
  ),
});

export default function FormAddProduct({ userId }: AddProductProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      stock: 0,
      price: 0,
      product_image: null,
    },
  });

  const { mutate, isPending } = AddProduct();

  if (isPending) return <Loading />;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("product_image", values.product_image![0]);
    const response = await uploadFiles(formData);
    const data = {
      ...values,
      user_id: userId,
      picture: response[0].data?.key,
    };

    try {
      const response: any = mutate(data);
      if (response) {
        toast({
          description: "Product Added",
        });
      }
      window.location.reload();
    } catch (error: Error | any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className="font-semibold text-white bg-green-500 py-2 px-3 rounded-md">
        Add Product
      </DialogTrigger>
      <DialogContent className="h-[450px] md:h-auto overflow-auto">
        <DialogTitle>Add Product</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-600"
                      placeholder="Your Prodcut Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-slate-600"
                      placeholder="Type product description here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl typeof="number">
                    <Input
                      {...field}
                      className="border-slate-600"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl typeof="number">
                    <Input
                      {...field}
                      className="border-slate-600"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="border-slate-600"
                      onChange={(e) => field.onChange(e.target.files)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
