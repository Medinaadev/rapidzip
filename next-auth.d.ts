import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

type User = {
    id: string;
    email: string;
    name: string;
    image: string;
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }

    type User = User;
}