"use client";
import Up from "@/components/motions/Up";
import { motion } from "framer-motion";

const Links = () => {
    return (
        <section className="flex flex-col mt-2">
            <Up
                delay={0.4}
                className="flex max-sm:flex-col max-sm:gap-y-4 justify-between items-center"
            >
                <input
                    type="text"
                    placeholder="Search Links"
                    className="text-sm w-full sm:w-96 bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 focus:outline-none focus:border-white/20"
                />
                <span className="text-sm text-white/60 mt-1 flex gap-x-2 items-center font-semibold">
                    <span className="text-green-500">Active Links</span>•
                    <span className="text-gray-400">0</span>
                </span>
            </Up>

            {/* <Up delay={0.5}> */}
            <motion.div
                className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                transition={{
                    staggerChildren: 0.1,
                    delayChildren: 0.7,
                }}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col justify-between gap-y-2 bg-gray-800/50 rounded-md p-4"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                    }}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold truncate">
                            rapidzip.vercel.app/link/1
                        </h1>
                        <span className="text-sm text-white/60">0 clicks</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">
                            https://google.com
                        </span>
                        <button className="text-sm text-white/60 hover:text-white transition">
                            Copy
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Links;
