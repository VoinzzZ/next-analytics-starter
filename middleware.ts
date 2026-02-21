import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPrefixes = ["/dashboard", "/analytics", "/settings", "/admin"];
const publicRoutes = new Set(["/", "/login", "/register", "/auth/callback"]);

const isProtectedRoute = (pathname: string) =>
  protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
const isPublicRoute = (pathname: string) => publicRoutes.has(pathname);

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const { response: refreshedResponse, user } = await updateSession(
    request,
    response,
  );

  if (isPublicRoute(pathname)) {
    if (user && (pathname === "/login" || pathname === "/register")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      const redirect = NextResponse.redirect(redirectUrl);
      refreshedResponse.cookies.getAll().forEach(({ name, value }) => {
        redirect.cookies.set(name, value);
      });
      return redirect;
    }
    return refreshedResponse;
  }

  if (!user && isProtectedRoute(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    const redirect = NextResponse.redirect(redirectUrl);
    refreshedResponse.cookies.getAll().forEach(({ name, value }) => {
      redirect.cookies.set(name, value);
    });
    return redirect;
  }

  return refreshedResponse;
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
