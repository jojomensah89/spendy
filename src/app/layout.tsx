import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";

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
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader />
              <div className="grid h-screen grid-rows-[auto,1fr]">
                <TopNav />
                <main className="">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ViewTransitions>
  );
}
