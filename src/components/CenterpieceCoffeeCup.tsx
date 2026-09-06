import React, { useId } from 'react';

export const CenterpieceCoffeeCup: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-[540px] h-auto',
}) => {
  const rawId = useId();
  const idPrefix = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const steamPlumeGrad = `steamPlumeGrad_${idPrefix}`;
  const steamHighlightGrad = `steamHighlightGrad_${idPrefix}`;
  const cupBodyGoldGrad = `cupBodyGoldGrad_${idPrefix}`;
  const coffeeSurfaceGrad = `coffeeSurfaceGrad_${idPrefix}`;
  const saucerGrad = `saucerGrad_${idPrefix}`;
  const saucerInnerGrad = `saucerInnerGrad_${idPrefix}`;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="105 32 310 485"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-full object-contain mx-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
      >
        <defs>
          {/* Steam Plume Gradient */}
          <linearGradient id={steamPlumeGrad} x1="230" y1="230" x2="280" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#691A10" />
            <stop offset="40%" stopColor="#8C2517" />
            <stop offset="85%" stopColor="#B03521" />
            <stop offset="100%" stopColor="#8A2315" />
          </linearGradient>

          {/* Steam Left Bright Cream/White Highlight */}
          <linearGradient id={steamHighlightGrad} x1="250" y1="210" x2="270" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#FFF3E0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EFAE54" stopOpacity="0.4" />
          </linearGradient>

          {/* Golden Ceramic Cup Radial Gradient */}
          <radialGradient
            id={cupBodyGoldGrad}
            cx="260"
            cy="310"
            r="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFFDF7" />
            <stop offset="55%" stopColor="#F5DDB3" />
            <stop offset="80%" stopColor="#D9A865" />
            <stop offset="100%" stopColor="#A87332" />
          </radialGradient>

          {/* Espresso Liquid Dark Red-Brown Gradient */}
          <linearGradient id={coffeeSurfaceGrad} x1="150" y1="210" x2="370" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A130B" />
            <stop offset="50%" stopColor="#691C10" />
            <stop offset="100%" stopColor="#872517" />
          </linearGradient>

          {/* Saucer Ring Gradient */}
          <linearGradient id={saucerGrad} x1="120" y1="410" x2="400" y2="510" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5E160C" />
            <stop offset="50%" stopColor="#962817" />
            <stop offset="100%" stopColor="#701A0E" />
          </linearGradient>

          {/* Saucer Inner Shading */}
          <linearGradient id={saucerInnerGrad} x1="170" y1="420" x2="350" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A1209" />
            <stop offset="100%" stopColor="#751F12" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------------ */}
        {/* 1. STEAM VAPOR PLUME (Prominent S-Curve Flame Rising from Cup)     */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Main Dark Terracotta/Sienna Plume */}
          <path
            d="M 264 225
               C 240 180, 222 125, 252 75
               C 260 62, 268 48, 265 38
               C 260 52, 274 72, 280 98
               C 290 145, 256 182, 275 225
               C 270 228, 267 227, 264 225 Z"
            fill={`url(#${steamPlumeGrad})`}
          />

          {/* Creamy White Accent Highlight Along Left Curve */}
          <path
            d="M 257 205
               C 244 172, 234 128, 253 88
               C 257 79, 263 68, 263 56
               C 260 70, 252 90, 248 114
               C 242 144, 250 176, 257 205 Z"
            fill={`url(#${steamHighlightGrad})`}
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 2. FLOATING SAUCER (Wide Elliptical Dark Red-Brown Ring)           */}
        {/* ------------------------------------------------------------------ */}
        {/* Saucer Base Shadow */}
        <ellipse cx="260" cy="465" rx="145" ry="46" fill="#000000" opacity="0.25" />

        {/* Saucer Outer Ellipse */}
        <path
          d="M 135 450
             C 135 398, 385 398, 385 450
             C 385 512, 135 512, 135 450 Z"
          fill={`url(#${saucerGrad})`}
        />

        {/* Saucer Cutout / Shaded Center Ring */}
        <path
          d="M 175 452
             C 175 418, 345 418, 345 452
             C 345 490, 175 490, 175 452 Z"
          fill={`url(#${saucerInnerGrad})`}
        />

        {/* Subtle Saucer Front Edge Highlight */}
        <path
          d="M 148 452 C 150 498, 370 498, 372 452"
          fill="none"
          stroke="#B53622"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 3. CUP HANDLE (Right Loop in Dark Reddish-Brown)                   */}
        {/* ------------------------------------------------------------------ */}
        <path
          d="M 335 285
             C 410 290, 412 390, 322 380
             C 316 380, 312 368, 316 364
             C 384 366, 382 305, 330 298
             Z"
          fill="#6B1C10"
          stroke="#4D130A"
          strokeWidth="3.5"
        />
        {/* Handle Golden Inner Glow */}
        <path
          d="M 332 296 C 374 302, 376 352, 326 362"
          fill="none"
          stroke="#E5B57A"
          strokeWidth="2.5"
          opacity="0.8"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 4. CUP CERAMIC BODY (Lustrous Golden Champagne Gradient)           */}
        {/* ------------------------------------------------------------------ */}
        <path
          d="M 160 255
             C 162 345, 200 425, 260 425
             C 320 425, 358 345, 360 255
             Z"
          fill={`url(#${cupBodyGoldGrad})`}
          stroke="#5E180D"
          strokeWidth="4.5"
        />

        {/* Left Contour Shade for Dimensional Roundness */}
        <path
          d="M 164 258
             C 164 340, 196 415, 245 422
             C 205 412, 178 345, 174 260 Z"
          fill="#875322"
          opacity="0.22"
        />

        {/* Cup Foot / Base Ring */}
        <ellipse cx="260" cy="422" rx="46" ry="8" fill="#5E180D" />

        {/* ------------------------------------------------------------------ */}
        {/* 5. CUP RIM & ESPRESSO LIQUID SURFACE (Tilted Ellipse)              */}
        {/* ------------------------------------------------------------------ */}
        {/* Dark Rim Outer Ring */}
        <ellipse cx="260" cy="255" rx="100" ry="42" fill="#5C160C" />

        {/* Espresso Liquid Fill */}
        <ellipse cx="260" cy="255" rx="93" ry="37" fill={`url(#${coffeeSurfaceGrad})`} />

        {/* Cream Latte Art Swirl (Distinctive White Foam Spiral) */}
        <g stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none">
          {/* Outer Spiral Wave */}
          <path d="M 210 250 C 218 234, 296 230, 310 248 C 322 266, 246 277, 228 266 C 218 256, 238 244, 266 245 C 286 246, 282 260, 264 260 C 254 260, 252 253, 260 253" />
          <circle cx="260" cy="253" r="2.5" fill="#FFFFFF" />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 6. SPECULAR HIGHLIGHTS (Two White Dots on Upper Right Body)        */}
        {/* ------------------------------------------------------------------ */}
        {/* Larger Specular Oval */}
        <ellipse
          cx="330"
          cy="305"
          rx="6"
          ry="10"
          fill="#FFFFFF"
          transform="rotate(18 330 305)"
          opacity="0.95"
        />

        {/* Smaller Specular Circle Below */}
        <circle
          cx="335"
          cy="326"
          r="4"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};
