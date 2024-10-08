import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import Overview from "./_components/Overview";
import History from "./_components/History";
import { TransactionType } from "@/lib/types";
async function page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold ">Hello, {user.firstName}👋</p>
          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              type={TransactionType.income}
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New income
                </Button>
              }
            />

            <CreateTransactionDialog
              type={TransactionType.expense}
              trigger={
                <Button
                  variant={"outline"}
                  className="border-red-500 bg-red-950 text-white hover:bg-red-700 hover:text-white"
                >
                  New expense
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
}

export default page;
