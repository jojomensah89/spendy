import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ViewTransitions } from "next-view-transitions";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Spendy",
  description: "A simple budgeting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`font-sans ${inter.variable} antialiased`}>
            <Providers>{children}</Providers>
          </body>
        </html>
      </ClerkProvider>
    </ViewTransitions>
  );
}
