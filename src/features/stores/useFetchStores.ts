import { useQuery } from "@tanstack/react-query"

export const useFetchStores =() => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const response = await fetch("/api/stores");

      return response.json();
    },
  });
};