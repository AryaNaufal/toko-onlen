import { Session } from "@/src/lib/session"
import { useQuery } from "@tanstack/react-query"
import { getSession } from "next-auth/react"

export const useSessionUser = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await Session()

      return res;
    }
  })
}