import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isProfilePage = req.nextUrl.pathname.startsWith('/profile');

  if(isProfilePage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}