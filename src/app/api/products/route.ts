import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// Add product
export async function POST(req: Request) {
  const { user_id, name, description, stock, picture, price }: Product = await req.json();
  const product = await prisma.product.create({
    data: {
      user_id,
      name,
      description,
      stock,
      picture: picture || '',
      price,
    },
  });
  return NextResponse.json(product);
}
