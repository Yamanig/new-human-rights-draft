import type { Report, UNQuestion, Evidence, Stakeholder } from '../types';

export const mockReports: Report[] = [
  {
    id: 'R001',
    title: 'Human Rights Violation in Mining Community',
    description: 'Reports of unsafe working conditions and child labor in local mining operations.',
    location: 'Copper Valley, Region A',
    incidentDate: '2024-02-15',
    status: 'open',
    createdAt: '2024-02-16T08:30:00Z',
    evidence: [
      {
        id: 'E001',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d',
        name: 'site-conditions.jpg'
      }
    ]
  },
  {
    id: 'R002',
    title: 'Discrimination in Educational Institution',
    description: 'Multiple complaints about systematic discrimination against minority students.',
    location: 'Central City',
    incidentDate: '2024-02-10',
    status: 'in-progress',
    createdAt: '2024-02-11T14:20:00Z',
    assignedTo: 'ST001',
    evidence: []
  },
  {
    id: 'R003',
    title: 'Freedom of Speech Violation',
    description: 'Journalists being prevented from covering local protests.',
    location: 'Downtown Metro',
    incidentDate: '2024-02-18',
    status: 'assigned',
    createdAt: '2024-02-18T16:45:00Z',
    assignedTo: 'ST002',
    evidence: [
      {
        id: 'E002',
        type: 'video',
        url: 'https://example.com/video1.mp4',
        name: 'protest-footage.mp4'
      }
    ]
  },
  {
    id: 'R004',
    title: 'Healthcare Access Denial',
    description: 'Reports of discriminatory practices in local healthcare facility.',
    location: 'East District Hospital',
    incidentDate: '2024-02-05',
    status: 'closed',
    createdAt: '2024-02-06T09:15:00Z',
    evidence: []
  }
];

export const mockUNQuestions: UNQuestion[] = [
  {
    id: 'Q001',
    reportId: 'R001',
    question: 'What immediate actions have been taken to address the child labor allegations?',
    status: 'pending',
    assignedTo: 'ST001',
    dueDate: '2024-03-01',
    createdAt: '2024-02-17T10:00:00Z'
  },
  {
    id: 'Q002',
    reportId: 'R002',
    question: 'Please provide details of the discrimination cases and any institutional response.',
    status: 'answered',
    assignedTo: 'ST002',
    dueDate: '2024-02-25',
    createdAt: '2024-02-12T11:30:00Z',
    answer: {
      text: 'Investigation has been initiated. Initial findings show potential systemic issues. Remedial measures being developed.',
      documents: [
        {
          id: 'D001',
          type: 'document',
          url: 'https://example.com/doc1.pdf',
          name: 'investigation-report.pdf'
        }
      ],
      submittedAt: '2024-02-20T15:45:00Z'
    }
  },
  {
    id: 'Q003',
    reportId: 'R003',
    question: 'What measures are being implemented to protect press freedom?',
    status: 'under_review',
    assignedTo: 'ST003',
    dueDate: '2024-03-05',
    createdAt: '2024-02-19T13:20:00Z',
    answer: {
      text: 'Local authorities have been engaged. New guidelines for protest coverage being developed.',
      documents: [],
      submittedAt: '2024-02-22T09:30:00Z'
    }
  }
];

export const mockStakeholders: Stakeholder[] = [
  {
    id: 'ST001',
    name: 'John Smith',
    role: 'level1',
    area: 'Field Operations',
    contact: '+1234567890',
    email: 'john.smith@example.com',
    category: 'field_officer',
    department: 'Investigation Unit',
    active: true,
    notificationPreferences: [
      {
        type: 'email',
        enabled: true,
        frequency: 'immediate',
        categories: ['escalation', 'assignment']
      }
    ]
  },
  {
    id: 'ST002',
    name: 'Sarah Johnson',
    role: 'level2',
    area: 'Regional Supervision',
    contact: '+1234567891',
    email: 'sarah.johnson@example.com',
    category: 'supervisor',
    department: 'Oversight Division',
    active: true,
    notificationPreferences: [
      {
        type: 'email',
        enabled: true,
        frequency: 'daily',
        categories: ['escalation', 'assignment', 'deadline']
      }
    ]
  },
  {
    id: 'ST003',
    name: 'Michael Chen',
    role: 'level3',
    area: 'Central Administration',
    contact: '+1234567892',
    email: 'michael.chen@example.com',
    category: 'administrator',
    department: 'Executive Office',
    active: true,
    notificationPreferences: [
      {
        type: 'email',
        enabled: true,
        frequency: 'immediate',
        categories: ['escalation', 'system']
      }
    ]
  }
];