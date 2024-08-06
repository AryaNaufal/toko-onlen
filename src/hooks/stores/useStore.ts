import { useMutation, useQuery } from "@tanstack/react-query";

export const FetchStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const response = await fetch("/api/stores", {
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
  })
}

export const AddStore = () => {
  return useMutation({
    mutationKey: ["stores"],
    mutationFn: async (store: Store) => {
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onError: () => {
      throw new Error("Error adding store");
    },
  })
};