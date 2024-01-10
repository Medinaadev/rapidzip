import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        session: ({ session, user }: { session: any, user: any }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username,
            },
        })
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }