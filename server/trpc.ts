import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.create({
    transformer: superjson,
});

export const { createCallerFactory, router } = t;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

// export const protectedProcedure = t.procedure.use(async function isAuthed(
//     opts
// ) {
//     if (!opts.ctx.session?.user?.email) {
//         throw new TRPCError({
//             code: "UNAUTHORIZED",
//         });
//     }
//     return opts.next({
//         ctx: {
//             session: opts.ctx.session,
//         },
//     });
// });
