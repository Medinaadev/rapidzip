import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { prisma } from "@/lib/db";

export const CreateLinkInput = z.object({
    url: z.string().url(),
    alias: z.string().regex(/^[a-zA-Z0-9_-]{1,8}$/),
    description: z.string(),
});

export const GetLinksInput = z.object({
    filter: z.string().nullish(),
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.number().nullish(),
});

export const EditLinkInput = z.object({
    id: z.number(),
    url: z.string().url(),
    description: z.string(),
});

export const linkRouter = router({
    countLinks: protectedProcedure.query(() => {
        return prisma.link.count();
    }),

    countLinksByUser: protectedProcedure.query(({ ctx }) => {
        return prisma.link.count({
            where: {
                postedById: ctx.session.user.id,
            },
        });
    }),

    getLinks: protectedProcedure
        .input(GetLinksInput)
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 10;
            const { cursor, filter } = input;
            const links = await prisma.link.findMany({
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    id: "desc",
                },
                where: {
                    postedById: ctx.session.user.id,
                    OR: filter
                        ? [
                              {
                                  alias: {
                                      contains: filter ?? undefined,
                                  },
                              },
                              {
                                  url: {
                                      contains: filter ?? undefined,
                                  },
                              },
                              {
                                  description: {
                                      contains: filter ?? undefined,
                                  },
                              },
                          ]
                        : undefined,
                },
            });
            let nextCursor: typeof cursor | undefined = undefined;
            if (links.length > limit) {
                const nextLink = links.pop();
                nextCursor = nextLink!.id;
            }

            const allCount = await prisma.link.count({
                where: {
                    postedById: ctx.session.user.id,
                },
            });

            return {
                allCount,
                links,
                nextCursor,
            };
        }),

    createLink: protectedProcedure
        .input(CreateLinkInput)
        .mutation(async ({ ctx, input }) => {
            const link = prisma.link.create({
                data: {
                    ...input,
                    postedById: ctx.session.user.id,
                },
            });

            return link;
        }),

    editLink: protectedProcedure
        .input(EditLinkInput)
        .mutation(async ({ ctx, input }) => {
            const link = await prisma.link.update({
                where: {
                    id: input.id,
                    postedById: ctx.session.user.id,
                },
                data: {
                    url: input.url,
                    description: input.description,
                },
            });

            return link;
        }),

    deleteLink: protectedProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            const link = await prisma.link.delete({
                where: {
                    id: input,
                    postedById: ctx.session.user.id,
                },
            });

            return link;
        }),
});
