import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Check,
  Mountain,
  Droplets,
  Sparkles,
  Flame,
  ChevronDown,
  Layers,
  Coffee,
} from 'lucide-react';
import type { CoffeeProduct, GrindOption } from '../../types';
import { useCart } from '../../store/useCart';

export interface ProductCardInlineProps {
  product: CoffeeProduct;
  onAddToCart?: (product: CoffeeProduct, grind: GrindOption) => void;
  className?: string;
}

const PRODUCT_IMAGE_FALLBACKS: Record<string, string> = {
  'salvador-san-alberto': '/images/products/salvador-coffee.png',
  'ethiopia-sidamo-guji': '/images/products/ethiopian-coffee.png',
  'colombia-huila-supremo': '/images/products/colombian-coffee.png',
  'atlas-crema-espresso': '/images/products/moka-coffee.png',
  'guatemala-antigua-geisha': '/images/products/special-coffee.png',
  'costa-rica-tarrazu-honey': '/images/products/arabian-coffee.png',
  'kenya-nyeri-aa': '/images/products/ethiopian-coffee.png',
  'sumatra-mandheling-reserve': '/images/products/colombian-coffee.png',
};

const DEFAULT_GRIND_OPTIONS: GrindOption[] = [
  'Whole Bean',
  'Espresso',
  'Moka Pot (Fine)',
  'V60 / Filter',
  'French Press (Coarse)',
];

const GRIND_DISPLAY_NAMES: Record<GrindOption, string> = {
  'Whole Bean': 'Whole Bean (Grains)',
  'Espresso': 'Espresso (Fin)',
  'Moka Pot (Fine)': 'Moka Pot / Italienne',
  'V60 / Filter': 'V60 / Filtre Pour-Over',
  'French Press (Coarse)': 'French Press (Piston)',
};

const ROAST_STYLE_MAP: Record<string, { bg: string; text: string; border: string }> = {
  'Light': {
    bg: 'bg-amber-400/10',
    text: 'text-amber-300',
    border: 'border-amber-400/30',
  },
  'Medium': {
    bg: 'bg-orange-500/10',
    text: 'text-orange-300',
    border: 'border-orange-500/30',
  },
  'Medium-Dark': {
    bg: 'bg-amber-700/20',
    text: 'text-amber-200',
    border: 'border-amber-700/40',
  },
  'Medium-Light': {
    bg: 'bg-yellow-400/10',
    text: 'text-yellow-300',
    border: 'border-yellow-400/30',
  },
};

const FLAVOR_CATEGORY_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  'Chocolate & Nutty': {
    bg: 'bg-[#6B3A2A]/20',
    text: 'text-amber-200',
    border: 'border-[#6B3A2A]/40',
  },
  'Fruity & Floral': {
    bg: 'bg-[#A82B35]/20',
    text: 'text-rose-200',
    border: 'border-[#A82B35]/40',
  },
  'Sweet Caramel': {
    bg: 'bg-[#EFAE54]/20',
    text: 'text-amber-300',
    border: 'border-[#EFAE54]/40',
  },
};

export const ProductCardInline: React.FC<ProductCardInlineProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const { addItem } = useCart();

  const availableGrinds: GrindOption[] =
    product.availableGrinds && product.availableGrinds.length > 0
      ? product.availableGrinds
      : DEFAULT_GRIND_OPTIONS;

  const defaultGrind = availableGrinds.includes('Moka Pot (Fine)')
    ? 'Moka Pot (Fine)'
    : availableGrinds[0];

  const [selectedGrind, setSelectedGrind] = useState<GrindOption>(defaultGrind);
  const [addedFlash, setAddedFlash] = useState(false);
  const [imageError, setImageError] = useState(false);

  const roastStyle =
    ROAST_STYLE_MAP[product.roastProfile] ||
    ROAST_STYLE_MAP[product.roastLevel] || {
      bg: 'bg-white/10',
      text: 'text-white/80',
      border: 'border-white/20',
    };

  const flavorCategoryStyle =
    FLAVOR_CATEGORY_STYLE[product.flavorCategory] || {
      bg: 'bg-[#EFAE54]/15',
      text: 'text-amber-300',
      border: 'border-[#EFAE54]/30',
    };

  const resolvedImageSrc =
    !imageError &&
    (PRODUCT_IMAGE_FALLBACKS[product.id] || product.image || '/images/nidam_coffee_bag.jpg');

  const handleAddToCart = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      // 1. Directly wire to existing useCart hook (auto-opens drawer)
      addItem(product, selectedGrind, true);

      // 2. Notify optional parent callback (e.g. for opening cart drawer or analytics)
      if (onAddToCart) {
        onAddToCart(product, selectedGrind);
      }

      // 3. Trigger feedback flash
      setAddedFlash(true);
      setTimeout(() => {
        setAddedFlash(false);
      }, 1600);
    },
    [addItem, product, selectedGrind, onAddToCart]
  );

  const selectId = `grind-select-${product.id}`;

  return (
    <article
      className={`group relative bg-[#161826] hover:bg-[#1A1D2E] border border-white/10 hover:border-[#EFAE54]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 flex flex-col ${className}`}
      aria-label={`Café de spécialité: ${product.name}`}
    >
      {/* ── 1. Thumbnail & Badges Container ── */}
      <Link
        to={`/shop/${product.slug || product.id}`}
        aria-label={`Découvrir ${product.name}`}
        className="relative h-56 sm:h-60 w-full overflow-hidden flex items-center justify-center p-4 transition-colors block cursor-pointer"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${product.color}35 0%, #161826 80%)`,
        }}
      >
        {/* Ambient glow effect */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none blur-2xl"
          style={{ backgroundColor: product.color }}
        />

        {/* Top-Left: Roast Profile Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border backdrop-blur-md shadow-sm ${roastStyle.bg} ${roastStyle.text} ${roastStyle.border}`}
          >
            <Flame size={12} className="shrink-0" />
            {product.roastProfile}
          </span>
        </div>

        {/* Top-Right: Marketing Badge / Stock */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-[#EFAE54] text-[#121421] shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Bag Visual / Render */}
        {resolvedImageSrc ? (
          <div className="relative w-full h-full flex items-center justify-center z-0">
            <img
              src={resolvedImageSrc}
              alt={`Sachet ${product.name}`}
              onError={() => setImageError(true)}
              className="max-h-44 sm:max-h-48 w-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ) : (
          /* Styled Bag Artwork Fallback */
          <div
            className="w-28 h-40 rounded-xl flex flex-col items-center justify-between p-3.5 shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-white/10"
            style={{
              background: `linear-gradient(150deg, ${product.color}ee, #1A1D2D)`,
            }}
          >
            <div className="w-full h-2.5 bg-black/30 rounded-t-sm -mt-3.5" aria-hidden="true" />
            <div className="flex flex-col items-center gap-1.5 text-center my-auto">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-inner">
                <Coffee size={18} className="text-[#EFAE54]" />
              </div>
              <p className="font-display font-bold text-white text-[11px] leading-tight text-center mt-1">
                {product.name}
              </p>
              <p className="font-mono text-[9px] text-[#EFAE54] font-medium tracking-wider uppercase">
                {product.origin}
              </p>
            </div>
            <p className="font-mono text-[9px] text-white/70">{product.weightGrams}g</p>
          </div>
        )}

        {/* Bottom-Left: Country of Origin Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-[#121421]/80 text-white border border-white/15 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFAE54]" aria-hidden="true" />
            {product.origin}
          </span>
        </div>

        {/* Bottom-Right: Net Weight Tag */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#A0A5B5] bg-[#121421]/70 border border-white/10 backdrop-blur-sm">
            {product.weightGrams}g
          </span>
        </div>
      </Link>

      {/* ── 2. Content & Anatomy Details ── */}
      <div className="p-5 flex flex-col flex-grow gap-4">
        {/* Lot Code & Freshness Line */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold text-[#EFAE54] bg-[#EFAE54]/10 border border-[#EFAE54]/25">
            <Layers size={11} className="text-[#EFAE54]" />
            {product.lotCode}
          </span>
          <span className="text-[11px] text-[#A0A5B5] font-mono">
            Torréfié {product.roastDay || product.roastDate}
          </span>
        </div>

        {/* Title & SubName */}
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white transition-colors leading-snug">
            <Link
              to={`/shop/${product.slug || product.id}`}
              className="hover:text-[#EFAE54] transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#A0A5B5] font-sans mt-0.5 line-clamp-1">
            {product.subName}
          </p>
        </div>

        {/* Terroir Specifications (Altitude & Processing) */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#A0A5B5] pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Mountain size={13} className="text-[#EFAE54] shrink-0" />
            <span className="font-mono text-[11px]">{product.altitude}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Droplets size={13} className="text-sky-400 shrink-0" />
            <span className="text-[11px]">{product.processingMethod || product.process}</span>
          </div>
        </div>

        {/* Sensory Tags & Tasting Notes */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${flavorCategoryStyle.bg} ${flavorCategoryStyle.text} ${flavorCategoryStyle.border}`}
            >
              <Sparkles size={11} className="shrink-0" />
              {product.flavorCategory}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.flavorTags && product.flavorTags.length > 0
              ? product.flavorTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[11px] font-sans text-white/90 bg-white/[0.06] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))
              : product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-2 py-0.5 rounded-md text-[11px] font-sans text-white/90 bg-white/[0.06] border border-white/10"
                  >
                    {note}
                  </span>
                ))}
          </div>
        </div>

        {/* Plain Profile Quick Tasting Helper */}
        {product.plainProfile && (
          <p className="text-xs text-[#A0A5B5] leading-relaxed bg-[#121421]/60 p-2.5 rounded-xl border border-white/5 italic">
            "{product.plainProfile}"
          </p>
        )}

        {/* ── 3. Inline Grind Selector & Cart Trigger (Bottom Row) ── */}
        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
          {/* Price & Weight */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-white">
                {product.price}
              </span>
              <span className="font-mono text-xs text-[#EFAE54] font-semibold">MAD</span>
            </div>
            <span className="text-xs text-[#A0A5B5] font-mono">
              / sachet {product.weightGrams}g
            </span>
          </div>

          {/* Inline Grind Dropdown Selector */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={selectId}
              className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Coffee size={12} className="text-[#EFAE54]" />
                Mouture Sélectionnée
              </span>
              <span className="text-[10px] text-white/60 lowercase font-normal">
                {selectedGrind === 'Whole Bean' ? 'non moulu' : 'prémoulu'}
              </span>
            </label>

            <div className="relative">
              <select
                id={selectId}
                value={selectedGrind}
                onChange={(e) => setSelectedGrind(e.target.value as GrindOption)}
                aria-label={`Choisir la mouture pour ${product.name}`}
                className="w-full appearance-none bg-[#121421] text-white text-xs font-medium border border-white/15 hover:border-[#EFAE54]/50 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] rounded-xl px-3 py-2.5 pr-9 outline-none cursor-pointer transition-colors"
              >
                {availableGrinds.map((grind) => (
                  <option
                    key={grind}
                    value={grind}
                    className="bg-[#161826] text-white py-1"
                  >
                    {GRIND_DISPLAY_NAMES[grind] || grind}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#A0A5B5]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* "+ Add to Cart" Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addedFlash}
            aria-label={`Ajouter ${product.name} au panier avec mouture ${selectedGrind}`}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              addedFlash
                ? 'bg-emerald-600 text-white shadow-emerald-900/30 scale-[0.99]'
                : 'bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] hover:shadow-[#EFAE54]/25 active:scale-[0.98]'
            }`}
          >
            {addedFlash ? (
              <>
                <Check size={16} className="stroke-[2.5]" />
                <span>Ajouté au panier !</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} className="stroke-[2]" />
                <span>+ Ajouter au Panier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCardInline;
