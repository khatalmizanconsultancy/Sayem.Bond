import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  MessageCircle,
  Clock
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] tracking-widest uppercase mb-3">
            About Consultant
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Professional support, with a personal touch.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
            I’m studying BBA in Digital Marketing (3rd Year Final) and specialize in UAE typing, corporate documentation, and government portal filing. I focus on helping clients understand complex regulatory requirements and prepare paperwork accurately from day one.
          </p>
        </div>

        {/* Consultant Profile Showcase Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 mb-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-gradient-to-r from-white/[0.04] to-white/[0.01]">
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#73e4e8]/50 shadow-xl shadow-cyan-500/20">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-04-18_at_9.28.09_PM_bc31dc09.jpeg"
                alt="Tausin Ahmed Sayem"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#080d1b] border-2 border-[#68e0ae] flex items-center justify-center text-[#68e0ae] shadow-lg">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#73e4e8]/10 text-[#73e4e8] border border-[#73e4e8]/30 text-xs font-bold">
              Direct Consultant Support
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Tausin Ahmed Sayem
            </h3>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Serving expatriates, business owners, and families across Dubai, Abu Dhabi, and Northern Emirates with end-to-end document preparation, authority portal typing, and live tracking transparency.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto">
            <a
              href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20would%20like%20to%20consult%20with%20you%20directly."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#68e0ae] text-[#07111d] font-bold text-xs text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consult with Sayem</span>
            </a>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Professional Background */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#73e4e8]/10 border border-[#73e4e8]/30 flex items-center justify-center text-[#73e4e8]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Professional Background
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Extensive hands-on experience handling UAE typing services, residency visas, corporate trade licenses, MOHRE labor quota, Ejari, and attestation procedures across Dubai, Abu Dhabi, and Northern Emirates.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold block mb-3">
                Core Competencies & Authorities
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'ICP Emirates ID',
                  'GDRFA Dubai Visas',
                  'MOHRE Tasheel',
                  'RTA Licensing',
                  'Dubai Land Dept (Ejari)',
                  'DHA Salim Medical',
                  'MOFA Attestation',
                  'Bilingual Document Support'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Education & Digital Vision */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#a99cff]/10 border border-[#a99cff]/30 flex items-center justify-center text-[#a99cff]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Education & Modern Approach
              </h3>
              <div className="space-y-1">
                <span className="text-lg font-bold text-white block">
                  BBA — Digital Marketing
                </span>
                <span className="text-xs text-[#a99cff] font-semibold block">
                  3rd Year · Final Year
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Combining modern digital marketing methodologies with government service efficiency. Rather than standing in long queues, clients experience seamless digital document collection, transparent status updates, and rapid WhatsApp resolution.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#68e0ae] font-bold block text-sm">100% Online</span>
                <span className="text-gray-400">Zero physical hassle</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[#73e4e8] font-bold block text-sm">&lt; 15 Min</span>
                <span className="text-gray-400">Average response time</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
