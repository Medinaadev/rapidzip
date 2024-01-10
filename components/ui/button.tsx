"use client";
import { useRouter } from "next/navigation";

const Button = ({
    children,
    onClick,
    href,
    target,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
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
        <button
            className="flex items-center mt-4 gap-x-2 px-2 py-1.5 bg-gray-800/30 hover:bg-gray-800/60 border-[1px] border-white/10 text-sm shadow-xl rounded-lg text-gray-300 hover:text-white transition duration-300"
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;
