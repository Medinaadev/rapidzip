"use client";
import { Tooltip } from "@nextui-org/react";
import Image from "../ui/image";
import GithubIcon from "../icons/github";
import StarIcon from "../icons/star";
import { useState, useEffect } from "react";

const github = "https://github.com/Medinaadev";
const githubRepo = `${github}/rapidzip`;

const Footer = () => {
    const [stars, setStars] = useState<string | null>(null);

    useEffect(() => {
        fetch(
            `https://api.github.com/repos${githubRepo.replace(
                "https://github.com",
                ""
            )}`
        )
            .then((res) => res.json())
            .then((data) =>
                setStars(
                    data.stargazers_count > 1000
                        ? `${(data.stargazers_count / 1000).toFixed(1)}k`
                        : data.stargazers_count
                )
            );
    }, []);

    return (
        <footer className="flex items-center justify-between z-20 bg-[#030712a4] backdrop-filter-md border-t-[1px] border-white/10 text-white/60 text-sm py-4 px-4 md:px-32 lg:px-64 mt-20">
            <Tooltip
                content={
                    <div className="flex items-center gap-x-2">
                        <GithubIcon className="w-4 h-4" />
                        <span>Medinaa</span>
                    </div>
                }
                placement="top"
                classNames={{
                    content: "bg-gray-950 border-[1px] border-white/10",
                }}
            >
                <a
                    className="flex"
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by{" "}
                    <Image
                        src="/mdnlogo.png"
                        alt="Medinaa"
                        className="ml-2 w-6 h-6 rounded-full"
                        isBlurred
                    />
                </a>
            </Tooltip>

            <a
                href={`${githubRepo}/stargazers`}
                target="_blank"
                className="flex items-center gap-x-2"
            >
                <span>{stars}</span>
                <StarIcon className="w-4 h-4" />
            </a>
        </footer>
    );
};

export default Footer;
