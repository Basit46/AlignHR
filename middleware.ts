import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("AlignHR-token")?.value;

  // If user is on auth pages
  if (path.startsWith("/auth")) {
    // If they have a valid token, redirect away from auth pages
    if (token) {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        try {
          await jwtVerify(token, new TextEncoder().encode(secret));

          // User is authenticated, redirect to home
          const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";
          return NextResponse.redirect(new URL(redirectTo, req.url));
        } catch (err) {
          // Token is invalid, clear it and let them access auth pages
          const response = NextResponse.next();
          response.cookies.delete("AlignHR-token");
          return response;
        }
      }
    }
    // No token or invalid token, allow access to auth pages
    return NextResponse.next();
  }

  // Allow public API auth routes
  if (path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!token) {
    if (path.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Verify JWT_SECRET exists
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined");

    if (path.startsWith("/api")) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Verify token for protected routes
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    // Pass userId to requests via header (useful for API routes)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", String(payload.sub || ""));

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("Invalid or expired token:", err);

    // For API routes, return 401
    if (path.startsWith("/api")) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // For FE routes, redirect to login and clear invalid token
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("AlignHR-token");

    return response;
  }
}

// Apply middleware to all routes except Next.js internals and static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const PUBLIC_PATHS = ["/api/auth/signup", "/api/auth/signin"];

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   if (PUBLIC_PATHS.includes(path)) {
//     return NextResponse.next();
//   }

//   if (path.startsWith("/api")) {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       const { payload } = await jwtVerify(
//         token,
//         new TextEncoder().encode(process.env.JWT_SECRET)
//       );

//       const requestHeaders = new Headers(req.headers);
//       requestHeaders.set("x-user-id", (payload as any).sub);

//       return NextResponse.next({
//         request: { headers: requestHeaders },
//       });
//     } catch (err) {
//       console.error("Invalid or expired token:", err);
//       return NextResponse.json(
//         { message: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };
