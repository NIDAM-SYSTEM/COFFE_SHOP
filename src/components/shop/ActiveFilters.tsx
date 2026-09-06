import React from 'react';
import { X, RotateCcw, Filter, Sparkles } from 'lucide-react';
import type {
  CatalogFilterState,
  RoastProfile,
  ProcessMethod,
  FlavorCategory,
  BrewMethodOption,
} from '../../types';

export interface ActiveFiltersProps {
  filters: CatalogFilterState;
  onRemoveRoast: (roast: RoastProfile) => void;
  onRemoveProcess: (process: ProcessMethod) => void;
  onRemoveFlavor: (flavor: FlavorCategory) => void;
  onRemoveBrew: (brew: BrewMethodOption) => void;
  onClearSearch?: () => void;
  onClearAll: () => void;
  totalResults: number;
  totalAvailable: number;
  className?: string;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveRoast,
  onRemoveProcess,
  onRemoveFlavor,
  onRemoveBrew,
  onClearSearch,
  onClearAll,
  totalResults,
  totalAvailable,
  className = '',
}) => {
  const hasActiveFilters =
    filters.roastProfiles.length > 0 ||
    filters.processingMethods.length > 0 ||
    filters.flavorCategories.length > 0 ||
    filters.brewMethods.length > 0 ||
    Boolean(filters.searchQuery.trim());

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#161826]/80 border border-white/10 backdrop-blur-md ${className}`}
      aria-label="Filtres actifs et résultats"
    >
      {/* ── Left: Result Count & Active Summary ── */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#EFAE54] animate-pulse" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-sans text-white/90">
          <span className="font-mono font-bold text-white text-sm sm:text-base">
            {totalResults}
          </span>{' '}
          <span className="text-[#A0A5B5]">sur {totalAvailable} cafés de spécialité</span>
        </p>
      </div>

      {/* ── Right: Chips Row & Clear All ── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Query Chip */}
          {filters.searchQuery.trim() && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFAE54]/15 text-[#EFAE54] border border-[#EFAE54]/30 shadow-sm">
              <span>Recherche: "{filters.searchQuery.trim()}"</span>
              {onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="hover:bg-[#EFAE54]/20 rounded-full p-0.5 transition-colors focus:outline-none"
                  aria-label="Effacer la recherche"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              )}
            </span>
          )}

          {/* Roast Profiles Chips */}
          {filters.roastProfiles.map((roast) => (
            <span
              key={`active-roast-${roast}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm"
            >
              <span>Torréfaction: {roast}</span>
              <button
                type="button"
                onClick={() => onRemoveRoast(roast)}
                className="hover:bg-amber-400/20 rounded-full p-0.5 transition-colors focus:outline-none"
                aria-label={`Retirer filtre torréfaction ${roast}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Processing Methods Chips */}
          {filters.processingMethods.map((proc) => (
            <span
              key={`active-proc-${proc}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-400/15 text-sky-300 border border-sky-400/30 shadow-sm"
            >
              <span>Procédé: {proc}</span>
              <button
                type="button"
                onClick={() => onRemoveProcess(proc)}
                className="hover:bg-sky-400/20 rounded-full p-0.5 transition-colors focus:outline-none"
                aria-label={`Retirer filtre procédé ${proc}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Flavor Categories Chips */}
          {filters.flavorCategories.map((flavor) => (
            <span
              key={`active-flavor-${flavor}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-400/15 text-rose-300 border border-rose-400/30 shadow-sm"
            >
              <Sparkles size={11} className="shrink-0" />
              <span>{flavor}</span>
              <button
                type="button"
                onClick={() => onRemoveFlavor(flavor)}
                className="hover:bg-rose-400/20 rounded-full p-0.5 transition-colors focus:outline-none"
                aria-label={`Retirer filtre profil ${flavor}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Brew Methods Chips */}
          {filters.brewMethods.map((brew) => (
            <span
              key={`active-brew-${brew}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 shadow-sm"
            >
              <span>Méthode: {brew}</span>
              <button
                type="button"
                onClick={() => onRemoveBrew(brew)}
                className="hover:bg-emerald-400/20 rounded-full p-0.5 transition-colors focus:outline-none"
                aria-label={`Retirer filtre méthode ${brew}`}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}

          {/* Clear All Button */}
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-[#EFAE54] hover:text-[#121421] bg-[#EFAE54]/10 hover:bg-[#EFAE54] border border-[#EFAE54]/30 transition-all duration-200 focus:outline-none ml-auto sm:ml-0"
          >
            <RotateCcw size={11} />
            <span>Tout réinitialiser</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;
