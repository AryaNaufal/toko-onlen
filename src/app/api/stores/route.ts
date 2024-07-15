import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

// Find all store
export async function GET() {
  try {
    const stores = await prisma.store.findMany()
    return new Response(JSON.stringify(stores), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

// Create store name
export async function POST(req: Request) {
  const { name, user_id, alamat }: Store = await req.json();

  if (!name) {
    return new Response('Name are required', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  // Check if store already exist
  const storeExist = await prisma.store.findFirst({ where: { name } });

  if (storeExist) {
    return new Response(
      JSON.stringify({ message: 'Store already exist' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const stores = await prisma.store.create({
      data: {
        name,
        user_id: user_id,
        alamat
      }
    });

    return new Response(
      JSON.stringify(stores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}