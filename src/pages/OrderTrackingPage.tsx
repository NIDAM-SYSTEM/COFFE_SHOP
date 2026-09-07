/**
 * OrderTrackingPage.tsx — Phase 9: Live Moroccan Delivery Status
 *
 * Auto-hydration priority:
 *  1. URL param `?orderId=` or `?phone=`  → TrackingSearchInput reads + triggers on mount
 *  2. localStorage `coffeehouse_last_order` snapshot → resolveLastOrderFromStorage()
 *  3. Manual input via search form
 *
 * Desktop layout (≥lg):
 *   [Search bar centered, full-width]
 *   [DeliveryStatusTimeline (left 60%)] | [CourierContactCard (right 40%)]
 *
 * Mobile layout:
 *   [Search bar]
 *   [DeliveryStatusTimeline]
 *   [CourierContactCard]
 */

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronRight,
  Package,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import TrackingSearchInput from '../components/tracking/TrackingSearchInput';
import DeliveryStatusTimeline from '../components/tracking/DeliveryStatusTimeline';
import CourierContactCard from '../components/tracking/CourierContactCard';

import { resolveLastOrderFromStorage } from '../data/mockOrders';
import type { MockOrder } from '../types';

// ── Constants ──────────────────────────────────────────────────────────────

const STORE_WHATSAPP = '212661245787';
const SUPPORT_MESSAGE = encodeURIComponent(
  "Salam, j'ai besoin d'aide pour suivre ma commande Coffee House. Pouvez-vous m'aider ?"
);

// ── Breadcrumb ─────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/35 mb-8">
      <Link to="/" className="hover:text-white/60 transition-colors">Accueil</Link>
      <ChevronRight size={12} className="text-white/20" />
      <span className="text-white/60 font-medium">Suivi de commande</span>
    </nav>
  );
}

// ── Empty / not-found state ────────────────────────────────────────────────

function NoOrderFound({ onReset }: { onReset: () => void }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-5 py-10">
      {/* Icon */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Package size={28} className="text-white/20" />
      </div>

      <div>
        <p className="text-base font-semibold text-white/70">
          Aucune commande trouvée avec ce numéro
        </p>
        <p className="text-sm text-white/35 mt-2 leading-relaxed max-w-xs mx-auto">
          Vérifiez votre numéro de commande (ex&nbsp;:{' '}
          <span className="text-[#EFAE54]">MA-1024</span>) ou votre numéro
          WhatsApp marocain.
        </p>
      </div>

      {/* Reset search */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 border border-white/12 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <RotateCcw size={13} />
        Nouvelle recherche
      </button>

      {/* WhatsApp support fallback */}
      <div className="rounded-2xl bg-white/4 border border-white/10 px-5 py-4 space-y-2.5">
        <p className="text-xs text-white/45 leading-relaxed">
          Vous ne trouvez pas votre commande ? Notre équipe est disponible sur
          WhatsApp pour vous aider.
        </p>
        <a
          href={`https://wa.me/${STORE_WHATSAPP}?text=${SUPPORT_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          id="tracking-whatsapp-support"
          className="
            w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a]
            text-white font-bold text-sm
            flex items-center justify-center gap-2
            transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
          "
        >
          <MessageCircle size={15} />
          Contacter le support WhatsApp
        </a>
      </div>
    </div>
  );
}

// ── Order found header ─────────────────────────────────────────────────────

function OrderFoundHeader({ order }: { order: MockOrder }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/20 text-xs text-[#EFAE54] font-semibold">
        <Sparkles size={11} />
        Commande trouvée
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/12 text-xs text-white/60">
        <span className="text-white/35">Réf.</span>
        <span className="font-mono font-bold text-white/80 tracking-wide">{order.id}</span>
      </div>
      <span className="text-xs text-white/30">{order.customerName} · {order.city}</span>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export function OrderTrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundOrder, setFoundOrder]     = useState<MockOrder | undefined>();
  const [hasSearched, setHasSearched]   = useState(false);

  // Auto-resolve from localStorage on mount (post-checkout redirect without URL param)
  useEffect(() => {
    const paramOrderId = searchParams.get('orderId');
    const paramPhone   = searchParams.get('phone');

    // If URL params are present, TrackingSearchInput handles lookup on its own
    if (paramOrderId || paramPhone) return;

    // Otherwise try localStorage snapshot
    const lastOrder = resolveLastOrderFromStorage();
    if (lastOrder) {
      setFoundOrder(lastOrder);
      setHasSearched(true);
      // Push orderId to URL so the page becomes shareable/refreshable
      setSearchParams({ orderId: lastOrder.id }, { replace: true });
    }
  // Only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResult = (order: MockOrder | undefined) => {
    setFoundOrder(order);
    setHasSearched(true);
  };

  const handleClear = () => {
    setFoundOrder(undefined);
    setHasSearched(false);
  };

  const isNotFound = hasSearched && !foundOrder;

  return (
    <div className="min-h-screen bg-[#121421] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* ── Breadcrumb ── */}
        <Breadcrumb />

        {/* ── Page title ── */}
        <div className="mb-8 lg:mb-10 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Suivre ma Commande
          </h1>
          <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-md mx-auto">
            Entrez votre numéro de commande ou votre numéro WhatsApp pour suivre
            votre torréfaction en temps réel.
          </p>
        </div>

        {/* ── Search input ── */}
        <div className="mb-8 lg:mb-10">
          <TrackingSearchInput
            onResult={handleResult}
            onClear={handleClear}
          />
        </div>

        {/* ── Order found header ── */}
        {foundOrder && <OrderFoundHeader order={foundOrder} />}

        {/* ── Results area ── */}
        {foundOrder ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
            {/* Left: Delivery timeline */}
            <div>
              <DeliveryStatusTimeline order={foundOrder} />
            </div>

            {/* Right: Courier contact + items */}
            <div className="lg:sticky lg:top-24">
              <CourierContactCard order={foundOrder} />

              {/* "Not your order?" reset link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors"
                >
                  <RotateCcw size={11} />
                  Ce n'est pas ma commande — Chercher une autre
                </button>
              </div>
            </div>
          </div>
        ) : isNotFound ? (
          <NoOrderFound onReset={handleClear} />
        ) : (
          /* Initial idle state — no search yet */
          !hasSearched && (
            <div className="text-center py-12 space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
                <Package size={20} className="text-white/20" />
              </div>
              <p className="text-sm text-white/25">
                Votre statut de livraison apparaîtra ici
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OrderTrackingPage;
