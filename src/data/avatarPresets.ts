export interface AvatarPreset {
  id: string;
  label: string;
  role: string;
  category: 'Executive' | 'UAE National' | 'Resident' | 'Investor';
  bgGradient: string;
  avatarSvg: string; // inline SVG markup or data URI
}

// Crisp, self-contained SVG avatars tailored for UAE typing, residency, and corporate services
export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'avatar-emirati-m',
    label: 'UAE National / Kandura',
    role: 'Citizen & Sponsor',
    category: 'UAE National',
    bgGradient: 'from-emerald-600 to-teal-800',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23064e3b"/><circle cx="50" cy="42" r="20" fill="%23f5d0b5"/><path d="M26 30 C26 14 74 14 74 30 C74 36 68 38 68 38 L32 38 C32 38 26 36 26 30 Z" fill="%23ffffff"/><circle cx="50" cy="24" r="13" fill="none" stroke="%23111827" stroke-width="3.5"/><path d="M30 36 C30 55 38 72 38 88 L34 100 L66 100 L62 88 C62 72 70 55 70 36 Z" fill="%23ffffff"/><circle cx="43" cy="42" r="2.5" fill="%23111827"/><circle cx="57" cy="42" r="2.5" fill="%23111827"/><path d="M46 51 C48 53 52 53 54 51" stroke="%23b45309" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M22 100 C22 75 35 68 50 68 C65 68 78 75 78 100 Z" fill="%23f9fafb"/></svg>`
  },
  {
    id: 'avatar-emirati-f',
    label: 'UAE National / Abaya',
    role: 'Director & Investor',
    category: 'UAE National',
    bgGradient: 'from-amber-600 to-stone-900',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2318181b"/><circle cx="50" cy="44" r="18" fill="%23fcd34d"/><path d="M24 45 C24 20 40 16 50 16 C60 16 76 20 76 45 C76 65 74 80 68 100 L32 100 C26 80 24 65 24 45 Z" fill="%2309090b"/><ellipse cx="50" cy="45" rx="14" ry="17" fill="%23f5d0b5"/><circle cx="44" cy="44" r="2" fill="%2318181b"/><circle cx="56" cy="44" r="2" fill="%2318181b"/><path d="M47 52 C48 53.5 52 53.5 53 52" stroke="%239a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M18 100 C18 72 32 68 50 68 C68 68 82 72 82 100 Z" fill="%2318181b"/></svg>`
  },
  {
    id: 'avatar-exec-m',
    label: 'Corporate Executive (M)',
    role: 'Managing Director',
    category: 'Executive',
    bgGradient: 'from-blue-600 to-indigo-900',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e3a8a"/><path d="M30 32 C30 18 42 16 50 16 C58 16 70 18 70 32 C70 38 68 40 68 40 L32 40 Z" fill="%231f2937"/><circle cx="50" cy="42" r="18" fill="%23fed7aa"/><circle cx="44" cy="41" r="2.2" fill="%23111827"/><circle cx="56" cy="41" r="2.2" fill="%23111827"/><path d="M46 49 C48 51 52 51 54 49" stroke="%23c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M16 100 C16 70 32 64 50 64 C68 64 84 70 84 100 Z" fill="%23111827"/><polygon points="50,64 44,80 50,96 56,80" fill="%230284c7"/><polygon points="45,64 50,75 55,64" fill="%23ffffff"/></svg>`
  },
  {
    id: 'avatar-exec-f',
    label: 'Corporate Executive (F)',
    role: 'General Counsel',
    category: 'Executive',
    bgGradient: 'from-purple-600 to-slate-900',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23581c87"/><path d="M26 38 C26 18 36 14 50 14 C64 14 74 18 74 38 C74 58 72 70 72 78 L28 78 C28 70 26 58 26 38 Z" fill="%23374151"/><circle cx="50" cy="43" r="17" fill="%23fde047"/><ellipse cx="50" cy="44" rx="14" ry="17" fill="%23fbcfe8"/><circle cx="44" cy="42" r="2.2" fill="%231f2937"/><circle cx="56" cy="42" r="2.2" fill="%231f2937"/><path d="M46 51 C48 53 52 53 54 51" stroke="%23be185d" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M18 100 C18 72 32 66 50 66 C68 66 82 72 82 100 Z" fill="%230f172a"/><path d="M42 66 L50 82 L58 66 Z" fill="%23e0e7ff"/></svg>`
  },
  {
    id: 'avatar-investor-gold',
    label: 'Golden Visa Investor',
    role: '10-Year Residency',
    category: 'Investor',
    bgGradient: 'from-amber-500 to-yellow-800',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2378350f"/><circle cx="50" cy="42" r="26" fill="none" stroke="%23fbbf24" stroke-width="2" stroke-dasharray="4,3"/><circle cx="50" cy="42" r="18" fill="%23fde68a"/><path d="M32 30 C32 18 42 15 50 15 C58 15 68 18 68 30 Z" fill="%23451a03"/><circle cx="44" cy="40" r="2" fill="%23451a03"/><circle cx="56" cy="40" r="2" fill="%23451a03"/><path d="M46 48 C48 50 52 50 54 48" stroke="%23b45309" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M18 100 C18 72 34 65 50 65 C66 65 82 72 82 100 Z" fill="%231e293b"/><circle cx="50" cy="74" r="5" fill="%23fbbf24"/></svg>`
  },
  {
    id: 'avatar-medic',
    label: 'Medical / Specialist',
    role: 'Healthcare Professional',
    category: 'Resident',
    bgGradient: 'from-cyan-600 to-teal-900',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230e7490"/><circle cx="50" cy="42" r="18" fill="%23fbcfe8"/><path d="M30 32 C30 18 42 16 50 16 C58 16 70 18 70 32 Z" fill="%23111827"/><circle cx="44" cy="41" r="2" fill="%23111827"/><circle cx="56" cy="41" r="2" fill="%23111827"/><path d="M46 49 C48 51 52 51 54 49" stroke="%23be185d" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M18 100 C18 72 34 64 50 64 C66 64 82 72 82 100 Z" fill="%23f0fdf4"/><rect x="47" y="70" width="6" height="16" fill="%23059669"/><rect x="42" y="75" width="16" height="6" fill="%23059669"/></svg>`
  },
  {
    id: 'avatar-tech-founder',
    label: 'Tech Founder / Freelancer',
    role: 'Green Visa Holder',
    category: 'Investor',
    bgGradient: 'from-cyan-500 to-blue-800',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230369a1"/><circle cx="50" cy="43" r="18" fill="%23fed7aa"/><path d="M32 30 C32 18 42 14 50 14 C58 14 68 18 68 30 Z" fill="%231e293b"/><circle cx="44" cy="41" r="2" fill="%230f172a"/><circle cx="56" cy="41" r="2" fill="%230f172a"/><rect x="40" y="38" width="8" height="5" rx="1.5" fill="none" stroke="%2338bdf8" stroke-width="1.5"/><rect x="52" y="38" width="8" height="5" rx="1.5" fill="none" stroke="%2338bdf8" stroke-width="1.5"/><line x1="48" y1="40" x2="52" y2="40" stroke="%2338bdf8" stroke-width="1.5"/><path d="M18 100 C18 70 34 64 50 64 C66 64 82 70 82 100 Z" fill="%230f172a"/><path d="M44 64 L50 78 L56 64 Z" fill="%2338bdf8"/></svg>`
  },
  {
    id: 'avatar-family',
    label: 'Family Member / Dependent',
    role: 'Dependent Visa',
    category: 'Resident',
    bgGradient: 'from-rose-500 to-purple-800',
    avatarSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23be123c"/><circle cx="50" cy="43" r="18" fill="%23ffedd5"/><path d="M28 34 C28 16 38 14 50 14 C62 14 72 16 72 34 C72 52 70 64 70 70 L30 70 Z" fill="%234c0519"/><circle cx="44" cy="42" r="2.2" fill="%23111827"/><circle cx="56" cy="42" r="2.2" fill="%23111827"/><path d="M46 51 C48 53 52 53 54 51" stroke="%23e11d48" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M18 100 C18 72 34 66 50 66 C66 66 82 72 82 100 Z" fill="%23fbcfe8"/></svg>`
  }
];
