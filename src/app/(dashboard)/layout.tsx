import TopNav from "@/components/TopNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <TopNav />

      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
