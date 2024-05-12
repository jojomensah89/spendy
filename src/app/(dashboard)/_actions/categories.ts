"use server";
import { unstable_noStore as noStore } from "next/cache";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    noStore();

  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad  request");
  }

  const { name, icon, type } = parsedBody.data;
  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
    // noStore();

  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }

  const parsedBody = DeleteCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad  request");
  }
  const { name, type } = parsedBody.data;

  return await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name,
        type,
      },
    },
    // include: {
    //   transactions: true,
    // },
  });
}
