import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function roleMiddleware(req: any) {
  const role = req.nextauth.token?.role;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/super") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export default withAuth(roleMiddleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/super/:path*"],
};
