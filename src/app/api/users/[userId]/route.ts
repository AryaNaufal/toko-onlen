import { NextResponse } from 'next/server';
import { database } from "@/src/utils/prisma";

const prisma = database.getDB();

// Get User By ID
export async function GET(request: Request, context: { params: { userId: string } }) {
  const { userId } = context.params;

  if (!userId) { // id cant empty
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) { // id not exist
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
