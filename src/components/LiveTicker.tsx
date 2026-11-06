import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { UAE_SERVICES } from '../data/servicesData.ts';
import { ActivityRecord } from '../types.ts';

interface LiveTickerProps {
  activities?: ActivityRecord[];
  onSelectService?: (serviceName: string) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = () => {
  // All 28+ UAE services duplicated for infinite seamless scrolling
  const tickerServices = [...UAE_SERVICES, ...UAE_SERVICES];

  return (
    <div className="w-full bg-[#080e1d]/95 border-b border-white/10 py-2.5 px-4 backdrop-blur-xl overflow-hidden relative z-30 select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        
        {/* Pulsing Live Badge */}
        <div className="flex items-center gap-2 shrink-0 bg-[#73e4e8]/10 border border-[#73e4e8]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#73e4e8] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#68e0ae] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#68e0ae]"></span>
          </span>
          <span className="tracking-wide uppercase text-[10px] font-bold whitespace-nowrap">
            All UAE Services Live
          </span>
        </div>

        {/* Marquee ticker wrapper with continuous 60fps scrolling */}
        <div className="overflow-hidden whitespace-nowrap w-full flex items-center relative mask-fade-edges">
          <div className="animate-marquee items-center gap-8 text-xs text-gray-300">
            {tickerServices.map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                className="inline-flex items-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1 rounded-xl border border-white/5 transition-colors cursor-default"
              >
                <span className="text-sm">{service.icon}</span>
                <span className="text-white font-medium">{service.name}</span>
                <span className="text-[10px] font-bold text-[#73e4e8] bg-[#73e4e8]/10 px-2 py-0.5 rounded border border-[#73e4e8]/20">
                  {service.authority}
                </span>
                <span className="text-[11px] font-bold text-[#68e0ae] font-mono">
                  From AED {service.startingPrice}
                </span>
                <span className="text-[10px] text-gray-400">
                  ({service.turnaroundTime})
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#68e0ae]/60"></span>
              </div>
            ))}
          </div>
        </div>

        {/* UAE Ports Live Status */}
        <div className="hidden xl:flex items-center gap-1.5 shrink-0 text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#68e0ae]" />
          <span>7 Emirates Connected</span>
        </div>

      </div>
    </div>
  );
};
