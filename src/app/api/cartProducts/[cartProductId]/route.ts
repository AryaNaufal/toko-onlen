import { database } from "@/src/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = database.getDB();

export async function PUT(request: NextRequest, context: { params: { cartProductId: string } }) {
  const { cartProductId } = context.params;
  const { ...data } = await request.json();
  const cartProduct = await prisma.cartProduct.update({
    where: {
      id: Number(cartProductId)
    },
    data
  });
  return NextResponse.json(cartProduct);
}

export async function DELETE(request: NextRequest, context: { params: { cartProductId: string } }) {
  const { cartProductId } = context.params;
  const cartProduct = await prisma.cartProduct.delete({
    where: {
      id: Number(cartProductId)
    },
  });
  return NextResponse.json(cartProduct);
}