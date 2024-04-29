"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Link } from "next-view-transitions";
import Logo from "./Logo";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
    <Logo/>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
