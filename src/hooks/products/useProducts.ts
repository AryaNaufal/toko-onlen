import { useMutation, useQuery } from "@tanstack/react-query";

export const FetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};


export const AddProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (product: Product) => {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json();
    }
  })
}

export const UpdateProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (product: Product) => {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json();
    }
  })
}

export const DeleteProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (productId: number) => {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json();
    }
  })
}
