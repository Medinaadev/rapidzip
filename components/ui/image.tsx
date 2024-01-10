import cn from "@/lib/cn";
import NextImage from "next/image";

type Props = {
    src: string;
    alt: string;
    isBlurred?: boolean;
    className?: string;
};

const Image = ({ src, alt, isBlurred, className }: Props) => {
    return (
        <div className="relative z-10 w-full h-full">
            <NextImage src={src} alt={alt} className={className} />
            {isBlurred && (
                <div className="absolute -z-10 inset-0 w-full h-full blur-xl">
                    <NextImage
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
