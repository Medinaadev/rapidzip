"use client";
import { trpc } from "@/app/_trpc/client";
import Up from "@/components/motions/Up";
import { motion, AnimatePresence } from "framer-motion";
import LinkSkeleton from "./skeleton";
import LinkIcon from "../icons/link";
import Button from "../ui/button";
import LinkDropdown from "./linkDropdown";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useDebounceCallback from "@/lib/debounce";

const Links = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState<string | null>(null);
    const {
        data,
        isLoading,
        error,
        refetch,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = trpc.links.getLinks.useInfiniteQuery(
        {
            limit: 18,
            filter,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    const linksCount = data?.pages[0].allCount;

    const handleCopy = (alias: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/q/${alias}`);
        toast.success("Copied to clipboard");
    };

    const handleSearch = useDebounceCallback((term: string) => {
        setFilter(term);
    }, 300);

    const refrechAll = () => {
        refetch();
    };

    return (
        <section className="flex flex-col mt-2">
            <Up
                delay={0.4}
                className="flex max-sm:flex-col max-sm:gap-y-4 justify-between items-center"
            >
                <div className="flex justify-between items-center text-sm w-full sm:w-96 bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 focus:outline-none focus:border-white/20">
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search Links"
                        className="w-full bg-transparent text-white/80 focus:outline-none"
                        onChange={(e: any) => handleSearch(e.target.value)}
                    />

                    <AnimatePresence>
                        {filter && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-x-2 text-gray-400 hover:text-gray-300 cursor-pointer transition"
                                onClick={() => {
                                    searchRef.current!.value = "";
                                    setFilter(null);
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    focusable="false"
                                    role="presentation"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                <span className="text-sm text-white/60 mt-1 flex gap-x-2 items-center font-semibold">
                    <span className="text-green-500">Active Links</span>•
                    <span className="text-gray-400">
                        {isLoading ? "?" : linksCount}
                    </span>
                </span>
            </Up>

            <Up delay={0.5} className="flex flex-col items-center">
                <motion.div
                    className="w-full mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    transition={{
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                    }}
                    initial="initial"
                    animate="animate"
                >
                    {isLoading ? (
                        <>
                            {Array.from({ length: 14 }, (_, i) => (
                                <LinkSkeleton key={i} />
                            ))}
                        </>
                    ) : error ? (
                        <p className="text-lg text-white/60">
                            An error occurred while fetching your links
                        </p>
                    ) : (
                        data.pages.map((page) => {
                            return page.links.map((link) => (
                                <motion.div
                                    key={link.id}
                                    className="flex flex-col gap-y-2 bg-gray-800/50 rounded-md p-4 hover:scale-105 transition"
                                    variants={{
                                        initial: { opacity: 0, y: 20 },
                                        animate: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() =>
                                                handleCopy(link.alias)
                                            }
                                            className="flex items-center gap-x-2 text-sm font-semibold hover:underline"
                                        >
                                            <LinkIcon className="w-4 h-4 text-gray-400" />
                                            <span className="truncate">
                                                {link.alias}
                                            </span>
                                        </button>
                                        <LinkDropdown
                                            refetch={refrechAll}
                                            link={link}
                                            copy={() => handleCopy(link.alias)}
                                        >
                                            <div className="flex items-center gap-x-2 px-2 py-1.5 bg-gray-800/30 hover:bg-gray-800/60 border-[1px] border-white/10 text-sm shadow-xl rounded-lg text-gray-300 hover:text-white cursor-pointer transition duration-300">
                                                Actions
                                            </div>
                                        </LinkDropdown>
                                    </div>
                                    <div className="flex justify-between items-center gap-x-4">
                                        <span className="text-sm text-white/60 truncate w-8/12">
                                            {link.url}
                                        </span>
                                        <span className="text-sm text-white/60">
                                            {link.clicks}{" "}
                                            {link.clicks === 1
                                                ? "click"
                                                : "clicks"}
                                        </span>
                                    </div>
                                    {link.description && (
                                        <p className="text-sm text-white/60">
                                            {link.description}
                                        </p>
                                    )}
                                </motion.div>
                            ));
                        })
                    )}
                </motion.div>

                {linksCount === 0 && (
                    <p className="flex flex-col items-center text-lg text-white/60 mt-10 md:mt-20">
                        😒 You don&apos;t have any links yet
                        <Button
                            href="/dashboard/create"
                            className="sticky top-0 right-0 mt-5"
                        >
                            <LinkIcon className="w-4 h-4" />
                            Create your first link
                        </Button>
                    </p>
                )}

                {hasNextPage && (
                    <Button
                        className="mt-4 w-fit"
                        onClick={() => {
                            const toastId = toast.loading(
                                "Loading more links..."
                            );
                            fetchNextPage()
                                .then(() =>
                                    toast.success("Loaded more links", {
                                        id: toastId,
                                    })
                                )
                                .catch(() =>
                                    toast.error(
                                        "An error occurred while loading more links",
                                        { id: toastId }
                                    )
                                );
                        }}
                        disabled={isFetchingNextPage}
                    >
                        {isLoading || isFetchingNextPage
                            ? "Loading..."
                            : "Load More"}
                    </Button>
                )}
            </Up>
        </section>
    );
};

export default Links;
