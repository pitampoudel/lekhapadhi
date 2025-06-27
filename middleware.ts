import {auth} from "@/auth";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth();

    // If not authenticated, redirect to sign-in page
    if (!session) {
        return NextResponse.rewrite(new URL("/landing", request.url));
    }

    // Continue if authenticated
    return NextResponse.next();
}

// Define which routes to protect
export const config = {
    matcher: ["/", "/admin/:path*"], // Add paths you want to protect
};
