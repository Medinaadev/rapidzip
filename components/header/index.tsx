"use client";
import Link from "next/link";
import LinkIcon from "@/components/icons/link";
import GithubIcon from "@/components/icons/github";
import TwitterIcon from "@/components/icons/twitter";
import { useSession } from "next-auth/react";
import Image from "@/components/ui/image";
import ProfileDropdown from "@/components/profile/dropdown";

const Header = () => {
    const { data: session, status } = useSession();

    return (
        <header className="flex items-center justify-between sticky top-0 px-4 md:px-32 lg:px-64 py-4 transition">
            <div className="flex items-center">
                <Link href="/" className="flex items-center gap-x-4">
                    <div className="p-1.5 bg-gray-800 rounded-xl shadow-md">
                        <LinkIcon className="w-5 h-5" />
                    </div>

                    <h1 className="text-xl font-semibold hover:text-gray-300 transition">
                        RapidZip
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-4">
                {status === "loading" ? (
                    <div className="w-6 h-6 rounded-full bg-gray-800 animate-pulse" />
                ) : session ? (
                    <ProfileDropdown>
                        <div className="flex items-center gap-x-2 cursor-pointer mr-4">
                            <Image
                                src={session?.user?.image as string}
                                alt={session?.user?.name as string}
                                className="w-6 h-6 rounded-full"
                                isBlurred
                            />
                            {session?.user?.name}
                        </div>
                    </ProfileDropdown>
                ) : (
                    <Link
                        href={session ? "/dashboard" : "/auth"}
                        className="font-medium hover:text-gray-300 transition text-md mr-2"
                    >
                        Sign In
                    </Link>
                )}

                <Link
                    href="https://twitter.com/Medinaa_dev"
                    target="_blank"
                    className="font-medium hover:text-gray-300 transition"
                >
                    <TwitterIcon className="w-4 h-4" />
                </Link>

                <Link
                    href="https://github.com/MedinaYT"
                    target="_blank"
                    className="font-medium hover:text-gray-300 transition"
                >
                    <GithubIcon className="w-5 h-5" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
