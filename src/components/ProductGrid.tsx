import { useMemo, useState, useCallback } from 'react';
import { ShoppingBag, Check, Sparkles, SlidersHorizontal, ArrowRight, Search, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import type { CategoryFilter, CoffeeProduct, GrindOption } from '../types';

interface ProductGridProps {
  onAddToCart: (product: CoffeeProduct, grind: GrindOption) => void;
  onOpenFinder?: () => void;
}

const FILTERS: { label: string; value: CategoryFilter }[] = [
  { label: 'Tous les Cafés', value: 'all' },
  { label: 'Single Origin', value: 'single-origin' },
  { label: 'Espresso & Lait', value: 'espresso' },
];

const GRINDS: GrindOption[] = ['Moka Pot (Fine)', 'V60 / Filter', 'Espresso Machine' as GrindOption, 'Whole Bean'];

const GRIND_LABELS: Record<string, string> = {
  'Moka Pot (Fine)': 'Moka',
  'V60 / Filter': 'V60',
  'Espresso Machine': 'Espresso',
  'Whole Bean': 'Grains',
  'French Press (Coarse)': 'Piston',
};

export function ProductGrid({ onAddToCart, onOpenFinder }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, GrindOption>>({
    'salvador-san-alberto': 'Moka Pot (Fine)',
    'ethiopia-sidamo-guji': 'V60 / Filter',
    'colombia-huila-supremo': 'Moka Pot (Fine)',
    'atlas-crema-espresso': 'Moka Pot (Fine)',
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleFilter = useCallback((val: CategoryFilter) => setActiveFilter(val), []);

  const handleGrindChange = useCallback((productId: string, grind: GrindOption) => {
    setSelectedGrinds((prev) => ({ ...prev, [productId]: grind }));
  }, []);

  const handleAdd = useCallback(
    (product: CoffeeProduct) => {
      const grind = selectedGrinds[product.id] || 'Moka Pot (Fine)';
      onAddToCart(product, grind);
      setAddedIds((prev) => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [product.id]: false }));
      }, 1600);
    },
    [selectedGrinds, onAddToCart]
  );

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
      const matchesQuery =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="relative bg-[#F9F8F4] text-[#1E1F24] pt-8 pb-16">
      <div className="container-outer">

        {/* ── Two Column Menu Section Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ── Left Column: Barista & Facility Craft Banner (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">

            {/* Banner card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-md flex flex-col gap-5 overflow-hidden relative">

              {/* Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#E89038] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Flame size={14} className="text-[#E89038]" /> Atelier de Torréfaction
                </span>
                <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#2D6A4F]/10 font-bold px-2.5 py-1 rounded-full">
                  Casablanca 2026
                </span>
              </div>

              {/* Headline */}
              <div>
                <h2 className="display-font text-2xl sm:text-3xl font-bold text-[#1E1F24] leading-tight mb-2">
                  <span className="font-serif">ELevate</span> Your Routine with NIDAM
                </h2>
                <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                  Chaque tasse commence par un grain sélectionné à la source, torréfié artisanalement pour révéler des notes florales, fruitées ou chocolatées authentiques.
                </p>
              </div>

              {/* Barista craft image */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group">
                <img
                  src="/images/barista_craft.jpg"
                  alt="Barista NIDAM préparant une extraction artisanale à Casablanca"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="font-serif font-semibold text-sm">Extraction Manuelle V60</p>
                    <p className="text-[11px] font-mono text-zinc-300">Calibration d'eau & ratios précis</p>
                  </div>
                </div>
              </div>

              {/* Roasting Schedule box */}
              <div className="bg-[#F9F8F4] border border-[#EDE8DF] rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E89038]/15 flex items-center justify-center text-[#E89038]">
                    <SlidersHorizontal size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1E1F24]">Mouture Personnalisée</p>
                    <p className="text-[11px] text-zinc-500 font-mono">Calibrée au micron avant envoi</p>
                  </div>
                </div>
                {onOpenFinder && (
                  <button
                    type="button"
                    onClick={onOpenFinder}
                    className="text-xs font-semibold text-[#E89038] hover:text-[#D97706] flex items-center gap-1 font-sans"
                  >
                    Guide <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {/* Starter Pack shortcut */}
              <div className="pt-2 border-t border-[#EDE8DF] flex items-center justify-between text-xs">
                <span className="text-zinc-500">Pas encore d'équipement ?</span>
                <a href="#bundles" className="font-semibold text-[#E89038] hover:underline flex items-center gap-1">
                  Voir les Kits Starter <ArrowRight size={12} />
                </a>
              </div>

            </div>

          </div>

          {/* ── Right Column: Popular Menu & Product List Rows (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Header & Category Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#EDE8DF]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#E89038] font-semibold mb-1">
                  Sélection Fraîche
                </p>
                <h2 id="menu-heading" className="display-font text-3xl sm:text-4xl font-bold text-[#1E1F24] tracking-tight">
                  <span className="font-serif">POpular</span> Menu
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-1.5 bg-[#EDE8DF]/70 p-1 rounded-full self-start sm:self-auto">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => handleFilter(f.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeFilter === f.value
                        ? 'bg-white text-[#1E1F24] shadow-sm'
                        : 'text-zinc-600 hover:text-[#1E1F24]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par origine (Salvador, Éthiopie), notes (Chocolat, Bergamote)..."
                className="input-light pl-10 text-xs sm:text-sm"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-600"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Clean Horizontal Product Rows as specified in blueprint */}
            <div className="flex flex-col gap-4" aria-live="polite">
              {filtered.map((product) => {
                const isAdded = addedIds[product.id];
                const activeGrind = selectedGrinds[product.id] || 'Moka Pot (Fine)';

                return (
                  <article
                    key={product.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE8DF] hover:border-[#E89038]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                  >
                    {/* Left: Small Coffee Bag Thumbnail */}
                    <div
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl shrink-0 flex items-center justify-center p-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${product.color}25, ${product.color}45)` }}
                    >
                      {/* Mini coffee bag graphic */}
                      <div
                        className="w-14 h-20 rounded-lg flex flex-col items-center justify-between p-1.5 shadow-md relative overflow-hidden"
                        style={{ background: `linear-gradient(145deg, ${product.color}, #1A1C23)` }}
                      >
                        <div className="w-full h-1.5 bg-black/30 rounded-t-sm" />
                        <div className="text-center">
                          <span className="font-serif font-bold text-white text-[9px] block">N</span>
                          <span className="font-mono text-[7px] text-white/80 uppercase tracking-tighter">NIDAM</span>
                        </div>
                        <span className="font-mono text-[7px] text-white/70">{product.weightGrams}g</span>
                      </div>

                      {/* Fresh badge */}
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2D6A4F] pulse-ring-green" />
                    </div>

                    {/* Center: Name, Origin & Tasting Notes Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[10px] text-[#E89038] font-semibold uppercase tracking-wider">
                          {product.origin}
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          Torréfié {product.roastDate}
                        </span>
                        {product.badge && (
                          <span className="bg-[#1E1F24] text-white text-[9px] font-mono font-medium px-2 py-0.5 rounded-full uppercase">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="display-font font-bold text-lg text-[#1E1F24] group-hover:text-[#E89038] transition-colors">
                        {product.name}
                      </h3>

                      <p className="font-sans text-xs text-zinc-600 mt-0.5 line-clamp-1">
                        {product.plainProfile}
                      </p>

                      {/* Tasting Notes Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="bg-[#F9F8F4] border border-[#EDE8DF] text-zinc-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* Inline Grind Selector */}
                      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase">Mouture:</span>
                        {GRINDS.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleGrindChange(product.id, g)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                              activeGrind === g
                                ? 'bg-[#1E1F24] text-white font-semibold'
                                : 'bg-[#EDE8DF]/60 text-zinc-600 hover:bg-[#EDE8DF]'
                            }`}
                          >
                            {GRIND_LABELS[g] || g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Price & Minimal Add-to-Cart Action */}
                    <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EDE8DF]">
                      <div>
                        <p className="display-font font-bold text-xl sm:text-2xl text-[#1E1F24]">
                          {product.price} <span className="font-mono text-xs font-normal text-zinc-500">MAD</span>
                        </p>
                        <p className="font-mono text-[10px] text-zinc-400">{product.weightGrams}g</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        disabled={isAdded}
                        className={`mt-2 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E89038] ${
                          isAdded
                            ? 'bg-[#2D6A4F] text-white scale-95'
                            : 'bg-[#E89038] hover:bg-[#F59E0B] text-[#121316] shadow-sm hover:shadow'
                        }`}
                        aria-label={`Ajouter ${product.name} au panier`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} strokeWidth={2.5} />
                            Ajouté !
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} strokeWidth={2} />
                            + Panier
                          </>
                        )}
                      </button>
                    </div>

                  </article>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#EDE8DF]">
                  <p className="font-serif text-lg text-zinc-600 mb-2">Aucun café ne correspond à votre recherche.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="text-xs font-semibold text-[#E89038] underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ── Sweeping Transition from Warm Cream Back to Dark Charcoal (#1A1C23) ── */}
      <div className="relative w-full overflow-hidden leading-none mt-16 sm:mt-24">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-32 block"
          preserveAspectRatio="none"
        >
          {/* Sweeping curve back to Deep Charcoal (#1A1C23) */}
          <path
            d="M0,80 C480,0 960,120 1440,40 L1440,120 L0,120 Z"
            fill="#1A1C23"
          />
        </svg>
      </div>
    </section>
  );
}
