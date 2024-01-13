import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/index";
import Footer from "@/components/footer/index";
import Providers from "@/components/providers/index";

const onest = Onest({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "The fastest way to shorten your links - RapidZip",
    description: "RapidZip is the fastest way to shorten your links.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark bg-gray-950">
            <body className={onest.className}>
                <Providers>
                    <div className="flex flex-col min-h-screen justify-between">
                        <div className="-z-10 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                        <div>
                            <Header />
                            {children}
                        </div>

                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
