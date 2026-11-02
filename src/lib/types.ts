import {
  createUserSchema,
  createFolderSchema,
  createFileSchema,
} from "@/server/db/schema";
import { z } from "zod";

// Users
export const userSchema = createUserSchema.omit({
  id: true,
  created_at: true,
});

// Folders
export const folderSchema = createFolderSchema
  .omit({
    id: true,
    user_id: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    name: z.string().trim().min(1),
  });

export type FolderSchema = z.infer<typeof folderSchema>;

// Files
export const fileSchema = createFileSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    user_id: true,
  })
  .extend({
    title: z.string().trim().min(1),
    folder_id: z.string().trim().min(1),
  });

export type FileSchema = z.infer<typeof fileSchema>;
