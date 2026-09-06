import React, { useState, useEffect } from 'react';
import {
  Filter,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
  Flame,
  Droplets,
  Sparkles,
  Coffee,
  SlidersHorizontal,
} from 'lucide-react';
import type {
  CatalogFilterState,
  RoastProfile,
  ProcessMethod,
  FlavorCategory,
  BrewMethodOption,
} from '../../types';
import {
  ROAST_OPTIONS,
  PROCESS_OPTIONS,
  FLAVOR_OPTIONS,
  BREW_METHOD_OPTIONS,
} from '../../data/catalog';

export interface FilterSidebarProps {
  filters: CatalogFilterState;
  onFilterChange: (newFilters: CatalogFilterState) => void;
  onClearAll: () => void;
  facetCounts?: {
    roast?: Record<string, number>;
    process?: Record<string, number>;
    flavor?: Record<string, number>;
    brew?: Record<string, number>;
  };
  totalResults?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  facetCounts,
  totalResults,
  isOpenMobile,
  onCloseMobile,
  className = '',
}) => {
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const isMobileDrawerOpen = isOpenMobile !== undefined ? isOpenMobile : internalMobileOpen;

  const closeDrawer = () => {
    if (onCloseMobile) {
      onCloseMobile();
    } else {
      setInternalMobileOpen(false);
    }
  };

  const openDrawer = () => {
    setInternalMobileOpen(true);
  };

  // Section collapse state (all open by default for rich discoverability)
  const [openSections, setOpenSections] = useState({
    roast: true,
    process: true,
    flavor: true,
    brew: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate total active filter count
  const activeCount =
    filters.roastProfiles.length +
    filters.processingMethods.length +
    filters.flavorCategories.length +
    filters.brewMethods.length;

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Multi-select toggle handlers
  const toggleRoast = (val: RoastProfile) => {
    const next = filters.roastProfiles.includes(val)
      ? filters.roastProfiles.filter((r) => r !== val)
      : [...filters.roastProfiles, val];
    onFilterChange({ ...filters, roastProfiles: next });
  };

  const toggleProcess = (val: ProcessMethod) => {
    const next = filters.processingMethods.includes(val)
      ? filters.processingMethods.filter((p) => p !== val)
      : [...filters.processingMethods, val];
    onFilterChange({ ...filters, processingMethods: next });
  };

  const toggleFlavor = (val: FlavorCategory) => {
    const next = filters.flavorCategories.includes(val)
      ? filters.flavorCategories.filter((f) => f !== val)
      : [...filters.flavorCategories, val];
    onFilterChange({ ...filters, flavorCategories: next });
  };

  const toggleBrew = (val: BrewMethodOption) => {
    const next = filters.brewMethods.includes(val)
      ? filters.brewMethods.filter((b) => b !== val)
      : [...filters.brewMethods, val];
    onFilterChange({ ...filters, brewMethods: next });
  };

  // Shared Filter Content (Rendered in both Desktop Sticky Sidebar and Mobile Drawer)
  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Header Actions (Title + Clear Button + Count Badge) */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-5 h-5 text-[#EFAE54]" />
          <h3 className="font-display text-lg font-bold text-white tracking-wide">
            Filter Catalog
          </h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#EFAE54] text-[#121421] text-xs font-black leading-none shadow-sm">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-white/60 hover:text-[#EFAE54] inline-flex items-center gap-1 transition-colors font-medium focus:outline-none"
            aria-label="Reset all filters"
            id="clear-all-filters-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Roast Profile Facet */}
      <div className="border-b border-white/10 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('roast')}
          className="w-full flex items-center justify-between py-1.5 text-left text-sm font-bold text-white group focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#EFAE54]" />
            <span>Roast Profile</span>
            {filters.roastProfiles.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#EFAE54]" />
            )}
          </span>
          {openSections.roast ? (
            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white" />
          )}
        </button>

        {openSections.roast && (
          <div className="mt-3 space-y-2.5 pl-1">
            {ROAST_OPTIONS.map((opt) => {
              const isChecked = filters.roastProfiles.includes(opt.value);
              const count = facetCounts?.roast?.[opt.value];
              return (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 cursor-pointer group select-none text-xs sm:text-sm"
                >
                  <div className="pt-0.5 relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRoast(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-[#EFAE54] border-[#EFAE54] text-[#121421]'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between text-white/80 group-hover:text-white transition-colors">
                      <span className={isChecked ? 'text-white font-semibold' : ''}>
                        {opt.label}
                      </span>
                      {count !== undefined && (
                        <span className="text-[11px] text-white/40 font-mono">({count})</span>
                      )}
                    </div>
                    {opt.description && (
                      <p className="text-[11px] text-white/40 mt-0.5 leading-tight">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Processing Method Facet */}
      <div className="border-b border-white/10 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('process')}
          className="w-full flex items-center justify-between py-1.5 text-left text-sm font-bold text-white group focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#EFAE54]" />
            <span>Processing Method</span>
            {filters.processingMethods.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#EFAE54]" />
            )}
          </span>
          {openSections.process ? (
            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white" />
          )}
        </button>

        {openSections.process && (
          <div className="mt-3 space-y-2.5 pl-1">
            {PROCESS_OPTIONS.map((opt) => {
              const isChecked = filters.processingMethods.includes(opt.value);
              const count = facetCounts?.process?.[opt.value];
              return (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 cursor-pointer group select-none text-xs sm:text-sm"
                >
                  <div className="pt-0.5 relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleProcess(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-[#EFAE54] border-[#EFAE54] text-[#121421]'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between text-white/80 group-hover:text-white transition-colors">
                      <span className={isChecked ? 'text-white font-semibold' : ''}>
                        {opt.label}
                      </span>
                      {count !== undefined && (
                        <span className="text-[11px] text-white/40 font-mono">({count})</span>
                      )}
                    </div>
                    {opt.description && (
                      <p className="text-[11px] text-white/40 mt-0.5 leading-tight">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Flavor Category Facet */}
      <div className="border-b border-white/10 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('flavor')}
          className="w-full flex items-center justify-between py-1.5 text-left text-sm font-bold text-white group focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EFAE54]" />
            <span>Flavor Profile</span>
            {filters.flavorCategories.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#EFAE54]" />
            )}
          </span>
          {openSections.flavor ? (
            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white" />
          )}
        </button>

        {openSections.flavor && (
          <div className="mt-3 space-y-2.5 pl-1">
            {FLAVOR_OPTIONS.map((opt) => {
              const isChecked = filters.flavorCategories.includes(opt.value);
              const count = facetCounts?.flavor?.[opt.value];
              return (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 cursor-pointer group select-none text-xs sm:text-sm"
                >
                  <div className="pt-0.5 relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFlavor(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-[#EFAE54] border-[#EFAE54] text-[#121421]'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between text-white/80 group-hover:text-white transition-colors">
                      <span className={isChecked ? 'text-white font-semibold' : ''}>
                        {opt.label}
                      </span>
                      {count !== undefined && (
                        <span className="text-[11px] text-white/40 font-mono">({count})</span>
                      )}
                    </div>
                    {opt.description && (
                      <p className="text-[11px] text-white/40 mt-0.5 leading-tight">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Brew Method Compatibility Facet */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => toggleSection('brew')}
          className="w-full flex items-center justify-between py-1.5 text-left text-sm font-bold text-white group focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#EFAE54]" />
            <span>Brew Method</span>
            {filters.brewMethods.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#EFAE54]" />
            )}
          </span>
          {openSections.brew ? (
            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white" />
          )}
        </button>

        {openSections.brew && (
          <div className="mt-3 space-y-2.5 pl-1">
            {BREW_METHOD_OPTIONS.map((opt) => {
              const isChecked = filters.brewMethods.includes(opt.value);
              const count = facetCounts?.brew?.[opt.value];
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 cursor-pointer group select-none text-xs sm:text-sm"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleBrew(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-[#EFAE54] border-[#EFAE54] text-[#121421]'
                          : 'border-white/20 bg-white/5 group-hover:border-white/40'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-grow flex items-center justify-between text-white/80 group-hover:text-white transition-colors">
                    <span className={isChecked ? 'text-white font-semibold' : ''}>
                      {opt.label}
                    </span>
                    {count !== undefined && (
                      <span className="text-[11px] text-white/40 font-mono">({count})</span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. DESKTOP STICKY SIDEBAR (Hidden on mobile < 1024px / md)    */}
      {/* ------------------------------------------------------------- */}
      <aside
        aria-label="Product Catalog Filters"
        className={`hidden lg:block w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-dark-card sticky top-24 backdrop-blur-sm ${className}`}
      >
        {renderFilterContent()}
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. MOBILE FILTER TRIGGER BUTTON (Visible on < 1024px)         */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden w-full">
        <button
          type="button"
          onClick={openDrawer}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white hover:border-[#EFAE54]/50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EFAE54]/30"
          id="mobile-filter-drawer-btn"
        >
          <div className="flex items-center gap-2.5">
            <Filter className="w-4 h-4 text-[#EFAE54]" />
            <span className="text-sm font-bold">Filters & Taxonomy</span>
          </div>

          <div className="flex items-center gap-2">
            {activeCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-[#EFAE54] text-[#121421] text-xs font-black leading-none">
                {activeCount} Active
              </span>
            ) : (
              <span className="text-xs text-white/50">All Coffees</span>
            )}
            <ChevronDown className="w-4 h-4 text-white/60" />
          </div>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MOBILE SLIDE-IN MODAL DRAWER                               */}
      {/* ------------------------------------------------------------- */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Drawer Panel (Slide-up from bottom or slide from right) */}
          <div className="fixed inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-[#161826] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#1A1D2E]">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-[#EFAE54]" />
                <h2 className="font-display text-lg font-bold text-white">
                  Filter Catalog
                </h2>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EFAE54] text-[#121421] text-xs font-black">
                    {activeCount}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close filter drawer"
                id="close-mobile-filter-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
              {renderFilterContent()}
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#121421] flex items-center gap-3">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="px-4 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-bold transition-all"
                >
                  Reset All
                </button>
              )}
              <button
                type="button"
                onClick={closeDrawer}
                className="flex-1 btn-pill-primary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Show Results</span>
                {totalResults !== undefined && (
                  <span className="text-[#121421]/80 font-normal">({totalResults})</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
