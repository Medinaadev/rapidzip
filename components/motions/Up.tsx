"use client";
import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const Up = ({ children, delay, className }: Props) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

export default Up;
