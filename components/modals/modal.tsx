import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useCreatedLinkModal } from "./createdLink";
import { useEditLinkModal } from "./editLink";
import { useDeleteLinkModal } from "./deleteLink";

export const Modal = ({
    children,
    isOpen,
}: {
    children: React.ReactNode;
    isOpen: boolean;
}) => {
    const { close: createdLinkModalClose } = useCreatedLinkModal();
    const { close: editLinkModalClose } = useEditLinkModal();
    const { close: deleteLinkModalClose } = useDeleteLinkModal();

    const close = useCallback(() => {
        createdLinkModalClose();
        editLinkModalClose();
        deleteLinkModalClose();
    }, [createdLinkModalClose, editLinkModalClose, deleteLinkModalClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 z-40 w-full h-full flex justify-center items-end sm:items-center backdrop-blur-md bg-black/25"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-gray-900/80 md:border-[1px] md:border-white/10 shadow-lg sm:rounded-lg p-4 w-full sm:max-w-md"
                        initial={{ y: 20, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 20, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
