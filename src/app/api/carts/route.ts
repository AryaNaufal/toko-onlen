import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const carts = await prisma.cart.findMany();
  return NextResponse.json(carts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const cart = await prisma.cart.create({
    data,
  });
  return NextResponse.json(cart);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.cart.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Cart deleted successfully' });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const cart = await prisma.cart.update({
    where: { id },
    data,
  });
  return NextResponse.json(cart);
}