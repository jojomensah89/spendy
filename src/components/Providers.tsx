"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import TopNav from "./TopNav";
import Footer from "./Footer";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
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
        </div>{" "}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
