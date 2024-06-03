import Credentials from "next-auth/providers/credentials";
import { database } from "@/src/utils/prisma";
import bcrypt from "bcryptjs";
const prisma = database.getDB();

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user) return null
        const decode = bcrypt.compareSync(credentials.password, user.password)
        if (!decode) return null

        return {
          id: user.id.toString(),
          name: user.name?.toString(),
          email: user.email
        }
      },
    })
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (!user) return token
      return {
        ...token,
        id: user.id,
        name: user.name,
        email: user.email
      }
    },
    session({ session, token }: any) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email
        }
      }
    }
  }
}
