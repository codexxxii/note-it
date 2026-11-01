import { createUserSchema, createFolderSchema } from "@/server/db/schema";
import { z } from "zod";

export const userSchema = createUserSchema.omit({
  id: true,
  created_at: true,
});

export const folderSchema = createFolderSchema
  .omit({
    id: true,
    user_id: true,
    created_at: true,
    updated_at: true,
    slug: true,
  })
  .extend({
    name: z.string().trim().min(1),
  });

export type FolderSchema = z.infer<typeof folderSchema>;
