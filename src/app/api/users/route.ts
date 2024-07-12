import { NextResponse } from "next/server";
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

// Create new User
export async function POST(request: Request) {
  const { email, password }: User = await request.json();

  if (!email || !password) { // Check email and password
    return NextResponse.json({ error: 'email and password are required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) { // Check email format
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, 10),
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete User
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) { // id cant empty
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) { // id not found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Edit User
export async function PUT(request: Request) {
  try {
    const { id, email, password } = await request.json();

    if (!id) { // id cant empty
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) { // user by id not found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: email,
        password: bcrypt.hashSync(password, 10),
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
