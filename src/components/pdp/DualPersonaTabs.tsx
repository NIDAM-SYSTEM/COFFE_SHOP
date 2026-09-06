import React, { useState } from 'react';
import { Layers, Coffee, Sparkles, BookOpen } from 'lucide-react';
import type { CoffeeProduct } from '../../types';
import { TechnicalSpecsTab } from './TechnicalSpecsTab';
import { HomeRecipeTab } from './HomeRecipeTab';

export interface DualPersonaTabsProps {
  product: CoffeeProduct;
  initialTab?: 'agronomy' | 'recipe';
  className?: string;
}

export const DualPersonaTabs: React.FC<DualPersonaTabsProps> = ({
  product,
  initialTab = 'agronomy',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'agronomy' | 'recipe'>(initialTab);

  return (
    <section
      className={`w-full rounded-3xl bg-[#161826]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-md ${className}`}
      aria-label="Spécifications détaillées et recettes"
    >
      {/* ── Active Tab Switcher Header ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFAE54]" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
            Tout Savoir sur ce Lot
          </h2>
        </div>

        {/* Dual Tab Buttons: Tab A vs Tab B */}
        <div
          role="tablist"
          aria-label="Choisir l'affichage"
          className="flex items-center p-1.5 rounded-2xl bg-[#121421] border border-white/10 self-stretch sm:self-auto"
        >
          {/* Tab A: Données Agronomiques & Lot (Nidal) */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'agronomy'}
            onClick={() => setActiveTab('agronomy')}
            className={`flex-1 sm:flex-initial py-2.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'agronomy'
                ? 'bg-[#EFAE54] text-[#121421] shadow-lg shadow-[#EFAE54]/20 font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={16} className="shrink-0" />
            <span>Données Agronomiques & Lot</span>
          </button>

          {/* Tab B: Recette Maison & Ratios (Mouna) */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'recipe'}
            onClick={() => setActiveTab('recipe')}
            className={`flex-1 sm:flex-initial py-2.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'recipe'
                ? 'bg-[#EFAE54] text-[#121421] shadow-lg shadow-[#EFAE54]/20 font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Coffee size={16} className="shrink-0" />
            <span>Recette Maison & Ratios</span>
          </button>
        </div>
      </div>

      {/* ── Active Tab Content Panel ── */}
      <div role="tabpanel" className="animate-fade-in">
        {activeTab === 'agronomy' ? (
          <TechnicalSpecsTab product={product} />
        ) : (
          <HomeRecipeTab product={product} />
        )}
      </div>
    </section>
  );
};

export default DualPersonaTabs;
