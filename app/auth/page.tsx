import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ButtonSignIn from "@/components/auth/buttonSignIn";
import Up from "@/components/motions/Up";

const AuthPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="flex md:mx-56 lg:mx-96 flex-col items-center mt-8 md:mt-24">
                <Up>
                    <h1 className="text-2xl md:text-4xl font-semibold text-center text-balance">
                        Transform the world with your links! Begin redirecting.
                    </h1>
                </Up>

                <Up delay={0.3}>
                    <h2 className="text-md max-md:max-w-[300px] md:text-xl mt-4 text-gray-400 text-center text-balance">
                        But first, you need to sign in.
                    </h2>
                </Up>

                <Up delay={0.5}>
                    <ButtonSignIn />
                </Up>
            </main>
        );
    } else {
        redirect("/dashboard");
    }
};

export default AuthPage;
