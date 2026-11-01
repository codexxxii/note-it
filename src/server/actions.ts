"use server";

import { db } from "./db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { createFolderSchema, folders, users } from "./db/schema";
import { FolderSchema, userSchema } from "@/lib/shared-types";
import { revalidatePath } from "next/cache";

async function authCheck() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return userId;
}

export async function authCallback() {
  const userId = await authCheck();

  try {
    const userExists = await db.query.users.findFirst({
      where: eq(users.clerk_id, userId),
    });

    if (!userExists) {
      const validSchema = userSchema.parse({
        clerk_id: userId,
      });

      await db.insert(users).values(validSchema);
    }

    redirect("/home");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createFolder(folder: FolderSchema) {
  const userId = await authCheck();

  try {
    const nameIsTaken = await db.query.folders.findFirst({
      where: and(eq(folders.name, folder.name), eq(folders.user_id, userId)),
    });

    if (nameIsTaken) {
      return { success: false };
    }

    const slug = folder.name.replace(" ", "-").toLowerCase();

    const validSchema = createFolderSchema.parse({
      ...folder,
      slug,
      user_id: userId,
    });

    await db.insert(folders).values(validSchema);

    revalidatePath("folders");

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFolders() {
  const userId = await authCheck();

  try {
    const data = await db.query.folders.findMany({
      where: eq(folders.user_id, userId),
      orderBy: (folders, { desc }) => [desc(folders.created_at)],
      columns: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFolder(slug: string) {
  const userId = await authCheck();

  try {
    const data = await db.query.folders.findFirst({
      where: and(eq(folders.user_id, userId), eq(folders.slug, slug)),
      columns: {
        id: true,
        name: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
