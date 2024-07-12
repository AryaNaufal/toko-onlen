import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const store = await prisma.store.create({
    data,
  });
  return NextResponse.json(store);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.store.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Store deleted successfully' });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const store = await prisma.store.update({
    where: { id },
    data,
  });
  return NextResponse.json(store);
}
