import cn from "@/lib/cn";
// import NextImage from "next/image";

type Props = {
    src: string;
    alt: string;
    isBlurred?: boolean;
    className?: string;
};

const Image = ({ src, alt, isBlurred, className }: Props) => {
    return (
        <div className="relative z-10 min-w-fit">
            <img src={src} alt={alt} className={className} />
            {isBlurred && (
                <div className="absolute -z-10 inset-0 blur-xl">
                    <img
                        src={src}
                        alt={alt}
                        className={cn(className, "opacity-75")}
                    />
                </div>
            )}
        </div>
    );
};

export default Image;
