import React, { useState, useCallback, useMemo } from 'react';
import {
  ShoppingBag,
  Check,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Coffee,
  ChevronDown,
} from 'lucide-react';
import type { Bundle, BundleCoffeeOriginOption, CoffeeProduct } from '../../types';
import { useCart } from '../../store/useCart';
import {
  bundleToCartPayload,
  generateBundleWhatsAppUrl,
  WHATSAPP_CONTACT_PHONE,
} from '../../data/bundles';
import { BundleItemSpecs } from './BundleItemSpecs';

export interface BundleCardProps {
  bundle: Bundle;
  onAddToCart?: (bundle: Bundle, customPayload?: CoffeeProduct) => void;
  className?: string;
}

export const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  onAddToCart,
  className = '',
}) => {
  const { addItem } = useCart();
  const [addedFlash, setAddedFlash] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasOriginOptions = Boolean(
    bundle.availableCoffeeOrigins && bundle.availableCoffeeOrigins.length > 0
  );

  const [selectedOrigin, setSelectedOrigin] = useState<BundleCoffeeOriginOption | undefined>(
    bundle.availableCoffeeOrigins && bundle.availableCoffeeOrigins.length > 0
      ? bundle.availableCoffeeOrigins[0]
      : undefined
  );

  // WhatsApp COD Message: dynamically include selected origin if customized
  const whatsappUrl = useMemo(() => {
    return generateBundleWhatsAppUrl(bundle, selectedOrigin);
  }, [bundle, selectedOrigin]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Convert bundle to a clean, isolated CoffeeProduct payload for useCart
      const cartPayload = bundleToCartPayload(bundle, selectedOrigin);

      // Add to global cart store and trigger slide-out CartDrawer
      addItem(cartPayload, 'Whole Bean', true);

      if (onAddToCart) {
        onAddToCart(bundle, cartPayload);
      }

      setAddedFlash(true);
      setTimeout(() => {
        setAddedFlash(false);
      }, 1600);
    },
    [addItem, bundle, onAddToCart, selectedOrigin]
  );

  const fallbackImage = '/images/products/moka-coffee.png';
  const resolvedImage = imageError ? fallbackImage : bundle.image || fallbackImage;

  return (
    <article
      className={`group relative bg-[#161826] hover:bg-[#1A1D2E] border border-white/10 hover:border-[#EFAE54]/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 flex flex-col ${className}`}
      aria-label={`Starter Kit: ${bundle.title}`}
    >
      {/* ── 1. Visual Showcase Header with Ambient Glow ── */}
      <div
        className="relative h-60 sm:h-64 w-full overflow-hidden flex items-center justify-center p-6 transition-colors"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${bundle.color || '#EFAE54'}30 0%, #161826 75%)`,
        }}
      >
        {/* Ambient Glow Effect */}
        <div
          className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none blur-3xl"
          style={{ backgroundColor: bundle.color || '#EFAE54' }}
        />

        {/* Top-Left: Difficulty Level Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#121421]/90 text-white border border-white/15 backdrop-blur-md shadow-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: bundle.color || '#EFAE54' }}
            />
            {bundle.difficulty}
          </span>
        </div>

        {/* Top-Right: Savings Pill Badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-white shadow-lg shadow-emerald-950/40">
            -{bundle.savingsPercent}%
          </span>
        </div>

        {/* Product Visual */}
        <div className="relative w-full h-full flex items-center justify-center z-0">
          <img
            src={resolvedImage}
            alt={`Visuel du pack ${bundle.title}`}
            onError={() => setImageError(true)}
            className="max-h-48 sm:max-h-52 w-auto object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.7)] group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Bottom-Left: Value Proposition Tag */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-white/90 bg-[#121421]/80 border border-white/10 backdrop-blur-md">
            <Truck size={12} className="text-emerald-400" />
            <span>Livraison Gratuite</span>
          </span>
        </div>

        {/* Bottom-Right: Savings Value */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="text-[11px] font-mono font-semibold text-[#EFAE54] bg-[#121421]/80 px-2 py-0.5 rounded-md border border-[#EFAE54]/25">
            Économisez {bundle.savingsAmount} MAD
          </span>
        </div>
      </div>

      {/* ── 2. Bundle Content & Details ── */}
      <div className="p-6 flex flex-col flex-grow gap-5">
        {/* Title & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-[#EFAE54] uppercase tracking-wider font-semibold">
              Coffret Débutant Tout-en-Un
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-[26px] font-bold text-white group-hover:text-[#EFAE54] transition-colors leading-tight">
            {bundle.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#A0A5B5] mt-1.5 leading-relaxed">
            {bundle.description}
          </p>
        </div>

        {/* ── 3. Visual Breakdown: What's Inside the Box ── */}
        <BundleItemSpecs
          bundle={bundle}
          selectedCoffeeName={
            selectedOrigin
              ? `250g ${selectedOrigin.name} (${selectedOrigin.notes})`
              : undefined
          }
        />

        {/* ── 3b. Origin Selector Dropdown for Customizable Kits (The Pour-Over Kit) ── */}
        {hasOriginOptions && bundle.availableCoffeeOrigins && (
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-[#EFAE54]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`origin-select-${bundle.id}`}
                className="text-xs font-mono text-[#EFAE54] uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <Coffee size={13} />
                <span>Café Inclus au Choix (250g) :</span>
              </label>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Personnalisable
              </span>
            </div>

            <div className="relative">
              <select
                id={`origin-select-${bundle.id}`}
                value={selectedOrigin?.id}
                onChange={(e) => {
                  const found = bundle.availableCoffeeOrigins?.find(
                    (opt) => opt.id === e.target.value
                  );
                  if (found) setSelectedOrigin(found);
                }}
                className="w-full appearance-none py-2.5 pl-3 pr-9 rounded-xl bg-[#121421] border border-white/20 hover:border-[#EFAE54] text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-[#EFAE54] transition-colors cursor-pointer"
              >
                {bundle.availableCoffeeOrigins.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[#161826] text-white py-1">
                    {opt.name} — {opt.notes} ({opt.roastProfile})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#EFAE54]">
                <ChevronDown size={14} />
              </div>
            </div>

            {selectedOrigin && (
              <div className="text-[11px] text-[#A0A5B5] flex items-center justify-between pt-0.5 px-0.5">
                <span className="truncate">Terroir: {selectedOrigin.origin}</span>
                <span className="text-[#EFAE54] font-medium shrink-0">Profil: {selectedOrigin.roastProfile}</span>
              </div>
            )}
          </div>
        )}

        {/* ── 4. Price & Action Area ── */}
        <div className="mt-auto pt-5 border-t border-white/10 flex flex-col gap-3.5">
          {/* Price Row with Original Strikethrough & Savings Pill */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#A0A5B5] uppercase block">
                Prix Pack Complet
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display font-extrabold text-3xl text-white">
                  {bundle.price}
                </span>
                <span className="font-mono text-sm font-bold text-[#EFAE54]">MAD</span>
                <span className="text-xs font-mono text-[#A0A5B5] line-through ml-1">
                  {bundle.originalPrice} MAD
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Économie de {bundle.savingsAmount} MAD
              </span>
            </div>
          </div>

          {/* Dual CTAs: Primary [Acheter le Pack Complet] + Secondary [Commander via WhatsApp (COD)] */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Primary CTA 1: Add to Cart (Auto-opens CartDrawer) */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addedFlash}
              aria-label={`Acheter le pack complet ${bundle.title} à ${bundle.price} MAD`}
              className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl focus:outline-none ${
                addedFlash
                  ? 'bg-emerald-600 text-white scale-[0.99] shadow-emerald-950/40'
                  : 'bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] shadow-lg shadow-[#EFAE54]/20 hover:shadow-[#EFAE54]/35 active:scale-[0.98]'
              }`}
            >
              {addedFlash ? (
                <>
                  <Check size={18} className="stroke-[2.5]" />
                  <span>Pack Ajouté au Panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Acheter le Pack Complet — {bundle.price} MAD</span>
                </>
              )}
            </button>

            {/* Secondary CTA 2: WhatsApp COD Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Commander ${bundle.title} via WhatsApp en Cash à la livraison`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
            >
              <MessageCircle size={15} className="text-emerald-400" />
              <span>Commander via WhatsApp (Paiement à la livraison)</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BundleCard;
