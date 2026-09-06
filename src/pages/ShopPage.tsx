import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Coffee,
  Package,
  Building2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Check,
} from 'lucide-react';
import { PRODUCTS, ROAST_OPTIONS, PROCESS_OPTIONS, FLAVOR_OPTIONS, BREW_METHOD_OPTIONS } from '../data/catalog';
import type {
  CoffeeProduct,
  CatalogFilterState,
  CatalogSortOption,
  RoastProfile,
  ProcessMethod,
  FlavorCategory,
  BrewMethodOption,
  GrindOption,
} from '../types';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { ActiveFilters } from '../components/shop/ActiveFilters';
import { ProductCardInline } from '../components/shop/ProductCardInline';

interface ShopPageProps {
  onAddToCartSpecialty?: (product: CoffeeProduct, grind: GrindOption) => void;
  onOpenCart?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToCartSpecialty,
  onOpenCart,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Parse Initial Filters from URL Parameters ──
  const initialFilters: CatalogFilterState = useMemo(() => {
    const roastParam = searchParams.get('roast');
    const processParam = searchParams.get('process');
    const flavorParam = searchParams.get('flavor');
    const brewParam = searchParams.get('brew');
    const searchParam = searchParams.get('q') || '';
    const sortParam = (searchParams.get('sort') as CatalogSortOption) || 'featured';

    return {
      roastProfiles: roastParam ? (roastParam.split(',') as RoastProfile[]) : [],
      processingMethods: processParam ? (processParam.split(',') as ProcessMethod[]) : [],
      flavorCategories: flavorParam ? (flavorParam.split(',') as FlavorCategory[]) : [],
      brewMethods: brewParam ? (brewParam.split(',') as BrewMethodOption[]) : [],
      searchQuery: searchParam,
      sortBy: ['featured', 'price-asc', 'price-desc', 'roast-date'].includes(sortParam)
        ? sortParam
        : 'featured',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync state to URL search parameters
  const updateFiltersAndUrl = useCallback(
    (newFilters: CatalogFilterState) => {
      setFilters(newFilters);
      const params = new URLSearchParams();

      if (newFilters.roastProfiles.length > 0) {
        params.set('roast', newFilters.roastProfiles.join(','));
      }
      if (newFilters.processingMethods.length > 0) {
        params.set('process', newFilters.processingMethods.join(','));
      }
      if (newFilters.flavorCategories.length > 0) {
        params.set('flavor', newFilters.flavorCategories.join(','));
      }
      if (newFilters.brewMethods.length > 0) {
        params.set('brew', newFilters.brewMethods.join(','));
      }
      if (newFilters.searchQuery.trim()) {
        params.set('q', newFilters.searchQuery.trim());
      }
      if (newFilters.sortBy !== 'featured') {
        params.set('sort', newFilters.sortBy);
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  // ── Filter Matching Logic ──
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subName.toLowerCase().includes(query);
        const matchesOrigin = product.origin.toLowerCase().includes(query);
        const matchesLot = product.lotCode.toLowerCase().includes(query);
        const matchesPlain = product.plainProfile.toLowerCase().includes(query);
        const matchesNotes = product.tastingNotes.some((n) => n.toLowerCase().includes(query));
        const matchesTags = product.flavorTags.some((t) => t.toLowerCase().includes(query));

        if (!matchesName && !matchesSub && !matchesOrigin && !matchesLot && !matchesPlain && !matchesNotes && !matchesTags) {
          return false;
        }
      }

      // 2. Roast Profile
      if (filters.roastProfiles.length > 0) {
        if (!filters.roastProfiles.includes(product.roastProfile)) {
          return false;
        }
      }

      // 3. Processing Method
      if (filters.processingMethods.length > 0) {
        if (!filters.processingMethods.includes(product.processingMethod)) {
          return false;
        }
      }

      // 4. Flavor Category
      if (filters.flavorCategories.length > 0) {
        if (!filters.flavorCategories.includes(product.flavorCategory)) {
          return false;
        }
      }

      // 5. Brew Method
      if (filters.brewMethods.length > 0) {
        const matchesBrew = filters.brewMethods.some(
          (m) =>
            product.recommendedMethods?.includes(m) ||
            (m === 'Whole Bean' && product.availableGrinds.includes('Whole Bean')) ||
            (m === 'Espresso' && product.availableGrinds.includes('Espresso')) ||
            (m === 'Moka Pot' && product.availableGrinds.includes('Moka Pot (Fine)')) ||
            (m === 'Drip / V60' && product.availableGrinds.includes('V60 / Filter')) ||
            (m === 'French Press' && product.availableGrinds.includes('French Press (Coarse)'))
        );
        if (!matchesBrew) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // ── Sorting Logic ──
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    switch (filters.sortBy) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'roast-date':
        return items.sort((a, b) => (b.lotCode > a.lotCode ? 1 : -1));
      case 'featured':
      default:
        return items;
    }
  }, [filteredProducts, filters.sortBy]);

  // ── Facet Counts Calculation ──
  const facetCounts = useMemo(() => {
    const counts = {
      roast: {} as Record<string, number>,
      process: {} as Record<string, number>,
      flavor: {} as Record<string, number>,
      brew: {} as Record<string, number>,
    };

    PRODUCTS.forEach((p) => {
      // Roast
      counts.roast[p.roastProfile] = (counts.roast[p.roastProfile] || 0) + 1;
      // Process
      counts.process[p.processingMethod] = (counts.process[p.processingMethod] || 0) + 1;
      // Flavor
      counts.flavor[p.flavorCategory] = (counts.flavor[p.flavorCategory] || 0) + 1;
      // Brew
      p.recommendedMethods?.forEach((m) => {
        counts.brew[m] = (counts.brew[m] || 0) + 1;
      });
    });

    return counts;
  }, []);

  // ── Handler Callbacks ──
  const handleClearAll = useCallback(() => {
    updateFiltersAndUrl({
      roastProfiles: [],
      processingMethods: [],
      flavorCategories: [],
      brewMethods: [],
      searchQuery: '',
      sortBy: 'featured',
    });
  }, [updateFiltersAndUrl]);

  const handleRemoveRoast = useCallback(
    (roast: RoastProfile) => {
      updateFiltersAndUrl({
        ...filters,
        roastProfiles: filters.roastProfiles.filter((r) => r !== roast),
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleRemoveProcess = useCallback(
    (proc: ProcessMethod) => {
      updateFiltersAndUrl({
        ...filters,
        processingMethods: filters.processingMethods.filter((p) => p !== proc),
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleRemoveFlavor = useCallback(
    (flavor: FlavorCategory) => {
      updateFiltersAndUrl({
        ...filters,
        flavorCategories: filters.flavorCategories.filter((f) => f !== flavor),
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleRemoveBrew = useCallback(
    (brew: BrewMethodOption) => {
      updateFiltersAndUrl({
        ...filters,
        brewMethods: filters.brewMethods.filter((b) => b !== brew),
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleClearSearch = useCallback(() => {
    updateFiltersAndUrl({ ...filters, searchQuery: '' });
  }, [filters, updateFiltersAndUrl]);

  const totalActiveFilterCount =
    filters.roastProfiles.length +
    filters.processingMethods.length +
    filters.flavorCategories.length +
    filters.brewMethods.length +
    (filters.searchQuery.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421]">
      {/* ── 1. Page Header & Terroir Hero Banner ── */}
      <section className="relative bg-gradient-to-b from-[#181B2B] via-[#141624] to-[#121421] border-b border-white/10 pt-8 pb-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#A0A5B5]">
              <li>
                <Link to="/" className="hover:text-[#EFAE54] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#EFAE54] font-semibold" aria-current="page">
                Boutique & Origines
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-mono font-medium mb-3">
                <Sparkles size={13} />
                <span>Micro-Lots Fraîchement Torréfiés</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Cafés de Spécialité & <span className="text-[#EFAE54]">Terroirs Purs</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#A0A5B5] leading-relaxed font-sans">
                Sélectionnés directement auprès des fermes coopératives d'Éthiopie, de Colombie et du Salvador. 
                Chaque lot est numéroté, traçable et torréfié sur mesure avec mouture personnalisée.
              </p>
            </div>

            {/* Quality Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <ShieldCheck size={18} className="text-[#EFAE54] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">100% Arabica</p>
                  <p className="text-[10px] text-[#A0A5B5]">Score SCA &gt; 85</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Coffee size={18} className="text-[#EFAE54] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">Mouture sur-mesure</p>
                  <p className="text-[10px] text-[#A0A5B5]">Grains, Espresso, Moka, V60</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Truck size={18} className="text-[#EFAE54] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">Livraison Express 24h</p>
                  <p className="text-[10px] text-[#A0A5B5]">Casablanca & Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Main Shop Workspace Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* ── Top Controls Bar: Search, Mobile Filter Toggle & Sort ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A5B5]"
            />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) =>
                updateFiltersAndUrl({ ...filters, searchQuery: e.target.value })
              }
              placeholder="Rechercher par origine, variété, arôme ou lot..."
              aria-label="Rechercher des cafés"
              className="w-full bg-[#161826] text-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/15 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] outline-none transition-all placeholder:text-[#A0A5B5]/60"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A0A5B5] hover:text-white"
              >
                Effacer
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#161826] hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-colors"
              aria-label="Ouvrir les filtres de recherche"
            >
              <SlidersHorizontal size={15} className="text-[#EFAE54]" />
              <span>Filtres</span>
              {totalActiveFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EFAE54] text-[#121421] text-[11px] font-bold flex items-center justify-center">
                  {totalActiveFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-initial min-w-[190px]">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  updateFiltersAndUrl({
                    ...filters,
                    sortBy: e.target.value as CatalogSortOption,
                  })
                }
                aria-label="Trier les cafés"
                className="w-full appearance-none bg-[#161826] text-white text-xs font-medium border border-white/15 hover:border-[#EFAE54]/50 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] rounded-xl px-3.5 py-2.5 pr-8 outline-none cursor-pointer transition-colors"
              >
                <option value="featured" className="bg-[#161826] text-white">
                  Tri : Vedettes & Recommandés
                </option>
                <option value="price-asc" className="bg-[#161826] text-white">
                  Prix : Croissant
                </option>
                <option value="price-desc" className="bg-[#161826] text-white">
                  Prix : Décroissant
                </option>
                <option value="roast-date" className="bg-[#161826] text-white">
                  Fraîcheur : Nouveaux Lots
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#A0A5B5]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Active Filters Bar ── */}
        <div className="mb-6">
          <ActiveFilters
            filters={filters}
            onRemoveRoast={handleRemoveRoast}
            onRemoveProcess={handleRemoveProcess}
            onRemoveFlavor={handleRemoveFlavor}
            onRemoveBrew={handleRemoveBrew}
            onClearSearch={handleClearSearch}
            onClearAll={handleClearAll}
            totalResults={sortedProducts.length}
            totalAvailable={PRODUCTS.length}
          />
        </div>

        {/* ── 3. Main Workspace: Desktop Sidebar + Product Grid ── */}
        <div className="flex items-start gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFiltersAndUrl}
              onClearAll={handleClearAll}
              facetCounts={facetCounts}
              totalResults={sortedProducts.length}
              isOpenMobile={mobileDrawerOpen}
              onCloseMobile={() => setMobileDrawerOpen(false)}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFiltersAndUrl}
              onClearAll={handleClearAll}
              facetCounts={facetCounts}
              totalResults={sortedProducts.length}
              isOpenMobile={mobileDrawerOpen}
              onCloseMobile={() => setMobileDrawerOpen(false)}
            />
          </div>

          {/* Product Grid Area */}
          <main className="flex-1 w-full">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCardInline
                    key={product.id}
                    product={product}
                    onAddToCart={(p, grind) => {
                      if (onAddToCartSpecialty) {
                        onAddToCartSpecialty(p, grind);
                      }
                      if (onOpenCart) {
                        onOpenCart();
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-6 bg-[#161826]/50 rounded-2xl border border-white/10 flex flex-col items-center justify-center max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#EFAE54] mb-4">
                  <Coffee size={30} strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-2">
                  Aucun café ne correspond à ces critères
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A5B5] max-w-sm mb-6 leading-relaxed">
                  Essayez d'élargir votre sélection de torréfaction, de procédé ou de vider la barre de recherche.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-semibold text-xs transition-all shadow-md active:scale-95"
                >
                  <RotateCcw size={13} />
                  <span>Réinitialiser tous les filtres</span>
                </button>
              </div>
            )}
          </main>
        </div>

        {/* ── 4. Wholesale / Persona Concierge Banner ── */}
        <section className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1E2235] via-[#161826] to-[#141624] border border-[#EFAE54]/25 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#EFAE54]/10 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFAE54]/15 text-[#EFAE54] text-[11px] font-mono font-medium mb-2">
                <Building2 size={12} />
                Approvisionnement Professionnel & Partenaires
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                Vous êtes gérant d'un Coffee Shop, Restaurant ou Hôtel ?
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A5B5] mt-2 leading-relaxed">
                Nidal et notre équipe torréfaction fournissent sacs de 5kg en vrac, calibration de moulin et livraison hebdomadaire récurrente avec facturation officielle.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-xs sm:text-sm shadow-lg hover:shadow-[#EFAE54]/25 transition-all duration-200 shrink-0 active:scale-95"
            >
              <span>Demander un devis grossiste</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
