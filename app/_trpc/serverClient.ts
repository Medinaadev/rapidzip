import { appRouter } from "@/server/index";
import { createCallerFactory } from "@/server/trpc";

export const createCaller = createCallerFactory(appRouter);
export const CreateCaller = typeof createCaller;