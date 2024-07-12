import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const data = await request.json();
  const order = await prisma.order.create({
    data,
  });
  return NextResponse.json(order);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.order.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Order deleted successfully' });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const order = await prisma.order.update({
    where: { id },
    data,
  });
  return NextResponse.json(order);
}