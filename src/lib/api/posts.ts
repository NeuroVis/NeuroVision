"use server";

import db from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPosts() {
  return db.select().from(postsTable);
}

export async function createPost(post: {
  title: string,
  content: string
}) {
  await db.insert(postsTable).values(post);
}

export async function updatePost(id: number, post: {
  title: string,
  content: string
}) {
  await db.update(postsTable).set(post).where(eq(postsTable.id, id));
}

export async function deletePost(id: number) {
  await db.delete(postsTable).where(eq(postsTable.id, id));
}