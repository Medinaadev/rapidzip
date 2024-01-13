import Image from "../ui/image";

const Footer = () => {
    return (
        <footer className="flex items-center justify-center z-20 bg-[#030712a4] backdrop-filter-md border-t-[1px] border-white/10 text-white/60 text-sm py-4 px-8 mt-20">
            <a
                className="flex"
                href="https://github.com/Medinaadev"
                target="_blank"
                rel="noopener noreferrer"
            >
                Created by{" "}
                <Image
                    src="/mdnlogo.png"
                    alt="Medinaa"
                    className="ml-2 w-6 h-6 rounded-full"
                    isBlurred
                />
            </a>
        </footer>
    );
};

export default Footer;
