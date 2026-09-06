import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Check,
  Flame,
  Mountain,
  Droplets,
  Sparkles,
  ShieldCheck,
  Truck,
  Banknote,
  Coffee,
  MessageCircle,
  Plus,
  Minus,
  Layers,
  Award,
} from 'lucide-react';
import type { CoffeeProduct, GrindOption } from '../../types';
import { useCart } from '../../store/useCart';
import { getRoastScheduleStatus } from '../../utils/roastSchedule';

export interface ProductHeroSectionProps {
  product: CoffeeProduct;
  onAddToCart?: (
    product: CoffeeProduct,
    size: '250g' | '1kg',
    grind: GrindOption,
    quantity: number
  ) => void;
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

const DEFAULT_GRINDS: GrindOption[] = [
  'Whole Bean',
  'Espresso',
  'Moka Pot (Fine)',
  'V60 / Filter',
  'French Press (Coarse)',
];

const GRIND_LABELS: Record<GrindOption, { label: string; sub: string }> = {
  'Whole Bean': { label: 'Whole Bean', sub: 'Grains entiers' },
  'Espresso': { label: 'Espresso', sub: 'Mouture très fine' },
  'Moka Pot (Fine)': { label: 'Moka Pot', sub: 'Cafetière italienne' },
  'V60 / Filter': { label: 'V60 / Filtre', sub: 'Pour-over & filtre' },
  'French Press (Coarse)': { label: 'French Press', sub: 'Piston gros grains' },
};

const WHATSAPP_CONTACT_PHONE = '212600000000';

/**
 * Bulk 1kg Pricing Constants:
 * - 1kg bulk equals 4 standard 250g bags.
 * - BULK_DISCOUNT_FACTOR represents the bulk discount multiplier applied across 4 bags (~11% bulk savings, consistent with PROJECT_MAP.md).
 * - BULK_PRICE_MULTIPLIER = 4 * BULK_DISCOUNT_FACTOR (~3.58x single 250g bag price).
 */
export const BULK_BAGS_EQUIVALENT = 4;
export const BULK_DISCOUNT_FACTOR = 0.8947; // ~11% bulk savings multiplier (340/380)
export const BULK_PRICE_MULTIPLIER = 3.58;

export const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<'250g' | '1kg'>('250g');
  const availableGrinds =
    product.availableGrinds && product.availableGrinds.length > 0
      ? product.availableGrinds
      : DEFAULT_GRINDS;

  const [selectedGrind, setSelectedGrind] = useState<GrindOption>(
    availableGrinds.includes('Moka Pot (Fine)') ? 'Moka Pot (Fine)' : availableGrinds[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Shared real-time roast schedule status for freshness badge
  const roastSchedule = useMemo(() => getRoastScheduleStatus(), []);

  // 1kg Bulk Unit Price (calculated via discount multiplier or curated catalog price)
  const unitPrice1kg = useMemo(() => {
    return (
      product.price1kg ||
      Math.round(product.price * BULK_BAGS_EQUIVALENT * BULK_DISCOUNT_FACTOR)
    );
  }, [product.price, product.price1kg]);

  // Dynamic Price Calculation with Discount Multiplier
  const unitPrice = useMemo(() => {
    if (selectedSize === '1kg') {
      return unitPrice1kg;
    }
    return product.price;
  }, [selectedSize, product.price, unitPrice1kg]);

  const totalPrice = unitPrice * quantity;

  // Regular price for 4 separate 250g bags
  const regular4BagsPrice = useMemo(
    () => product.price * BULK_BAGS_EQUIVALENT,
    [product.price]
  );

  // Savings calculation for 1kg bulk
  const savingsFor1kg = useMemo(() => {
    return Math.max(0, regular4BagsPrice - unitPrice1kg);
  }, [regular4BagsPrice, unitPrice1kg]);

  // Discount percentage for 1kg bulk
  const discountPercent1kg = useMemo(() => {
    if (regular4BagsPrice <= 0 || savingsFor1kg <= 0) return 0;
    return Math.round((savingsFor1kg / regular4BagsPrice) * 100);
  }, [regular4BagsPrice, savingsFor1kg]);

  // WhatsApp COD URL with requested template
  const whatsappUrl = useMemo(() => {
    const message = `Salam, je souhaite commander ${product.name} - Taille: ${selectedSize} - Mouture: ${selectedGrind} - Prix: ${totalPrice} MAD en Cash à la livraison.`;
    return `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
  }, [product.name, selectedSize, selectedGrind, totalPrice]);

  const handleIncrement = () => setQuantity((q) => Math.min(20, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const isBulk1kg = selectedSize === '1kg';

      // Create product payload with active size & price, isolating 1kg with a unique ID
      // to prevent overwriting or price corruption with 250g catalog items in cart state
      const productPayload: CoffeeProduct = {
        ...product,
        id: isBulk1kg ? `${product.id}-1kg` : product.id,
        name: isBulk1kg ? `${product.name} (1kg Bulk)` : product.name,
        price: unitPrice,
        weightGrams: isBulk1kg ? 1000 : 250,
      };

      // Add each quantity unit to cart and auto-open CartDrawer
      for (let i = 0; i < quantity; i++) {
        addItem(productPayload, selectedGrind, i === quantity - 1);
      }

      if (onAddToCart) {
        onAddToCart(productPayload, selectedSize, selectedGrind, quantity);
      }

      setAddedFlash(true);
      setTimeout(() => {
        setAddedFlash(false);
      }, 1600);
    },
    [addItem, product, selectedSize, selectedGrind, unitPrice, quantity, onAddToCart]
  );

  const resolvedImageSrc =
    !imageError &&
    (PRODUCT_IMAGE_FALLBACKS[product.id] || product.image || '/images/nidam_coffee_bag.jpg');

  return (
    <section
      className={`relative w-full overflow-hidden rounded-3xl bg-[#161826]/95 border border-white/10 shadow-2xl backdrop-blur-md p-6 sm:p-8 lg:p-10 ${className}`}
      aria-label={`Fiche produit: ${product.name}`}
    >
      {/* Background ambient radial glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: product.color }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: '#EFAE54' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── LEFT COLUMN: Image Showcase & Quality Anchors ── */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-white/10 shadow-inner group transition-all"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${product.color}30 0%, #121421 85%)`,
            }}
          >
            {/* Dynamic Roastery Freshness & Next Batch Badge */}
            <Link
              to="/roastery-freshness"
              title="Consulter le calendrier d'atelier & engagements de fraîcheur"
              className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121421]/90 hover:bg-[#121421] border border-emerald-500/40 hover:border-[#EFAE54]/60 text-emerald-400 hover:text-white text-[11px] sm:text-xs font-mono font-semibold backdrop-blur-md shadow-lg transition-all group/badge"
              id="pdp-freshness-batch-badge"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>{roastSchedule.pdpBadgeSnippet}</span>
              <span className="text-[#EFAE54] opacity-75 group-hover/badge:opacity-100 group-hover/badge:translate-x-0.5 transition-all text-[11px] ml-0.5 font-bold hidden sm:inline">
                →
              </span>
            </Link>

            {/* SCA Score Badge */}
            {product.scaScore && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/40 text-[#EFAE54] text-xs font-mono font-bold shadow-md backdrop-blur-md">
                <Award size={13} />
                <span>SCA {product.scaScore}</span>
              </div>
            )}

            {/* Bag Image or Visual Fallback */}
            {resolvedImageSrc ? (
              <img
                src={resolvedImageSrc}
                alt={`Sachet ${product.name}`}
                onError={() => setImageError(true)}
                className="max-h-72 sm:max-h-80 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="w-40 h-56 rounded-2xl flex flex-col items-center justify-between p-4 shadow-2xl relative overflow-hidden border border-white/15"
                style={{
                  background: `linear-gradient(145deg, ${product.color}ee, #1A1D2D)`,
                }}
              >
                <div className="w-full h-3 bg-black/40 rounded-t-sm -mt-4" />
                <div className="flex flex-col items-center gap-2 text-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center border border-white/30 backdrop-blur-md">
                    <Coffee size={24} className="text-[#EFAE54]" />
                  </div>
                  <p className="font-display font-bold text-white text-sm leading-tight text-center">
                    {product.name}
                  </p>
                  <p className="font-mono text-[10px] text-[#EFAE54] font-medium tracking-wider uppercase">
                    {product.origin}
                  </p>
                </div>
                <p className="font-mono text-xs text-white/70">{selectedSize}</p>
              </div>
            )}

            {/* Bottom Badges */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#121421]/90 text-white border border-white/15 backdrop-blur-md">
                {product.origin}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#EFAE54] bg-[#EFAE54]/10 border border-[#EFAE54]/30 backdrop-blur-md">
                {product.lotCode}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-20">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#A0A5B5] bg-[#121421]/80 border border-white/10 backdrop-blur-md">
                {product.altitude}
              </span>
            </div>
          </div>

          {/* Quick Quality Guarantees Bar */}
          <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-[#A0A5B5]">
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
              <Flame size={14} className="text-[#EFAE54]" />
              <span>{product.roastProfile}</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
              <Droplets size={14} className="text-sky-400" />
              <span>{product.processingMethod}</span>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
              <Mountain size={14} className="text-emerald-400" />
              <span>{product.altitude}</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Linear Purchase Engine ── */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Header Title & Subtitle */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFAE54]/15 text-[#EFAE54] border border-[#EFAE54]/30 flex items-center gap-1">
                <Sparkles size={11} />
                {product.flavorCategory}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15 uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm sm:text-base text-[#A0A5B5] font-sans mt-1">
              {product.subName} • {product.origin}
            </p>
          </div>

          {/* Sensory Pill / Highlight Banner */}
          <div className="p-3.5 rounded-xl bg-[#121421]/90 border border-white/10 flex flex-col gap-1.5 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#EFAE54]">
              Profil Sensoriel & Dégustation
            </span>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              "{product.sensoryNotes || product.plainProfile}"
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {product.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-white/[0.06] text-white/90 border border-white/10"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Variant Selector 1: Bag Size Toggle (250g vs 1kg) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#A0A5B5] flex items-center justify-between">
              <span>Format & Conditionnement</span>
              {selectedSize === '1kg' && savingsFor1kg > 0 && (
                <span className="text-emerald-400 font-bold lowercase">
                  économisez {savingsFor1kg} MAD
                </span>
              )}
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* 250g Option */}
              <button
                type="button"
                onClick={() => setSelectedSize('250g')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                  selectedSize === '250g'
                    ? 'bg-[#EFAE54]/15 border-[#EFAE54] shadow-md shadow-[#EFAE54]/10 ring-1 ring-[#EFAE54]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-white">
                    250g
                  </span>
                  <span className="text-xs font-mono text-[#A0A5B5]">
                    {product.price} MAD
                  </span>
                </div>
                <p className="text-[11px] text-[#A0A5B5] mt-1">
                  Format standard (~15 à 18 tasses)
                </p>
              </button>

              {/* 1kg Bulk Option */}
              <button
                type="button"
                onClick={() => setSelectedSize('1kg')}
                className={`relative p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                  selectedSize === '1kg'
                    ? 'bg-[#EFAE54]/15 border-[#EFAE54] shadow-md shadow-[#EFAE54]/10 ring-1 ring-[#EFAE54]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white'
                }`}
              >
                {savingsFor1kg > 0 && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-white shadow-sm">
                    Pack Éco -{discountPercent1kg}%
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-white">
                    1kg Bulk
                  </span>
                  <span className="text-xs font-mono text-[#EFAE54] font-bold">
                    {unitPrice1kg} MAD
                  </span>
                </div>
                <p className="text-[11px] text-[#A0A5B5] mt-1">
                  Format Pro / Passionnés (~60 tasses)
                </p>
              </button>
            </div>
          </div>

          {/* Variant Selector 2: Grind Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#A0A5B5] flex items-center justify-between">
              <span>Mouture Calibrée à la Commande</span>
              <span className="text-[#EFAE54] font-semibold text-[11px]">
                {GRIND_LABELS[selectedGrind]?.label}
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableGrinds.map((grind) => {
                const isSelected = selectedGrind === grind;
                const info = GRIND_LABELS[grind] || { label: grind, sub: '' };
                return (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setSelectedGrind(grind)}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all duration-200 flex flex-col ${
                      isSelected
                        ? 'bg-[#EFAE54] text-[#121421] border-[#EFAE54] font-semibold shadow-md shadow-[#EFAE54]/20 scale-[1.02]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white/90'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">
                      {info.label}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isSelected ? 'text-[#121421]/80' : 'text-[#A0A5B5]'
                      }`}
                    >
                      {info.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Quantity Row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div>
              <p className="text-[11px] font-mono text-[#A0A5B5] uppercase">
                Prix Total ({selectedSize})
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  {totalPrice}
                </span>
                <span className="font-mono text-sm font-bold text-[#EFAE54]">MAD</span>
                {quantity > 1 && (
                  <span className="text-xs text-[#A0A5B5] font-mono">
                    ({unitPrice} MAD × {quantity})
                  </span>
                )}
              </div>
              {selectedSize === '1kg' && savingsFor1kg > 0 && (
                <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                  Économisez {savingsFor1kg * quantity} MAD (-{discountPercent1kg}%) vs 4 sachets 250g
                </p>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#121421] border border-white/15 rounded-xl p-1.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Diminuer la quantité"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-mono font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Augmenter la quantité"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* ── Dual Conversion CTAs ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Primary CTA 1: Add to Cart (wired to useCart) */}
            <button
              type="button"
              onClick={handleAddToCartClick}
              disabled={addedFlash}
              aria-label={`Ajouter ${quantity} ${product.name} (${selectedSize}, ${selectedGrind}) au panier`}
              className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl focus:outline-none ${
                addedFlash
                  ? 'bg-emerald-600 text-white scale-[0.99] shadow-emerald-900/30'
                  : 'bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] hover:shadow-[#EFAE54]/25 active:scale-[0.98]'
              }`}
            >
              {addedFlash ? (
                <>
                  <Check size={18} className="stroke-[2.5]" />
                  <span>Ajouté au Panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>+ Ajouter au Panier</span>
                </>
              )}
            </button>

            {/* Primary CTA 2: Commander via WhatsApp / COD */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Commander directement via WhatsApp avec paiement à la livraison"
              className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl hover:shadow-[#25D366]/25 active:scale-[0.98] text-center"
            >
              <MessageCircle size={18} className="fill-white/20 shrink-0" />
              <span>Commander via WhatsApp (COD)</span>
            </a>
          </div>

          {/* Trust Guarantees Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs text-[#A0A5B5]">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-[#EFAE54] shrink-0" />
              <span>Livraison 24h/48h Maroc</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote size={15} className="text-emerald-400 shrink-0" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-sky-400 shrink-0" />
              <span>Garantie Fraîcheur Lot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeroSection;
