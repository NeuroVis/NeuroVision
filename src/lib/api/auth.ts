'use server';

import db from '../../db';
import { usersTable } from '../../db/schema';
import { and, eq } from 'drizzle-orm';

export async function login(email: string, password: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(and(eq(usersTable.email, email), eq(usersTable.password, password)));
  if ((user.length = 1)) {
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
    password: password,
    name: username
  });
}
