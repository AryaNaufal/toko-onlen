import { getSession } from "next-auth/react";

export async function Session(): Promise<userSession[] | null> {
  try {
    const session = await getSession();
    return session?.user ? [session.user] : null;  // Assuming session.user is a single user object
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}