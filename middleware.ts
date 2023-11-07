import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest, res: NextResponse) {
    const bearerToken = req.headers.get("authorization") as string;

    if (!bearerToken) return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 });

    const token = bearerToken.split(" ")[1];

    if (!token) return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret);
    } catch (e) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 });
    }

    // Admin checkpoint
    if (req.nextUrl.pathname.startsWith('/api/admin/')) {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const payload = jwt.decode(token) as { email: string };

        if (payload.email !== ADMIN_EMAIL) return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/auth/me", "/api/admin/:path*"]
}