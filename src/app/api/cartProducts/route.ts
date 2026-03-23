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

export async function DELETE(request: NextRequest) {
  const { ids } = await request.json();
  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
  }

  await prisma.cartProduct.deleteMany({
    where: {
      id: { in: ids.map(Number) }
    }
  });

  return NextResponse.json({ message: "Cart products deleted successfully" });
}
