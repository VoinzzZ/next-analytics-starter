import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPrefixes = ["/dashboard", "/analytics", "/settings", "/admin"];
const publicRoutes = ["/", "/login", "/register"];

const isProtectedRoute = (pathname: string) =>
  protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const { response: refreshedResponse, user } = await updateSession(
    request,
    response,
  );

  if (!user && isProtectedRoute(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    const redirect = NextResponse.redirect(redirectUrl);
    refreshedResponse.cookies.getAll().forEach(({ name, value }) => {
      redirect.cookies.set(name, value);
    });
    return redirect;
  }

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
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
