import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/auth",
        signOut: "/",
    }
})

export const config = {
    matcher: [],
};