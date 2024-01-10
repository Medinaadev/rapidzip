import cn from "@/lib/cn";

type Props = {
    src: string;
    alt: string;
    isBlurred?: boolean;
    className?: string;
};

const Image = ({ src, alt, isBlurred, className }: Props) => {
    return (
        <div className="relative z-10 w-full h-full">
            <img src={src} alt={alt} className={className} />
            {isBlurred && (
                <div className="absolute -z-10 inset-0 w-full h-full blur-xl">
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
