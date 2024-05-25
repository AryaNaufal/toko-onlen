import { database } from "@/src/utils/prisma";
import { User } from "../../users/route";
import bcrypt from "bcryptjs";
const prisma = database.getDB();

// Register
export async function POST(request: Request) {
  const { name, email, password }: User = await request.json();
  const hashPassword = bcrypt.hashSync(password, 10);

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Email dan Password does not empty" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { email }
    })
    if (userExists) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword
      }
    });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failer to create user", error);
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}