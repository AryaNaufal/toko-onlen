import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const orderItems = await prisma.orderItem.findMany();
  return NextResponse.json(orderItems);
}

export async function POST(request: Request) {
  const data = await request.json();
  const orderItem = await prisma.orderItem.create({
    data,
  });
  return NextResponse.json(orderItem);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.orderItem.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'OrderItem deleted successfully' });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const orderItem = await prisma.orderItem.update({
    where: { id },
    data,
  });
  return NextResponse.json(orderItem);
}