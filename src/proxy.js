import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
    const { pathname } = request.nextUrl;
    
    // Allow public GET requests to API routes so the frontend can fetch products/categories
    if (pathname.startsWith('/api/') && request.method === 'GET') {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
        if (pathname.startsWith('/api/')) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        if (pathname.startsWith('/api/')) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        "/admin", 
        "/admin/:path*", 
        "/api/products/:path*", 
        "/api/categories/:path*", 
        "/api/orders/:path*",
        "/api/upload/:path*"
    ],
};