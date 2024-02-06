import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const alias = req.nextUrl.pathname.split("/").pop();

    const data = await fetch(`${req.nextUrl.origin}/api/link/${alias}`);

    if (data.status === 404) {
        return NextResponse.redirect(req.nextUrl.origin);
    }

    const link = await data.json();

    return NextResponse.redirect(new URL(link.url));
}

export const config = {
    matcher: ["/q/:alias*"],
};
