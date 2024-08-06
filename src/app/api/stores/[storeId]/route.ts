import { database } from "@/src/utils/prisma";

const prisma = database.getDB();

// Find store by id
export async function GET(req: Request, context: { params: { storeId: string } }) {
  const { storeId } = context.params;

  try {
    const store = await prisma.store.findUnique({
      where: {
        id: Number(storeId)
      }
    });
    if (!store) {
      return new Response(JSON.stringify("Store not found"), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    return new Response(JSON.stringify(store), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }
}

// Update store
export async function PATCH(req: Request, context: { params: { storeId: string } }) {
  const { storeId } = context.params;
  const { name, alamat }: Store = await req.json();
  try {
    const store = await prisma.store.update({
      where: {
        id: Number(storeId)
      },
      data: {
        name,
        alamat
      }
    });
    return new Response(JSON.stringify(store), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}