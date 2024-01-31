import { useState, useEffect, useMemo } from "react";
import { clsx } from "@nextui-org/shared-utils";

const generateMeteorStyle = () => ({
    top: -100,
    left: Math.floor(Math.random() * 150) - 50 + "vw",
    animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
    animationDuration: Math.floor(Math.random() * (50 - 10) + 10) + "s",
});

const Meteor = () => {
    const [meteors, setMeteors] = useState<any[]>([]);

    useEffect(() => {
        setMeteors(
            Array.from({ length: 20 }, () => ({ style: generateMeteorStyle() }))
        );
    }, []);

    const meteorMemo = useMemo(() => {
        return meteors.map((el, idx) => (
            <span
                key={"meteor" + idx}
                className={clsx(
                    "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                    "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
                )}
                style={el.style}
            ></span>
        ));
    }, [meteors]);

    return (
        <div className="absolute -z-10 top-0 w-screen h-screen overflow-hidden">
            {meteorMemo}
        </div>
    );
};

export default Meteor;
