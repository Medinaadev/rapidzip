"use client";
import RocketIcon from "@/components/icons/rocket";
import StarIcon from "@/components/icons/star";
import Link from "next/link";
import Up from "@/components/motions/Up";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/button";

export default function Home() {
    const { data: session } = useSession();

    return (
        <main className="flex mx-20 bg-white md:mx-56 lg:mx-96 flex-col items-center mt-8 md:mt-24">
            <Up>
                <h1 className="text-2xl md:text-4xl font-semibold text-center text-balance">
                    Instantly Shorten Links and Share with Ease!
                </h1>
            </Up>

            <Up delay={0.15}>
                <h2 className="text-md max-md:max-w-[300px] md:text-xl mt-4 text-gray-400 text-center text-balance">
                    Swift Link Shortening, Effortless Sharing.
                </h2>
            </Up>

            <Up delay={0.3}>
                <div className="flex max-sm:flex-col justify-between items-center mt-8 w-72">
                    <Button href={session ? "/dashboard" : "/auth"}>
                        <RocketIcon className="w-4 h-4" />
                        {session ? "Dashboard" : "Get Started"}
                    </Button>

                    <Button
                        href="https://github.com/MedinaYT/rapidzip"
                        target="_blank"
                        className="max-sm:mt-4"
                    >
                        <StarIcon className="w-4 h-4" />
                        Star on GitHub?
                    </Button>
                </div>
            </Up>
        </main>
    );
}
