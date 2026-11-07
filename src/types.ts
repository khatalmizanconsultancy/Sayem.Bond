export type ApplicationStatus =
  | 'Received'
  | 'Documents Required'
  | 'Under Process'
  | 'Submitted to Authority'
  | 'Biometrics Scheduled'
  | 'Approved'
  | 'Completed'
  | 'On Hold'
  | 'Rejected';

export type UAEEmirate =
  | 'Dubai'
  | 'Abu Dhabi'
  | 'Sharjah'
  | 'Ajman'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Umm Al Quwain';

export type ServicePriority = 'Standard' | 'Express 24h' | 'VIP Same Day';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: ApplicationStatus;
  completed: boolean;
  authority?: string;
  isActionRequired?: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'action_needed' | 'waived';
  required: boolean;
  notes?: string;
}

export interface ApplicantRecord {
  id: string; // e.g. SAY-1001
  name: string;
  phone: string;
  email?: string;
  photoUrl?: string; // custom uploaded photo data URL or avatar identifier
  service: string;
  serviceCategory: string;
  status: ApplicationStatus;
  amount: number; // in AED
  paid: number;   // in AED
  due?: string;   // target completion
  submissionDate: string;
  updated: string;
  emirate: UAEEmirate;
  govtRefNo?: string; // e.g. ICP-2026-98124 or GDRFA-DXB-98124
  priority: ServicePriority;
  timeline: TimelineEvent[];
  documents: DocumentItem[];
  note?: string;
}

export interface TransactionRecord {
  id: string; // e.g. RCP-2026-1042
  appId: string;
  applicant: string;
  phone: string;
  service: string;
  amount: number;
  method: 'Cash' | 'Bank Transfer' | 'Card' | 'Online Link' | 'Apple Pay / GPay';
  date: string;
  note?: string;
}

export interface ActivityRecord {
  id: string;
  msg: string;
  time: string;
  type: 'status_change' | 'applicant_new' | 'payment' | 'document_update' | 'system';
  refId?: string;
  badge?: string;
}

export interface UAEServiceDefinition {
  id: string;
  name: string;
  category: string;
  categorySlug: 'visa' | 'labor' | 'transport' | 'business' | 'legal' | 'medical' | 'typing';
  authority: string;
  description: string;
  icon: string;
  startingPrice: number;
  turnaroundTime: string;
  documentsNeeded: string[];
  keyHighlights: string[];
  isPopular?: boolean;
  isExpressAvailable?: boolean;
}
