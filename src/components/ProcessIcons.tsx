import React from 'react';

// -------------------------------------------------------------
// 1. Dried Pure Instant Coffee — Orange Mug with Steam & Beans
// -------------------------------------------------------------
export const ProcessMugIcon: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="20 4 105 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
      >
        {/* Steam Squiggles (Bright warm cream/glowing white for high visibility on dark blue) */}
        <g stroke="#FFF2DE" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.95">
          <path d="M 58 28 C 55 21, 63 15, 59 8" />
          <path d="M 70 26 C 67 19, 75 13, 71 6" />
          <path d="M 82 28 C 79 21, 87 15, 83 8" />
        </g>

        {/* Mug Handle (Vibrant orange with defined warm rim) */}
        <path
          d="M 98 48 C 122 48, 122 82, 98 84"
          fill="none"
          stroke="#7A2C08"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 98 48 C 121 48, 121 82, 98 84"
          fill="none"
          stroke="#FF751F"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 100 52 C 117 53, 117 77, 100 80"
          fill="none"
          stroke="#FFA86B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Base saucer accent line (Warm golden amber so it's clearly visible) */}
        <line x1="36" y1="94" x2="110" y2="94" stroke="#EFAE54" strokeWidth="3" strokeLinecap="round" />

        {/* Cup Outer Shell */}
        <path
          d="M 45 44
             C 45 42, 102 42, 102 44
             L 97 86
             C 97 90, 93 92, 88 92
             L 58 92
             C 53 92, 49 90, 49 86
             Z"
          fill="#FF751F"
          stroke="#5C1F06"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Subtle Cup Body Highlight for 3D Pop */}
        <path
          d="M 50 48 L 53 84 C 53 87, 56 89, 60 89"
          stroke="#FFA366"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Coffee Liquid / Rim */}
        <ellipse cx="73.5" cy="44" rx="27.5" ry="6.5" fill="#421606" stroke="#5C1F06" strokeWidth="2.5" />
        <ellipse cx="73.5" cy="44" rx="24" ry="4.5" fill="#5E220A" />

        {/* Front Beans (Rich warm roasted caramel/cinnamon with glowing golden creases) */}
        {/* Left Bean */}
        <g transform="translate(35, 74) rotate(-25 15 15)">
          <ellipse cx="15" cy="15" rx="14" ry="9" fill="#B35622" stroke="#4A1804" strokeWidth="2.4" />
          <path d="M 4 15 C 10 10, 20 20, 26 15" stroke="#FFE2A3" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>

        {/* Right Bean */}
        <g transform="translate(54, 74) rotate(15 15 15)">
          <ellipse cx="15" cy="15" rx="14" ry="9" fill="#C9682C" stroke="#4A1804" strokeWidth="2.4" />
          <path d="M 4 15 C 10 10, 20 20, 26 15" stroke="#FFF0C7" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// -------------------------------------------------------------
// 2. Roasted & Grounded Coffee — Burlap Sack with Beans & Sparkles
// -------------------------------------------------------------
export const ProcessSackIcon: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="28 14 80 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
      >
        {/* Sparkle 4-point stars (Bright glowing golden yellow with white center) */}
        {/* Top Left Sparkle */}
        <g>
          <path
            d="M 38 26 Q 40 31 45 33 Q 40 35 38 40 Q 36 35 31 33 Q 36 31 38 26 Z"
            fill="#FFD54F"
          />
          <circle cx="38" cy="33" r="1.5" fill="#FFFFFF" />
        </g>
        {/* Top Right Small Sparkle */}
        <g>
          <path
            d="M 100 18 Q 101.5 22 105 23.5 Q 101.5 25 100 29 Q 98.5 25 95 23.5 Q 98.5 22 100 18 Z"
            fill="#FFD54F"
          />
          <circle cx="100" cy="23.5" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Pile of Roasted Coffee Beans (Warm caramel & cacao tones with distinct highlights) */}
        <g stroke="#4A1804" strokeWidth="2">
          <ellipse cx="56" cy="42" rx="7.5" ry="5.5" fill="#B35622" transform="rotate(-15 56 42)" />
          <ellipse cx="68" cy="38" rx="8.5" ry="6" fill="#C9682C" transform="rotate(10 68 38)" />
          <ellipse cx="80" cy="40" rx="8" ry="5.5" fill="#A84C1C" transform="rotate(-20 80 40)" />
          <ellipse cx="60" cy="48" rx="7.5" ry="5.5" fill="#BD5F27" transform="rotate(25 60 48)" />
          <ellipse cx="73" cy="46" rx="8.5" ry="5.5" fill="#D97A3B" transform="rotate(-5 73 46)" />
          <ellipse cx="86" cy="47" rx="7.5" ry="5" fill="#B35622" transform="rotate(15 86 47)" />
        </g>

        {/* Individual Bean Creases on pile */}
        <path d="M 54 42 C 56 40, 58 44, 59 42" stroke="#FFE2A3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 66 38 C 68 36, 70 40, 71 38" stroke="#FFE2A3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 71 46 C 73 44, 75 48, 76 46" stroke="#FFF0C7" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Burlap Sack Body (Rich warm golden honey/tan) */}
        <path
          d="M 44 54
             C 42 54, 40 98, 45 106
             C 48 108, 92 108, 95 106
             C 100 98, 98 54, 96 54
             Z"
          fill="#E5B26D"
          stroke="#5C360A"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Sack Neck Cinch / Tied Rope (Warm cream/gold with deep shadow) */}
        <path
          d="M 42 54 C 55 58, 85 58, 98 54"
          fill="none"
          stroke="#4A2505"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 42 54 C 55 58, 85 58, 98 54"
          fill="none"
          stroke="#FFE285"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Coffee Bean Emblem Stamped on Sack */}
        <ellipse
          cx="70"
          cy="78"
          rx="11"
          ry="14"
          fill="#521E0B"
          stroke="#3D1406"
          strokeWidth="2"
          transform="rotate(22 70 78)"
        />
        <path
          d="M 70 66 C 75 74, 65 82, 70 90"
          stroke="#E5B26D"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

// -------------------------------------------------------------
// 3. Rich Aroma Instant Coffee — Takeaway Cup with Sleeve
// -------------------------------------------------------------
export const ProcessCupIcon: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="40 14 60 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
      >
        {/* Cup Lid — Bright luminous white/ivory with crisp bevels (High contrast on dark blue!) */}
        {/* Upper drinking spout tab */}
        <path
          d="M 52 26 V 20 C 52 18, 56 17, 60 17 H 80 C 84 17, 88 18, 88 20 V 26"
          fill="#FFFFFF"
          stroke="#BAC7D5"
          strokeWidth="1.8"
        />
        {/* Main lid horizontal rim */}
        <rect
          x="43"
          y="25"
          width="54"
          height="9"
          rx="4.5"
          fill="#FFFFFF"
          stroke="#BAC7D5"
          strokeWidth="1.8"
        />
        {/* Inner lid detail groove */}
        <line x1="48" y1="29.5" x2="92" y2="29.5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

        {/* Cup White Paper Body (Brilliant crisp white) */}
        <path
          d="M 48 34
             L 54 102
             C 54 105, 57 107, 61 107
             H 79
             C 83 107, 86 105, 86 102
             L 92 34
             Z"
          fill="#FFFFFF"
          stroke="#334155"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Amber Orange Heat Sleeve */}
        <path
          d="M 49.5 50
             L 52 83
             H 88
             L 90.5 50
             Z"
          fill="#FF8019"
          stroke="#6B290A"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Sleeve Top & Bottom Accent Lines */}
        <path d="M 50 53 L 90 53" stroke="#FFA85C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 52.5 80 L 87.5 80" stroke="#E06200" strokeWidth="1.5" strokeLinecap="round" />

        {/* Coffee Bean on Sleeve */}
        <ellipse
          cx="70"
          cy="66"
          rx="7.5"
          ry="10.5"
          fill="#4A1805"
          stroke="#2E0E03"
          strokeWidth="1.8"
          transform="rotate(20 70 66)"
        />
        <path
          d="M 70 58 C 73 63, 67 69, 70 74"
          stroke="#FFB26E"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
