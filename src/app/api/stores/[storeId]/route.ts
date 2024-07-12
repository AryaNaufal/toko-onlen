import { database } from "@/src/utils/prisma";

const prisma = database.getDB();

// Find store by id
export async function GET(req: Request, context : { params: { storeId: string } }) {
  const { storeId } = context.params;

  try {
    const store = await prisma.store.findUnique({
      where: {
        id: Number(storeId)
      }
    });
    if (!store) {
      return new Response("Store not found", {
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