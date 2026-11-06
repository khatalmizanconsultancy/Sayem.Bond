import React, { useState } from 'react';
import { 
  Calculator, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { UAE_SERVICES } from '../data/servicesData.ts';
import { UAEEmirate, ServicePriority } from '../types.ts';

export const FeeEstimator: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(UAE_SERVICES[0].id);
  const [emirate, setEmirate] = useState<UAEEmirate>('Dubai');
  const [priority, setPriority] = useState<ServicePriority>('Standard');
  const [quantity, setQuantity] = useState(1);
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [includeTranslation, setIncludeTranslation] = useState(false);
  const [includeVipBiometrics, setIncludeVipBiometrics] = useState(false);

  const selectedService = UAE_SERVICES.find((s) => s.id === selectedServiceId) || UAE_SERVICES[0];

  // Base typing calculation
  const basePrice = selectedService.startingPrice;
  const priorityMultiplier = priority === 'VIP Same Day' ? 1.6 : priority === 'Express 24h' ? 1.25 : 1.0;
  
  const addOnCost = 
    (includeDelivery ? 50 : 0) +
    (includeTranslation ? 90 : 0) +
    (includeVipBiometrics ? 75 : 0);

  const estimatedTypingFee = Math.round((basePrice * priorityMultiplier * quantity) + addOnCost);

  // Indicative government fee approximation based on service
  const getApproxGovtFee = () => {
    switch (selectedService.categorySlug) {
      case 'visa':
        if (selectedService.id.includes('golden')) return 'AED 2,800 – 4,500 (GDRFA / Medical / ID)';
        if (selectedService.id.includes('family')) return 'AED 1,100 – 1,900 (Entry + ID + Medical)';
        if (selectedService.id.includes('tourist')) return 'AED 350 – 650 (GDRFA Immigration)';
        return 'AED 270 – 450 (ICP Direct)';
      case 'labor':
        return 'AED 300 – 1,200 (MOHRE Quota & Approval)';
      case 'transport':
        return 'AED 250 – 500 (RTA / Police)';
      case 'business':
        return 'AED 1,200 – 12,000 (DET / DLD Ejari)';
      case 'medical':
        return 'AED 260 – 750 (DHA Salim / SEHA)';
      case 'legal':
        return 'AED 160 – 300 (MOFA / Notary)';
      default:
        return 'Official authority schedule';
    }
  };

  const whatsappQuoteMsg = encodeURIComponent(
    `Hello Sayem, I used your live Fee Estimator for ${selectedService.name} in ${emirate}. Priority: ${priority}, Quantity: ${quantity}. Estimated typing fee: AED ${estimatedTypingFee}. Please confirm total quote and document requirements.`
  );

  return (
    <section id="estimator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a99cff]/10 border border-[#a99cff]/30 text-xs font-bold text-[#a99cff] tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Cost Estimator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Calculate your typing & filing fees.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
            Instant estimate of typing assistance fees, add-on coordination options, and indicative government charges before you commit.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                  1. Select UAE Typing Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full glass-input px-4 py-3.5 rounded-xl font-medium text-white text-sm"
                >
                  {UAE_SERVICES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#080d1b] text-white">
                      {s.icon} {s.name} ({s.authority})
                    </option>
                  ))}
                </select>
              </div>

              {/* Emirate & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                    2. UAE Emirate
                  </label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value as UAEEmirate)}
                    className="w-full glass-input px-4 py-3.5 rounded-xl font-medium text-white text-sm"
                  >
                    <option value="Dubai" className="bg-[#080d1b]">Dubai (GDRFA / RTA / DED)</option>
                    <option value="Abu Dhabi" className="bg-[#080d1b]">Abu Dhabi (ICP / ADED / SEHA)</option>
                    <option value="Sharjah" className="bg-[#080d1b]">Sharjah (SEDD / Sharjah Police)</option>
                    <option value="Ajman" className="bg-[#080d1b]">Ajman</option>
                    <option value="Ras Al Khaimah" className="bg-[#080d1b]">Ras Al Khaimah</option>
                    <option value="Fujairah" className="bg-[#080d1b]">Fujairah</option>
                    <option value="Umm Al Quwain" className="bg-[#080d1b]">Umm Al Quwain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                    3. Turnaround Urgency
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ServicePriority)}
                    className="w-full glass-input px-4 py-3.5 rounded-xl font-medium text-white text-sm"
                  >
                    <option value="Standard" className="bg-[#080d1b]">Standard (Standard Pace)</option>
                    <option value="Express 24h" className="bg-[#080d1b]">Express (24-Hour Queue)</option>
                    <option value="VIP Same Day" className="bg-[#080d1b]">VIP Same-Day Priority</option>
                  </select>
                </div>
              </div>

              {/* Number of Applicants / Documents */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                  4. Number of Applicants / Passports: <span className="text-[#73e4e8] font-mono">{quantity}</span>
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`w-11 h-11 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        quantity === num
                          ? 'bg-[#73e4e8] text-[#080d1b] border-[#73e4e8] shadow-md shadow-cyan-500/20'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-xs text-gray-400 ml-2">persons / applications</span>
                </div>
              </div>

              {/* Optional Add-Ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-3">
                  5. Optional Premium Add-Ons
                </label>
                <div className="space-y-2.5">
                  <label className="glass-card p-3 rounded-xl border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#73e4e8]/40">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeDelivery}
                        onChange={(e) => setIncludeDelivery(e.target.checked)}
                        className="w-4 h-4 accent-[#73e4e8] rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white block">Physical Document Doorstep Courier</span>
                        <span className="text-xs text-gray-400">Secure pickup & return across UAE</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#73e4e8] font-heading">+ AED 50</span>
                  </label>

                  <label className="glass-card p-3 rounded-xl border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#73e4e8]/40">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeTranslation}
                        onChange={(e) => setIncludeTranslation(e.target.checked)}
                        className="w-4 h-4 accent-[#73e4e8] rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white block">Ministry of Justice Sworn Legal Arabic Translation</span>
                        <span className="text-xs text-gray-400">Certified stamped translation page</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#73e4e8] font-heading">+ AED 90</span>
                  </label>

                  <label className="glass-card p-3 rounded-xl border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#73e4e8]/40">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeVipBiometrics}
                        onChange={(e) => setIncludeVipBiometrics(e.target.checked)}
                        className="w-4 h-4 accent-[#73e4e8] rounded"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white block">VIP Biometrics & Salim Center Fast-Track Booking</span>
                        <span className="text-xs text-gray-400">Skip regular biometric waiting queues</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#73e4e8] font-heading">+ AED 75</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111c38] to-[#091225] border border-[#73e4e8]/30 shadow-2xl space-y-6">
                
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#73e4e8] block mb-1">
                    Live Calculation Summary
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {selectedService.name}
                  </h3>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    Authority: {selectedService.authority}
                  </span>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Typing & Preparation ({quantity}x):</span>
                    <strong className="text-white font-mono">AED {Math.round(basePrice * priorityMultiplier * quantity)}</strong>
                  </div>

                  {addOnCost > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Selected Add-Ons:</span>
                      <strong className="text-[#a99cff] font-mono">+ AED {addOnCost}</strong>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Turnaround Expectation:</span>
                    <strong className="text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#73e4e8]" />
                      {priority === 'VIP Same Day' ? 'Same Day (2–6 Hours)' : priority === 'Express 24h' ? 'Within 24 Hours' : selectedService.turnaroundTime}
                    </strong>
                  </div>

                  {/* Typing Total */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">Estimated Service Fee</span>
                      <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#73e4e8]">
                        AED {estimatedTypingFee}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#73e4e8]/20 text-[#73e4e8] font-bold">
                      {priority}
                    </span>
                  </div>

                  {/* Govt Fee Note */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[11px] text-gray-400 block font-medium">Indicative Official Govt Fee:</span>
                    <p className="text-xs font-semibold text-white">
                      {getApproxGovtFee()}
                    </p>
                    <span className="text-[10px] text-gray-400 block italic">
                      *Official fees are paid directly to UAE government receipt systems.
                    </span>
                  </div>
                </div>

                {/* Lock In Button */}
                <a
                  href={`https://wa.me/971554198152?text=${whatsappQuoteMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae] text-[#07111d] font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lock in This Quote on WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-[#68e0ae]" />
                  <span>No hidden surcharges • Direct Sayem support</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
