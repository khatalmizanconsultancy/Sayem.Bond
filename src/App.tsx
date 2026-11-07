import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { LiveTicker } from './components/LiveTicker.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { LiveTrackerSection } from './components/LiveTrackerSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { FeeEstimator } from './components/FeeEstimator.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { PrintableReceipt } from './components/PrintableReceipt.tsx';
import { 
  ApplicantRecord, 
  TransactionRecord, 
  ActivityRecord, 
  UAEServiceDefinition,
  ApplicationStatus,
  DocumentItem 
} from './types.ts';
import { 
  INITIAL_APPLICANTS, 
  INITIAL_TRANSACTIONS, 
  DEMO_TRANSACTIONS,
  INITIAL_ACTIVITIES 
} from './data/mockData.ts';
import { 
  MessageSquare, 
  Lock, 
  CheckCircle2, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Version 4: Zero dummy receipts default
const STORAGE_KEY = 'sayem_portal_v4';

export default function App() {
  const [applicants, setApplicants] = useState<ApplicantRecord[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_apps`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_APPLICANTS;
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_txns`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [activities, setActivities] = useState<ActivityRecord[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_acts`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ACTIVITIES;
  });

  const [selectedService, setSelectedService] = useState<UAEServiceDefinition | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeReceiptForPrint, setActiveReceiptForPrint] = useState<TransactionRecord | null>(null);
  const [activeApplicantForPrint, setActiveApplicantForPrint] = useState<ApplicantRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_apps`, JSON.stringify(applicants));
    } catch (e) {}
  }, [applicants]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_txns`, JSON.stringify(transactions));
    } catch (e) {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_acts`, JSON.stringify(activities));
    } catch (e) {}
  }, [activities]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const getTimestamp = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Add / Edit Applicant
  const handleSaveApplicant = (data: Partial<ApplicantRecord>) => {
    const now = getTimestamp();
    const id = data.id || `SAY-${1000 + applicants.length + 1}`;
    const existingIndex = applicants.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());

    if (existingIndex >= 0) {
      const oldApp = applicants[existingIndex];
      const statusChanged = oldApp.status !== data.status;

      const updatedApp: ApplicantRecord = {
        ...oldApp,
        ...data,
        id: oldApp.id,
        updated: now,
      } as ApplicantRecord;

      if (statusChanged && data.status) {
        // Append to timeline
        updatedApp.timeline = [
          ...oldApp.timeline,
          {
            id: `tl-${Date.now()}`,
            title: `Status Updated to ${data.status}`,
            description: `Application status updated in portal to ${data.status}.`,
            timestamp: now,
            status: data.status,
            completed: data.status === 'Approved' || data.status === 'Completed',
          }
        ];

        // Append to activities
        const newAct: ActivityRecord = {
          id: `act-${Date.now()}`,
          msg: `Ref ${id} (${updatedApp.name}) status updated to: ${data.status}`,
          time: now,
          type: 'status_change',
          refId: id,
          badge: data.status,
        };
        setActivities((prev) => [newAct, ...prev.slice(0, 99)]);
      }

      const copy = [...applicants];
      copy[existingIndex] = updatedApp;
      setApplicants(copy);
      showToast(`Applicant ${id} successfully updated!`);
    } else {
      // New Applicant
      const newApp: ApplicantRecord = {
        id,
        name: data.name || 'Client',
        phone: data.phone || '',
        email: data.email,
        photoUrl: data.photoUrl || undefined,
        service: data.service || 'UAE Typing Service',
        serviceCategory: data.serviceCategory || 'Identity & Immigration',
        status: data.status || 'Received',
        amount: data.amount || 0,
        paid: data.paid || 0,
        due: data.due,
        submissionDate: now,
        updated: now,
        emirate: data.emirate || 'Dubai',
        govtRefNo: `ICP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        priority: data.priority || 'Standard',
        documents: [
          { id: 'doc-1', name: 'Original Passport & Visa Copy', status: 'verified', required: true },
          { id: 'doc-2', name: 'Biometric Passport Photograph', status: 'verified', required: true },
        ],
        timeline: [
          {
            id: `tl-${Date.now()}`,
            title: 'Application Received & Registered',
            description: 'Application registered on Sayem portal. Document preparation initiated.',
            timestamp: now,
            status: 'Received',
            completed: true,
          }
        ],
        note: data.note,
      };

      setApplicants((prev) => [newApp, ...prev]);

      const newAct: ActivityRecord = {
        id: `act-${Date.now()}`,
        msg: `New applicant registered: ${id} (${newApp.name} - ${newApp.service})`,
        time: now,
        type: 'applicant_new',
        refId: id,
      };
      setActivities((prev) => [newAct, ...prev.slice(0, 99)]);
      showToast(`New application ${id} created for ${newApp.name}!`);
    }
  };

  // Add Payment Transaction
  const handleAddTransaction = (txnData: Omit<TransactionRecord, 'id' | 'date'>) => {
    const now = getTimestamp();
    const txnId = `RCP-2026-${Date.now().toString().slice(-4)}`;
    
    const newTxn: TransactionRecord = {
      ...txnData,
      id: txnId,
      date: now,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Update applicant's paid balance
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id.toLowerCase() === txnData.appId.toLowerCase()) {
          return {
            ...app,
            paid: Number(app.paid || 0) + Number(txnData.amount),
            updated: now,
          };
        }
        return app;
      })
    );

    // Add activity
    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `Payment recorded: AED ${txnData.amount.toFixed(2)} for ${txnData.appId} (${txnId})`,
      time: now,
      type: 'payment',
      refId: txnData.appId,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);

    showToast(`Payment of AED ${txnData.amount.toFixed(2)} recorded (${txnId})!`);
    setActiveReceiptForPrint(newTxn);
  };

  // Real-time status simulation helper
  const handleSimulateStatusUpdate = (appId: string) => {
    const now = getTimestamp();
    const app = applicants.find((a) => a.id === appId);
    if (!app) return;

    let nextStatus: ApplicationStatus = 'Approved';
    let timelineTitle = 'Application Approved';
    let timelineDesc = 'Official authority review passed successfully.';

    if (app.status === 'Received') {
      nextStatus = 'Under Process';
      timelineTitle = 'Under Official Processing';
      timelineDesc = 'Application lodged in government system and assigned to immigration officer.';
    } else if (app.status === 'Documents Required') {
      nextStatus = 'Under Process';
      timelineTitle = 'Updated Biometric Documents Accepted';
      timelineDesc = 'Replacement biometric document accepted by federal authority portal.';
    } else if (app.status === 'Under Process') {
      nextStatus = 'Submitted to Authority';
      timelineTitle = 'Security Clearance & Authority Endorsement';
      timelineDesc = 'Cross-checked with Federal Authority database and cleared for approval.';
    } else if (app.status === 'Submitted to Authority') {
      nextStatus = 'Approved';
      timelineTitle = 'Official Approval Granted';
      timelineDesc = 'Residency/permit approved. Electronic document generated and available for download.';
    } else if (app.status === 'Approved') {
      nextStatus = 'Completed';
      timelineTitle = 'Card Delivered & Completed';
      timelineDesc = 'Physical Emirates ID / final permit collected and delivered to applicant.';
    } else {
      nextStatus = 'Approved';
      timelineTitle = 'Status Renewed: Approved';
      timelineDesc = 'Authority clearance confirmed.';
    }

    // Update applicant state
    const updatedTimeline = [
      ...app.timeline,
      {
        id: `tl-${Date.now()}`,
        title: timelineTitle,
        description: timelineDesc,
        timestamp: now,
        status: nextStatus,
        completed: nextStatus === 'Approved' || nextStatus === 'Completed',
      }
    ];

    // If docs were action_needed, update them to verified
    const updatedDocs = app.documents.map((d) => ({
      ...d,
      status: 'verified' as const,
      notes: undefined,
    }));

    setApplicants((prev) =>
      prev.map((item) =>
        item.id === appId
          ? {
              ...item,
              status: nextStatus,
              updated: now,
              timeline: updatedTimeline,
              documents: updatedDocs,
            }
          : item
      )
    );

    // Log activity
    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `⚡ Live Update: ${app.id} (${app.name}) transitioned to ${nextStatus}`,
      time: now,
      type: 'status_change',
      refId: app.id,
      badge: nextStatus,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);

    if (nextStatus === 'Approved' || nextStatus === 'Completed') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#73e4e8', '#a99cff', '#68e0ae']
      });
    }

    showToast(`⚡ Real-Time Update: ${app.id} is now ${nextStatus}!`);
  };

  // Quick Real-Time Status Change from Table or Actions
  const handleQuickStatusUpdate = (appId: string, newStatus: ApplicationStatus) => {
    const now = getTimestamp();
    const app = applicants.find((a) => a.id === appId);
    if (!app) return;

    const updatedTimeline = [
      ...app.timeline,
      {
        id: `tl-${Date.now()}`,
        title: `Status Updated: ${newStatus}`,
        description: `Application status updated in live management portal to ${newStatus}.`,
        timestamp: now,
        status: newStatus,
        completed: newStatus === 'Approved' || newStatus === 'Completed',
      }
    ];

    setApplicants((prev) =>
      prev.map((item) =>
        item.id === appId
          ? {
              ...item,
              status: newStatus,
              updated: now,
              timeline: updatedTimeline,
            }
          : item
      )
    );

    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `⚡ Instant Status: ${app.id} (${app.name}) updated to ${newStatus}`,
      time: now,
      type: 'status_change',
      refId: app.id,
      badge: newStatus,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);

    if (newStatus === 'Approved' || newStatus === 'Completed') {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#73e4e8', '#a99cff', '#68e0ae']
      });
    }

    showToast(`⚡ Real-Time Update: ${app.id} (${app.name}) is now ${newStatus}!`);
  };

  // Delete Applicant
  const handleDeleteApplicant = (appId: string) => {
    const app = applicants.find((a) => a.id === appId);
    const appName = app ? app.name : appId;
    setApplicants((prev) => prev.filter((a) => a.id !== appId));
    
    const now = getTimestamp();
    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `File removed from active roster: ${appId} (${appName})`,
      time: now,
      type: 'system',
      refId: appId,
      badge: 'Removed'
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);
    showToast(`Applicant ${appId} deleted.`);
  };

  // Real-Time Document Checklist Updater
  const handleUpdateDocuments = (appId: string, documents: DocumentItem[]) => {
    const now = getTimestamp();
    const app = applicants.find((a) => a.id === appId);
    if (!app) return;

    // Check if any required document needs action
    const hasActionNeeded = documents.some((d) => d.status === 'action_needed');
    const newStatus: ApplicationStatus = hasActionNeeded ? 'Documents Required' : app.status;

    setApplicants((prev) =>
      prev.map((item) =>
        item.id === appId
          ? {
              ...item,
              documents,
              status: newStatus,
              updated: now,
            }
          : item
      )
    );

    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `Documents updated for ${appId} (${app.name}) · ${documents.length} items logged`,
      time: now,
      type: 'document_update',
      refId: appId,
      badge: hasActionNeeded ? 'Action Needed' : 'Docs Verified'
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);
    showToast(`Documents updated in real-time for ${appId}!`);
  };

  // Real-Time Custom Milestone / Authority Note
  const handleAddMilestone = (
    appId: string,
    milestone: { title: string; description: string; authority?: string; status?: ApplicationStatus }
  ) => {
    const now = getTimestamp();
    const app = applicants.find((a) => a.id === appId);
    if (!app) return;

    const targetStatus = milestone.status || app.status;

    const newEvent = {
      id: `tl-${Date.now()}`,
      title: milestone.title,
      description: milestone.description,
      timestamp: now,
      status: targetStatus,
      completed: targetStatus === 'Approved' || targetStatus === 'Completed',
      authority: milestone.authority || 'Sayem UAE Portal',
    };

    setApplicants((prev) =>
      prev.map((item) =>
        item.id === appId
          ? {
              ...item,
              status: targetStatus,
              updated: now,
              timeline: [...item.timeline, newEvent],
            }
          : item
      )
    );

    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `Milestone logged for ${appId}: "${milestone.title}"`,
      time: now,
      type: 'status_change',
      refId: appId,
      badge: milestone.authority || 'Milestone'
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 99)]);
    showToast(`Milestone recorded for ${appId}!`);
  };

  // Clean Production Mode (Zero dummy receipts & clean slate)
  const handleClearAllProduction = (clearApplicants: boolean) => {
    setTransactions([]);
    localStorage.removeItem(`${STORAGE_KEY}_txns`);

    if (clearApplicants) {
      setApplicants([]);
      localStorage.removeItem(`${STORAGE_KEY}_apps`);
    }

    const now = getTimestamp();
    const freshAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      msg: `Clean Production Slate Activated · 0 dummy receipts · Ready for live client onboarding`,
      time: now,
      type: 'system',
      badge: 'Production'
    };
    setActivities([freshAct]);
    localStorage.setItem(`${STORAGE_KEY}_acts`, JSON.stringify([freshAct]));

    showToast('Clean Production Mode Active: Zero dummy receipts. Ready for your first client!');
  };

  // Load Demo Records for Testing
  const handleLoadDemoData = () => {
    setApplicants(INITIAL_APPLICANTS);
    setTransactions(DEMO_TRANSACTIONS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.setItem(`${STORAGE_KEY}_apps`, JSON.stringify(INITIAL_APPLICANTS));
    localStorage.setItem(`${STORAGE_KEY}_txns`, JSON.stringify(DEMO_TRANSACTIONS));
    localStorage.setItem(`${STORAGE_KEY}_acts`, JSON.stringify(INITIAL_ACTIVITIES));
    showToast('Loaded sample demonstration records for testing.');
  };

  const handleResetData = () => {
    setApplicants(INITIAL_APPLICANTS);
    setTransactions([]);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem(`${STORAGE_KEY}_apps`);
    localStorage.removeItem(`${STORAGE_KEY}_txns`);
    localStorage.removeItem(`${STORAGE_KEY}_acts`);
    showToast('Reset to default clean state (0 dummy receipts).');
  };

  const scrollToTrack = () => {
    document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEstimator = () => {
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1b] text-[#f5f7ff] selection:bg-[#73e4e8]/30 selection:text-white relative">
      
      {/* 24/7 Live Ticker running across top */}
      <LiveTicker activities={activities} />

      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateToTrack={scrollToTrack}
        onNavigateToEstimator={scrollToEstimator}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigateToTrack={scrollToTrack}
          onNavigateToEstimator={scrollToEstimator}
        />

        {/* 2. Live Tracker Portal */}
        <LiveTrackerSection
          applicants={applicants}
          onSimulateStatusUpdate={handleSimulateStatusUpdate}
          onSelectApplicantForPrint={(app) => setActiveApplicantForPrint(app)}
        />

        {/* 3. Comprehensive UAE Typing Services Catalog */}
        <ServicesSection
          onSelectService={(svc) => setSelectedService(svc)}
        />

        {/* 4. Cost & Turnaround Calculator */}
        <FeeEstimator />

        {/* 5. About Consultant Tausin Ahmed Sayem */}
        <AboutSection />

        {/* 6. Direct Contact & Quick WhatsApp Enquiry */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Admin Management Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        applicants={applicants}
        transactions={transactions}
        activities={activities}
        onSaveApplicant={handleSaveApplicant}
        onAddTransaction={handleAddTransaction}
        onViewReceipt={(txn) => setActiveReceiptForPrint(txn)}
        onViewApplicantSlip={(app) => setActiveApplicantForPrint(app)}
        onQuickStatusUpdate={handleQuickStatusUpdate}
        onAdvanceStatus={handleSimulateStatusUpdate}
        onDeleteApplicant={handleDeleteApplicant}
        onUpdateDocuments={handleUpdateDocuments}
        onAddMilestone={handleAddMilestone}
        onClearAllProduction={handleClearAllProduction}
        onLoadDemoData={handleLoadDemoData}
        onResetData={handleResetData}
      />

      {/* Printable Receipt & Verification Modal */}
      <PrintableReceipt
        receiptData={activeReceiptForPrint}
        applicantData={activeApplicantForPrint}
        onClose={() => {
          setActiveReceiptForPrint(null);
          setActiveApplicantForPrint(null);
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#101b33]/95 text-white border border-[#73e4e8]/40 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-[#73e4e8] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 print:hidden">
        {/* Admin Portal Shortcut Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="px-4 py-2.5 rounded-full bg-[#080e1d]/90 hover:bg-[#121e3b] text-gray-300 hover:text-white border border-white/15 text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          title="Open Admin Management Portal"
        >
          <Lock className="w-3.5 h-3.5 text-[#a99cff]" />
          <span>⚙ Admin Portal</span>
        </button>

        {/* WhatsApp Floating Beacon */}
        <a
          href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20need%20assistance%20with%20UAE%20typing%20and%20document%20processing."
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#68e0ae] to-[#25D366] text-[#07111d] flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:shadow-emerald-500/60 transition-all relative group cursor-pointer"
          title="Chat on WhatsApp (+971 55 419 8152)"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#68e0ae] opacity-50"></span>
          <MessageSquare className="w-7 h-7 text-[#07111d]" />
          <span className="absolute right-16 top-3 bg-[#080d1b] text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            WhatsApp Sayem (+971 55 419 8152)
          </span>
        </a>
      </div>

    </div>
  );
}
