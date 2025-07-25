import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull()
});

export const postsTable = pgTable("posts", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow()
})

export const chatsTable = pgTable("chats", {
  id: serial().primaryKey(),
  title: text().notNull(),
  content: text().notNull()
})