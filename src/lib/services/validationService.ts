import { z } from 'zod';
import { reportSchema, stakeholderSchema, unQuestionSchema, answerSchema } from '../validation/formValidation';

export async function validateReport(data: unknown) {
  return reportSchema.parseAsync(data);
}

export async function validateStakeholder(data: unknown) {
  return stakeholderSchema.parseAsync(data);
}

export async function validateUNQuestion(data: unknown) {
  return unQuestionSchema.parseAsync(data);
}

export async function validateAnswer(data: unknown) {
  return answerSchema.parseAsync(data);
}

export function formatValidationErrors(error: z.ZodError) {
  return error.errors.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.path[0]]: curr.message,
    }),
    {}
  );
}