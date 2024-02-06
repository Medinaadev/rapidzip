import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const { createCallerFactory, router } = t;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed({
    ctx,
    next,
}) {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
