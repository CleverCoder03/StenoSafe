import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req) {
  const session = await auth();
  const user = session?.user;
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/encryption", "/decryption", "/gallery"];
  const publicRoutes = ["/login", "/register"];

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname) && !user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect authenticated users away from login and register pages
  if (publicRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|_next|favicon\\.ico|.*\\..*).*)"],
};
