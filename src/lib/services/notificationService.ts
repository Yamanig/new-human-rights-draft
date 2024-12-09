import { db } from '../db';
import { notificationPreferences } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { NewNotificationPreference } from '../db/schema';

export async function setNotificationPreferences(stakeholderId: string, preferences: NewNotificationPreference[]) {
  try {
    // Delete existing preferences
    await db
      .delete(notificationPreferences)
      .where(eq(notificationPreferences.stakeholderId, stakeholderId));

    // Insert new preferences
    const newPrefs = await db
      .insert(notificationPreferences)
      .values(preferences.map(pref => ({
        ...pref,
        stakeholderId
      })))
      .returning();

    return newPrefs;
  } catch (error) {
    console.error('Error setting notification preferences:', error);
    throw new Error('Failed to set notification preferences');
  }
}

export async function getNotificationPreferences(stakeholderId: string) {
  try {
    const prefs = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.stakeholderId, stakeholderId));
    return prefs;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw new Error('Failed to fetch notification preferences');
  }
}