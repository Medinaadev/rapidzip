"use client";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import ClipboardIcon from "@/components/icons/clipboard";
import ClipboardCheckIcon from "@/components/icons/clipboardCheck";
import SignoutIcon from "@/components/icons/signout";
import Link from "next/link";

const context = createContext({
    isOpen: false,
    link: "",
    open: (link: string) => {},
    close: () => {},
});

export const useCreatedLinkModal = () => useContext(context);

export const CreatedLinkModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState("");

    const open = (link: string) => {
        setIsOpen(true);
        setLink(link);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <context.Provider value={{ isOpen, link, open, close }}>
            {children}
        </context.Provider>
    );
};

export const CreatedLinkModal = () => {
    const { isOpen, link, close } = useCreatedLinkModal();
    const [isCopied, setIsCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute top-0 w-full h-full flex justify-center items-end sm:items-center backdrop-blur-md bg-black/25"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="bg-gray-900/80 md:border-[1px] md:border-white/10 shadow-lg sm:rounded-lg p-4 w-full sm:max-w-md"
                        initial={{ y: 20, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 20, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-white text-lg font-semibold">
                            Link created!
                        </h1>
                        <p className="text-white/60 text-sm mt-1">
                            Your link has been created successfully.
                        </p>
                        <p className="text-white/60 text-sm mt-2.5 bg-gray-950/50 px-3 py-2 rounded-md flex items-center justify-between">
                            <span className="truncate">{link}</span>
                            <button
                                className="text-white/60 text-sm ml-2 bg-gray-800/25 p-2 rounded-md hover:bg-gray-700/50 transition duration-300"
                                onClick={() => copy}
                            >
                                {!isCopied ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ClipboardIcon className="w-3 h-3" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ClipboardCheckIcon className="w-3 h-3" />
                                    </motion.div>
                                )}
                            </button>
                        </p>
                        <p className="text-gray-400/60 text-xs mt-2">
                            You can view your link in the dashboard, and it will
                            be securely saved for you.
                            <Link
                                href="/dashboard"
                                className="ml-1 underline"
                                onClick={close}
                            >
                                Go to Dashboard
                            </Link>
                        </p>
                        <button
                            className="flex items-center mt-4 gap-x-2 px-2 py-1.5 bg-gray-800/30 hover:bg-gray-800/60 border-[1px] border-white/10 text-sm shadow-xl rounded-lg text-gray-300 hover:text-white transition duration-300"
                            onClick={close}
                        >
                            <SignoutIcon className="w-4 h-4" />
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
