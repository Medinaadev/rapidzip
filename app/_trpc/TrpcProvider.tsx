"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./client";
import superjson from "superjson";

export default function TrpcProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient({}));

    // Define a variable for the API URL
    let apiUrl = "http://localhost:3000";

    // Check if we're in a client-side environment
    if (typeof window !== "undefined") {
        // Dynamically determine the URL based on the current port
        apiUrl = window.location.origin;
    }

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${apiUrl}/api/trpc`,
                }),
            ],
            transformer: superjson,
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
