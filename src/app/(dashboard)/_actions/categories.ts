"use server";
import prisma from "@/lib/prisma";
import {
  CreateCategotySchema,
  CreateCategotySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createCategory(form: CreateCategotySchemaType) {
  const parsedBody = CreateCategotySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad  request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/signin");
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
