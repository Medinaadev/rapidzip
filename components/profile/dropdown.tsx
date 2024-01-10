import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    LinkIcon,
} from "@nextui-org/react";
import SignoutIcon from "../icons/signout";
import DashboardIcon from "../icons/dashboard";
import WarnIcon from "../icons/warn";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    return (
        <Dropdown
            classNames={{
                content: "bg-gray-950/70 border-[1px] border-white/10",
            }}
        >
            <DropdownTrigger>{children}</DropdownTrigger>
            <DropdownMenu
                itemClasses={{
                    base: [
                        "border-[1px] border-transparent duration-300 mt-1",
                        "data-[hover=true]:bg-gray-800/50 data-[hover=true]:border-white/10",
                    ],
                }}
            >
                <DropdownItem
                    onPress={() => {
                        router.push("/dashboard");
                    }}
                >
                    <div className="flex items-center gap-x-2">
                        <DashboardIcon className="w-4 h-4" />
                        Dashboard
                    </div>
                </DropdownItem>
                <DropdownItem
                    onPress={() => {
                        window.open(
                            "https://github.com/MedinaYT/rapidzip/issues/new",
                            "_blank"
                        );
                    }}
                >
                    <div className="flex items-center gap-x-2">
                        <WarnIcon className="w-4 h-4" />
                        Report a bug
                        <div className="text-white/50 -ml-2">
                            <LinkIcon />
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem
                    onPress={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                >
                    <div className="flex items-center gap-x-2 text-red-500">
                        <SignoutIcon className="w-4 h-4" />
                        Sign out
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
