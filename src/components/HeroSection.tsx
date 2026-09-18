import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CenterpieceCoffeeCup } from './CenterpieceCoffeeCup';
import { ProcessMugIcon, ProcessSackIcon, ProcessCupIcon } from './ProcessIcons';

interface HeroSectionProps {
  onOrderNowClick?: () => void;
}

const STATS_DATA = [
  { value: '80', label: 'Private Rooms' },
  { value: '30', label: 'Event Spaces' },
  { value: '20', label: 'Creative Studios' },
];

const PRODUCT_NODES = [
  { icon: ProcessMugIcon, label: 'Dried Pure Instant\nCoffee', offsetClass: '' },
  { icon: ProcessSackIcon, label: 'Roasted & Grounded\nCoffee', offsetClass: 'translate-y-3 sm:translate-y-4 lg:translate-y-5' },
  { icon: ProcessCupIcon, label: 'Rich Aroma Instant\nCoffee', offsetClass: '' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderNowClick }) => {
  return (
    <section
      id="home"
      className="relative w-full bg-[#525252] overflow-hidden select-none pt-1 sm:pt-2 pb-10 sm:pb-12 lg:pb-12"
      aria-label="Welcome to our Coffee Shop"
    >
      {/* 1. CURVED NAVY LOWER BACKGROUND */}
      <div 
        className="absolute inset-x-0 bottom-0 w-full h-[250px] sm:h-[275px] md:h-[300px] lg:h-[320px] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,40 C 440,130 1000,130 1440,40 L 1440,320 L 0,320 Z"
            fill="#0D1020"
          />
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
        
        {/* 2. MAIN HERO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-center">
          
          {/* Column 1: Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-white leading-[1.02] tracking-tight">
              <span className="block">Enjoy Your</span>
              <span className="block">Morning</span>
              <span className="block">Coffee</span>
            </h1>

            {/* Mobile / Tablet: Coffee cup placed after heading */}
            <div className="lg:hidden my-4 w-full flex items-center justify-center">
              <CenterpieceCoffeeCup className="w-full max-w-[210px] sm:max-w-[250px] h-[220px] sm:h-[260px] drop-shadow-2xl" />
            </div>

            <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed max-w-[270px] sm:max-w-[290px] mt-2.5 lg:mt-3.5">
              Boost your productivity and build your mood with a glass of coffee in the morning.
            </p>

            <div className="flex items-center mt-6 sm:mt-8">
              <Link
                to="/shop"
                className="group px-6 py-2.5 rounded-full bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-xs sm:text-sm inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#EFAE54]/50"
                id="hero-order-cta"
                onClick={onOrderNowClick}
              >
                <span>Shop Fresh Roasts</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#121421] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>

          {/* Column 2: Exact Centerpiece Coffee Cup */}
          <div className="hidden lg:flex items-center justify-center relative z-20">
            <CenterpieceCoffeeCup className="w-full max-w-[270px] sm:max-w-[300px] lg:max-w-[325px] xl:max-w-[345px] h-[280px] sm:h-[315px] lg:h-[350px] xl:h-[370px] drop-shadow-2xl" />
          </div>

          {/* Column 3: Right Column Stats */}
          <div className="flex flex-col items-center lg:items-start justify-center z-20 lg:pl-4 xl:pl-8 mt-6 lg:mt-0">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-4 lg:mb-6">
              <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                Enjoy your coffee in our<br className="hidden sm:inline" /> comfortable place
              </p>
              <div className="w-9 h-[3px] bg-[#EFAE54] mt-3 rounded-full" />
            </div>

            <ul className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5 w-full text-center lg:text-left">
              {STATS_DATA.map((stat, idx) => (
                <li key={idx} className="flex flex-col items-center lg:items-start">
                  <span className="font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-white leading-none tracking-tight">
                    {stat.value}<span className="text-[#EFAE54]">+</span>
                  </span>
                  <span className="text-white/60 text-[10px] sm:text-[11px] lg:text-xs font-medium mt-1 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. BOTTOM PRODUCTS SECTION */}
        <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-14 lg:mt-8 pb-2 z-20">
          <ul className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 relative z-10 items-start">
            {PRODUCT_NODES.map((Node, idx) => (
              <li 
                key={idx} 
                className={`flex flex-col items-center text-center group cursor-default ${Node.offsetClass}`}
              >
                <div className="relative flex items-center justify-center h-16 sm:h-18 lg:h-20">
                  <Node.icon className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg" />
                </div>

                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-[#EFAE54] shadow-sm my-2 lg:my-3 z-10 transition-transform duration-300 group-hover:scale-150" />

                <h3 className="font-display text-[10px] sm:text-xs lg:text-sm font-bold text-white leading-snug mt-1 whitespace-pre-line">
                  {Node.label}
                </h3>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};