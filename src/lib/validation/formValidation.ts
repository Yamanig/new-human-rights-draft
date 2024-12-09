import { z } from 'zod';

// Report validation schema
export const reportSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must not exceed 100 characters'),
  incidentDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Please enter a valid date'
    })
    .refine((date) => new Date(date) <= new Date(), {
      message: 'Incident date cannot be in the future'
    }),
  isAnonymous: z.boolean().default(false),
  reporterName: z.string().optional(),
  reporterContact: z.string()
    .email('Please enter a valid email address')
    .optional(),
  evidence: z.array(z.object({
    id: z.string(),
    type: z.enum(['image', 'video', 'document']),
    name: z.string(),
    url: z.string().url()
  })).optional()
});

// Stakeholder validation schema
export const stakeholderSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['level1', 'level2', 'level3']),
  area: z.string()
    .min(2, 'Area must be at least 2 characters')
    .max(100, 'Area must not exceed 100 characters'),
  department: z.string()
    .min(2, 'Department must be at least 2 characters')
    .max(100, 'Department must not exceed 100 characters'),
  contact: z.string()
    .min(5, 'Contact information must be at least 5 characters')
    .max(50, 'Contact information must not exceed 50 characters'),
  notificationPreferences: z.array(z.object({
    type: z.enum(['email', 'sms', 'in_app']),
    enabled: z.boolean(),
    frequency: z.enum(['immediate', 'daily', 'weekly']),
    categories: z.array(z.string())
  }))
});

// UN Question validation schema
export const unQuestionSchema = z.object({
  question: z.string()
    .min(10, 'Question must be at least 10 characters')
    .max(1000, 'Question must not exceed 1000 characters'),
  reportId: z.string().uuid('Invalid report ID'),
  assignedTo: z.string().uuid('Invalid stakeholder ID'),
  dueDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Please enter a valid date'
    })
    .refine((date) => new Date(date) > new Date(), {
      message: 'Due date must be in the future'
    })
});

// Answer validation schema
export const answerSchema = z.object({
  text: z.string()
    .min(20, 'Answer must be at least 20 characters')
    .max(2000, 'Answer must not exceed 2000 characters'),
  documents: z.array(z.object({
    id: z.string(),
    type: z.enum(['image', 'video', 'document']),
    url: z.string().url('Invalid URL'),
    name: z.string()
  })).optional()
});

export type ReportFormData = z.infer<typeof reportSchema>;
export type StakeholderFormData = z.infer<typeof stakeholderSchema>;
export type UNQuestionFormData = z.infer<typeof unQuestionSchema>;
export type AnswerFormData = z.infer<typeof answerSchema>;