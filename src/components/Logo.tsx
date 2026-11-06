import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightMode = false,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 group`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(115,228,232,0.3)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#73e4e8" />
              <stop offset="50%" stopColor="#a99cff" />
              <stop offset="100%" stopColor="#ffd166" />
            </linearGradient>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d1b38" />
              <stop offset="100%" stopColor="#050a17" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#f39c12" />
            </linearGradient>
          </defs>

          {/* Outer Shield Outline */}
          <path
            d="M50 6L88 20V48C88 71.5 72 90 50 96C28 90 12 71.5 12 48V20L50 6Z"
            fill="url(#shieldGrad)"
            stroke="url(#emblemGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Geometric Falcon Wings / Document Quill */}
          <path
            d="M50 18L76 29V46C76 63 65 76 50 82C35 76 24 63 24 46V29L50 18Z"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
          />

          {/* Golden Seal Stars & Apex */}
          <circle cx="50" cy="18" r="3.5" fill="url(#goldGrad)" />
          <path
            d="M38 32H62M34 40H66M30 48H70"
            stroke="rgba(115,228,232,0.25)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Central Stylized 'S' Monogram with Quill Nib */}
          <path
            d="M60 36C56 31 42 32 40 40C38 48 62 48 60 60C58 69 42 69 38 63"
            stroke="url(#emblemGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Official Verification Check Stamp */}
          <path
            d="M44 72L48 76L56 68"
            stroke="#68e0ae"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-black tracking-tight leading-none ${
                size === 'sm'
                  ? 'text-lg'
                  : size === 'lg'
                  ? 'text-3xl'
                  : size === 'xl'
                  ? 'text-4xl'
                  : 'text-2xl'
              } ${lightMode ? 'text-gray-900' : 'text-white'}`}
            >
              SAYEM
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#73e4e8] to-[#ffd166] animate-pulse"></span>
          </div>
          <span
            className={`text-[9px] uppercase tracking-[0.2em] font-bold ${
              lightMode ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            UAE Typing & Document Services
          </span>
        </div>
      )}
    </div>
  );
};
