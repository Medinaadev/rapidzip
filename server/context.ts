import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";

type CreateContextOptions = {
    session: Session | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
    return {
        session: opts.session,
    };
};

export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    const session = await getServerSession(authOptions);
    return await createContextInner({
        session,
    });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
