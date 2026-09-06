import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { DISH_DETAILS } from '../data/coffeeHouseData';

interface FeatureDishesProps {
  onMoreMenuClick: () => void;
}

export const FeatureDishes: React.FC<FeatureDishesProps> = ({ onMoreMenuClick }) => {
  const [selectedDish, setSelectedDish] = useState<'Black Forest' | 'Creame' | 'Tiramisu'>('Tiramisu');
  const dishes: Array<'Black Forest' | 'Creame' | 'Tiramisu'> = ['Black Forest', 'Creame', 'Tiramisu'];

  const currentDish = DISH_DETAILS[selectedDish];

  return (
    <section id="dishes" className="w-full bg-[#121421] py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Portrait photograph with overlapping floating testimonial card */}
          <div className="lg:col-span-6 relative">
            {/* Ambient warm glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#EFAE54]/15 via-transparent to-transparent blur-2xl pointer-events-none" />

            {/* Chef Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-dark-card max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/chef-barista.jpg"
                alt="Smiling barista chef in apron at modern cafe"
                className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Subtle gradient overlay at base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121421]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating testimonial badge overlapping the photo */}
            <div className="absolute -bottom-6 left-4 sm:left-8 right-4 sm:right-auto sm:max-w-md bg-white rounded-full border-2 border-[#EFAE54] px-5 py-3.5 shadow-xl flex items-center gap-3.5 z-20 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-inner">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#121421] leading-snug">
                &ldquo;I really love the Tiramisu. The cake was very smooth and tasty.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Text content & Dish sub-navigation filter */}
          <div className="lg:col-span-6 flex flex-col items-start pt-6 lg:pt-0">
            <span className="text-[#EFAE54] text-xs uppercase font-bold tracking-widest mb-3">
              Gourmet Food Pairing
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Complete Your Coffee with Our Dishes
            </h2>

            {/* Dynamic Dish Sub-Navigation Filter */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-6">
              {dishes.map((dish, idx) => {
                const isSelected = selectedDish === dish;
                return (
                  <React.Fragment key={dish}>
                    <button
                      type="button"
                      onClick={() => setSelectedDish(dish)}
                      className={`text-sm font-semibold transition-all px-3 py-1.5 rounded-full ${
                        isSelected
                          ? 'bg-[#EFAE54] text-[#121421] shadow-sm'
                          : 'text-[#EFAE54] hover:text-white bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {dish}
                    </button>
                    {idx < dishes.length - 1 && (
                      <span className="text-white/30 hidden sm:inline select-none">|</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Dish Description */}
            <div className="mt-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-lg w-full transition-all">
              <h3 className="text-white font-display text-lg font-bold">
                {currentDish.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                {currentDish.description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#EFAE54] font-medium flex items-center gap-1.5">
                <span>{currentDish.pairing}</span>
              </div>
            </div>

            {/* Secondary CTA Button */}
            <button
              onClick={onMoreMenuClick}
              type="button"
              className="mt-8 px-6 py-2.5 rounded-full bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] text-sm font-semibold inline-flex items-center gap-2 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              id="feature-dishes-cta"
            >
              <span>More Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
