import {auth} from "@/auth";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth();

    // If not authenticated, redirect to sign-in page
    if (!session) {
        const signInUrl = new URL("/api/auth/signin", request.url);
        return NextResponse.redirect(signInUrl);
    }

    // Continue if authenticated
    return NextResponse.next();
}

// Define which routes to protect
export const config = {
    matcher: ["/", "/admin/:path*"], // Add paths you want to protect
};
