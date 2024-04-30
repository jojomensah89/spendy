import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
