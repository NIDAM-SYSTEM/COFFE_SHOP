import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CenterpieceCoffeeCup } from './CenterpieceCoffeeCup';
import { ProcessMugIcon, ProcessSackIcon, ProcessCupIcon } from './ProcessIcons';

interface HeroSectionProps {
  onOrderNowClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderNowClick }) => {
  return (
    <section
      id="home"
      className="relative w-full bg-[#525252] overflow-hidden select-none pt-1 sm:pt-2 pb-10 sm:pb-12 lg:pb-12"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. CURVED NAVY LOWER BACKGROUND (#0D1020)                      */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-x-0 bottom-0 w-full h-[250px] sm:h-[275px] md:h-[300px] lg:h-[320px] pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Lower concave boundary positioned below button and stats */}
          <path
            d="M 0,40 C 440,130 1000,130 1440,40 L 1440,320 L 0,320 Z"
            fill="#0D1020"
          />
          {/* Full-width continuous curved decorative line passing through all 3 dots */}
          <path
            d="M 40,146 Q 720,310 1400,146"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.32"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ------------------------------------------------------------- */}
        {/* 2. MAIN HERO ROW: 3 Symmetrical Columns for Exact 50% Centering */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-center">
          
          {/* Column 1: Left Content (Completely in Gray Background) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-white leading-[1.02] tracking-tight">
              <span className="block">ENjoy Your</span>
              <span className="block">Morning</span>
              <span className="block">Coffee</span>
            </h1>

            {/* Mobile / Tablet: Coffee cup placed after heading */}
            <div className="lg:hidden my-3 w-full flex items-center justify-center">
              <CenterpieceCoffeeCup className="w-full max-w-[210px] sm:max-w-[250px] h-[220px] sm:h-[260px]" />
            </div>

            <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed max-w-[270px] sm:max-w-[290px] mt-2.5 lg:mt-3.5">
              Boost your productivity and build your mood with a glass of coffee in the morning.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-5">
              <Link
                to="/shop"
                className="group px-6 py-2.5 rounded-full bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-xs sm:text-sm inline-flex items-center gap-3 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 focus:outline-none"
                id="hero-order-cta"
              >
                <span>Shop Fresh Roasts</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#121421] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-[#121421]" strokeWidth={2.5} />
                </span>
              </Link>

              <Link
                to="/shop/salvador-san-alberto"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-[#EFAE54] text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EFAE54] animate-pulse" />
                <span>Micro-lot Vedette (Finca Bourbon) →</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Exact Centerpiece Coffee Cup (Dead-center at 50% of Hero) */}
          <div className="hidden lg:flex items-center justify-center relative z-20">
            <div className="w-full flex items-center justify-center">
              <CenterpieceCoffeeCup className="w-full max-w-[270px] sm:max-w-[300px] lg:max-w-[325px] xl:max-w-[345px] h-[280px] sm:h-[315px] lg:h-[350px] xl:h-[370px]" />
            </div>
          </div>

          {/* Column 3: Right Column (Completely in Gray Background) */}
          <div className="flex flex-col items-center lg:items-start justify-center z-20 lg:pl-10 xl:pl-16 mt-4 lg:mt-0">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-3 lg:mb-3.5">
              <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                Enjoy your coffee in our<br className="hidden sm:inline" /> comfortable place
              </p>
              <div className="w-9 h-[2px] bg-[#EFAE54] mt-2 rounded-full" />
            </div>

            {/* Stats: Horizontal row on mobile/tablet, vertical stack on desktop */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-0 lg:space-y-3 w-full text-center lg:text-left">
              {/* 80+ Privat Room */}
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-white leading-none tracking-tight">
                  80<span className="text-[#EFAE54]">+</span>
                </span>
                <span className="text-white/60 text-[10px] sm:text-[11px] lg:text-xs font-medium mt-0.5">
                  Privat Room
                </span>
              </div>

              {/* 30+ Event Space */}
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-white leading-none tracking-tight">
                  30<span className="text-[#EFAE54]">+</span>
                </span>
                <span className="text-white/60 text-[10px] sm:text-[11px] lg:text-xs font-medium mt-0.5">
                  Event Space
                </span>
              </div>

              {/* 20+ Creative Studio */}
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-white leading-none tracking-tight">
                  20<span className="text-[#EFAE54]">+</span>
                </span>
                <span className="text-white/60 text-[10px] sm:text-[11px] lg:text-xs font-medium mt-0.5">
                  Creative Studio
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. BOTTOM PRODUCTS SECTION (Positioned ~20px lower in navy)    */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full max-w-5xl mx-auto mt-8 sm:mt-10 lg:mt-6 pb-2 z-20">
          
          {/* 3 Process Items Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 relative z-10 items-start">
            
            {/* Node 1: Dried Pure Instant Coffee */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative flex items-center justify-center h-16 sm:h-18 lg:h-20">
                <ProcessMugIcon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-transform duration-200 group-hover:scale-105" />
              </div>

              {/* Round Golden Dot */}
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#EFAE54] shadow-sm my-1.5 sm:my-2 z-10 transition-transform duration-200 group-hover:scale-125" />

              {/* Text Label */}
              <h3 className="font-display text-[10px] sm:text-xs lg:text-sm font-bold text-white leading-tight mt-0.5">
                Dried Pure Instant<br />Coffee
              </h3>
            </div>

            {/* Node 2: Roasted & Grounded Coffee (Dips lower following the curve) */}
            <div className="flex flex-col items-center text-center group translate-y-3 sm:translate-y-4 lg:translate-y-5">
              <div className="relative flex items-center justify-center h-16 sm:h-18 lg:h-20">
                <ProcessSackIcon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-transform duration-200 group-hover:scale-105" />
              </div>

              {/* Round Golden Dot */}
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#EFAE54] shadow-sm my-1.5 sm:my-2 z-10 transition-transform duration-200 group-hover:scale-125" />

              {/* Text Label */}
              <h3 className="font-display text-[10px] sm:text-xs lg:text-sm font-bold text-white leading-tight mt-0.5">
                Roasted & Grounded<br />Coffee
              </h3>
            </div>

            {/* Node 3: Rich Aroma Instant Coffee */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative flex items-center justify-center h-16 sm:h-18 lg:h-20">
                <ProcessCupIcon className="w-12 h-14 sm:w-14 sm:h-16 lg:w-18 lg:h-20 transition-transform duration-200 group-hover:scale-105" />
              </div>

              {/* Round Golden Dot */}
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#EFAE54] shadow-sm my-1.5 sm:my-2 z-10 transition-transform duration-200 group-hover:scale-125" />

              {/* Text Label */}
              <h3 className="font-display text-[10px] sm:text-xs lg:text-sm font-bold text-white leading-tight mt-0.5">
                Rich Aroma Instant<br />Coffee
              </h3>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
