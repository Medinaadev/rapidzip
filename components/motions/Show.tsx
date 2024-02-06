"use client";
import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const Show = ({ children, delay, className }: Props) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.3,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

export default Show;
