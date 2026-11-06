import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Lock, 
  Search, 
  ExternalLink, 
  MessageSquare, 
  FileCheck2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

import { Logo } from './Logo.tsx';

interface NavbarProps {
  onOpenAdmin: () => void;
  onNavigateToTrack: () => void;
  onNavigateToEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onNavigateToTrack,
  onNavigateToEstimator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#080d1b]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand with Chosen Logo */}
        <a href="#home" className="group">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-white transition-colors flex items-center gap-1.5">
            Services
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-[#73e4e8] font-bold">
              25+
            </span>
          </a>
          <button 
            onClick={onNavigateToTrack} 
            className="hover:text-white transition-colors flex items-center gap-1.5 text-[#73e4e8] font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#73e4e8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#73e4e8]"></span>
            </span>
            Live Tracker
          </button>
          <button 
            onClick={onNavigateToEstimator} 
            className="hover:text-white transition-colors"
          >
            Fee Calculator
          </button>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop Header Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            title="Open Admin Management Portal"
          >
            <Lock className="w-3.5 h-3.5 text-[#a99cff]" />
            <span>Admin</span>
          </button>

          <button
            onClick={onNavigateToTrack}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Track Reference</span>
          </button>

          <a
            href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20need%20UAE%20typing%20and%20document%20support."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae] text-[#07111d] font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <span>WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onNavigateToTrack}
            className="px-3 py-1.5 rounded-lg bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8]"
          >
            Track
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080e1d]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fadeIn">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              About Tausin Sayem
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white flex items-center justify-between"
            >
              <span>UAE Typing Services</span>
              <span className="text-xs bg-[#73e4e8]/20 text-[#73e4e8] px-2 py-0.5 rounded-full font-bold">25+ Types</span>
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToTrack();
              }}
              className="text-left text-[#73e4e8] font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#73e4e8] animate-ping" />
              Live Application Tracker
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToEstimator();
              }}
              className="text-left text-gray-300 hover:text-white"
            >
              Cost & Fee Calculator
            </button>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              Direct Contacts
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#a99cff]" />
              <span>Admin Management Portal</span>
            </button>

            <a
              href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20I%20need%20UAE%20typing%20and%20document%20support."
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] font-bold text-center text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp (+971 55 419 8152)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
