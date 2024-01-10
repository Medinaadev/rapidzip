import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import { Adapter } from "next-auth/adapters"

const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    adapter: <Adapter> PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        session: ({ session, user }: { session: any, user: any }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        })
    },
}

export default authOptions