"use client";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/Fragments/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
