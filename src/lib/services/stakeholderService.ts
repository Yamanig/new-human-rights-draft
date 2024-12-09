import { db } from '../db';
import { stakeholders, notificationPreferences, type NewStakeholder } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createStakeholder(stakeholderData: NewStakeholder) {
  try {
    const [stakeholder] = await db.insert(stakeholders).values(stakeholderData).returning();
    return stakeholder;
  } catch (error) {
    console.error('Error creating stakeholder:', error);
    throw new Error('Failed to create stakeholder');
  }
}

export async function updateStakeholder(id: string, data: Partial<NewStakeholder>) {
  try {
    const [updated] = await db
      .update(stakeholders)
      .set(data)
      .where(eq(stakeholders.id, id))
      .returning();
    return updated;
  } catch (error) {
    console.error('Error updating stakeholder:', error);
    throw new Error('Failed to update stakeholder');
  }
}

export async function getActiveStakeholders() {
  try {
    return await db
      .select()
      .from(stakeholders)
      .where(eq(stakeholders.active, true));
  } catch (error) {
    console.error('Error fetching stakeholders:', error);
    throw new Error('Failed to fetch stakeholders');
  }
}

export async function setNotificationPreferences(stakeholderId: string, preferences: any) {
  try {
    return await db
      .insert(notificationPreferences)
      .values({
        stakeholderId,
        ...preferences
      })
      .returning();
  } catch (error) {
    console.error('Error setting notification preferences:', error);
    throw new Error('Failed to set notification preferences');
  }
}