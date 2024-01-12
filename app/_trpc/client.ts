import { createTRPCReact, type inferReactQueryProcedureOptions, } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from "@/server/index";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;


export const trpc = createTRPCReact<AppRouter>({});
