import React from 'react';

export const CoffeeLogo: React.FC<{ className?: string }> = ({ className = 'h-14 sm:h-16 w-auto' }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 170 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Steam marks above cup */}
        <line x1="77" y1="5" x2="77" y2="12" stroke="#EFAE54" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="85" y1="2" x2="85" y2="11" stroke="#EFAE54" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="93" y1="5" x2="93" y2="12" stroke="#EFAE54" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left Decorative Wing Lines */}
        <line x1="22" y1="36" x2="58" y2="36" stroke="#EFAE54" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="32" y1="43" x2="58" y2="43" stroke="#EFAE54" strokeWidth="2.4" strokeLinecap="round" />

        {/* Right Decorative Wing Lines */}
        <line x1="112" y1="36" x2="148" y2="36" stroke="#EFAE54" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="112" y1="43" x2="138" y2="43" stroke="#EFAE54" strokeWidth="2.4" strokeLinecap="round" />

        {/* Takeaway Coffee Cup */}
        {/* Cup Lid */}
        <rect x="70" y="16" width="30" height="6" rx="3" fill="#FFFFFF" stroke="#222222" strokeWidth="1.5" />
        <path d="M76 16 V13.5 C76 12.8 77 12 78.5 12 H91.5 C93 12 94 12.8 94 13.5 V16" fill="#FFFFFF" stroke="#222222" strokeWidth="1.5" />

        {/* Cup Body */}
        <path d="M72 22 L75 58 H95 L98 22 Z" fill="#FFFFFF" stroke="#222222" strokeWidth="1.8" />

        {/* Amber Sleeve */}
        <path d="M73.5 32 L75.5 49 H94.5 L96.5 32 Z" fill="#EFAE54" stroke="#222222" strokeWidth="1.5" />

        {/* Coffee Bean on Sleeve */}
        <ellipse cx="85" cy="40.5" rx="4" ry="5.5" fill="#3D1A0C" transform="rotate(20 85 40.5)" />
        <path d="M85 36 C87 39, 83 42, 85 45" stroke="#EFAE54" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Arched Ribbon Banner */}
        <path
          d="M 40 68 Q 85 78 130 68"
          fill="none"
          stroke="#EFAE54"
          strokeWidth="1.8"
        />

        {/* Text Along / Near Banner: COFFEE SHOP */}
        <text
          x="85"
          y="81"
          fill="#EFAE54"
          fontSize="11.5"
          fontFamily="'Grandstander', 'Fredoka', sans-serif"
          fontWeight="800"
          textAnchor="middle"
          letterSpacing="2.8"
        >
          COFFEE SHOP
        </text>
      </svg>
    </div>
  );
};
