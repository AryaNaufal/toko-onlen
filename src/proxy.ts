import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;
//   const isProfilePage = req.nextUrl.pathname.startsWith('/profile');

//   if(isProfilePage && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }
// }


const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/MyStore(.*)',
  '/Cart(.*)',
]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};