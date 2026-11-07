import React, { useState } from 'react';
import { AVATAR_PRESETS } from '../data/avatarPresets.ts';
import { ApplicationStatus, ServicePriority } from '../types.ts';

interface ClientAvatarProps {
  photoUrl?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  status?: ApplicationStatus;
  priority?: ServicePriority;
  showStatusIndicator?: boolean;
}

export const ClientAvatar: React.FC<ClientAvatarProps> = ({
  photoUrl,
  name,
  size = 'md',
  className = '',
  status,
  priority,
  showStatusIndicator = false,
}) => {
  const [imgError, setImgError] = useState(false);

  // Size map in pixels / Tailwind classes
  const sizeConfig = {
    xs: { box: 'w-6 h-6 text-[10px]', px: 24, dot: 'w-1.5 h-1.5 bottom-0 right-0' },
    sm: { box: 'w-8 h-8 text-xs', px: 32, dot: 'w-2 h-2 bottom-0 right-0' },
    md: { box: 'w-10 h-10 text-sm', px: 40, dot: 'w-2.5 h-2.5 bottom-0 right-0 ring-2 ring-[#080d1b]' },
    lg: { box: 'w-14 h-14 text-lg', px: 56, dot: 'w-3 h-3 bottom-0.5 right-0.5 ring-2 ring-[#080d1b]' },
    xl: { box: 'w-20 h-20 text-2xl', px: 80, dot: 'w-4 h-4 bottom-1 right-1 ring-2 ring-[#080d1b]' },
    '2xl': { box: 'w-28 h-28 text-3xl', px: 112, dot: 'w-5 h-5 bottom-1.5 right-1.5 ring-3 ring-[#080d1b]' },
  }[size];

  // Derive 2-letter initials
  const initials = (name || 'CL')
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Deterministic luxury gradient based on name hash
  const getGradient = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const gradients = [
      'from-emerald-500 to-teal-700 text-white',
      'from-cyan-500 to-blue-700 text-white',
      'from-indigo-500 to-purple-800 text-white',
      'from-amber-500 to-orange-700 text-white',
      'from-rose-500 to-pink-700 text-white',
      'from-purple-500 to-indigo-800 text-white',
      'from-teal-500 to-emerald-800 text-white',
    ];
    return gradients[Math.abs(hash) % gradients.length];
  };

  // Check if photoUrl matches a preset ID
  const matchedPreset = photoUrl ? AVATAR_PRESETS.find((p) => p.id === photoUrl) : null;

  // Status indicator dot color
  const getStatusDotColor = (st?: ApplicationStatus) => {
    switch (st) {
      case 'Approved':
      case 'Completed':
        return 'bg-emerald-400';
      case 'Documents Required':
        return 'bg-amber-400';
      case 'Under Process':
      case 'Submitted to Authority':
        return 'bg-sky-400';
      case 'On Hold':
        return 'bg-orange-400';
      case 'Rejected':
        return 'bg-rose-500';
      default:
        return 'bg-indigo-400';
    }
  };

  // Determine actual image source
  const imageSource = matchedPreset ? matchedPreset.avatarSvg : photoUrl;

  return (
    <div className={`relative inline-block shrink-0 select-none ${className}`}>
      <div
        className={`${sizeConfig.box} rounded-2xl overflow-hidden shadow-md flex items-center justify-center font-bold font-heading border border-white/15 bg-gradient-to-br ${
          imageSource && !imgError ? 'bg-[#0f172a]' : getGradient(name)
        } transition-transform duration-200`}
      >
        {imageSource && !imgError ? (
          <img
            src={imageSource}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="tracking-wider drop-shadow-sm font-black">
            {initials || 'C'}
          </span>
        )}
      </div>

      {/* Optional Status Dot */}
      {showStatusIndicator && status && (
        <span
          className={`absolute ${sizeConfig.dot} rounded-full ${getStatusDotColor(status)} shadow-sm`}
          title={`Status: ${status}`}
        />
      )}

      {/* Optional VIP Indicator */}
      {priority === 'VIP Same Day' && size !== 'xs' && (
        <span
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-tr from-amber-400 to-yellow-300 text-black text-[8px] font-black rounded-full flex items-center justify-center shadow-sm"
          title="VIP Client"
        >
          ★
        </span>
      )}
    </div>
  );
};
