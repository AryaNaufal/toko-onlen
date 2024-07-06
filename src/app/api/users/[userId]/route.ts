import { database } from "@/src/utils/prisma";
import { User } from "../route";
const prisma = database.getDB();

// Find Users by ID
export async function GET(req: Request, context: { params: { userId: string } }) {
  const { userId } = context.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      }
    });
    if (!user) {
      return new Response("User not found", {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error("Error:");
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Delete User
export async function DELETE(req: Request, context: { params: { userId: string } }) {
  const { userId } = context.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    });
    if (!user) {
      return new Response("User not found", {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    return new Response("User deleted successfully", {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    return new Response("Failed to delete user:", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}

// Edit User
export async function PUT(req: Request, context: { params: { userId: string } }) {
  const { userId } = context.params;
  const { name, email, password }: User = await req.json();

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password
      }
    });
    if (!user) {
      return new Response("User not found", {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    return new Response("User data has updated!", {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response("Failed to update!", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}