/**
 * OrderSummaryCard.tsx — Phase 8: Live Cart Summary Panel
 *
 * Pulls items directly from useCart(). Accepts selected city value as prop to
 * derive SLA zone and display the correct delivery estimate chip.
 *
 * Layout behaviour:
 *  - Desktop: sticky sidebar (controlled by parent grid)
 *  - Mobile:  renders normally in flow; CheckoutPage wraps it in an accordion
 */

import { useMemo } from 'react';
import { ShoppingBag, Package, Truck, ChevronRight, Tag, Flame } from 'lucide-react';
import { useCart } from '../../store/useCart';
import {
  getCityByValue,
  calculateOrderTotals,
  FREE_SHIPPING_THRESHOLD_MAD,
  STANDARD_SHIPPING_FEE_MAD,
} from '../../data/moroccanCities';
import type { SlaZone } from '../../data/moroccanCities';
import { Link } from 'react-router-dom';

// ── SLA Delivery Chip ──────────────────────────────────────────────────────

const ZONE_CHIP: Record<SlaZone, { label: string; cls: string }> = {
  1: { label: '⚡ Livraison 24h',    cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  2: { label: '🚚 Livraison 48h',    cls: 'bg-amber-500/15  text-amber-400  border-amber-500/25'  },
  3: { label: '📦 Livraison 48–72h', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/25' },
};

function SlaChip({ zone }: { zone: SlaZone }) {
  const { label, cls } = ZONE_CHIP[zone];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}

// ── Free shipping progress bar ─────────────────────────────────────────────

function ShippingProgressBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD_MAD - subtotal, 0);
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD_MAD) * 100, 100);
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD_MAD;
  const isClose = !isFree && pct >= 70; // amber glow when ≥70% of the way

  return (
    <div className="space-y-2 rounded-xl bg-white/4 border border-white/8 px-3.5 py-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Truck size={12} className={isFree ? 'text-emerald-400' : isClose ? 'text-[#EFAE54]' : 'text-white/35'} />
          <span className="text-[11px] font-semibold text-white/60">
            {isFree ? 'Livraison gratuite débloquée 🎉' : 'Livraison gratuite partout au Maroc'}
          </span>
        </div>
        {!isFree && (
          <span className="text-[10px] text-white/35 font-medium">
            {FREE_SHIPPING_THRESHOLD_MAD} MAD
          </span>
        )}
      </div>

      {/* Progress track */}
      <div className="relative h-2 rounded-full bg-white/8 overflow-visible">
        {/* Filled bar */}
        <div
          className={`
            absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
            ${isFree
              ? 'bg-emerald-400'
              : isClose
              ? 'bg-[#EFAE54] shadow-[0_0_8px_2px_rgba(239,174,84,0.35)]'
              : 'bg-[#EFAE54]/70'}
          `}
          style={{ width: `${pct}%` }}
        />
        {/* 50% milestone tick */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-white/15 rounded-full"
          style={{ left: '50%' }}
          aria-hidden
        />
      </div>

      {/* Copy */}
      <p className="text-[11px] leading-snug">
        {isFree ? (
          <span className="text-emerald-400 font-semibold">
            Votre commande est expédiée gratuitement partout au Maroc !
          </span>
        ) : (
          <>
            <span className="text-white/45">Plus que </span>
            <strong className="text-white/80">{remaining} MAD</strong>
            <span className="text-white/45"> pour la </span>
            <span className="text-[#EFAE54] font-semibold">livraison gratuite</span>
            <span className="text-white/45"> partout au Maroc.</span>
          </>
        )}
      </p>
    </div>
  );
}


// ── Line Item Row ──────────────────────────────────────────────────────────

function LineItemRow({
  name,
  grind,
  quantity,
  unitPrice,
}: {
  name: string;
  grind: string;
  quantity: number;
  unitPrice: number;
}) {
  const lineTotal = quantity * unitPrice;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/6 last:border-0">
      {/* Icon */}
      <div className="shrink-0 p-1.5 rounded-lg bg-[#EFAE54]/10 border border-[#EFAE54]/15 mt-0.5">
        <Flame size={12} className="text-[#EFAE54]" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-snug truncate">{name}</p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[11px] text-white/40 bg-white/6 px-1.5 py-0.5 rounded-md">
            {grind}
          </span>
          <span className="text-[11px] text-white/35">×{quantity}</span>
        </div>
      </div>

      {/* Price */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-white">{lineTotal} MAD</p>
        {quantity > 1 && (
          <p className="text-[11px] text-white/35">{unitPrice} MAD/u</p>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export interface OrderSummaryCardProps {
  /** City value string from CheckoutFormData.city (e.g. 'casablanca') */
  selectedCityValue: string;
}

export default function OrderSummaryCard({ selectedCityValue }: OrderSummaryCardProps) {
  const { items, subtotal } = useCart();

  const selectedCity = useMemo(
    () => (selectedCityValue ? getCityByValue(selectedCityValue) : undefined),
    [selectedCityValue]
  );

  const { shipping, total } = useMemo(
    () => calculateOrderTotals(subtotal),
    [subtotal]
  );

  const isFreeShipping = shipping === 0;
  const isEmpty = items.length === 0;

  // ── Empty cart state ──
  if (isEmpty) {
    return (
      <div className="rounded-2xl bg-white/4 border border-white/10 p-6 text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
          <ShoppingBag size={22} className="text-white/30" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/60">Votre panier est vide</p>
          <p className="text-xs text-white/35 mt-1">Ajoutez des produits pour passer commande.</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFAE54] hover:text-[#EFAE54]/80 transition-colors"
        >
          Découvrir nos cafés
          <ChevronRight size={13} />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/4 border border-white/10 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Package size={16} className="text-[#EFAE54]" />
          <h3 className="text-sm font-semibold text-white">Récapitulatif de commande</h3>
        </div>
        <span className="text-xs text-white/40 bg-white/6 px-2 py-0.5 rounded-full">
          {items.reduce((s, i) => s + i.quantity, 0)} article{items.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Line items ── */}
      <div className="px-5 py-1">
        {items.map((item) => (
          <LineItemRow
            key={`${item.product.id}-${item.selectedGrind}`}
            name={item.product.name}
            grind={item.selectedGrind}
            quantity={item.quantity}
            unitPrice={item.product.price}
          />
        ))}
      </div>

      {/* ── Free shipping progress ── */}
      {!isFreeShipping && (
        <div className="px-5 pb-3 pt-1">
          <ShippingProgressBar subtotal={subtotal} />
        </div>
      )}

      {/* ── Price breakdown ── */}
      <div className="px-5 py-4 border-t border-white/8 space-y-2.5">

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/55">Sous-total</span>
          <span className="text-white font-medium">{subtotal} MAD</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-white/55">
            <Truck size={13} className="text-white/35" />
            <span>Livraison</span>
            {selectedCity && (
              <span className="text-white/30">· {selectedCity.name}</span>
            )}
          </div>
          {isFreeShipping ? (
            <span className="text-emerald-400 font-semibold text-xs">Gratuit 🎉</span>
          ) : (
            <span className="text-white font-medium">{STANDARD_SHIPPING_FEE_MAD} MAD</span>
          )}
        </div>

        {/* SLA zone chip (shown only when city is selected) */}
        {selectedCity && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">Délai estimé</span>
            <SlaChip zone={selectedCity.slaZone} />
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10 pt-2.5">
          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white">Total</span>
            <div className="text-right">
              <span className="text-xl font-bold text-[#EFAE54]">{total} MAD</span>
              {isFreeShipping && subtotal >= FREE_SHIPPING_THRESHOLD_MAD && (
                <p className="text-[10px] text-emerald-400 mt-0.5">Livraison incluse</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Promo / discount area (placeholder for future coupon input) ── */}
      <div className="px-5 pb-4">
        <button
          type="button"
          className="w-full flex items-center gap-2 text-xs text-white/35 hover:text-white/55 transition-colors py-2 rounded-lg border border-dashed border-white/10 hover:border-white/20 px-3"
          disabled
          title="Fonctionnalité bientôt disponible"
        >
          <Tag size={12} />
          <span>Code promo — Bientôt disponible</span>
        </button>
      </div>

      {/* ── COD trust strip ── */}
      <div className="px-5 pb-5">
        <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/15 px-3.5 py-3 flex items-start gap-2.5">
          <span className="text-lg leading-none mt-0.5" aria-hidden>🔒</span>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Paiement <strong className="text-white/70">100% sécurisé</strong> en espèces à la livraison.
            Inspection du sachet garantie avant encaissement.
          </p>
        </div>
      </div>
    </div>
  );
}
