import { authOptions } from "@/src/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };