import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get product by ID
export async function GET(req: Request, context: { params: { productId: string } }) {
  const { productId } = context.params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId)
    }
  });
  if (!product) {
    return new Response(JSON.stringify("Product not found"), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  return NextResponse.json(product);
}

// Update product
export async function PATCH(req: Request, context: { params: { productId: string } }) {
  const { productId } = context.params;
  const { user_id, name, description, stock, picture, price }: Product = await req.json();
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(productId)
      },
      data: {
        user_id,
        name,
        description,
        stock,
        picture,
        price
      }
    });
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}

// Delete product
export async function DELETE(req: Request, context: { params: { productId: string } }) {
  const { productId } = context.params;
  const product = await prisma.product.delete({
    where: {
      id: Number(productId)
    }
  });
  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
  });
}