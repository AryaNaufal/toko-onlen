import { database } from "@/src/utils/prisma";
import bcrypt from "bcryptjs";
const prisma = database.getDB();

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Find All Users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// Create User
export async function POST(request: Request) {
  const { name, email, password }: User = await request.json();

  if (name == "" || email == "" || password == "") {
    return new Response("Data tidak boleh kosong", {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        id: Number(Math.random() * 1000),
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
      },
    });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    return new Response("Email Already Exist", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}