import { pgTable, uuid, text, timestamp, boolean, json, date, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const reportStatusEnum = pgEnum('report_status', ['open', 'assigned', 'in_progress', 'closed']);
export const evidenceTypeEnum = pgEnum('evidence_type', ['image', 'video', 'document']);
export const questionTypeEnum = pgEnum('question_type', ['text', 'choice', 'date']);
export const stakeholderRoleEnum = pgEnum('stakeholder_role', ['level1', 'level2', 'level3']);
export const notificationTypeEnum = pgEnum('notification_type', ['email', 'sms', 'in_app']);
export const notificationFrequencyEnum = pgEnum('notification_frequency', ['immediate', 'daily', 'weekly']);
export const questionStatusEnum = pgEnum('question_status', ['pending', 'answered', 'under_review']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'stakeholder', 'reporter']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull().default('reporter'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reports table
export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  incidentDate: date('incident_date').notNull(),
  status: reportStatusEnum('status').notNull().default('open'),
  assignedTo: uuid('assigned_to').references(() => stakeholders.id),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Evidence table
export const evidence = pgTable('evidence', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id').references(() => reports.id).notNull(),
  type: evidenceTypeEnum('type').notNull(),
  url: text('url').notNull(),
  name: text('name').notNull(),
  uploadedBy: uuid('uploaded_by').references(() => users.id).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// Stakeholders table
export const stakeholders = pgTable('stakeholders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: stakeholderRoleEnum('role').notNull(),
  area: text('area').notNull(),
  department: text('department').notNull(),
  supervisor: uuid('supervisor').references(() => stakeholders.id),
  active: boolean('active').notNull().default(true),
  lastActive: timestamp('last_active'),
});

// Notification preferences table
export const notificationPreferences = pgTable('notification_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  stakeholderId: uuid('stakeholder_id').references(() => stakeholders.id).notNull(),
  type: notificationTypeEnum('type').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  frequency: notificationFrequencyEnum('frequency').notNull().default('immediate'),
  categories: json('categories').notNull(),
});

// UN Review Questions table
export const unReviewQuestions = pgTable('un_review_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id').references(() => reports.id).notNull(),
  question: text('question').notNull(),
  status: questionStatusEnum('status').notNull().default('pending'),
  assignedTo: uuid('assigned_to').references(() => stakeholders.id),
  dueDate: timestamp('due_date').notNull(),
  answer: text('answer'),
  answerDocuments: json('answer_documents'),
  answeredAt: timestamp('answered_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Types
export type NewUser = typeof users.$inferInsert;
export type NewReport = typeof reports.$inferInsert;
export type NewEvidence = typeof evidence.$inferInsert;
export type NewStakeholder = typeof stakeholders.$inferInsert;
export type NewNotificationPreference = typeof notificationPreferences.$inferInsert;
export type NewUNReviewQuestion = typeof unReviewQuestions.$inferInsert;