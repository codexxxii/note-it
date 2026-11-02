import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  clerk_id: text("clerk_id").unique().notNull(),
});

export const createUserSchema = createInsertSchema(users);

export const userRelations = relations(users, ({ many }) => ({
  folders: many(folders),
  files: many(files),
}));

// Folders
export const folders = pgTable("folders", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
});

export const createFolderSchema = createInsertSchema(folders);

export const folderRelations = relations(folders, ({ one, many }) => ({
  user: one(users, { fields: [folders.user_id], references: [users.clerk_id] }),
  files: many(files),
}));

// Files
export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .references(() => users.clerk_id, { onDelete: "cascade" })
    .notNull(),
  folder_id: uuid("folder_id")
    .references(() => folders.id, { onDelete: "cascade" })
    .notNull(),
  title: text("name").notNull(),
  content: text("content").notNull(),
});

export const createFileSchema = createInsertSchema(files);

export const fileRelations = relations(files, ({ one }) => ({
  user: one(users, { fields: [files.user_id], references: [users.clerk_id] }),
  folder: one(folders, { fields: [files.folder_id], references: [folders.id] }),
}));
