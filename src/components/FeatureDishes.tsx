import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { DISH_DETAILS } from '../data/coffeeHouseData';

interface FeatureDishesProps {
  onMoreMenuClick: () => void;
}

// Extracted types for cleaner component logic
type DishKey = 'Black Forest' | 'Creame' | 'Tiramisu';
const DISH_OPTIONS: DishKey[] = ['Black Forest', 'Creame', 'Tiramisu'];

export const FeatureDishes: React.FC<FeatureDishesProps> = ({ onMoreMenuClick }) => {
  const [selectedDish, setSelectedDish] = useState<DishKey>('Tiramisu');
  const currentDish = DISH_DETAILS[selectedDish];

  return (
    <section 
      id="dishes" 
      className="w-full bg-[#121421] py-16 sm:py-24 border-t border-white/5"
      aria-labelledby="dishes-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Social Proof */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Ambient warm glow */}
            <div 
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#EFAE54]/15 via-transparent to-transparent blur-3xl pointer-events-none" 
              aria-hidden="true"
            />

            {/* Chef Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/chef-barista.jpg"
                alt="Our master barista carefully preparing a gourmet pairing"
                className="w-full h-[420px] sm:h-[480px] lg:h-[540px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121421]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating testimonial badge */}
            <div className="absolute -bottom-6 left-4 sm:-left-6 right-4 sm:right-auto sm:w-[85%] bg-white rounded-2xl sm:rounded-full border border-white/20 px-5 py-4 shadow-xl flex items-center gap-4 z-20 transition-transform duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-inner">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#121421] leading-snug">
                &ldquo;I really love the Tiramisu. The cake was very smooth and tasty. Perfect pairing!&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Text content & Dish Selector */}
          <div className="flex flex-col items-start pt-8 lg:pt-0">
            <span className="text-[#EFAE54] text-xs uppercase font-bold tracking-widest mb-3">
              Gourmet Food Pairing
            </span>

            <h2 
              id="dishes-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              Complete Your Coffee with Our Dishes
            </h2>

            {/* Modern Tab Selector */}
            <div 
              className="inline-flex items-center p-1.5 bg-white/[0.03] rounded-full border border-white/10 mt-6 sm:mt-8 shadow-inner"
              role="tablist"
              aria-label="Select a dish to view details"
            >
              {DISH_OPTIONS.map((dish) => {
                const isSelected = selectedDish === dish;
                return (
                  <button
                    key={dish}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDish(dish)}
                    className={`text-sm font-semibold transition-all duration-300 px-5 py-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] ${
                      isSelected
                        ? 'bg-[#EFAE54] text-[#121421] shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {dish}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Dish Description Card */}
            {/* Added min-h to prevent layout shift during content swap */}
            <div 
              className="mt-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-lg w-full transition-all min-h-[160px] flex flex-col justify-center"
              aria-live="polite"
            >
              {/* Key forces React to re-render, keeping transitions crisp */}
              <div key={selectedDish} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-white font-display text-xl font-bold">
                  {currentDish.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2.5">
                  {currentDish.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#EFAE54] bg-[#EFAE54]/10 px-2 py-1 rounded-md">
                    Pairing Match
                  </span>
                  <span className="text-xs text-white/80 font-medium">
                    {currentDish.pairing}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onMoreMenuClick}
              type="button"
              className="group mt-8 px-7 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold inline-flex items-center gap-3 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:border-[#EFAE54]/50"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4 text-[#EFAE54] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};