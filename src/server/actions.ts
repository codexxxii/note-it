"use server";

import { db } from "./db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import {
  createFolderSchema,
  folders,
  users,
  files,
  createFileSchema,
} from "./db/schema";
import { FileSchema, FolderSchema, userSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Auth
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

// Folders
export async function createFolder(folder: FolderSchema) {
  const userId = await authCheck();

  try {
    const nameIsTaken = await db.query.folders.findFirst({
      where: and(eq(folders.name, folder.name), eq(folders.user_id, userId)),
    });

    if (nameIsTaken) {
      return { success: false };
    }

    const validSchema = createFolderSchema.parse({
      ...folder,
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
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFolder(folderId: string) {
  const userId = await authCheck();

  try {
    const data = await db.query.folders.findFirst({
      where: and(eq(folders.user_id, userId), eq(folders.id, folderId)),
      columns: {
        id: true,
        name: true,
      },
      with: {
        files: {
          orderBy: (files, { desc }) => [desc(files.updated_at)],
          columns: {
            id: true,
            created_at: true,
            updated_at: true,
            title: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFolder(folderId: string) {
  const userId = await authCheck();

  try {
    const folderExists = await db.query.folders.findFirst({
      where: and(eq(folders.id, folderId), eq(folders.user_id, userId)),
    });

    if (!folderExists) {
      throw new Error("Folder does not exist");
    }

    await db.delete(folders).where(eq(folders.id, folderExists.id));

    redirect("/folders");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Files
export async function createFile(file: FileSchema) {
  const userId = await authCheck();

  try {
    const nameIsTaken = await db.query.files.findFirst({
      where: and(
        eq(files.user_id, userId),
        eq(files.title, file.title),
        eq(files.folder_id, file.folder_id),
      ),
    });

    if (nameIsTaken) {
      return { success: false };
    }

    const validSchema = createFileSchema.parse({
      ...file,
      user_id: userId,
    });

    await db.insert(files).values(validSchema);

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFile(fileId: string) {
  const userId = await authCheck();

  try {
    const fileExists = await db.query.files.findFirst({
      where: and(eq(files.id, fileId), eq(files.user_id, userId)),
    });

    if (!fileExists) {
      throw new Error("File does not exist");
    }

    await db.delete(files).where(eq(files.id, fileExists.id));

    revalidatePath("/folders/:id");

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
