import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { NewUser } from '../db/schema';

export async function createUser(userData: NewUser) {
  try {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserById(id: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function updateUser(id: string, data: Partial<NewUser>) {
  try {
    const [updated] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updated;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}