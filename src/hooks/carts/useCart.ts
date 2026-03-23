import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const FetchCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/carts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
  })
}

export const PostCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart_product"],
    mutationFn: async (data: any) => {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_product"] });
    }
  })
}

export const PostCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart"],
    mutationFn: async (data: any) => {
      const response = await fetch("/api/cartProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_product"] });
    }
  })
}


export const FetchCartProduct = () => {
  return useQuery({
    queryKey: ["cart_product"],
    queryFn: async () => {
      const response = await fetch("/api/cartProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
  })
}

export const updateCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart_product"],
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/cartProducts/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_product"] });
    }
  })
}

export const DeleteCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart_product"],
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/cartProducts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_product"] });
    }
  })
}

export const DeleteManyCartProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cart_product"],
    mutationFn: async (ids: number[]) => {
      const response = await fetch("/api/cartProducts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_product"] });
    },
  });
};