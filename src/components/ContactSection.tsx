import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Gamepad2, 
  ExternalLink, 
  Send, 
  Clock, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Golden Visa / Residency');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Sayem, my name is ${name || 'Client'} (${phone || 'Phone not provided'}). I am enquiring about ${service}. Details: ${message || 'Please provide quotation and document requirements.'}`
    );
    window.open(`https://wa.me/971554198152?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] tracking-widest uppercase mb-3">
            Get in touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Let’s discuss your request.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
            WhatsApp is the fastest channel to discuss your document checklist, confirm eligibility, and receive a binding quotation.
          </p>
        </div>

        {/* Contact Grid & Direct Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20have%20an%20urgent%20UAE%20typing%20enquiry."
              target="_blank"
              rel="noreferrer"
              className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-[#68e0ae]/50 transition-all block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#68e0ae]/10 border border-[#68e0ae]/30 flex items-center justify-center text-[#68e0ae]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <small className="text-xs text-gray-400 block">Direct WhatsApp & Mobile</small>
                  <strong className="text-base sm:text-lg font-bold text-white group-hover:text-[#68e0ae] transition-colors font-mono">
                    +971 55 419 8152
                  </strong>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#68e0ae]" />
            </a>

            {/* Email */}
            <a
              href="mailto:sayem7403@gmail.com"
              className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-[#73e4e8]/50 transition-all block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#73e4e8]/10 border border-[#73e4e8]/30 flex items-center justify-center text-[#73e4e8]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <small className="text-xs text-gray-400 block">Official Email</small>
                  <strong className="text-sm sm:text-base font-bold text-white group-hover:text-[#73e4e8] transition-colors">
                    sayem7403@gmail.com
                  </strong>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#73e4e8]" />
            </a>

            {/* Discord */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#a99cff]/10 border border-[#a99cff]/30 flex items-center justify-center text-[#a99cff]">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <small className="text-xs text-gray-400 block">Community & Discord</small>
                  <strong className="text-sm sm:text-base font-bold text-white font-mono">
                    Black-SaYeM#3498
                  </strong>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                Online
              </span>
            </div>

            {/* Coverage Map Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#73e4e8] font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Geographical Coverage</span>
              </div>
              <p className="text-xs text-gray-300">
                Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain. Remote digital filing available UAE-wide.
              </p>
            </div>

          </div>

          {/* Quick WhatsApp Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
              <h3 className="text-xl font-bold font-heading text-white mb-1">
                Fast WhatsApp Service Enquiry
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Fill details below to open a pre-formatted WhatsApp chat directly with Sayem.
              </p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full glass-input px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                      Your Mobile Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0501234567"
                      className="w-full glass-input px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full glass-input px-4 py-3 rounded-xl text-sm text-white font-medium"
                  >
                    <option value="Golden Visa / Residency" className="bg-[#080d1b]">UAE 10-Year Golden Visa / Residency</option>
                    <option value="Emirates ID (New / Renewal)" className="bg-[#080d1b]">Emirates ID (New / Renewal / Replacement)</option>
                    <option value="Family Visa Sponsorship" className="bg-[#080d1b]">Family Residence Visa (Spouse / Children)</option>
                    <option value="MOHRE Work Permit & Labor" className="bg-[#080d1b]">MOHRE Electronic Work Permit & Offer Letter</option>
                    <option value="RTA License & Golden Chance" className="bg-[#080d1b]">RTA Driving License & Golden Chance Direct Test</option>
                    <option value="Ejari Tenancy Registration" className="bg-[#080d1b]">Ejari Registration & Tenancy Attestation</option>
                    <option value="DED Trade License" className="bg-[#080d1b]">Trade License Issue & Renewal</option>
                    <option value="Medical Fitness Typing" className="bg-[#080d1b]">DHA / SEHA Medical Fitness Typing</option>
                    <option value="MOFA Attestation" className="bg-[#080d1b]">MOFA Document Attestation & Legal Translation</option>
                    <option value="Police Clearance Certificate (PCC)" className="bg-[#080d1b]">Police Clearance Certificate (PCC)</option>
                    <option value="ATS-Pro CV Writing" className="bg-[#080d1b]">ATS-Pro CV & Bilingual Cover Letter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-300 font-bold mb-2">
                    Specific Requirement or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Sayem about your urgency, current visa status, or documents you currently hold..."
                    className="w-full glass-input px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#68e0ae] text-[#07111d] font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Start WhatsApp Conversation with Sayem</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
