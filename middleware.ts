import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/api/auth/signup", "/api/auth/signin"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  if (path.startsWith("/api")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-id", (payload as any).sub);

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (err) {
      console.error("Invalid or expired token:", err);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
