import { linkRouter } from "./routers/link";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    greeting: publicProcedure.query(() => "Hello from tRPC"),
    links: linkRouter,
});

export type AppRouter = typeof appRouter;
