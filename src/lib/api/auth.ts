'use server';

import db from '../../db';
import { usersTable } from "@/db/schema";
import { and, eq } from 'drizzle-orm';
import {hash, compare} from 'bcrypt';

const ROUNDS = 10;

export async function login(email: string, password: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user.length) {
    return null;
  }

  if (await compare(password, user[0].password)) {
    return user[0].id;
  }

  return null;
}

export async function register(
  email: string,
  username: string,
  password: string
) {
  await db.insert(usersTable).values({
    email: email,
    password: await hash(password, ROUNDS),
    name: username
  });
}
