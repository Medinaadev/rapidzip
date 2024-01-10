"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <NextUIProvider>
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: "rgba(25, 33, 44, 0.8)",
                            border: "1px solid rgb(255, 255, 255, 0.1)",
                            color: "#ccc",
                            paddingBlock: ".3rem",
                            paddingInline: ".5rem",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                />
                {children}
            </NextUIProvider>
        </SessionProvider>
    );
};

export default Providers;
