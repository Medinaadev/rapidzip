import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Up from "@/components/motions/Up";
import Button from "@/components/ui/button";
import LinkIcon from "@/components/icons/link";
import Links from "@/components/dashboard/links";
import {
    EditLinkModal,
    EditLinkModalProvider,
} from "@/components/modals/editLink";

const DashPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/auth");
    }

    return (
        <main className="flex mx-4 md:mx-32 lg:mx-64 flex-col mt-5">
            <Up className="flex justify-between items-end">
                <h1 className="text-lg font-semibold truncate">
                    👋 {session.user.name}
                </h1>

                <Button
                    href="/dashboard/create"
                    className="sticky top-0 right-0"
                >
                    <LinkIcon className="w-4 h-4" />
                    Create Link
                </Button>
            </Up>

            <Up delay={0.3}>
                <hr className="my-2 border-gray-500/60" />
            </Up>

            <Links />
        </main>
    );
};

export default DashPage;
