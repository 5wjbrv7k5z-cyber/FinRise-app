import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ showTagline = false, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-br from-[#171D3D] to-[#0B1026] border border-[#4361EE]/40 flex items-center justify-center shadow-lg shadow-[#4361EE]/15`}
      >
        <svg viewBox="0 0 64 64" className="w-3/4 h-3/4" fill="none">
          <defs>
            <linearGradient id="finriseArrow" x1="12" y1="48" x2="50" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4361EE" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path
            d="M14 42L27 29L35 36L49 20"
            stroke="url(#finriseArrow)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37 20H49V32"
            stroke="#22D3EE"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="42" r="3.5" fill="#4361EE" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-extrabold tracking-tight text-white leading-none`}>
          Fin<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4361EE] via-[#8B5CF6] to-[#22D3EE]">Rise</span>
        </span>
        {showTagline && (
          <span className="text-xs font-medium text-[#A5B4D8] mt-1 tracking-wide">
            {BRAND_CONFIG.tagline}
          </span>
        )}
      </div>
    </div>
  );
};
