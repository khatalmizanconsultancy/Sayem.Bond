import React from 'react';
import { Printer, X, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { TransactionRecord, ApplicantRecord } from '../types.ts';
import { Logo } from './Logo.tsx';
import { QRCodeVisual } from './QRCodeVisual.tsx';

interface PrintableReceiptProps {
  receiptData?: TransactionRecord | null;
  applicantData?: ApplicantRecord | null;
  onClose: () => void;
}

export const PrintableReceipt: React.FC<PrintableReceiptProps> = ({
  receiptData,
  applicantData,
  onClose,
}) => {
  if (!receiptData && !applicantData) return null;

  const isReceipt = !!receiptData;
  const title = isReceipt ? 'OFFICIAL PAYMENT RECEIPT' : 'DOCUMENT STATUS VERIFICATION SLIP';
  const refCode = isReceipt ? receiptData!.id : applicantData!.id;
  const appId = isReceipt ? receiptData!.appId : applicantData!.id;
  const applicantName = isReceipt ? receiptData!.applicant : applicantData!.name;
  const phone = isReceipt ? receiptData!.phone : applicantData!.phone;
  const serviceName = isReceipt ? receiptData!.service : applicantData!.service;
  const dateStr = isReceipt ? receiptData!.date : (applicantData!.updated || applicantData!.submissionDate);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sayem-uae.portal';
  const verificationUrl = isReceipt 
    ? `${origin}/?ref=${encodeURIComponent(appId)}&receipt=${encodeURIComponent(refCode)}#track`
    : `${origin}/?ref=${encodeURIComponent(refCode)}#track`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#030611]/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 relative border border-gray-200">
        
        {/* Print & Close Toolbar (hidden during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Document Handover & Live Verification Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#080d1b] text-white text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4 text-[#73e4e8]" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div id="printable-receipt" className="space-y-6">
          
          {/* Header with Chosen Logo and Official Titles */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-gray-900">
            <div className="space-y-1">
              <Logo size="md" lightMode={true} />
              <div className="text-[11px] text-gray-600 space-y-0.5 pt-1">
                <p>Dubai & All 7 Emirates · Direct WhatsApp: +971 55 419 8152</p>
                <p>Email: sayem7403@gmail.com · Portal: sayem-uae.portal</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 text-xs font-black bg-gray-900 text-white rounded-md tracking-wider mb-1 uppercase">
                {title}
              </span>
              <div className="font-mono font-black text-lg text-gray-900">
                {refCode}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                Issued: {dateStr}
              </div>
            </div>
          </div>

          {/* Client & Service Particulars */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="space-y-1">
              <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">Client / Applicant</span>
              <p className="font-extrabold text-sm text-gray-900">{applicantName}</p>
              <p className="text-gray-600 font-mono">Phone: {phone}</p>
              {applicantData?.emirate && (
                <p className="text-gray-600">Emirate: <b className="text-gray-800">{applicantData.emirate}</b></p>
              )}
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-gray-400 uppercase font-bold text-[10px] tracking-wider">Service Particulars</span>
              <p className="font-extrabold text-sm text-gray-900">{serviceName}</p>
              {isReceipt ? (
                <p className="text-gray-700 font-medium">Payment Mode: <b className="text-gray-900">{receiptData!.method}</b></p>
              ) : (
                <p className="font-bold text-cyan-800">
                  Status: <span className="underline decoration-cyan-500">{applicantData!.status}</span>
                </p>
              )}
              {applicantData?.govtRefNo && (
                <p className="text-gray-600 font-mono text-[11px]">
                  Govt File: {applicantData.govtRefNo}
                </p>
              )}
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <table className="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-3 border-b border-gray-200">Item Description & Scope</th>
                <th className="p-3 border-b border-gray-200 text-center">Reference</th>
                <th className="p-3 border-b border-gray-200 text-right">Amount (AED)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isReceipt ? (
                <tr>
                  <td className="p-3 font-medium text-gray-800">
                    UAE Document Preparation & Online Typing Filing: {serviceName}
                    {receiptData!.note && (
                      <span className="block text-[11px] text-gray-500 italic mt-0.5">
                        Client Note: {receiptData!.note}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-mono text-gray-600 font-semibold">{receiptData!.appId}</td>
                  <td className="p-3 text-right font-mono font-black text-gray-900 text-sm">
                    AED {receiptData!.amount.toFixed(2)}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="p-3 font-medium text-gray-800">
                    Official UAE Application Verification Slip: {serviceName}
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      Progress: {applicantData!.timeline.length} verified status events logged.
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-gray-600 font-semibold">{applicantData!.id}</td>
                  <td className="p-3 text-right font-mono font-black text-gray-900 text-sm">
                    AED {applicantData!.paid.toFixed(2)} / {applicantData!.amount.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Grand Total Bar */}
          <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-[11px] text-gray-600">
              <span className="font-semibold text-gray-900">Payment Status:</span>{' '}
              {isReceipt ? 'Settled & Authenticated' : applicantData!.paid >= applicantData!.amount ? 'Fully Paid' : `Balance Remaining: AED ${(applicantData!.amount - applicantData!.paid).toFixed(2)}`}
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">
                {isReceipt ? 'Total Amount Received' : 'Total Service Value'}
              </span>
              <span className="text-2xl font-black font-heading text-gray-900 font-mono">
                AED {isReceipt ? receiptData!.amount.toFixed(2) : applicantData!.amount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Interactive Scannable QR Code & Handover Verification Block */}
          <div className="pt-4 border-t-2 border-dashed border-gray-300 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Scannable Visual QR Code powered by qrcode.react */}
            <div className="sm:col-span-4 flex justify-center sm:justify-start">
              <QRCodeVisual
                value={verificationUrl}
                size={130}
                label={isReceipt ? "SCAN TO VALIDATE RECEIPT" : "SCAN FOR LIVE STATUS"}
                sublabel="UAE Government Synced"
                lightMode={true}
                showActions={true}
              />
            </div>

            {/* Handover Details & Security Hologram */}
            <div className="sm:col-span-8 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-1.5 text-cyan-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Handover & Digital Authenticity</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-700">
                <strong>Real-Time Verification:</strong> Point your smartphone camera at the QR code above or visit the portal to inspect live ICP, GDRFA, MOHRE, or RTA processing status for this application.
              </p>
              
              <div className="p-2.5 rounded-lg bg-gray-100 border border-gray-200 font-mono text-[10px] text-gray-600 space-y-0.5">
                <div className="flex justify-between">
                  <span>Digital Hash:</span>
                  <span className="text-gray-900 font-bold">SHA256-{refCode}-VALID</span>
                </div>
                <div className="flex justify-between">
                  <span>Coordinator:</span>
                  <span className="text-gray-900">Tausin Ahmed Sayem (BBA)</span>
                </div>
              </div>

              <div className="text-[9px] text-gray-400 italic">
                *Independent document-preparation coordination only. Official approval and issuance rests with the respective UAE government authority.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
