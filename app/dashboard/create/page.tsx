import Up from "@/components/motions/Up";
import LinkIcon from "@/components/icons/link";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import CreateLinkForm from "@/components/dashboard/create/form";
import {
    CreatedLinkModalProvider,
    CreatedLinkModal,
} from "@/components/modals/createdLink";

const CreateLinkPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return redirect("/auth");
    }

    return (
        <main className="flex mx-4 md:mx-32 lg:mx-64 flex-col mt-5">
            <Up>
                <h1 className="text-xl font-semibold max-sm:text-center flex items-center gap-x-2">
                    <LinkIcon className="w-5 h-5" />
                    Create Link
                </h1>
            </Up>

            <Up delay={0.2}>
                <hr className="my-2 border-gray-500/60" />
            </Up>

            <CreateLinkForm />
        </main>
    );
};

export default CreateLinkPage;
