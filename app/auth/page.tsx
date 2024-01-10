import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ButtonSignIn from "@/components/auth/buttonSignIn";

const AuthPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="flex md:mx-56 lg:mx-96 flex-col items-center mt-8 md:mt-24">
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-balance">
                    Welcome ❤️
                </h1>

                <ButtonSignIn />
            </main>
        );
    } else {
        redirect("/dashboard");
    }
};

export default AuthPage;
