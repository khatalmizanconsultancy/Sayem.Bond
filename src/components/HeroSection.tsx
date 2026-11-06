import React from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Zap,
  Globe2,
  FileSearch
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateToTrack: () => void;
  onNavigateToEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTrack,
  onNavigateToEstimator,
}) => {
  return (
    <section id="home" className="pt-10 pb-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-7">
            {/* Live Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#73e4e8] tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#68e0ae] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#68e0ae]"></span>
              </span>
              <span>UAE Typing & Government Document Support</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.08]">
              Paperwork made <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae]">
                simpler.
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal">
              I’m <b className="text-white font-semibold">Tausin Ahmed Sayem</b> — providing UAE typing, document preparation, and application support for individuals and businesses across Dubai, Abu Dhabi, and the Northern Emirates. Clear communication, organized service, and live tracking from initial enquiry to final approval.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20need%20typing%20service."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae] text-[#07111d] font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
              >
                <span>Get service support</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onNavigateToTrack}
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm sm:text-base transition-all hover:border-[#73e4e8]/50 flex items-center gap-2.5"
              >
                <FileSearch className="w-4 h-4 text-[#73e4e8]" />
                <span>Track application ↓</span>
              </button>

              <button
                onClick={onNavigateToEstimator}
                className="px-4 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 text-sm font-medium transition-all"
              >
                Fee Calculator
              </button>
            </div>

            {/* Real Stats Band */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
              <div>
                <strong className="block font-heading font-extrabold text-2xl sm:text-3xl text-white">500+</strong>
                <small className="text-xs text-gray-400">Customers served</small>
              </div>
              <div>
                <strong className="block font-heading font-extrabold text-2xl sm:text-3xl text-[#73e4e8]">25+</strong>
                <small className="text-xs text-gray-400">Service categories</small>
              </div>
              <div>
                <strong className="block font-heading font-extrabold text-2xl sm:text-3xl text-[#68e0ae]">25 AED+</strong>
                <small className="text-xs text-gray-400">To 10,000+ AED range</small>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              *Direct typing, document preparation & online authority filing across all 7 Emirates.
            </p>
          </div>

          {/* Right Column: Visual Portrait & Credentials Card with User's Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#73e4e8]/30 via-[#a99cff]/25 to-[#ffd166]/20 rounded-3xl blur-xl opacity-80 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative glass-panel rounded-3xl p-4 sm:p-5 border border-white/20 shadow-2xl">
                {/* Visual Portrait Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.8] bg-[#0c1427] border border-white/15 group">
                  
                  {/* The User's Actual Portrait Photo */}
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-04-18_at_9.28.09_PM_bc31dc09.jpeg"
                    alt="Tausin Ahmed Sayem - UAE Typing & Document Consultant"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback in case of path variation
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('sayem-photo')) {
                        target.src = '/public/assets/aistudio/WhatsApp_Image_2026-04-18_at_9.28.09_PM_bc31dc09.jpeg';
                      }
                    }}
                  />

                  {/* Gradient Vignette Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1b] via-[#080d1b]/20 to-transparent"></div>

                  {/* Top Live Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#080d1b]/80 backdrop-blur-md text-[#68e0ae] border border-[#68e0ae]/40 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#68e0ae] animate-pulse"></span>
                      Verified Consultant
                    </span>
                    <span className="text-[11px] font-semibold text-white bg-[#080d1b]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-lg">
                      Dubai, UAE 🇦🇪
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-[#080d1b]/90 backdrop-blur-md border border-white/15 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-black text-lg text-white">
                        Tausin Ahmed Sayem
                      </h3>
                      <div className="w-6 h-6 rounded-full bg-[#68e0ae]/20 border border-[#68e0ae] flex items-center justify-center text-[#68e0ae]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-[#73e4e8] font-medium">
                      BBA Digital Marketing · 3rd Year Final
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-300">
                      <span>⚡ Express UAE Typing</span>
                      <span>•</span>
                      <span>24/7 Live Tracker</span>
                      <span>•</span>
                      <span className="text-[#68e0ae] font-bold">From 25 AED</span>
                    </div>
                  </div>
                </div>

                {/* Card Sub-actions */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#ffd166]" />
                    <span className="text-[11px]">Licensed Independent Support</span>
                  </div>
                  <a
                    href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20saw%20your%20profile%20and%20need%20typing%20assistance."
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#73e4e8] hover:underline font-bold flex items-center gap-1"
                  >
                    Direct Line ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
