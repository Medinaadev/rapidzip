import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    LinkIcon as NextUILinkIcon,
} from "@nextui-org/react";
import SignoutIcon from "../icons/signout";
import { signOut } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import LinkIcon from "@/components/icons/link";
import EditIcon from "@/components/icons/edit";
import DeleteIcon from "@/components/icons/delete";
import { useEditLinkModal } from "@/components/modals/editLink";
import { Link } from "@prisma/client";
import { useDeleteLinkModal } from "../modals/deleteLink";

const LinkDropdown = ({
    children,
    link,
    refetch,
    copy,
}: {
    children: React.ReactNode;
    link: {};
    refetch: () => void;
    copy: () => void;
}) => {
    const router = useRouter();
    const { open: editModalOpen } = useEditLinkModal();
    const { open: deleteModalOpen } = useDeleteLinkModal();

    return (
        <Dropdown
            classNames={{
                content:
                    "bg-gray-950/70 backdrop-blur-sm border-[1px] border-white/10",
            }}
            aria-label="Profile dropdown"
        >
            <DropdownTrigger>{children}</DropdownTrigger>
            <DropdownMenu
                itemClasses={{
                    base: [
                        "border-[1px] border-transparent duration-300 mt-1",
                        "data-[hover=true]:bg-gray-800/50 data-[hover=true]:border-white/10",
                    ],
                }}
                aria-label="Profile dropdown menu"
            >
                <DropdownItem
                    onPress={() => {
                        copy();
                    }}
                    aria-label="Go to Dashboard"
                >
                    <div className="flex items-center gap-x-2">
                        <LinkIcon className="w-4 h-4" />
                        Copy
                    </div>
                </DropdownItem>
                <DropdownItem
                    onPress={() =>
                        editModalOpen(link as Link, (success) => {
                            if (success) {
                                refetch();
                            }
                        })
                    }
                    aria-label="Create link"
                >
                    <div className="flex items-center gap-x-2">
                        <EditIcon className="w-4 h-4" />
                        Edit
                    </div>
                </DropdownItem>
                <DropdownItem
                    onPress={() => {
                        deleteModalOpen(link as Link, (success) => {
                            if (success) {
                                refetch();
                            }
                        });
                    }}
                    aria-label="Sign out"
                >
                    <div className="flex items-center gap-x-2 text-red-500">
                        <DeleteIcon className="w-4 h-4" />
                        Delete
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default LinkDropdown;
