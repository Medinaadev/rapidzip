"use client";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ClipboardIcon from "@/components/icons/clipboard";
import ClipboardCheckIcon from "@/components/icons/clipboardCheck";
import SignoutIcon from "@/components/icons/signout";
import Link from "next/link";
import toast from "react-hot-toast";
import { Modal } from "./modal";

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
    const [link, setLink] = useState("https://rapidzip.xyz/");

    const open = (link: string) => {
        setIsOpen(true);
        setLink(link);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <context.Provider value={{ isOpen, link, open, close }}>
            <CreatedLinkModal />
            {children}
        </context.Provider>
    );
};

export const CreatedLinkModal = () => {
    const { isOpen, link, close } = useCreatedLinkModal();
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        const handleClick = (e: any) => {
            if (e.target.classList.contains("fixed")) {
                close();
            }
        };

        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [close]);

    const copy = () => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen}>
            <h1 className="text-white text-lg font-semibold">Link created!</h1>
            <p className="text-white/60 text-sm mt-1">
                Your link has been created successfully.
            </p>
            <p className="text-white/60 text-sm mt-2.5 bg-gray-950/50 px-3 py-2 rounded-md flex items-center justify-between">
                <span className="truncate">{link}</span>
                <button
                    className="text-white/60 text-sm ml-2 bg-gray-800/25 p-2 rounded-md hover:bg-gray-700/50 transition duration-300"
                    onClick={copy}
                >
                    {!isCopied ? (
                        <ClipboardIcon className="w-3 h-3" />
                    ) : (
                        <ClipboardCheckIcon className="w-3 h-3" />
                    )}
                </button>
            </p>
            <p className="text-gray-400/60 text-xs mt-2">
                You can view your link in the dashboard, and it will be securely
                saved for you.
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
        </Modal>
    );
};
