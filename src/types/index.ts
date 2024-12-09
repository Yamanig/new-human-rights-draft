export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  incidentDate: string;
  reportingParty?: {
    name: string;
    contact: string;
  };
  status: 'open' | 'assigned' | 'in-progress' | 'closed';
  createdAt: string;
  evidence: Evidence[];
  assignedTo?: string;
}

export interface Evidence {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  name: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  role: 'level1' | 'level2' | 'level3';
  area: string;
  contact: string;
  email: string;
  category: StakeholderCategory;
  notificationPreferences: NotificationPreference[];
  supervisor?: string;
  department: string;
  active: boolean;
  lastActive?: string;
}

export type StakeholderCategory = 
  | 'field_officer'
  | 'investigator'
  | 'supervisor'
  | 'administrator'
  | 'legal_expert'
  | 'medical_professional'
  | 'social_worker'
  | 'psychologist'
  | 'human_rights_expert';

export interface NotificationPreference {
  type: 'email' | 'sms' | 'in_app';
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  categories: ('escalation' | 'assignment' | 'deadline' | 'feedback' | 'system')[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'choice' | 'date';
  options?: string[];
  required: boolean;
}

export interface QuestionnaireResponse {
  id: string;
  questionnaireId: string;
  reportId: string;
  respondentId: string;
  answers: Answer[];
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface UNQuestion {
  id: string;
  reportId: string;
  question: string;
  status: 'pending' | 'answered' | 'under_review';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  answer?: {
    text: string;
    documents: Evidence[];
    submittedAt: string;
  };
  internalNotes?: string;
}

export interface EscalationLevel {
  level: 1 | 2 | 3;
  timeframe: number; // hours until escalation
  notifyStakeholders: string[]; // stakeholder IDs
  autoEscalate: boolean;
  requiresApproval: boolean;
  escalationMessage: string;
}