import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { prisma } from "@/lib/db";

export const CreateLinkInput = z.object({
    url: z.string().url(),
    alias: z.string().regex(/^[a-zA-Z0-9_-]{1,8}$/),
    description: z.string(),
});

export const linkRouter = router({
    createLink: protectedProcedure
        .input(CreateLinkInput)
        .mutation(async ({ ctx, input }) => {
            console.log(ctx.session?.user?.id);
            const link = prisma.link.create({
                data: {
                    ...input,
                    postedBy: ctx.session?.user?.id,
                },
            });

            return link;
        }),
});
