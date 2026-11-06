import { Logo } from './Logo.tsx';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/10 bg-[#060a16] text-gray-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <Logo size="md" />
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Professional UAE typing, corporate documentation, and real-time application tracking support for individuals and businesses across all seven Emirates.
            </p>
            <div className="text-xs text-[#73e4e8] font-medium">
              Consultant: Tausin Ahmed Sayem · BBA Digital Marketing
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-white block">
              Quick Links
            </span>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">About Sayem</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UAE Typing Services</a></li>
              <li><a href="#track" className="hover:text-white transition-colors text-[#73e4e8]">Live Application Tracker</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Fee Calculator</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Direct Contacts</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-white block">
              Authorities Covered
            </span>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• ICP Federal Identity & Residency</li>
              <li>• GDRFA Dubai Immigration</li>
              <li>• MOHRE Tasheel Labor Services</li>
              <li>• RTA Licensing & Golden Chance</li>
              <li>• Dubai Land Dept (Ejari System)</li>
              <li>• DHA Salim Medical Fitness</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 leading-relaxed">
          <strong className="text-gray-300">Regulatory Disclaimer:</strong> Independent typing and document-preparation assistance only. This website and private service are not affiliated with RTA, MOI, MOHRE, ICP, GDRFA, Dubai Police, or any UAE government department. Official approvals, processing outcomes, and fees are solely determined by the relevant government authorities. Advertise and provide only services you are legally authorized to offer.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Tausin Ahmed Sayem. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-gray-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Admin Portal
            </button>
            <span>•</span>
            <a
              href="https://wa.me/971554198152"
              target="_blank"
              rel="noreferrer"
              className="text-[#73e4e8] hover:underline"
            >
              WhatsApp Support (+971 55 419 8152)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
