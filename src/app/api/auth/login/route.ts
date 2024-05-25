import { database } from "@/src/utils/prisma";
import bcrypt from "bcryptjs";
const prisma = database.getDB();

// Login
export async function POST(request: Request) {
  const { email, password }: { email: string, password: string } = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return new Response(JSON.stringify({ message: "Username or password is incorrect" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: "Login Success" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}