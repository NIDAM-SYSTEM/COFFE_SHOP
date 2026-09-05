import { useState, useCallback } from 'react';
import { ArrowRight, Sparkles, Check, Flame, Award, Clock } from 'lucide-react';
import type { CoffeeProduct, GrindOption } from '../types';

interface HeroSectionProps {
  featuredProduct: CoffeeProduct;
  onFinderOpen: () => void;
  onAddToCart: (product: CoffeeProduct, grind: GrindOption) => void;
}

export function HeroSection({ featuredProduct, onFinderOpen, onAddToCart }: HeroSectionProps) {
  const [quickAdded, setQuickAdded] = useState(false);

  const handleQuickAdd = useCallback(() => {
    onAddToCart(featuredProduct, 'Moka Pot (Fine)');
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1800);
  }, [featuredProduct, onAddToCart]);

  return (
    <div className="relative bg-[#1A1C23] text-white overflow-hidden pt-8 lg:pt-14">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E89038]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#8B1E28]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-outer relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pb-20 lg:pb-32">

          {/* ── Left Column: Massive Headline & CTAs (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">

            {/* Pre-badge chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E89038] pulse-ring-amber" aria-hidden="true" />
              <span className="font-mono text-xs text-[#E89038] tracking-wider uppercase font-semibold">
                Torréfaction Artisanale · Casablanca
              </span>
            </div>

            {/* Stylized mixed-case Hero Headline */}
            <h1
              id="hero-headline"
              className="display-font text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight text-balance"
            >
              <span className="tracking-normal font-semibold">ENjoy</span> Your{' '}
              <span className="text-[#E89038] italic font-serif">FReshly</span>{' '}
              Roasted Coffee
            </h1>

            {/* Subheadline with loose tracking on dark */}
            <p className="font-sans text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-lg tracking-wide">
              Boost your productivity and build your mood with a glass of NIDAM coffee in the morning.
              Estampillé avec la date de torréfaction exacte, calibré au micron pour votre équipement.
            </p>

            {/* Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Primary Golden Amber Pill CTA with circular trailing arrow icon */}
              <a
                href="#menu"
                className="btn-pill-amber group"
                aria-label="Get your now — Découvrir le café frais"
              >
                <span>Get your now</span>
                <span className="btn-arrow-circle" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </span>
              </a>

              {/* Secondary Pill CTA */}
              <button
                type="button"
                onClick={onFinderOpen}
                className="btn-pill-secondary"
                aria-label="Lancer l'assistant de dégustation en 30 secondes"
              >
                <Sparkles size={16} strokeWidth={2} className="text-[#E89038]" />
                <span>Taste Assistant</span>
              </button>
            </div>

            {/* Minor Trust Tagline */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#A1A1AA] pt-2 border-t border-white/10 w-full max-w-md">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Check size={14} className="text-[#E89038]" /> Paiement à la livraison
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Check size={14} className="text-[#E89038]" /> Partout au Maroc 48h
              </span>
            </div>
          </div>

          {/* ── Center / Overlap: Giant Floating NIDAM Coffee Bag (4 cols) ── */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center my-6 lg:my-0">
            {/* Grid-breaking wrapper with high z-index and bottom overlap */}
            <div className="relative z-20 flex flex-col items-center">

              {/* Interactive Coffee Bag Container with realistic image */}
              <div className="relative bag-hero-float max-w-[320px] sm:max-w-[360px] group">

                {/* Floating Top Badge */}
                <div className="absolute -top-4 -left-4 z-30 bg-[#1A1C23]/90 border border-white/15 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-dark-card flex items-center gap-2">
                  <Flame size={15} className="text-[#E89038]" />
                  <div>
                    <p className="text-[10px] font-mono text-[#E89038] uppercase tracking-wider font-semibold">
                      Lot Frais Hebdo
                    </p>
                    <p className="text-xs font-semibold text-white">Torréfié Lundi & Jeudi</p>
                  </div>
                </div>

                {/* Main high-res coffee bag visual */}
                <div className="relative rounded-3xl overflow-hidden shadow-floating-bag border border-white/15 bg-gradient-to-b from-[#2A2D34] to-[#1A1C23] p-1.5">
                  <img
                    src="/images/nidam_coffee_bag.jpg"
                    alt="Sachet de café NIDAM Roastery - Salvador San Alberto Single Estate"
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    width="360"
                    height="360"
                  />
                  {/* Subtle inner gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl" />

                  {/* On-bag quick badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs bg-black/60 backdrop-blur-md border border-white/15 px-3 py-2 rounded-xl">
                    <div>
                      <p className="font-serif font-bold text-white leading-tight">Salvador San Alberto</p>
                      <p className="text-[10px] font-mono text-[#E89038]">1,600 MASL · Washed</p>
                    </div>
                    <span className="text-xs font-serif font-bold text-white bg-[#E89038] text-[#121316] px-2 py-0.5 rounded-full">
                      95 MAD
                    </span>
                  </div>
                </div>

                {/* Reflective shadow saucer base */}
                <div
                  className="w-4/5 h-6 mx-auto bg-[#E89038]/20 rounded-[100%] blur-md -mt-3 relative z-10"
                  aria-hidden="true"
                />

                {/* Floating Bottom-Right Origin Chip */}
                <div className="absolute -bottom-3 -right-3 z-30 bg-[#2A2D34]/95 border border-[#E89038]/40 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <Award size={13} className="text-[#E89038]" />
                  <span className="text-[11px] font-mono font-medium text-white">100% Arabica Spécialité</span>
                </div>
              </div>

              {/* Instant Add-to-Cart Trigger under Bag */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  disabled={quickAdded}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                    quickAdded
                      ? 'bg-[#2D6A4F] text-white'
                      : 'bg-white/10 hover:bg-[#E89038] hover:text-[#121316] text-white border border-white/15'
                  }`}
                  aria-label="Ajout rapide du best-seller au panier"
                >
                  {quickAdded ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <span>+ Commander ce lot (95 MAD)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ── Right Column: Floating Vertical Statistics (3 cols) ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex flex-col gap-3">

              {/* Stat 1: 48h+ */}
              <div className="card-dark p-5 group hover:border-[#E89038]/50">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="display-font text-3xl sm:text-4xl font-extrabold text-[#E89038] tracking-tight group-hover:scale-105 transition-transform inline-block">
                    48h+
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#2D6A4F] pulse-ring-green" aria-hidden="true" />
                </div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Express Delivery
                </h2>
                <p className="font-sans text-xs text-[#A1A1AA] mt-1 leading-snug">
                  Livraison porte-à-porte dans toutes les villes marocaines. Paiement à la réception.
                </p>
              </div>

              {/* Stat 2: 100% */}
              <div className="card-dark p-5 group hover:border-[#E89038]/50">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="display-font text-3xl sm:text-4xl font-extrabold text-[#E89038] tracking-tight group-hover:scale-105 transition-transform inline-block">
                    100%
                  </span>
                  <span className="font-mono text-[10px] text-[#E89038] border border-[#E89038]/30 px-1.5 py-0.5 rounded">
                    PRO BURR
                  </span>
                </div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Micron Calibrated
                </h2>
                <p className="font-sans text-xs text-[#A1A1AA] mt-1 leading-snug">
                  Mouture calibrée au micron selon votre extraction : Moka Pot, V60 ou Espresso.
                </p>
              </div>

              {/* Stat 3: Lundi */}
              <div className="card-dark p-5 group hover:border-[#E89038]/50">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="display-font text-3xl sm:text-4xl font-extrabold text-[#E89038] tracking-tight group-hover:scale-105 transition-transform inline-block">
                    Lundi
                  </span>
                  <Clock size={16} className="text-[#E89038]" />
                </div>
                <h2 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                  Weekly Roasts
                </h2>
                <p className="font-sans text-xs text-[#A1A1AA] mt-1 leading-snug">
                  Torréfié chaque semaine à Casablanca. Jamais de grains vieux de plusieurs mois.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Sweeping SVG Elliptical Curve Divider (Hero to Process Section) ── */}
      <div className="relative w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-32 block preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Sweeping Soft Slate curve wrapping under Hero */}
          <path
            d="M0,0 C320,110 1120,110 1440,0 L1440,120 L0,120 Z"
            fill="#2A2D34"
          />
        </svg>
      </div>
    </div>
  );
}
