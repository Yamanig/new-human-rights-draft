import { z } from 'zod';

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
  reporterName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .optional()
    .nullable(),
  reporterContact: z.string()
    .email('Please enter a valid email address')
    .optional()
    .nullable(),
  evidence: z.array(z.object({
    id: z.string(),
    type: z.enum(['image', 'video', 'document']),
    name: z.string(),
    url: z.string().url()
  })).optional()
});

export type ReportFormData = z.infer<typeof reportSchema>;