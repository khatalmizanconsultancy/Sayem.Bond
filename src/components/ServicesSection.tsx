import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRight,
  Filter
} from 'lucide-react';
import { UAE_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData.ts';
import { UAEServiceDefinition } from '../types.ts';

interface ServicesSectionProps {
  onSelectService: (service: UAEServiceDefinition) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services
  const filteredServices = UAE_SERVICES.filter((svc) => {
    const matchesCategory = selectedCategory === 'all' || svc.categorySlug === selectedCategory;
    const matchesQuery = 
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] tracking-widest uppercase mb-3">
              Official Catalog
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              One place for all your UAE document needs.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
              Serving all 7 Emirates with verified online filing, error-free typing, and live tracking across federal and local portals.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20please%20send%20me%20a%20full%20service%20quotation%20and%20document%20checklist."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all hover:border-[#73e4e8]/50 flex items-center gap-2"
            >
              <span>Custom Quotation</span>
              <ExternalLink className="w-4 h-4 text-[#73e4e8]" />
            </a>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 mb-10">
          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search UAE typing services (e.g. golden visa, driving license, ejari, mohre, pcc...)"
              className="w-full glass-input pl-12 pr-4 py-3.5 rounded-2xl text-sm sm:text-base text-white placeholder-gray-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#73e4e8]/25 to-[#a99cff]/25 text-white border border-[#73e4e8]/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Top strip */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {svc.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#73e4e8] bg-[#73e4e8]/10 px-2.5 py-0.5 rounded-full border border-[#73e4e8]/30 max-w-[170px] truncate text-right">
                      {svc.authority}
                    </span>
                    {svc.isPopular && (
                      <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                        ★ Popular Service
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#73e4e8] transition-colors leading-snug mb-2">
                  {svc.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">
                  {svc.description}
                </p>
              </div>

              {/* Bottom details */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Indicative Typing</span>
                    <strong className="text-sm font-heading font-bold text-[#68e0ae]">
                      From AED {svc.startingPrice}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px]">Processing</span>
                    <span className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#a99cff]" />
                      {svc.turnaroundTime}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectService(svc)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#73e4e8]" />
                    <span>Checklist</span>
                  </button>

                  <a
                    href={`https://wa.me/971554198152?text=${encodeURIComponent(
                      `Hello Sayem, I need assistance with the ${svc.name} (${svc.authority}). Please share requirements and quotation.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold transition-all hover:brightness-110 flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Request</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/10">
            <p className="text-base text-gray-400">
              No services found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#73e4e8]/10 text-[#73e4e8] text-xs font-bold border border-[#73e4e8]/30"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Indicative Price Band */}
        <div className="mt-12 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#73e4e8] font-bold">
              Transparent & Regulated Guidance
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              AED 25 – 10,000+ <span className="text-xs text-gray-400 font-normal">Indicative Range</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              From fast ATS-Pro CV typing (AED 25) to Golden Visa and investor trade licenses (AED 10,000+). Final invoice depends on official government fees (ICP, GDRFA, MOHRE, RTA, DHA), urgency tier, and translation or attestation scope.
            </p>
          </div>

          <a
            href="https://wa.me/971554198152?text=Hello%20Sayem%2C%20please%20send%20me%20a%20detailed%20quotation%20with%20government%20fee%20breakdown."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#73e4e8] via-[#a99cff] to-[#68e0ae] text-[#07111d] font-bold text-sm shadow-xl shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Request Full Quotation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Regulatory Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Legal Notice & Scope:</strong> Independent typing and document-preparation assistance only. This website is not affiliated with RTA, MOI, MOHRE, ICP, GDRFA, Dubai Police, or any government authority. Official decisions, approvals, and fees are strictly controlled by the respective UAE government authorities.
          </div>
        </div>

      </div>
    </section>
  );
};
