import {CurrencySelector} from "@/components/CurrencySelector";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, <span className="ml-2 font-bold">{user.firstName} 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s get started by setting up your currency
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground ">
          You can change this later in the settings
        </h3>
      </div>
      <Separator />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Choose your defalt currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencySelector />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>I&apos;m done! Take me to the dashboard</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default page;
