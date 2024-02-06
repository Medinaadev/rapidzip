"use client";
import GithubIcon from "@/components/icons/github";
import { signIn } from "next-auth/react";

const ButtonSignIn = () => (
    <button
        className="flex items-center mt-8 gap-x-2 px-2 py-1.5 bg-gray-800/30 hover:bg-gray-800/60 border-[1px] border-white/10 text-sm shadow-xl rounded-lg text-gray-300 hover:text-white transition duration-300"
        onClick={() => signIn("github")}
    >
        <GithubIcon className="w-4 h-4" />
        Sign In with GitHub
    </button>
);

export default ButtonSignIn;
