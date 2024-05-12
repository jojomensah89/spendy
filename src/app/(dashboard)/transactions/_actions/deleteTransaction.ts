"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(transactionId: string) {
  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      userId: user.id,
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new Error("bad request - transaction not found");
  }

  await prisma.$transaction([
    // delete transaction from db

    prisma.transaction.delete({
      where: {
        userId: user.id,
        id: transactionId,
      },
    }),

    // update month history
    prisma.monthHistory.update({
      where: {
        day_month_year_userId: {
          day: transaction.date.getUTCDate(),
          month: transaction.date.getUTCMonth(),
          year: transaction.date.getUTCFullYear(),
          userId: user.id,
        },
      },
      data: {
        ...(transaction.type === "expense"
          ? {
              expense: {
                decrement: transaction.amount,
              },
            }
          : {
              income: {
                decrement: transaction.amount,
              },
            }),
      },
    }),
    // update year history
    prisma.yearHistory.update({
      where: {
        month_year_userId: {
          month: transaction.date.getUTCMonth(),
          year: transaction.date.getUTCFullYear(),
          userId: user.id,
        },
      },
      data: {
        ...(transaction.type === "expense"
          ? {
              expense: {
                decrement: transaction.amount,
              },
            }
          : {
              income: {
                decrement: transaction.amount,
              },
            }),
      },
    }),
  ]);
}
