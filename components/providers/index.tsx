"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import TrpcProvider from "@/app/_trpc/TrpcProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <TrpcProvider>
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
            </TrpcProvider>
        </SessionProvider>
    );
};

export default Providers;
