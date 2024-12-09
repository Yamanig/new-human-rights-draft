import { db } from '../db';
import { reports, evidence } from '../db/schema';
import type { ReportFormData } from '../validation/reportValidation';
import { eq, desc } from 'drizzle-orm';

export async function createReport(data: ReportFormData) {
  try {
    // Start a transaction
    const result = await db.transaction(async (tx) => {
      // Create the report
      const [report] = await tx.insert(reports).values({
        title: data.title,
        description: data.description,
        location: data.location,
        incidentDate: new Date(data.incidentDate),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }).returning();

      // If there's evidence, create evidence records
      if (data.evidence && data.evidence.length > 0) {
        await tx.insert(evidence).values(
          data.evidence.map(file => ({
            reportId: report.id,
            type: file.type,
            url: file.url,
            name: file.name,
            uploadedBy: report.id, // In a real app, this would be the current user's ID
            uploadedAt: new Date().toISOString()
          }))
        );
      }

      return report;
    });

    return result;
  } catch (error) {
    console.error('Error creating report:', error);
    throw new Error('Failed to create report. Please try again.');
  }
}

export async function getRecentReports(limit = 5) {
  try {
    const recentReports = await db
      .select()
      .from(reports)
      .orderBy(desc(reports.createdAt))
      .limit(limit);

    return recentReports;
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    throw new Error('Failed to fetch recent reports');
  }
}

export async function getReportStats() {
  try {
    const allReports = await db.select().from(reports);
    
    return {
      total: allReports.length,
      active: allReports.filter(r => r.status === 'in_progress').length,
      escalated: allReports.filter(r => r.status === 'assigned').length,
      resolved: allReports.filter(r => r.status === 'closed').length,
      pending: allReports.filter(r => r.status === 'open').length
    };
  } catch (error) {
    console.error('Error fetching report stats:', error);
    throw new Error('Failed to fetch report statistics');
  }
}

export async function uploadEvidence(file: File): Promise<string> {
  // In a real application, implement file upload to a storage service
  // For now, return a mock URL
  return `https://storage.example.com/${file.name}`;
}