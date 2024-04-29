"use client";
import {  UserButton } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { Button, buttonVariants } from "./ui/button";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./dark-mode-toggle";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export default function TopNav() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}
function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Transactions", href: "/transactions" },
    { label: "Manage", href: "/manage" },
  ];
  return (
    <div className=" border-separate border-b bg-background md:hidden block">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[500px]" side={"left"}>
            <Logo />
            <div className="flex h-full flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItems
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  SheetTrigger={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Transactions", href: "/transactions" },
    { label: "Manage", href: "/manage" },
  ];
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItems
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItems({
  label,
  href,
  SheetTrigger,
}: {
  label: string;
  href: string;
  SheetTrigger?: () => void;
}) {
  const pathName = usePathname();
  const isActive = href === pathName;
  return (
    <div className=" relative flex items-center">
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive
        )}
        onClick={() => {
          if (SheetTrigger) SheetTrigger();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 bg-foreground rounded-xl md:block" />
      )}
    </div>
  );
}
// function NavbarItems({ items }: { items: { label: string; href: string }[] }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         {items.map((item) => (
//           <DropdownMenuItem key={item.label}>
//             <span>{item.label}</span>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
