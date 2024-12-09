import { z } from 'zod';

export const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().min(3, 'Location is required'),
  incidentDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  }),
  isAnonymous: z.boolean().optional(),
  reporterName: z.string().optional(),
  reporterContact: z.string().optional(),
  evidence: z.array(z.object({
    file: z.instanceof(File),
    type: z.enum(['image', 'video', 'document'])
  })).optional()
});

export const stakeholderSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['level1', 'level2', 'level3']),
  area: z.string().min(2, 'Area is required'),
  department: z.string().min(2, 'Department is required'),
  contact: z.string().min(5, 'Contact information is required'),
  notificationPreferences: z.array(z.object({
    type: z.enum(['email', 'sms', 'in_app']),
    enabled: z.boolean(),
    frequency: z.enum(['immediate', 'daily', 'weekly']),
    categories: z.array(z.string())
  }))
});

export const unQuestionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters'),
  reportId: z.string().uuid('Invalid report ID'),
  assignedTo: z.string().uuid('Invalid stakeholder ID'),
  dueDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format'
  })
});

export type ReportFormData = z.infer<typeof reportSchema>;
export type StakeholderFormData = z.infer<typeof stakeholderSchema>;
export type UNQuestionFormData = z.infer<typeof unQuestionSchema>;