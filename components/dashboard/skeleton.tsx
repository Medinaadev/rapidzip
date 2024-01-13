import { motion } from "framer-motion";

const LinkSkeleton = () => {
    return (
        <motion.div
            className="flex flex-col space-y-2 bg-gray-800/25 rounded-md p-4"
            variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
            }}
        >
            <div className="flex justify-between items-center opacity-50">
                <div className="w-1/3 h-4 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="w-1/3 h-4 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center opacity-50">
                <div className="w-1/3 h-4 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="w-1/3 h-4 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
        </motion.div>
    );
};

export default LinkSkeleton;
