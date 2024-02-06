import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/server/index";

export const trpc = createTRPCReact<AppRouter>({});
