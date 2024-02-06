import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { alias: string } }
) {
    const { alias } = params;

    if (!alias) {
        return new NextResponse("Alias missing", { status: 400 });
    }

    const link = await prisma.link.findUnique({
        where: {
            alias,
        },
    });

    if (!link) {
        return new NextResponse("Link not found", { status: 404 });
    }

    await prisma.link.update({
        where: {
            alias,
        },
        data: {
            clicks: link.clicks + 1,
            lastUsed: new Date(),
        },
    });

    return NextResponse.json(link);
}
