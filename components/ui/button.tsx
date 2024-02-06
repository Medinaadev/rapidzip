"use client";
import cn from "@/lib/cn";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Button = ({
    children,
    onClick,
    className,
    href,
    target,
    type = "button",
    ...props
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    href?: string;
    target?: string;
    type?: "button" | "submit" | "reset";
    [key: string]: any;
}) => {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            target ? window.open(href, target) : router.push(href);
        } else {
            onClick?.();
        }
    };

    return (
        <AnimatePresence>
            <motion.button
                layout
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1.5 bg-gray-800/30 hover:bg-gray-800/60 border-[1px] border-white/10 text-sm shadow-xl rounded-lg text-gray-300 hover:text-white transition duration-300",
                    className
                )}
                onClick={handleClick}
                type={type}
                {...props}
            >
                {children}
            </motion.button>
        </AnimatePresence>
    );
};

export default Button;
