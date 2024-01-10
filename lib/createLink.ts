'use server';
import prisma from "./db";

type CreateLinkType = {
    userId: string;
    url: string;
    alias: string;
    description: string;
};

export const createLink = async ({
    userId,
    url,
    alias,
    description,
}: CreateLinkType) => {
    const existingLink = await prisma.link.findUnique({
        where: {
            alias,
        },
    });

    if (existingLink) {
        throw new Error(`Alias ${alias} already exists`);
    }

    const link = await prisma.link.create({
        data: {
            url,
            alias,
            description: description || null,
            postedById: userId,
        },
    });

    return link;
};