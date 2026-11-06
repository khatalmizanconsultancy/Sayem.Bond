import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { UAEServiceDefinition } from '../types.ts';

interface ServiceDetailModalProps {
  service: UAEServiceDefinition | null;
  onClose: () => void;
  onSelectServiceForTracking?: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  if (!service) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Sayem, I am interested in the ${service.name} service (${service.authority}). Please share document verification details and quotation.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#73e4e8]/20 to-[#a99cff]/20 border border-white/15 flex items-center justify-center text-3xl">
              {service.icon}
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#73e4e8]/10 text-[#73e4e8] border border-[#73e4e8]/30 mb-1">
                {service.authority}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {service.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#73e4e8] font-bold mb-2">Service Overview</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="glass-card p-3 rounded-xl border border-white/10">
              <span className="text-xs text-gray-400 block mb-1">Indicative Typing Fee</span>
              <span className="text-lg font-bold font-heading text-[#73e4e8]">From AED {service.startingPrice}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">+ Official Govt Fees</span>
            </div>
            <div className="glass-card p-3 rounded-xl border border-white/10">
              <span className="text-xs text-gray-400 block mb-1">Turnaround Time</span>
              <span className="text-base font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#a99cff]" />
                {service.turnaroundTime}
              </span>
            </div>
            <div className="glass-card p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-xs text-gray-400 block mb-1">Service Mode</span>
              <span className="text-base font-semibold text-[#68e0ae] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                100% Online / Remote
              </span>
            </div>
          </div>

          {/* Highlights */}
          {service.keyHighlights && service.keyHighlights.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#a99cff] font-bold mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Service Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#68e0ae] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents Checklist */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#73e4e8] font-bold mb-2.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Required Documents Checklist
            </h3>
            <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/10 space-y-2.5">
              {service.documentsNeeded.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <div className="w-5 h-5 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-[#73e4e8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Notice */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Official Notice:</strong> Typing assistance includes document preparation, format validation, and authority portal filing. Official government fees are determined by {service.authority} based on nationality and tenure.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-medium text-white transition-all order-2 sm:order-1"
          >
            Close Details
          </button>
          
          <a
            href={`https://wa.me/971554198152?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae] text-[#07111d] font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            <span>Proceed on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
