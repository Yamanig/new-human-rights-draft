import { queryDb as db } from '../db';
import { unReviewQuestions, type NewUNReviewQuestion } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createQuestion(questionData: NewUNReviewQuestion) {
  const [question] = await db.insert(unReviewQuestions).values(questionData).returning();
  return question;
}

export async function submitAnswer(
  questionId: string, 
  answer: string, 
  documents: any[]
) {
  const [updated] = await db
    .update(unReviewQuestions)
    .set({
      answer,
      answerDocuments: documents,
      status: 'answered',
      answeredAt: new Date().toISOString()
    })
    .where(eq(unReviewQuestions.id, questionId))
    .returning();
  return updated;
}

export async function getPendingQuestions() {
  return db
    .select()
    .from(unReviewQuestions)
    .where(eq(unReviewQuestions.status, 'pending'));
}

export async function getQuestionsByReport(reportId: string) {
  return db
    .select()
    .from(unReviewQuestions)
    .where(eq(unReviewQuestions.reportId, reportId));
}