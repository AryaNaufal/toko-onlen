import { database } from "@/src/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = database.getDB();

export async function GET() {
  const cartProducts = await prisma.cartProduct.findMany();
  return NextResponse.json(cartProducts);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const cartProduct = await prisma.cartProduct.create({
    data,
  });
  return NextResponse.json(cartProduct);
}
