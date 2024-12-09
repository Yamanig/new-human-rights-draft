import { db } from '../db';
import { evidence } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { NewEvidence } from '../db/schema';

export async function uploadEvidence(file: File): Promise<string> {
  // In a real application, implement file upload to a storage service
  // For now, return a mock URL
  return `https://storage.example.com/${file.name}`;
}

export async function createEvidence(evidenceData: NewEvidence) {
  try {
    const [newEvidence] = await db
      .insert(evidence)
      .values(evidenceData)
      .returning();
    return newEvidence;
  } catch (error) {
    console.error('Error creating evidence:', error);
    throw new Error('Failed to create evidence');
  }
}

export async function getEvidenceByReportId(reportId: string) {
  try {
    const evidenceFiles = await db
      .select()
      .from(evidence)
      .where(eq(evidence.reportId, reportId));
    return evidenceFiles;
  } catch (error) {
    console.error('Error fetching evidence:', error);
    throw new Error('Failed to fetch evidence');
  }
}