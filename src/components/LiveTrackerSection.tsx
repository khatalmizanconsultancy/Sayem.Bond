import React, { useState } from 'react';
import { 
  Search, 
  FileCheck2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Hourglass, 
  Share2, 
  Printer, 
  ExternalLink, 
  Sparkles, 
  RotateCw,
  Copy,
  Check,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  ShieldCheck,
  ArrowRight,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApplicantRecord, ApplicationStatus } from '../types.ts';
import { QRCodeVisual } from './QRCodeVisual.tsx';
import { ClientAvatar } from './ClientAvatar.tsx';

interface LiveTrackerSectionProps {
  applicants: ApplicantRecord[];
  onSimulateStatusUpdate: (appId: string) => void;
  onSelectApplicantForPrint: (app: ApplicantRecord) => void;
}

export const LiveTrackerSection: React.FC<LiveTrackerSectionProps> = ({
  applicants,
  onSimulateStatusUpdate,
  onSelectApplicantForPrint,
}) => {
  const [refInput, setRefInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedApp, setSearchedApp] = useState<ApplicantRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Status Filter Type for tabs and dropdown
  type StatusFilterType =
    | 'All'
    | 'Under Process'
    | 'Approved'
    | 'Documents Required'
    | 'Submitted to Authority'
    | 'Completed'
    | 'Received';

  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('All');
  const [rosterSearch, setRosterSearch] = useState('');

  // Auto-load application if page is opened by scanning a QR code
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref') || params.get('track');
      if (refParam && applicants.length > 0) {
        const found = applicants.find((a) => a.id.toLowerCase() === refParam.trim().toLowerCase());
        if (found) {
          setRefInput(found.id);
          setPhoneInput(found.phone);
          setSearchedApp(found);
          setHasSearched(true);
          setTimeout(() => {
            document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [applicants]);

  // Helper for small color-coded status indicator dots
  const getStatusDotConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
        return {
          dotClass: 'bg-emerald-400',
          ringClass: 'bg-emerald-400/25',
          badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          label: 'Approved',
          pulse: false,
          ping: false,
        };
      case 'Completed':
        return {
          dotClass: 'bg-cyan-400',
          ringClass: 'bg-cyan-400/25',
          badgeClass: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
          label: 'Completed',
          pulse: false,
          ping: false,
        };
      case 'Documents Required':
        return {
          dotClass: 'bg-amber-400',
          ringClass: 'bg-amber-400/35',
          badgeClass: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
          label: 'Action Needed',
          pulse: true,
          ping: true,
        };
      case 'Submitted to Authority':
        return {
          dotClass: 'bg-indigo-400',
          ringClass: 'bg-indigo-400/25',
          badgeClass: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
          label: 'Lodged with Authority',
          pulse: false,
          ping: false,
        };
      case 'Under Process':
        return {
          dotClass: 'bg-sky-400',
          ringClass: 'bg-sky-400/35',
          badgeClass: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
          label: 'Under Process',
          pulse: true,
          ping: false,
        };
      default:
        return {
          dotClass: 'bg-purple-400',
          ringClass: 'bg-purple-400/25',
          badgeClass: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
          label: status,
          pulse: false,
          ping: false,
        };
    }
  };

  // Quick fill helper
  const handleQuickDemo = (demoId: string) => {
    const found = applicants.find((a) => a.id.toLowerCase() === demoId.toLowerCase());
    if (found) {
      setRefInput(found.id);
      setPhoneInput(found.phone);
      performSearch(found.id, found.phone);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(refInput, phoneInput);
  };

  const performSearch = (ref: string, phone: string) => {
    setHasSearched(true);
    const cleanRef = ref.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');

    const found = applicants.find((app) => {
      const matchRef = app.id.toLowerCase() === cleanRef;
      // Allow searching by exact phone match or last 7 digits if provided
      const appPhoneClean = app.phone.replace(/[\s\-\+]/g, '');
      const matchPhone = !cleanPhone || appPhoneClean.includes(cleanPhone) || cleanPhone.includes(appPhoneClean);
      return matchRef && matchPhone;
    });

    setSearchedApp(found || null);

    // If approved or completed, trigger celebratory confetti
    if (found && (found.status === 'Approved' || found.status === 'Completed')) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#73e4e8', '#a99cff', '#68e0ae']
      });
    }
  };

  const copyGovtRef = (refNo: string) => {
    navigator.clipboard.writeText(refNo);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleRefresh = () => {
    if (!searchedApp) return;
    setIsRefreshing(true);
    setTimeout(() => {
      // Re-fetch from latest applicants state
      const updated = applicants.find((a) => a.id === searchedApp.id);
      if (updated) {
        setSearchedApp(updated);
      }
      setIsRefreshing(false);
    }, 600);
  };

  // Helper for status colors
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400',
          icon: CheckCircle2,
          label: 'Application Approved'
        };
      case 'Completed':
        return {
          bg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
          dot: 'bg-cyan-400',
          icon: CheckCircle2,
          label: 'Completed & Delivered'
        };
      case 'Documents Required':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400 animate-pulse',
          icon: AlertCircle,
          label: 'Action Required: Documents Needed'
        };
      case 'Submitted to Authority':
        return {
          bg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
          dot: 'bg-indigo-400',
          icon: Building2,
          label: 'Lodged with Authority'
        };
      case 'Under Process':
        return {
          bg: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
          dot: 'bg-sky-400 animate-pulse',
          icon: Hourglass,
          label: 'Under Process'
        };
      default:
        return {
          bg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
          dot: 'bg-purple-400',
          icon: Clock,
          label: status
        };
    }
  };

  return (
    <section id="track" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#73e4e8] animate-ping" />
            24/7 Live Status Tracker
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Track your UAE application.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
            Real-time synchronization with ICP, GDRFA, MOHRE, and RTA portal submissions. Enter your reference number and registered phone to view verified live updates.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Dynamic Active Applications Selector with Visual Status Indicator Dots */}
          <div className="mb-6 pb-6 border-b border-white/10">
            {applicants.length > 0 ? (
              <>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡ Quick Track Roster</span>
                    <span className="text-[10px] text-gray-400 font-normal">({applicants.length} active registered files)</span>
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {applicants.slice(0, 6).map((app) => {
                    const dot = getStatusDotConfig(app.status);
                    return (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => handleQuickDemo(app.id)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-semibold transition-all flex items-center gap-2 group cursor-pointer shadow-sm hover:border-[#73e4e8]/50"
                      >
                        <ClientAvatar
                          photoUrl={app.photoUrl}
                          name={app.name}
                          size="xs"
                        />
                        <span className="font-mono font-bold text-white">{app.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${dot.badgeClass}`}>
                          {app.name.split(' ')[0]} · {dot.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#73e4e8] animate-ping"></span>
                <span className="font-semibold text-white">Live Real-Time UAE Status Gateway</span>
                <span className="text-gray-400">· Enter your official Application Reference (e.g. SAY-1001) or mobile phone below to track verified government progress.</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                Application Reference Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  placeholder="e.g. SAY-1001"
                  required
                  className="w-full glass-input px-4 py-3.5 rounded-xl font-heading font-medium text-white placeholder-gray-500 uppercase"
                />
                <span className="absolute right-3.5 top-3.5 text-xs text-gray-400 font-mono">
                  SAY-XXXX
                </span>
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                Registered Mobile Number
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="e.g. 0501234567 or 055..."
                className="w-full glass-input px-4 py-3.5 rounded-xl font-medium text-white placeholder-gray-500"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </button>
            </div>
          </form>

          {/* Result Card */}
          {hasSearched && searchedApp && (
            <div className="mt-8 pt-8 border-t border-white/10 space-y-8 animate-fadeIn">
              
              {/* Header Info Banner */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <ClientAvatar
                    photoUrl={searchedApp.photoUrl}
                    name={searchedApp.name}
                    size="xl"
                    status={searchedApp.status}
                    priority={searchedApp.priority}
                    showStatusIndicator={true}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="text-xl sm:text-2xl font-black font-heading text-white tracking-wide">
                        {searchedApp.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-gray-300 border border-white/10">
                        {searchedApp.emirate}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#a99cff]/20 text-[#a99cff] border border-[#a99cff]/30">
                        {searchedApp.priority}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#73e4e8]">
                      {searchedApp.service}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Applicant: <b className="text-white font-medium">{searchedApp.name}</b> · {searchedApp.phone}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col sm:items-end gap-2.5">
                  {(() => {
                    const badge = getStatusBadge(searchedApp.status);
                    const IconComp = badge.icon;
                    return (
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-lg ${badge.bg}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${badge.dot}`} />
                        <IconComp className="w-4 h-4" />
                        <span>{badge.label}</span>
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#73e4e8]' : ''}`} />
                      <span>{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
                    </button>
                    <span>•</span>
                    <span>Last checked: {searchedApp.updated}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-6 flex items-center justify-between">
                  <span>Application Progress Timeline</span>
                  <span className="text-[11px] text-[#73e4e8] font-medium">Real-Time Sync Active</span>
                </h4>

                {/* Visual Stepper */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {[
                    { step: 1, title: 'Application Typed', desc: 'Pre-screened & prepared', statusKey: 'Received' },
                    { step: 2, title: 'Documents Verified', desc: 'Checks & biometric photos', statusKey: 'Documents Required' },
                    { step: 3, title: 'Authority Review', desc: 'ICP / GDRFA / MOHRE', statusKey: 'Under Process' },
                    { step: 4, title: 'Approved & Issued', desc: 'Official certificate ready', statusKey: 'Approved' },
                  ].map((s, idx) => {
                    const isDone = 
                      searchedApp.status === 'Completed' ||
                      (searchedApp.status === 'Approved' && s.step <= 4) ||
                      (searchedApp.status === 'Submitted to Authority' && s.step <= 3) ||
                      (searchedApp.status === 'Under Process' && s.step <= 3) ||
                      (searchedApp.status === 'Documents Required' && s.step === 1) ||
                      (s.step === 1);

                    const isCurrent = 
                      (searchedApp.status === 'Approved' && s.step === 4) ||
                      (searchedApp.status === 'Under Process' && s.step === 3) ||
                      (searchedApp.status === 'Submitted to Authority' && s.step === 3) ||
                      (searchedApp.status === 'Documents Required' && s.step === 2) ||
                      (searchedApp.status === 'Received' && s.step === 1);

                    return (
                      <div 
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isDone 
                            ? 'bg-[#73e4e8]/10 border-[#73e4e8]/30 text-white' 
                            : 'bg-white/[0.02] border-white/5 text-gray-400'
                        } ${isCurrent ? 'ring-2 ring-[#73e4e8]/50 shadow-lg shadow-cyan-500/10' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone 
                              ? 'bg-[#73e4e8] text-[#080d1b]' 
                              : 'bg-white/10 text-gray-400'
                          }`}>
                            {isDone ? '✓' : s.step}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#73e4e8] bg-[#73e4e8]/20 px-2 py-0.5 rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <h5 className="font-heading font-bold text-sm text-white">{s.title}</h5>
                        <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Two Column Grid: Documents Checklist & Authority Data */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Document Status List */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-wider text-[#73e4e8] font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Document Verification Checklist
                    </h4>
                    <span className="text-xs text-gray-400">
                      {searchedApp.documents.filter(d => d.status === 'verified').length} / {searchedApp.documents.length} Verified
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {searchedApp.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs sm:text-sm ${
                          doc.status === 'verified'
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-gray-200'
                            : doc.status === 'action_needed'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                            : 'bg-white/[0.02] border-white/10 text-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {doc.status === 'verified' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : doc.status === 'action_needed' ? (
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-medium text-white">{doc.name}</span>
                            {doc.notes && (
                              <p className="text-xs text-amber-300/90 mt-1 font-mono">
                                ⚠ {doc.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize shrink-0 ${
                          doc.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : doc.status === 'action_needed'
                            ? 'bg-amber-500/30 text-amber-200'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {searchedApp.note && (
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300">
                      <span className="font-bold text-[#a99cff] block mb-1">Consultant Note:</span>
                      {searchedApp.note}
                    </div>
                  )}
                </div>

                {/* Key Authority Details & Payment */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Government Portal Ref */}
                  {searchedApp.govtRefNo && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#73e4e8]/10 to-[#a99cff]/10 border border-[#73e4e8]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider text-[#73e4e8] font-bold">
                          Authority Reference No.
                        </span>
                        <button
                          type="button"
                          onClick={() => copyGovtRef(searchedApp.govtRefNo!)}
                          className="text-xs text-gray-300 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-1 rounded"
                        >
                          {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="font-mono font-bold text-lg text-white">
                        {searchedApp.govtRefNo}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Cross-referenceable directly on the official UAE portal.
                      </p>
                    </div>
                  )}

                  {/* Payment Summary */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block">
                      Financial Account Status
                    </span>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total Agreed Amount:</span>
                      <strong className="text-white font-heading">AED {searchedApp.amount.toFixed(2)}</strong>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Amount Received:</span>
                      <strong className="text-[#68e0ae] font-heading">AED {searchedApp.paid.toFixed(2)}</strong>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm">
                      <span className="text-gray-400">Balance Outstanding:</span>
                      <strong className={`font-heading ${searchedApp.amount - searchedApp.paid > 0 ? 'text-[#ff8296]' : 'text-emerald-400'}`}>
                        AED {Math.max(0, searchedApp.amount - searchedApp.paid).toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  {/* Real-Time Handover & Mobile QR Code */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                    <QRCodeVisual
                      value={`${typeof window !== 'undefined' ? window.location.origin : 'https://sayem-uae.portal'}/?ref=${encodeURIComponent(searchedApp.id)}#track`}
                      size={110}
                      label="SCAN TO TRACK ON MOBILE"
                      sublabel="Live Federal Gateway"
                      lightMode={true}
                      showActions={true}
                    />
                    <div className="text-xs text-gray-300 space-y-1.5 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#73e4e8] font-bold">
                        <QrCode className="w-4 h-4 text-[#73e4e8]" />
                        <span>Client Mobile QR Pass</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Scan with any smartphone camera to take this verified application record with you and monitor live status anytime.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Status Simulation Trigger */}
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#a99cff] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        Live Status Simulation Test
                      </span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      Test real-time document transition right now: triggers state update, appends timeline log, and persists to local storage.
                    </p>
                    <button
                      type="button"
                      onClick={() => onSimulateStatusUpdate(searchedApp.id)}
                      className="w-full py-2 px-3 rounded-lg bg-[#a99cff]/20 hover:bg-[#a99cff]/30 text-[#a99cff] font-bold text-xs border border-[#a99cff]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Simulate Status Advance Now</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/971554198152?text=${encodeURIComponent(
                      `Hello Sayem, I am checking status on my application reference ${searchedApp.id} (${searchedApp.service}) for ${searchedApp.name}. Current portal status shows "${searchedApp.status}".`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#68e0ae]/15 hover:bg-[#68e0ae]/25 text-[#68e0ae] border border-[#68e0ae]/30 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
                  >
                    <span>WhatsApp Inquiry for {searchedApp.id}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectApplicantForPrint(searchedApp)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-white transition-all flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-[#73e4e8]" />
                    <span>Print Verification Slip</span>
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  Target Expected Date: <b className="text-white">{searchedApp.due || 'Under Active Review'}</b>
                </div>
              </div>

            </div>
          )}

          {/* Not Found View */}
          {hasSearched && !searchedApp && (
            <div className="mt-8 pt-8 border-t border-white/10 text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl">
                🔎
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">We could not find a matching application</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto mt-1">
                  Please check the reference number (e.g. <code>SAY-1001</code>) and the registered mobile number, or contact Tausin Sayem on WhatsApp for instant assistance.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20am%20unable%20to%20find%20my%20application%20reference%20online."
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-[#73e4e8] transition-all flex items-center gap-2"
                >
                  <span>Ask Sayem on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('SAY-1001')}
                  className="px-5 py-2.5 rounded-xl bg-[#73e4e8]/10 hover:bg-[#73e4e8]/20 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] transition-all cursor-pointer"
                >
                  Load Demo Ref SAY-1001
                </button>
              </div>
            </div>
          )}

          {/* Live Applicant Rows Status Board with Visual Color-Coded Dots */}
          <div className="mt-12 pt-10 border-t border-white/10 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                    Live Applicant Status Board
                  </h3>
                  <span className="text-xs bg-[#73e4e8]/10 text-[#73e4e8] border border-[#73e4e8]/30 px-2.5 py-0.5 rounded-full font-bold">
                    {applicants.length} Active Files
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Color-coded visual indicators reflect real-time status changes synchronized with UAE government portals. Click any row to inspect full timeline milestones.
                </p>
              </div>

              {/* Status Indicator Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/5">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>Approved</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                  <span>Completed</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Action Needed</span>
                </span>
                <span className="flex items-center gap-1.5 text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>Processing</span>
                </span>
              </div>
            </div>

            {/* Status Filter Controls: Filter Dropdown & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                  <span>Filter Status:</span>
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
                  className="glass-input px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#080e1d] border border-white/15 cursor-pointer focus:border-[#73e4e8]"
                >
                  <option value="All" className="bg-[#080d1b] text-white">
                    All Statuses ({applicants.length})
                  </option>
                  <option value="Under Process" className="bg-[#080d1b] text-sky-300">
                    🔵 Under Process ({applicants.filter((a) => a.status === 'Under Process').length})
                  </option>
                  <option value="Approved" className="bg-[#080d1b] text-emerald-300">
                    🟢 Approved ({applicants.filter((a) => a.status === 'Approved').length})
                  </option>
                  <option value="Documents Required" className="bg-[#080d1b] text-amber-300">
                    🟡 Documents Required ({applicants.filter((a) => a.status === 'Documents Required').length})
                  </option>
                  <option value="Submitted to Authority" className="bg-[#080d1b] text-indigo-300">
                    🟣 Submitted to Authority ({applicants.filter((a) => a.status === 'Submitted to Authority').length})
                  </option>
                  <option value="Completed" className="bg-[#080d1b] text-cyan-300">
                    🔵 Completed ({applicants.filter((a) => a.status === 'Completed').length})
                  </option>
                  <option value="Received" className="bg-[#080d1b] text-purple-300">
                    🟣 Received ({applicants.filter((a) => a.status === 'Received').length})
                  </option>
                </select>
              </div>

              {/* Quick Search within roster */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  placeholder="Filter name, ref, or service..."
                  className="w-full glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-gray-500"
                />
                {rosterSearch && (
                  <button
                    onClick={() => setRosterSearch('')}
                    className="absolute right-2.5 top-1.5 text-[10px] text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Tabbed Interface: Status Tabs with Small Color-Coded Dots & Counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {/* Tab 1: All */}
              <button
                type="button"
                onClick={() => setStatusFilter('All')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  statusFilter === 'All'
                    ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span>All Applications</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 font-mono">
                  {applicants.length}
                </span>
              </button>

              {/* Tab 2: Under Process */}
              <button
                type="button"
                onClick={() => setStatusFilter('Under Process')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  statusFilter === 'Under Process'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Under Process</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-200 font-mono">
                  {applicants.filter((a) => a.status === 'Under Process').length}
                </span>
              </button>

              {/* Tab 3: Approved */}
              <button
                type="button"
                onClick={() => setStatusFilter('Approved')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  statusFilter === 'Approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>Approved</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-200 font-mono">
                  {applicants.filter((a) => a.status === 'Approved').length}
                </span>
              </button>

              {/* Tab 4: Documents Required */}
              <button
                type="button"
                onClick={() => setStatusFilter('Documents Required')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  statusFilter === 'Documents Required'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm ring-1 ring-amber-400/30'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span>Documents Required</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 font-mono font-bold">
                  {applicants.filter((a) => a.status === 'Documents Required').length}
                </span>
              </button>

              {/* Tab 5: Submitted to Authority */}
              <button
                type="button"
                onClick={() => setStatusFilter('Submitted to Authority')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  statusFilter === 'Submitted to Authority'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Submitted</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-200 font-mono">
                  {applicants.filter((a) => a.status === 'Submitted to Authority').length}
                </span>
              </button>

              {/* Tab 6: Completed */}
              <button
                type="button"
                onClick={() => setStatusFilter('Completed')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  statusFilter === 'Completed'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>Completed</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-200 font-mono">
                  {applicants.filter((a) => a.status === 'Completed').length}
                </span>
              </button>
            </div>

            {/* Applicant Rows List */}
            <div className="overflow-hidden rounded-2xl border border-white/10 divide-y divide-white/5 bg-white/[0.015]">
              {applicants
                .filter((app) => {
                  const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
                  const q = rosterSearch.trim().toLowerCase();
                  const matchesSearch =
                    !q ||
                    app.id.toLowerCase().includes(q) ||
                    app.name.toLowerCase().includes(q) ||
                    app.service.toLowerCase().includes(q) ||
                    app.phone.includes(q);
                  return matchesStatus && matchesSearch;
                })
                .map((app) => {
                  const cfg = getStatusDotConfig(app.status);
                  const isCurrent = searchedApp?.id === app.id;

                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        setRefInput(app.id);
                        setPhoneInput(app.phone);
                        performSearch(app.id, app.phone);
                        document.getElementById('track')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`p-4 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.04] cursor-pointer group ${
                        isCurrent
                          ? 'bg-white/[0.05] border-l-4 border-l-[#73e4e8] shadow-inner'
                          : ''
                      }`}
                    >
                      {/* Left: Visual Status Indicator Dot & Applicant ID */}
                      <div className="flex items-center gap-3.5 min-w-[260px]">
                        {/* The Small Color-Coded Indicator Dot */}
                        <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                          {cfg.ping && (
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dotClass} opacity-75`} />
                          )}
                          {cfg.pulse && (
                            <span className={`animate-pulse absolute inline-flex h-4 w-4 rounded-full ${cfg.ringClass}`} />
                          )}
                          <span
                            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.dotClass} shadow-[0_0_8px_currentColor]`}
                          />
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-white group-hover:text-[#73e4e8] transition-colors">
                              {app.id}
                            </span>
                            <span className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.2 rounded font-medium">
                              {app.emirate}
                            </span>
                            <span className="text-[10px] text-gray-400 bg-white/5 px-1.5 py-0.2 rounded">
                              {app.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-200 font-medium">
                            {app.name}{' '}
                            <span className="text-gray-400 font-mono text-[11px]">
                              ({app.phone.slice(0, 4)}***{app.phone.slice(-3)})
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Middle: Service & Authority Reference */}
                      <div className="flex-1 min-w-[200px] text-xs space-y-0.5">
                        <span className="text-gray-200 font-medium block truncate max-w-sm">
                          {app.service}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400">
                          <span className="font-mono text-cyan-400/90">
                            {app.govtRefNo ? `Portal: ${app.govtRefNo}` : 'Authority Submission in Queue'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Status Badge & Inspect Trigger */}
                      <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                          <span>{cfg.label}</span>
                        </div>

                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-xl bg-white/5 group-hover:bg-[#73e4e8]/20 text-gray-300 group-hover:text-[#73e4e8] text-xs font-semibold border border-white/10 group-hover:border-[#73e4e8]/40 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Track File</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}

              {/* Empty state when no applications match filter */}
              {applicants.filter((app) => {
                const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
                const q = rosterSearch.trim().toLowerCase();
                const matchesSearch =
                  !q ||
                  app.id.toLowerCase().includes(q) ||
                  app.name.toLowerCase().includes(q) ||
                  app.service.toLowerCase().includes(q) ||
                  app.phone.includes(q);
                return matchesStatus && matchesSearch;
              }).length === 0 && (
                <div className="p-8 text-center space-y-3">
                  <p className="text-xs text-gray-400">
                    No active applications found with status <b className="text-white">"{statusFilter}"</b>
                    {rosterSearch ? ` matching "${rosterSearch}"` : ''}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('All');
                      setRosterSearch('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-[#73e4e8] font-bold cursor-pointer"
                  >
                    Reset Filter to All
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
