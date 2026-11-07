import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  Plus, 
  Check, 
  AlertCircle, 
  Printer, 
  Edit3, 
  CreditCard, 
  DollarSign, 
  Search, 
  RotateCcw,
  Download,
  ShieldCheck,
  Building,
  CheckCircle2,
  Trash2,
  TrendingUp,
  BarChart3,
  Zap,
  FileText,
  MessageSquare,
  Calendar,
  ExternalLink,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
  QrCode,
  Camera
} from 'lucide-react';
import { 
  ApplicantRecord, 
  TransactionRecord, 
  ActivityRecord, 
  ApplicationStatus, 
  UAEEmirate, 
  ServicePriority,
  DocumentItem 
} from '../types.ts';
import { UAE_SERVICES } from '../data/servicesData.ts';
import { PerformanceInsights } from './PerformanceInsights.tsx';
import { QRCodeVisual } from './QRCodeVisual.tsx';
import { ClientAvatar } from './ClientAvatar.tsx';
import { AvatarPicker } from './AvatarPicker.tsx';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  applicants: ApplicantRecord[];
  transactions: TransactionRecord[];
  activities: ActivityRecord[];
  onSaveApplicant: (applicant: Partial<ApplicantRecord>) => void;
  onAddTransaction: (txn: Omit<TransactionRecord, 'id' | 'date'>) => void;
  onViewReceipt: (txn: TransactionRecord) => void;
  onViewApplicantSlip: (app: ApplicantRecord) => void;
  onQuickStatusUpdate: (appId: string, status: ApplicationStatus) => void;
  onAdvanceStatus: (appId: string) => void;
  onDeleteApplicant: (appId: string) => void;
  onUpdateDocuments: (appId: string, documents: DocumentItem[]) => void;
  onAddMilestone: (appId: string, milestone: { title: string; description: string; authority?: string; status?: ApplicationStatus }) => void;
  onClearAllProduction: (clearApplicants: boolean) => void;
  onLoadDemoData: () => void;
  onResetData: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  applicants,
  transactions,
  activities,
  onSaveApplicant,
  onAddTransaction,
  onViewReceipt,
  onViewApplicantSlip,
  onQuickStatusUpdate,
  onAdvanceStatus,
  onDeleteApplicant,
  onUpdateDocuments,
  onAddMilestone,
  onClearAllProduction,
  onLoadDemoData,
  onResetData,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'applicants' | 'insights' | 'transactions' | 'activity' | 'settings'>('applicants');

  // Form states for applicant add/edit
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [service, setService] = useState(UAE_SERVICES[0].name);
  const [status, setStatus] = useState<ApplicationStatus>('Received');
  const [amount, setAmount] = useState<number | ''>('');
  const [paid, setPaid] = useState<number | ''>('');
  const [due, setDue] = useState('');
  const [emirate, setEmirate] = useState<UAEEmirate>('Dubai');
  const [priority, setPriority] = useState<ServicePriority>('Standard');
  const [note, setNote] = useState('');
  const [searchTable, setSearchTable] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Transaction form state
  const [txnAppId, setTxnAppId] = useState('');
  const [txnAmount, setTxnAmount] = useState<number | ''>('');
  const [txnMethod, setTxnMethod] = useState<TransactionRecord['method']>('Cash');
  const [txnNote, setTxnNote] = useState('');

  // Sub-modal states for real-time document and milestone updates
  const [docModalApp, setDocModalApp] = useState<ApplicantRecord | null>(null);
  const [tempDocs, setTempDocs] = useState<DocumentItem[]>([]);
  const [newDocName, setNewDocName] = useState('');

  const [milestoneModalApp, setMilestoneModalApp] = useState<ApplicantRecord | null>(null);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDesc, setMilestoneDesc] = useState('');
  const [milestoneAuthority, setMilestoneAuthority] = useState('Sayem Management');
  const [milestoneStatus, setMilestoneStatus] = useState<ApplicationStatus | ''>('');

  // QR Code Modal State for Applicant and Receipt validation
  const [qrModalItem, setQrModalItem] = useState<{
    title: string;
    refCode: string;
    sublabel: string;
    type: 'applicant' | 'receipt';
    applicantName: string;
    phone?: string;
    amount?: number;
    service?: string;
  } | null>(null);

  // Quick Profile Photo / Avatar Editor Modal State
  const [avatarModalApp, setAvatarModalApp] = useState<ApplicantRecord | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '4422') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin PIN. Access denied.');
    }
  };

  const clearApplicantForm = () => {
    setEditId('');
    setName('');
    setPhone('');
    setEmail('');
    setPhotoUrl(undefined);
    setService(UAE_SERVICES[0].name);
    setStatus('Received');
    setAmount('');
    setPaid('');
    setDue('');
    setEmirate('Dubai');
    setPriority('Standard');
    setNote('');
  };

  const handleEditApplicant = (app: ApplicantRecord) => {
    setEditId(app.id);
    setName(app.name);
    setPhone(app.phone);
    setEmail(app.email || '');
    setPhotoUrl(app.photoUrl);
    setService(app.service);
    setStatus(app.status);
    setAmount(app.amount);
    setPaid(app.paid);
    setDue(app.due || '');
    setEmirate(app.emirate);
    setPriority(app.priority);
    setNote(app.note || '');
    setActiveTab('applicants');
  };

  const handleSaveApplicantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Applicant Name and Mobile Phone are required.');
      return;
    }

    onSaveApplicant({
      id: editId || undefined,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      photoUrl,
      service,
      status,
      amount: Number(amount) || 0,
      paid: Number(paid) || 0,
      due: due || undefined,
      emirate,
      priority,
      note: note.trim() || undefined,
    });

    clearApplicantForm();
  };

  const handleAddTxnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnAppId.trim() || !txnAmount || Number(txnAmount) <= 0) {
      alert('Please enter a valid Application Reference and amount.');
      return;
    }

    const matchedApp = applicants.find(
      (a) => a.id.toLowerCase() === txnAppId.trim().toLowerCase()
    );

    if (!matchedApp) {
      alert(`Application Reference ${txnAppId} was not found. Please register applicant first.`);
      return;
    }

    onAddTransaction({
      appId: matchedApp.id,
      applicant: matchedApp.name,
      phone: matchedApp.phone,
      service: matchedApp.service,
      amount: Number(txnAmount),
      method: txnMethod,
      note: txnNote.trim() || undefined,
    });

    setTxnAmount('');
    setTxnNote('');
  };

  // Open Document Management Modal
  const openDocManager = (app: ApplicantRecord) => {
    setDocModalApp(app);
    setTempDocs([...(app.documents || [])]);
  };

  const handleToggleDocStatus = (index: number) => {
    setTempDocs((prev) => {
      const copy = [...prev];
      const cur = copy[index].status;
      copy[index].status = cur === 'verified' ? 'action_needed' : cur === 'action_needed' ? 'pending' : 'verified';
      return copy;
    });
  };

  const handleAddNewDoc = () => {
    if (!newDocName.trim()) return;
    setTempDocs((prev) => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        name: newDocName.trim(),
        status: 'pending',
        required: true,
      }
    ]);
    setNewDocName('');
  };

  const handleSaveDocs = () => {
    if (!docModalApp) return;
    onUpdateDocuments(docModalApp.id, tempDocs);
    setDocModalApp(null);
  };

  // Open Milestone Modal
  const openMilestoneModal = (app: ApplicantRecord) => {
    setMilestoneModalApp(app);
    setMilestoneTitle('');
    setMilestoneDesc('');
    setMilestoneAuthority('ICP & GDRFA');
    setMilestoneStatus(app.status);
  };

  const handleSaveMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneModalApp || !milestoneTitle.trim()) return;

    onAddMilestone(milestoneModalApp.id, {
      title: milestoneTitle.trim(),
      description: milestoneDesc.trim() || `Milestone logged by administrative officer for ${milestoneModalApp.id}.`,
      authority: milestoneAuthority,
      status: (milestoneStatus as ApplicationStatus) || milestoneModalApp.status,
    });

    setMilestoneModalApp(null);
  };

  // Open WhatsApp with client notification
  const handleOpenWhatsApp = (app: ApplicantRecord) => {
    const cleanPhone = app.phone.replace(/[\s\-\+]/g, '');
    const phoneWithCode = cleanPhone.startsWith('971') ? cleanPhone : `971${cleanPhone.replace(/^0/, '')}`;
    const text = `السلام عليكم / Hello ${app.name},
Your UAE typing application (${app.service}) with Reference *${app.id}* is currently:
*Status: ${app.status.toUpperCase()}*

Track verified live updates 24/7 on the official portal:
https://sayem-uae.portal/track?ref=${app.id}

Thank you,
Sayem UAE Typing & Legal Services
Direct: +971 55 419 8152`;

    const url = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Export Roster to CSV
  const handleExportCSV = () => {
    if (applicants.length === 0) {
      alert('No applicant records to export.');
      return;
    }

    const headers = ['Reference ID', 'Name', 'Phone', 'Email', 'Service', 'Status', 'Total Fee (AED)', 'Paid (AED)', 'Due (AED)', 'Emirate', 'Priority', 'Registered Date'];
    const rows = applicants.map((a) => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.phone,
      a.email || '',
      `"${a.service.replace(/"/g, '""')}"`,
      a.status,
      a.amount,
      a.paid,
      a.amount - a.paid,
      a.emirate,
      a.priority,
      a.submissionDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sayem_UAE_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const totalReceived = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const pendingCount = applicants.filter((a) => !['Completed', 'Approved'].includes(a.status)).length;
  const approvedCount = applicants.filter((a) => ['Completed', 'Approved'].includes(a.status)).length;

  // Filtered applicants
  const filteredApplicants = applicants.filter((a) => {
    const q = searchTable.toLowerCase();
    const matchesSearch = 
      a.id.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.service.toLowerCase().includes(q) ||
      a.status.toLowerCase().includes(q);

    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Helper for status badge style
  const getStatusColor = (st: ApplicationStatus) => {
    switch (st) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Completed':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Documents Required':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Submitted to Authority':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Under Process':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'Biometrics Scheduled':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'On Hold':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#030611]/90 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="glass-panel w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-3xl border border-white/15 p-5 sm:p-8 shadow-2xl relative my-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#73e4e8] to-[#a99cff] flex items-center justify-center text-[#080d1b] font-bold shadow-md shadow-cyan-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Sayem Management Portal
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#68e0ae]/15 border border-[#68e0ae]/30 text-[#68e0ae]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68e0ae] animate-pulse"></span>
                  Real-Time Sync Active
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Official UAE Typing CRM · Live Applicant Controls & Zero Dummy Receipts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isAuthenticated && (
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Export Applicant Roster as CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#73e4e8]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Login View */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 px-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#73e4e8]/10 border border-[#73e4e8]/30 flex items-center justify-center mx-auto text-[#73e4e8]">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Admin Authentication
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Enter your administrative PIN code to open customer management.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Secret Admin PIN"
                  maxLength={10}
                  className="w-full glass-input text-center text-xl tracking-widest px-4 py-3.5 rounded-xl font-mono text-white placeholder-gray-500"
                />
              </div>

              {pinError && (
                <p className="text-xs text-[#ff8296] font-semibold">{pinError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#68e0ae]" />
              <span>Authorized personnel only. Sessions are encrypted.</span>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="space-y-6 animate-fadeIn">
            
            {/* KPI Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-gray-400 block mb-1">Active Client Files</span>
                <strong className="text-2xl font-black font-heading text-white">
                  {applicants.length}
                </strong>
                <span className="text-[10px] text-gray-500 block mt-0.5">Live registered cases</span>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-gray-400 block mb-1">Total Fee Collected</span>
                <strong className="text-2xl font-black font-heading text-[#68e0ae]">
                  AED {totalReceived.toFixed(2)}
                </strong>
                <span className="text-[10px] text-gray-500 block mt-0.5">
                  {transactions.length === 0 ? '0 payments logged' : `${transactions.length} verified receipts`}
                </span>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-gray-400 block mb-1">In Processing / Pending</span>
                <strong className="text-2xl font-black font-heading text-[#ffd166]">
                  {pendingCount}
                </strong>
                <span className="text-[10px] text-gray-500 block mt-0.5">Awaiting completion</span>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-gray-400 block mb-1">Approved & Completed</span>
                <strong className="text-2xl font-black font-heading text-[#73e4e8]">
                  {approvedCount}
                </strong>
                <span className="text-[10px] text-gray-500 block mt-0.5">Delivery verified</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('applicants')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'applicants'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Applicants & Roster ({applicants.length})
              </button>

              <button
                onClick={() => setActiveTab('insights')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'insights'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#73e4e8]" />
                <span>Performance Insights</span>
              </button>

              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'transactions'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Payment Receipts ({transactions.length})
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Live Audit Log ({activities.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Data & Clean Mode
              </button>
            </div>

            {/* TAB 1: Applicants with Real-Time Table Controls */}
            {activeTab === 'applicants' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Form to Add / Edit Applicant */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#73e4e8]" />
                      <span>{editId ? `Editing Applicant: ${editId}` : 'Register Real Client Application'}</span>
                    </h3>
                    {editId && (
                      <button
                        onClick={clearApplicantForm}
                        className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveApplicantSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Fatima Al-Zaabi"
                        required
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Mobile Phone (WhatsApp) *
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0501234567"
                        required
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        UAE Service Category *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-medium"
                      >
                        {UAE_SERVICES.map((s) => (
                          <option key={s.id} value={s.name} className="bg-[#080d1b]">
                            {s.name} (from AED {s.startingPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Live Starting Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-bold"
                      >
                        <option value="Received" className="bg-[#080d1b]">Received</option>
                        <option value="Documents Required" className="bg-[#080d1b]">Documents Required</option>
                        <option value="Under Process" className="bg-[#080d1b]">Under Process</option>
                        <option value="Submitted to Authority" className="bg-[#080d1b]">Submitted to Authority</option>
                        <option value="Biometrics Scheduled" className="bg-[#080d1b]">Biometrics Scheduled</option>
                        <option value="Approved" className="bg-[#080d1b]">Approved</option>
                        <option value="Completed" className="bg-[#080d1b]">Completed</option>
                        <option value="On Hold" className="bg-[#080d1b]">On Hold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Total Agreed Fee (AED)
                      </label>
                      <input
                        type="number"
                        min="25"
                        step="5"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                        placeholder="e.g. 350"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Advance Paid (AED)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={paid}
                        onChange={(e) => setPaid(e.target.value ? Number(e.target.value) : '')}
                        placeholder="0.00"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Emirate Jurisdiction
                      </label>
                      <select
                        value={emirate}
                        onChange={(e) => setEmirate(e.target.value as UAEEmirate)}
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      >
                        <option value="Dubai" className="bg-[#080d1b]">Dubai</option>
                        <option value="Abu Dhabi" className="bg-[#080d1b]">Abu Dhabi</option>
                        <option value="Sharjah" className="bg-[#080d1b]">Sharjah</option>
                        <option value="Ajman" className="bg-[#080d1b]">Ajman</option>
                        <option value="Ras Al Khaimah" className="bg-[#080d1b]">Ras Al Khaimah</option>
                        <option value="Fujairah" className="bg-[#080d1b]">Fujairah</option>
                        <option value="Umm Al Quwain" className="bg-[#080d1b]">Umm Al Quwain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Priority Level
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as ServicePriority)}
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-medium"
                      >
                        <option value="Standard" className="bg-[#080d1b]">Standard</option>
                        <option value="Express 24h" className="bg-[#080d1b]">Express (24h)</option>
                        <option value="VIP Same Day" className="bg-[#080d1b]">VIP Same Day</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Internal Case Note
                      </label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Progress note or authority file ref"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Profile Photo Upload & UAE Avatar Selection */}
                    <div className="md:col-span-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] uppercase tracking-wider text-[#73e4e8] font-bold flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" />
                          <span>Client Profile Photo & UAE Avatar Customizer</span>
                        </label>
                        <span className="text-[10px] text-gray-400">
                          Upload passport photo or select representative UAE persona
                        </span>
                      </div>
                      <AvatarPicker
                        currentPhotoUrl={photoUrl}
                        applicantName={name}
                        onPhotoSelected={(url) => setPhotoUrl(url)}
                      />
                    </div>

                    <div className="md:col-span-3 flex justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={clearApplicantForm}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 cursor-pointer"
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold shadow-md hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{editId ? 'Save Updated Application' : 'Register Real Client Application'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search & Records Table */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>Client Applications Roster</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-normal">
                          {filteredApplicants.length} files
                        </span>
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        ⚡ Real-Time: Change status directly from the dropdown to broadcast immediate updates.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {/* Status Filter */}
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="glass-input px-3 py-1.5 rounded-xl text-xs text-white font-medium"
                      >
                        <option value="All" className="bg-[#080d1b]">All Statuses</option>
                        <option value="Received" className="bg-[#080d1b]">Received</option>
                        <option value="Under Process" className="bg-[#080d1b]">Under Process</option>
                        <option value="Submitted to Authority" className="bg-[#080d1b]">Submitted</option>
                        <option value="Documents Required" className="bg-[#080d1b]">Action Needed</option>
                        <option value="Approved" className="bg-[#080d1b]">Approved</option>
                        <option value="Completed" className="bg-[#080d1b]">Completed</option>
                      </select>

                      <div className="relative flex-1 sm:w-56">
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={searchTable}
                          onChange={(e) => setSearchTable(e.target.value)}
                          placeholder="Search ref, name, phone..."
                          className="w-full glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {filteredApplicants.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto text-gray-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white">No Matching Applications</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        {applicants.length === 0 
                          ? 'You currently have zero client applications registered. Fill in the form above to register your first real client.' 
                          : 'No applications match your search query or filter.'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="w-full text-left text-xs text-gray-300">
                        <thead className="bg-white/5 uppercase text-[10px] text-gray-400 font-semibold tracking-wider">
                          <tr>
                            <th className="p-3">Reference</th>
                            <th className="p-3">Client & Contact</th>
                            <th className="p-3">Service & Emirate</th>
                            <th className="p-3">⚡ Live Status (Direct Select)</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3 text-right">Quick Real-Time Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredApplicants.map((app) => (
                            <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="p-3 font-mono font-bold text-white">
                                <span className="text-[#73e4e8]">{app.id}</span>
                                <span className="block text-[10px] text-gray-400 font-sans font-normal">
                                  {app.priority}
                                </span>
                              </td>

                              <td className="p-3">
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setAvatarModalApp(app)}
                                    className="relative group cursor-pointer shrink-0"
                                    title="Click to personalize or upload client profile photo"
                                  >
                                    <ClientAvatar
                                      photoUrl={app.photoUrl}
                                      name={app.name}
                                      size="sm"
                                      status={app.status}
                                      priority={app.priority}
                                      showStatusIndicator={true}
                                    />
                                    <span className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                      <Camera className="w-3 h-3 text-[#73e4e8]" />
                                    </span>
                                  </button>
                                  <div className="min-w-0">
                                    <span className="font-semibold text-white block truncate">{app.name}</span>
                                    <span className="text-[11px] text-gray-400 font-mono block">{app.phone}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3 max-w-[200px]">
                                <span className="truncate block font-medium text-gray-200">{app.service}</span>
                                <span className="text-[10px] text-gray-400">{app.emirate}</span>
                              </td>

                              {/* DIRECT REAL-TIME STATUS SELECTOR */}
                              <td className="p-3">
                                <div className="flex items-center gap-1.5">
                                  <select
                                    value={app.status}
                                    onChange={(e) => onQuickStatusUpdate(app.id, e.target.value as ApplicationStatus)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${getStatusColor(app.status)}`}
                                  >
                                    <option value="Received" className="bg-[#080d1b] text-white">Received</option>
                                    <option value="Documents Required" className="bg-[#080d1b] text-amber-300">Action Needed</option>
                                    <option value="Under Process" className="bg-[#080d1b] text-sky-300">Under Process</option>
                                    <option value="Submitted to Authority" className="bg-[#080d1b] text-indigo-300">Submitted</option>
                                    <option value="Biometrics Scheduled" className="bg-[#080d1b] text-purple-300">Biometrics</option>
                                    <option value="Approved" className="bg-[#080d1b] text-emerald-300">Approved</option>
                                    <option value="Completed" className="bg-[#080d1b] text-cyan-300">Completed</option>
                                    <option value="On Hold" className="bg-[#080d1b] text-orange-300">On Hold</option>
                                  </select>

                                  <button
                                    onClick={() => onAdvanceStatus(app.id)}
                                    title="Advance to Next Stage"
                                    className="p-1 rounded-lg bg-white/5 hover:bg-[#73e4e8]/20 text-[#73e4e8] transition-colors cursor-pointer"
                                  >
                                    <Zap className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                              <td className="p-3 font-mono text-[11px]">
                                <span className="text-[#68e0ae] font-bold">AED {app.paid}</span>
                                <span className="text-gray-400"> / {app.amount}</span>
                                {app.amount > app.paid && (
                                  <span className="block text-[10px] text-[#ff8296]">
                                    Due: AED {app.amount - app.paid}
                                  </span>
                                )}
                              </td>

                              {/* QUICK ACTIONS */}
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1 flex-wrap">
                                  {/* Manage Docs */}
                                  <button
                                    onClick={() => openDocManager(app)}
                                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 text-[10px] font-medium cursor-pointer flex items-center gap-1"
                                    title="Manage Document Checklist"
                                  >
                                    <FileText className="w-3 h-3 text-[#ffd166]" />
                                    <span>Docs ({app.documents?.length || 0})</span>
                                  </button>

                                  {/* Add Milestone */}
                                  <button
                                    onClick={() => openMilestoneModal(app)}
                                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 text-[10px] font-medium cursor-pointer flex items-center gap-1"
                                    title="Log Real-Time Authority Milestone"
                                  >
                                    <Plus className="w-3 h-3 text-[#73e4e8]" />
                                    <span>Milestone</span>
                                  </button>

                                  {/* Pay */}
                                  <button
                                    onClick={() => {
                                      setTxnAppId(app.id);
                                      const remaining = Math.max(0, app.amount - app.paid);
                                      setTxnAmount(remaining > 0 ? remaining : '');
                                      setActiveTab('transactions');
                                    }}
                                    className="px-2 py-1 rounded-lg bg-[#68e0ae]/15 hover:bg-[#68e0ae]/25 text-[#68e0ae] text-[10px] font-bold cursor-pointer"
                                    title="Record Payment & Issue Receipt"
                                  >
                                    +Pay
                                  </button>

                                  {/* Slip */}
                                  <button
                                    onClick={() => onViewApplicantSlip(app)}
                                    className="px-2 py-1 rounded-lg bg-[#73e4e8]/15 hover:bg-[#73e4e8]/25 text-[#73e4e8] text-[10px] font-medium cursor-pointer"
                                    title="View & Print Official Verification Slip"
                                  >
                                    Slip
                                  </button>

                                  {/* QR Code */}
                                  <button
                                    onClick={() => setQrModalItem({
                                      title: `Client Portal Live QR · ${app.id}`,
                                      refCode: app.id,
                                      sublabel: `${app.name} · ${app.service}`,
                                      type: 'applicant',
                                      applicantName: app.name,
                                      phone: app.phone,
                                      amount: app.amount,
                                      service: app.service,
                                    })}
                                    className="px-2 py-1 rounded-lg bg-[#a99cff]/15 hover:bg-[#a99cff]/25 text-[#a99cff] text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                    title="Generate & View Scannable Portal QR Code"
                                  >
                                    <QrCode className="w-3 h-3" />
                                    <span>QR</span>
                                  </button>

                                  {/* WhatsApp */}
                                  <button
                                    onClick={() => handleOpenWhatsApp(app)}
                                    className="px-2 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-[10px] font-medium cursor-pointer flex items-center gap-1"
                                    title="Send Real-Time WhatsApp Update to Client"
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                    <span className="hidden xl:inline">WhatsApp</span>
                                  </button>

                                  {/* Edit Full */}
                                  <button
                                    onClick={() => handleEditApplicant(app)}
                                    className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 cursor-pointer"
                                    title="Edit Details"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete file ${app.id} (${app.name})?`)) {
                                        onDeleteApplicant(app.id);
                                      }
                                    }}
                                    className="p-1 rounded-lg bg-[#ff8296]/15 hover:bg-[#ff8296]/25 text-[#ff8296] cursor-pointer"
                                    title="Delete File"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB: Performance Insights (Recharts) */}
            {activeTab === 'insights' && (
              <PerformanceInsights
                applicants={applicants}
                transactions={transactions}
                activities={activities}
              />
            )}

            {/* TAB 2: Transactions & Receipts (Zero Dummy Receipts When None Claimed) */}
            {activeTab === 'transactions' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Form to record real payment */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#68e0ae]" />
                    <span>Record Official Client Payment & Generate Verified Receipt</span>
                  </h3>

                  <form onSubmit={handleAddTxnSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Application Reference *
                      </label>
                      <input
                        type="text"
                        value={txnAppId}
                        onChange={(e) => setTxnAppId(e.target.value)}
                        placeholder="e.g. SAY-1001"
                        required
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white uppercase font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Amount (AED) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={txnAmount}
                        onChange={(e) => setTxnAmount(e.target.value ? Number(e.target.value) : '')}
                        placeholder="0.00"
                        required
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Payment Method
                      </label>
                      <select
                        value={txnMethod}
                        onChange={(e) => setTxnMethod(e.target.value as any)}
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      >
                        <option value="Cash" className="bg-[#080d1b]">Cash</option>
                        <option value="Bank Transfer" className="bg-[#080d1b]">Bank Transfer</option>
                        <option value="Card" className="bg-[#080d1b]">Card (POS)</option>
                        <option value="Online Link" className="bg-[#080d1b]">Online Payment Link</option>
                        <option value="Apple Pay / GPay" className="bg-[#080d1b]">Apple Pay / GPay</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Payment Reference / Note
                      </label>
                      <input
                        type="text"
                        value={txnNote}
                        onChange={(e) => setTxnNote(e.target.value)}
                        placeholder="e.g. Advance fee settlement"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="md:col-span-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#68e0ae] to-[#73e4e8] text-[#07111d] text-xs font-bold shadow-md hover:brightness-110 cursor-pointer flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Save Payment & Issue Official Receipt</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Receipts Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>Issued Payment Receipts History</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-normal">
                          {transactions.length} receipts
                        </span>
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        Honest accounting: Only real claimed client payments appear here. Zero dummy receipts.
                      </p>
                    </div>
                  </div>

                  {transactions.length === 0 ? (
                    /* ZERO DUMMY RECEIPTS STATE */
                    <div className="p-10 text-center rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#73e4e8]/10 border border-[#73e4e8]/30 flex items-center justify-center mx-auto text-[#73e4e8]">
                        <CreditCard className="w-7 h-7" />
                      </div>
                      <div className="max-w-md mx-auto space-y-1.5">
                        <h4 className="text-base font-bold text-white">No Client Receipts Issued Yet</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          You currently have zero billed client receipts. No dummy receipts are displayed.
                          When you receive a payment from a client, use the form above to record their transaction and generate a genuine UAE tax/payment receipt with scannable QR verification.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="w-full text-left text-xs text-gray-300">
                        <thead className="bg-white/5 uppercase text-[10px] text-gray-400 font-semibold tracking-wider">
                          <tr>
                            <th className="p-3">Receipt ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">App Ref</th>
                            <th className="p-3">Applicant</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Method</th>
                            <th className="p-3 text-right">Receipt Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {transactions.map((txn) => (
                            <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#73e4e8]">
                                {txn.id}
                              </td>
                              <td className="p-3 text-gray-400 text-[11px] font-mono">{txn.date}</td>
                              <td className="p-3 font-mono text-white">{txn.appId}</td>
                              <td className="p-3 font-medium text-white">{txn.applicant}</td>
                              <td className="p-3 font-mono font-bold text-[#68e0ae]">
                                AED {txn.amount.toFixed(2)}
                              </td>
                              <td className="p-3">{txn.method}</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5 ml-auto">
                                  <button
                                    onClick={() => setQrModalItem({
                                      title: `Official Receipt Validation QR · ${txn.id}`,
                                      refCode: txn.id,
                                      sublabel: `${txn.applicant} · AED ${txn.amount.toFixed(2)} (${txn.method})`,
                                      type: 'receipt',
                                      applicantName: txn.applicant,
                                      phone: txn.phone,
                                      amount: txn.amount,
                                      service: txn.service,
                                    })}
                                    className="px-2.5 py-1 rounded-lg bg-[#68e0ae]/15 hover:bg-[#68e0ae]/25 text-[#68e0ae] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                    title="View Scannable Payment Verification QR"
                                  >
                                    <QrCode className="w-3 h-3" />
                                    <span>QR</span>
                                  </button>
                                  <button
                                    onClick={() => onViewReceipt(txn)}
                                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Printer className="w-3 h-3 text-[#73e4e8]" />
                                    <span>Print Receipt</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: Activity Feed */}
            {activeTab === 'activity' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-white">Live System Audit & Activity Trail</h3>
                  <span className="text-xs text-gray-400">{activities.length} logged events</span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-white font-medium block">{act.msg}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{act.time}</span>
                      </div>
                      {act.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#73e4e8] shrink-0 font-mono">
                          {act.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Settings & Data Mode */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn max-w-2xl">
                
                {/* Clean Production Mode */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#68e0ae]/15 border border-[#68e0ae]/30 flex items-center justify-center text-[#68e0ae]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Clean Production Mode (Real Agency Slate)</h3>
                      <p className="text-xs text-gray-400">
                        Start completely fresh with 0 dummy receipts and 0 fake records so you can manage your genuine clients.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Activate Clean Production Slate? This removes all demo records and ensures 0 dummy receipts exist.')) {
                          onClearAllProduction(true);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#68e0ae]/20 hover:bg-[#68e0ae]/30 text-[#68e0ae] border border-[#68e0ae]/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Start 100% Clean Slate (0 Clients, 0 Receipts)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Clear only receipts? Your client applicant files will remain, but all receipt history will be cleared to 0.')) {
                          onClearAllProduction(false);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Clear Only Receipts (0 Receipts)</span>
                    </button>
                  </div>
                </div>

                {/* Sample Demo Records for Testing */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Sample Demo Testing Records</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      If you ever want to preview how the portal looks with pre-filled test applications and charts, you can load sample testing records.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Load sample demonstration records for testing?')) {
                          onLoadDemoData();
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#73e4e8]/15 hover:bg-[#73e4e8]/25 text-[#73e4e8] border border-[#73e4e8]/30 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Load Sample Demo Records</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset to system defaults?')) {
                          onResetData();
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* MODAL 1: Real-Time Document Checklist Manager */}
        {docModalApp && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-lg rounded-2xl border border-white/20 p-6 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#ffd166]" />
                    <span>Manage Documents · {docModalApp.id}</span>
                  </h4>
                  <p className="text-xs text-gray-400">{docModalApp.name} · {docModalApp.service}</p>
                </div>
                <button
                  onClick={() => setDocModalApp(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {tempDocs.length === 0 ? (
                  <p className="text-xs text-gray-400 py-3 text-center">No documents currently assigned.</p>
                ) : (
                  tempDocs.map((doc, idx) => (
                    <div
                      key={doc.id || idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="text-white font-medium">{doc.name}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleDocStatus(idx)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                          doc.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : doc.status === 'action_needed'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {doc.status === 'verified' ? '✓ Verified' : doc.status === 'action_needed' ? '! Action Needed' : '⏳ Pending'}
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Required Document */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Attested Tenancy / Labour Card"
                  className="flex-1 glass-input px-3 py-2 rounded-xl text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddNewDoc}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
                >
                  + Add
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDocModalApp(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDocs}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Real-Time Checklist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: Add Real-Time Authority Milestone */}
        {milestoneModalApp && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-md rounded-2xl border border-white/20 p-6 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#73e4e8]" />
                    <span>Log Authority Milestone</span>
                  </h4>
                  <p className="text-xs text-gray-400">{milestoneModalApp.id} · {milestoneModalApp.name}</p>
                </div>
                <button
                  onClick={() => setMilestoneModalApp(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMilestoneSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    value={milestoneTitle}
                    onChange={(e) => setMilestoneTitle(e.target.value)}
                    placeholder="e.g. Biometrics Completed at Karama Center"
                    required
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    Authority / Department
                  </label>
                  <select
                    value={milestoneAuthority}
                    onChange={(e) => setMilestoneAuthority(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  >
                    <option value="ICP & GDRFA" className="bg-[#080d1b]">ICP & GDRFA (Immigration)</option>
                    <option value="MOHRE" className="bg-[#080d1b]">MOHRE (Labour)</option>
                    <option value="DHA & MOHAP" className="bg-[#080d1b]">DHA & MOHAP (Medical)</option>
                    <option value="RTA Dubai" className="bg-[#080d1b]">RTA (Traffic & Licensing)</option>
                    <option value="DED / DET" className="bg-[#080d1b]">DED / DET (Commercial)</option>
                    <option value="Sayem Management" className="bg-[#080d1b]">Sayem Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    Progress Description
                  </label>
                  <textarea
                    rows={2}
                    value={milestoneDesc}
                    onChange={(e) => setMilestoneDesc(e.target.value)}
                    placeholder="Details about security clearance, biometrics, or certificate generation..."
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    Advance Overall Status (Optional)
                  </label>
                  <select
                    value={milestoneStatus}
                    onChange={(e) => setMilestoneStatus(e.target.value as ApplicationStatus)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-bold"
                  >
                    <option value={milestoneModalApp.status} className="bg-[#080d1b]">Keep Current ({milestoneModalApp.status})</option>
                    <option value="Under Process" className="bg-[#080d1b]">Under Process</option>
                    <option value="Submitted to Authority" className="bg-[#080d1b]">Submitted to Authority</option>
                    <option value="Biometrics Scheduled" className="bg-[#080d1b]">Biometrics Scheduled</option>
                    <option value="Approved" className="bg-[#080d1b]">Approved</option>
                    <option value="Completed" className="bg-[#080d1b]">Completed</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMilestoneModalApp(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold cursor-pointer shadow-md"
                  >
                    Post Real-Time Milestone
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: Scannable QR Code Quick Validation Modal */}
        {qrModalItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-sm rounded-2xl border border-white/20 p-6 space-y-4 shadow-2xl relative text-center">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-[#73e4e8]" />
                    <span>{qrModalItem.title}</span>
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono">{qrModalItem.refCode}</p>
                </div>
                <button
                  onClick={() => setQrModalItem(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scannable QR Code */}
              <div className="py-2 flex justify-center">
                <QRCodeVisual
                  value={
                    qrModalItem.type === 'receipt'
                      ? `${typeof window !== 'undefined' ? window.location.origin : 'https://sayem-uae.portal'}/?receipt=${encodeURIComponent(qrModalItem.refCode)}#track`
                      : `${typeof window !== 'undefined' ? window.location.origin : 'https://sayem-uae.portal'}/?ref=${encodeURIComponent(qrModalItem.refCode)}#track`
                  }
                  size={160}
                  label={qrModalItem.type === 'receipt' ? 'SCAN TO VALIDATE RECEIPT' : 'SCAN TO TRACK ON MOBILE'}
                  sublabel="Federal Gateway Synced"
                  lightMode={true}
                  showActions={true}
                />
              </div>

              <div className="text-xs text-gray-400 bg-white/[0.03] p-3 rounded-xl border border-white/5 space-y-1 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-400">Client:</span>
                  <span className="font-semibold text-white">{qrModalItem.applicantName}</span>
                </div>
                {qrModalItem.service && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service:</span>
                    <span className="text-gray-200 truncate max-w-[160px]">{qrModalItem.service}</span>
                  </div>
                )}
                {qrModalItem.amount !== undefined && (
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-bold text-[#68e0ae]">AED {qrModalItem.amount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setQrModalItem(null)}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Close QR Code
              </button>
            </div>
          </div>
        )}

        {/* MODAL 4: Quick Profile Photo / Avatar Personalization Modal */}
        {avatarModalApp && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-xl rounded-2xl border border-white/20 p-6 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#73e4e8]/10 border border-[#73e4e8]/30 flex items-center justify-center text-[#73e4e8]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>Personalize Client Profile</span>
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">
                      {avatarModalApp.id} · <b className="text-white font-sans">{avatarModalApp.name}</b>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAvatarModalApp(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <AvatarPicker
                currentPhotoUrl={avatarModalApp.photoUrl}
                applicantName={avatarModalApp.name}
                onPhotoSelected={(url) => {
                  onSaveApplicant({
                    id: avatarModalApp.id,
                    photoUrl: url,
                  });
                  setAvatarModalApp((prev) => (prev ? { ...prev, photoUrl: url } : null));
                }}
              />

              <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs text-gray-400">
                <span>Changes save automatically in real time</span>
                <button
                  type="button"
                  onClick={() => setAvatarModalApp(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold cursor-pointer shadow-md hover:brightness-110"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
