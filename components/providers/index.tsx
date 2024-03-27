"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import TrpcProvider from "@/app/_trpc/TrpcProvider";
import { EditLinkModalProvider } from "@/components/modals/editLink";
import { CreatedLinkModalProvider } from "@/components/modals/createdLink";
import { DeleteLinkModalProvider } from "@/components/modals/deleteLink";
import { Analytics } from "@vercel/analytics/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Analytics />

            <SessionProvider>
                <TrpcProvider>
                    <NextUIProvider>
                        <CreatedLinkModalProvider>
                            <EditLinkModalProvider>
                                <DeleteLinkModalProvider>
                                    <Toaster
                                        position="top-center"
                                        toastOptions={{
                                            style: {
                                                background:
                                                    "rgba(25, 33, 44, 0.8)",
                                                border: "1px solid rgb(255, 255, 255, 0.1)",
                                                color: "#ccc",
                                                paddingBlock: ".3rem",
                                                paddingInline: ".5rem",
                                                boxShadow:
                                                    "0 0 10px rgba(0, 0, 0, 0.2)",
                                            },
                                        }}
                                    />
                                    {children}
                                </DeleteLinkModalProvider>
                            </EditLinkModalProvider>
                        </CreatedLinkModalProvider>
                    </NextUIProvider>
                </TrpcProvider>
            </SessionProvider>
        </>
    );
};

export default Providers;
