import { ApplicantRecord, TransactionRecord, ActivityRecord } from '../types.ts';

export const INITIAL_APPLICANTS: ApplicantRecord[] = [
  {
    id: 'SAY-1001',
    name: 'Fatima Al-Zaabi',
    phone: '0501234567',
    email: 'fatima.zaabi@dubaiholding.ae',
    photoUrl: 'avatar-emirati-f',
    service: 'UAE 10-Year Golden Visa Nomination & Typing',
    serviceCategory: 'Identity & Immigration',
    status: 'Approved',
    amount: 1450,
    paid: 1450,
    due: '2026-11-04',
    submissionDate: '2026-10-25 10:30',
    updated: '2026-11-01 08:45',
    emirate: 'Dubai',
    govtRefNo: 'GDRFA-DXB-9481920',
    priority: 'VIP Same Day',
    note: 'Real estate investor package verified. Digital nomination granted by GDRFA Dubai.',
    documents: [
      { id: 'doc-1', name: 'Title Deed (AED 2.4M Dubai Marina)', status: 'verified', required: true },
      { id: 'doc-2', name: 'Passport Copy (Valid 2029)', status: 'verified', required: true },
      { id: 'doc-3', name: 'Health Insurance Comprehensive Certificate', status: 'verified', required: true },
      { id: 'doc-4', name: 'ICP Biometrics & Digital Photo', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'Application Received & Pre-Screened',
        description: 'Client files reviewed and confirmed meeting 10-Year Golden Visa eligibility criteria.',
        timestamp: '2026-10-25 10:30',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Title Deed Verification at Dubai Land Department',
        description: 'Electronic title deed authenticated with DLD smart registry.',
        timestamp: '2026-10-26 14:15',
        status: 'Under Process',
        completed: true,
        authority: 'DLD Dubai'
      },
      {
        id: 'tl-3',
        title: 'Submitted to GDRFA Dubai Golden Gate Portal',
        description: 'Official file lodged under Reference GDRFA-DXB-9481920.',
        timestamp: '2026-10-28 11:20',
        status: 'Submitted to Authority',
        completed: true,
        authority: 'GDRFA Dubai'
      },
      {
        id: 'tl-4',
        title: 'Golden Visa Nomination Approved',
        description: 'Security clearance passed and electronic Golden Visa issued. Ready for 10-year residency card collection.',
        timestamp: '2026-11-01 08:45',
        status: 'Approved',
        completed: true,
        authority: 'GDRFA / ICP'
      }
    ]
  },
  {
    id: 'SAY-1002',
    name: 'Mohammed Rashid Khan',
    phone: '0554198152',
    email: 'm.rashid.khan@gmail.com',
    photoUrl: 'avatar-exec-m',
    service: 'Emirates ID (New / Renewal / Replacement)',
    serviceCategory: 'Identity & Immigration',
    status: 'Documents Required',
    amount: 270,
    paid: 150,
    due: '2026-11-06',
    submissionDate: '2026-10-29 16:10',
    updated: '2026-10-31 14:20',
    emirate: 'Dubai',
    govtRefNo: 'ICP-2026-881923',
    priority: 'Standard',
    note: 'Biometric photo rejected by ICP system due to dark background. New white background photo requested.',
    documents: [
      { id: 'doc-1', name: 'Current Emirates ID copy', status: 'verified', required: true },
      { id: 'doc-2', name: 'Valid Residency Visa Page', status: 'verified', required: true },
      { id: 'doc-3', name: 'Passport-size Biometric Photo (White BG)', status: 'action_needed', required: true, notes: 'Must be studio quality without glasses or glare' }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'Renewal Application Form Typed',
        description: 'ICP smart application submitted for Emirates ID card renewal.',
        timestamp: '2026-10-29 16:10',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'ICP System Validation Feedback',
        description: 'Authority request received: Photo does not meet biometric standards. Please upload a clear photo with white background.',
        timestamp: '2026-10-31 14:20',
        status: 'Documents Required',
        completed: false,
        authority: 'ICP Federal Authority',
        isActionRequired: true
      }
    ]
  },
  {
    id: 'SAY-1003',
    name: 'Elena Rostova',
    phone: '0528876123',
    email: 'elena.rostova@techhorizon.io',
    service: 'MOHRE Electronic Work Permit & Offer Letter',
    serviceCategory: 'Employment & Labour',
    status: 'Submitted to Authority',
    amount: 450,
    paid: 450,
    due: '2026-11-03',
    submissionDate: '2026-10-30 09:15',
    updated: '2026-10-31 17:00',
    emirate: 'Dubai',
    govtRefNo: 'MB-2026-554192',
    priority: 'Express 24h',
    note: 'Company computer card active. Awaiting initial approval for Software Engineer profession.',
    documents: [
      { id: 'doc-1', name: 'Trade License & Establishment Card', status: 'verified', required: true },
      { id: 'doc-2', name: 'Passport & Education Degree (MOFA Attested)', status: 'verified', required: true },
      { id: 'doc-3', name: 'Signed Bilingual MOHRE Job Offer', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'MOHRE Job Offer Letter Typed & Signed',
        description: 'Job offer drafted according to UAE Federal Decree Law No. 33 of 2021.',
        timestamp: '2026-10-30 09:15',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Quota Allocation & Security Clearance',
        description: 'Work permit application uploaded to MOHRE Tasheel system.',
        timestamp: '2026-10-31 17:00',
        status: 'Submitted to Authority',
        completed: true,
        authority: 'Ministry of Human Resources (MOHRE)'
      }
    ]
  },
  {
    id: 'SAY-1004',
    name: 'Rajesh Patel',
    phone: '0567789412',
    email: 'rajesh.patel@me.com',
    service: 'Ejari Online Registration & Tenancy Attestation',
    serviceCategory: 'Business & Commercial',
    status: 'Completed',
    amount: 220,
    paid: 220,
    due: '2026-10-28',
    submissionDate: '2026-10-28 11:00',
    updated: '2026-10-28 16:30',
    emirate: 'Dubai',
    govtRefNo: 'EJR-2026-99218',
    priority: 'VIP Same Day',
    note: 'Ejari certificate issued and verified with Dubai Land Department barcode.',
    documents: [
      { id: 'doc-1', name: 'Tenancy Contract (DLD Unified)', status: 'verified', required: true },
      { id: 'doc-2', name: 'DEWA Account Bill & Premise Number', status: 'verified', required: true },
      { id: 'doc-3', name: 'Tenant Emirates ID & Landlord Passport', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'Tenancy Verification & Premise Linking',
        description: 'DEWA premise linked with DLD land parcel.',
        timestamp: '2026-10-28 11:00',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Ejari Attestation Registered & Certificate Issued',
        description: 'Official Ejari certificate generated with digital QR verification. Ready for family visa sponsorship.',
        timestamp: '2026-10-28 16:30',
        status: 'Completed',
        completed: true,
        authority: 'Dubai Land Department'
      }
    ]
  },
  {
    id: 'SAY-1005',
    name: 'David Sterling',
    phone: '0581123490',
    email: 'd.sterling@sterlingmedia.ae',
    service: 'Trade License Issue, Renewal & Amendments',
    serviceCategory: 'Business & Commercial',
    status: 'Under Process',
    amount: 1850,
    paid: 1000,
    due: '2026-11-05',
    submissionDate: '2026-10-27 15:45',
    updated: '2026-10-31 11:20',
    emirate: 'Dubai',
    govtRefNo: 'DET-DXB-77402',
    priority: 'Standard',
    note: 'Trade name "Sterling Digital Media LLC" approved by Dubai Economy. Preparing electronic MoA.',
    documents: [
      { id: 'doc-1', name: 'Trade Name Reservation Certificate', status: 'verified', required: true },
      { id: 'doc-2', name: 'Shareholder Passport Copies & EIDs', status: 'verified', required: true },
      { id: 'doc-3', name: 'Initial Approval Certificate', status: 'verified', required: true },
      { id: 'doc-4', name: 'Electronic MoA Signing via UAE Pass', status: 'pending', required: true, notes: 'Awaiting shareholder sign-off' }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'Trade Name Reservation Submitted',
        description: 'Trade name Sterling Digital Media LLC approved by DET.',
        timestamp: '2026-10-27 15:45',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Initial Approval Issued',
        description: 'DET initial approval certificate generated. Proceeding to MoA drafting.',
        timestamp: '2026-10-29 10:15',
        status: 'Under Process',
        completed: true,
        authority: 'Dubai Economy and Tourism'
      },
      {
        id: 'tl-3',
        title: 'Court Notary MoA Electronic Signature',
        description: 'MoA uploaded to Dubai Courts system for digital shareholder signature.',
        timestamp: '2026-10-31 11:20',
        status: 'Under Process',
        completed: false,
        authority: 'Dubai Courts Notary'
      }
    ]
  },
  {
    id: 'SAY-1006',
    name: 'Carlos Mendoza',
    phone: '0543329011',
    email: 'carlos.mendoza@airlinecorp.com',
    service: 'DHA / SEHA / EHS Medical Fitness Typing',
    serviceCategory: 'Medical & Insurance',
    status: 'Completed',
    amount: 290,
    paid: 290,
    due: '2026-10-30',
    submissionDate: '2026-10-29 08:30',
    updated: '2026-10-30 13:00',
    emirate: 'Dubai',
    govtRefNo: 'DHA-MED-44109',
    priority: 'VIP Same Day',
    note: 'VIP 24h Medical Fitness passed (Fitness Certificate category A). Linked to ICP residency.',
    documents: [
      { id: 'doc-1', name: 'Passport & New Entry Permit', status: 'verified', required: true },
      { id: 'doc-2', name: 'DHA Smart Medical Appointment Slip', status: 'verified', required: true },
      { id: 'doc-3', name: 'Blood Test & Chest X-Ray Clearance', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'VIP 24h Medical Application Typed',
        description: 'Smart Salim VIP Medical Fitness Center appointment booked.',
        timestamp: '2026-10-29 08:30',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Screening Completed & Certificate Uploaded',
        description: 'Negative infectious screen confirmed. DHA certificate sent directly to GDRFA.',
        timestamp: '2026-10-30 13:00',
        status: 'Completed',
        completed: true,
        authority: 'Dubai Health Authority'
      }
    ]
  },
  {
    id: 'SAY-1007',
    name: 'Aisha Bello',
    phone: '0559814400',
    email: 'aisha.bello@globallogistics.ae',
    service: 'Family Residence Visa (Spouse & Children)',
    serviceCategory: 'Identity & Immigration',
    status: 'Under Process',
    amount: 1100,
    paid: 600,
    due: '2026-11-07',
    submissionDate: '2026-10-28 14:00',
    updated: '2026-10-31 16:45',
    emirate: 'Abu Dhabi',
    govtRefNo: 'ICP-AUH-339210',
    priority: 'Standard',
    note: 'Dependent entry permit issued. Family arrived in UAE; booking biometric appointments.',
    documents: [
      { id: 'doc-1', name: 'Sponsor Salary Certificate (AED 12,000)', status: 'verified', required: true },
      { id: 'doc-2', name: 'Attested Marriage & Birth Certificates', status: 'verified', required: true },
      { id: 'doc-3', name: 'Tenancy Contract (Tawtheeq Abu Dhabi)', status: 'verified', required: true },
      { id: 'doc-4', name: 'Dependent Medical Fitness & Biometrics', status: 'pending', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'Dependent Entry Permit Application',
        description: 'Application submitted to ICP Abu Dhabi Immigration.',
        timestamp: '2026-10-28 14:00',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Entry Permit Approved',
        description: 'Green visa entry permit generated for spouse and 2 children.',
        timestamp: '2026-10-30 11:30',
        status: 'Under Process',
        completed: true,
        authority: 'ICP Abu Dhabi'
      },
      {
        id: 'tl-3',
        title: 'Medical Fitness & Emirates ID Typing',
        description: 'SEHA medical appointments and ICP fingerprinting slots scheduled.',
        timestamp: '2026-10-31 16:45',
        status: 'Under Process',
        completed: false,
        authority: 'SEHA / ICP'
      }
    ]
  },
  {
    id: 'SAY-1008',
    name: 'Tariq Mansoor',
    phone: '0504491823',
    email: 'tariq.mansoor@consulting.ae',
    service: 'RTA Services & Driving License Golden Chance',
    serviceCategory: 'Transport & Traffic',
    status: 'Approved',
    amount: 380,
    paid: 380,
    due: '2026-11-02',
    submissionDate: '2026-10-26 12:15',
    updated: '2026-11-01 07:15',
    emirate: 'Dubai',
    govtRefNo: 'RTA-DXB-88301',
    priority: 'Express 24h',
    note: 'Golden Chance direct road test slot booked and confirmed at EDI Al Qusais.',
    documents: [
      { id: 'doc-1', name: 'Home Country License (Verified & Translated)', status: 'verified', required: true },
      { id: 'doc-2', name: 'Emirates ID & Eye Test Report', status: 'verified', required: true },
      { id: 'doc-3', name: 'RTA Traffic File Opening Receipt', status: 'verified', required: true }
    ],
    timeline: [
      {
        id: 'tl-1',
        title: 'RTA File Opened & Legal Translation Uploaded',
        description: 'Traffic file created under applicant Emirates ID.',
        timestamp: '2026-10-26 12:15',
        status: 'Received',
        completed: true
      },
      {
        id: 'tl-2',
        title: 'Golden Chance Test Eligibility Approved',
        description: 'RTA approved waiver for theory classes. Direct road assessment scheduled.',
        timestamp: '2026-11-01 07:15',
        status: 'Approved',
        completed: true,
        authority: 'Roads & Transport Authority (RTA)'
      }
    ]
  }
];

// Default to ZERO dummy receipts in production. 
// Export DEMO_TRANSACTIONS separately if admin explicitly loads demo testing records.
export const DEMO_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'RCP-2026-0981',
    appId: 'SAY-1001',
    applicant: 'Fatima Al-Zaabi',
    phone: '0501234567',
    service: 'UAE 10-Year Golden Visa Nomination & Typing',
    amount: 1450,
    method: 'Bank Transfer',
    date: '2026-10-25 10:45',
    note: 'Full settlement for VIP Golden Visa nomination & processing fee'
  },
  {
    id: 'RCP-2026-0982',
    appId: 'SAY-1004',
    applicant: 'Rajesh Patel',
    phone: '0567789412',
    service: 'Ejari Online Registration & Tenancy Attestation',
    amount: 220,
    method: 'Apple Pay / GPay',
    date: '2026-10-28 11:15',
    note: 'Ejari certificate registration fee'
  },
  {
    id: 'RCP-2026-0983',
    appId: 'SAY-1006',
    applicant: 'Carlos Mendoza',
    phone: '0543329011',
    service: 'DHA / SEHA / EHS Medical Fitness Typing',
    amount: 290,
    method: 'Card',
    date: '2026-10-29 08:45',
    note: 'VIP 24-hr express medical typing'
  },
  {
    id: 'RCP-2026-0984',
    appId: 'SAY-1005',
    applicant: 'David Sterling',
    phone: '0581123490',
    service: 'Trade License Issue, Renewal & Amendments',
    amount: 1000,
    method: 'Bank Transfer',
    date: '2026-10-29 14:00',
    note: 'Initial deposit for trade name & DET initial approval filing'
  },
  {
    id: 'RCP-2026-0985',
    appId: 'SAY-1007',
    applicant: 'Aisha Bello',
    phone: '0559814400',
    service: 'Family Residence Visa (Spouse & Children)',
    amount: 600,
    method: 'Cash',
    date: '2026-10-30 11:00',
    note: 'Entry permit typing and processing advance'
  },
  {
    id: 'RCP-2026-0986',
    appId: 'SAY-1008',
    applicant: 'Tariq Mansoor',
    phone: '0504491823',
    service: 'RTA Services & Driving License Golden Chance',
    amount: 380,
    method: 'Online Link',
    date: '2026-10-31 09:30',
    note: 'RTA Golden Chance file registration fee'
  }
];

// Production default: Empty transactions (no dummy receipts)
export const INITIAL_TRANSACTIONS: TransactionRecord[] = [];

export const INITIAL_ACTIVITIES: ActivityRecord[] = [
  {
    id: 'act-init-1',
    msg: 'Sayem UAE Portal Initialized · Connected to 7 Emirates Federal Government Portals',
    time: '2026-11-06 08:30',
    type: 'system',
    badge: 'System Online'
  },
  {
    id: 'act-init-2',
    msg: 'ICP & GDRFA Smart Electronic Gateway Active · Real-Time Tracking Operational',
    time: '2026-11-06 08:45',
    type: 'system',
    badge: 'Operational'
  },
  {
    id: 'act-init-3',
    msg: 'Security clearance & QR verification engine ready for client handover',
    time: '2026-11-06 09:00',
    type: 'system',
    badge: 'QR Active'
  }
];
