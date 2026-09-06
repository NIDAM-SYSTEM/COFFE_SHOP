/**
 * CheckoutPage.tsx — Phase 8: Moroccan 1-Page Express Checkout
 *
 * Desktop: grid [form-column | sticky-summary-column]
 * Mobile:  single column — summary collapses into an accordion above submit CTA
 *
 * Flow:
 *  1. User fills address form + payment toggle
 *  2. Submits → order code generated, cart cleared, confirmation state shown
 *  3. Secondary WhatsApp dispatch with full order summary pre-filled
 */

import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Clock,
} from 'lucide-react';

import MoroccoAddressForm, { isAddressFormValid } from '../components/checkout/MoroccoAddressForm';
import PaymentMethodToggle from '../components/checkout/PaymentMethodToggle';
import OrderSummaryCard from '../components/checkout/OrderSummaryCard';

import { useCart } from '../store/useCart';
import { createEmptyCheckoutForm } from '../types';
import type { CheckoutFormData } from '../types';
import {
  getCityByValue,
  calculateOrderTotals,
  buildWhatsAppOrderMessage,
  normalizeToWhatsApp,
} from '../data/moroccanCities';

// ── Helpers ────────────────────────────────────────────────────────────────

function generateOrderCode(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `CH-${ts}-${rand}`;
}

const STORE_WHATSAPP = '212661245787'; // Replace with actual store WhatsApp

// ── Breadcrumb ─────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/35 mb-8">
      <Link to="/" className="hover:text-white/60 transition-colors">Accueil</Link>
      <ChevronRight size={12} className="text-white/20" />
      <Link to="/shop" className="hover:text-white/60 transition-colors">Boutique</Link>
      <ChevronRight size={12} className="text-white/20" />
      <span className="text-white/60 font-medium">Commander</span>
    </nav>
  );
}

// ── Mobile Summary Accordion ───────────────────────────────────────────────

function MobileSummaryAccordion({
  subtotal,
  shipping,
  total,
  itemCount,
  selectedCityValue,
}: {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  selectedCityValue: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden rounded-2xl bg-white/4 border border-white/10 overflow-hidden mb-6">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-white"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag size={15} className="text-[#EFAE54]" />
          <span>
            Récapitulatif ({itemCount} article{itemCount > 1 ? 's' : ''})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#EFAE54] font-bold">{total} MAD</span>
          {open ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
        </div>
      </button>

      {/* Expanded full summary */}
      {open && (
        <div className="border-t border-white/8">
          <OrderSummaryCard selectedCityValue={selectedCityValue} />
        </div>
      )}

      {/* Collapsed quick numbers */}
      {!open && (
        <div className="px-5 pb-3 flex items-center justify-between text-xs text-white/45 border-t border-white/8 pt-2">
          <span>Livraison : {shipping === 0 ? 'Gratuit 🎉' : `${shipping} MAD`}</span>
          <span>Sous-total : {subtotal} MAD</span>
        </div>
      )}
    </div>
  );
}

// ── Success Confirmation ───────────────────────────────────────────────────

interface ConfirmationProps {
  orderCode: string;
  form: CheckoutFormData;
  items: ReturnType<typeof useCart>['items'];
  subtotal: number;
  shipping: number;
  total: number;
  onWhatsApp: () => void;
}

function OrderConfirmation({
  orderCode,
  form,
  items,
  subtotal,
  shipping,
  total,
  onWhatsApp,
}: ConfirmationProps) {
  const city = getCityByValue(form.city);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full space-y-6 text-center">
        {/* Animated checkmark */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/20 text-xs text-[#EFAE54] font-semibold mb-3">
            <Sparkles size={11} />
            Commande reçue
          </div>
          <h1 className="text-2xl font-bold text-white">Merci, {form.fullName.split(' ')[0]} !</h1>
          <p className="text-white/50 text-sm mt-2 leading-relaxed">
            Votre commande a été enregistrée avec succès.
            Notre équipe va préparer votre torréfaction fraîche.
          </p>
        </div>

        {/* Order code chip */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/12 px-5 py-3">
          <span className="text-xs text-white/45">Numéro de commande</span>
          <span className="text-sm font-bold text-[#EFAE54] font-mono tracking-wide">{orderCode}</span>
        </div>

        {/* Delivery summary */}
        <div className="rounded-2xl bg-white/4 border border-white/10 p-5 text-left space-y-3">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
            Détails de livraison
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-white/35 shrink-0 mt-0.5">Destinataire</span>
              <span className="text-white font-medium">{form.fullName}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/35 shrink-0 mt-0.5">Adresse</span>
              <span className="text-white/75">{form.quartierAddress}, {city?.name ?? form.city}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/35 shrink-0 mt-0.5">WhatsApp</span>
              <span className="text-white/75">{form.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/35 shrink-0 mt-0.5">Délai</span>
              {city ? (
                <span className="text-emerald-400 font-medium">Livraison {city.deliveryEstimate} après expédition</span>
              ) : (
                <span className="text-white/75">À confirmer</span>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <div className="text-xs text-white/45 space-y-0.5">
              <p>Sous-total : {subtotal} MAD</p>
              <p>Livraison : {shipping === 0 ? 'Gratuite 🎉' : `${shipping} MAD`}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40">Total à payer</p>
              <p className="text-xl font-bold text-[#EFAE54]">{total} MAD</p>
              <p className="text-[11px] text-white/35">Cash à la livraison</p>
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="rounded-2xl bg-white/4 border border-white/10 p-4 text-left space-y-2">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedGrind}`} className="flex items-center justify-between text-sm">
              <span className="text-white/70">
                {item.quantity}× {item.product.name}{' '}
                <span className="text-white/35 text-xs">({item.selectedGrind})</span>
              </span>
              <span className="text-white font-medium">{item.product.price * item.quantity} MAD</span>
            </div>
          ))}
        </div>

        {/* Delivery estimate notice */}
        <div className="flex items-center gap-2.5 rounded-xl bg-[#EFAE54]/8 border border-[#EFAE54]/18 px-4 py-3 text-left">
          <Clock size={14} className="text-[#EFAE54] shrink-0" />
          <p className="text-xs text-white/55 leading-relaxed">
            Notre équipe vous contacte sur WhatsApp <strong className="text-white/70">dans les 2h</strong> pour confirmer le créneau de livraison.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <button
          type="button"
          onClick={onWhatsApp}
          className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/30"
        >
          <MessageCircle size={18} />
          Confirmer aussi via WhatsApp
        </button>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
        >
          <ArrowLeft size={12} />
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutFormData>(createEmptyCheckoutForm);
  const [submitted, setSubmitted] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { shipping, total } = useMemo(() => calculateOrderTotals(subtotal), [subtotal]);
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  const handleChange = useCallback((updates: Partial<CheckoutFormData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const canSubmit = items.length > 0 && isAddressFormValid(form);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitAttempted(true);

      if (!canSubmit) return;

      const code = generateOrderCode();

      // Persist snapshot to localStorage
      const snapshot = {
        orderCode: code,
        form,
        items: items.map((i) => ({
          name: i.product.name,
          grind: i.selectedGrind,
          quantity: i.quantity,
          unitPrice: i.product.price,
        })),
        subtotal,
        shipping,
        total,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('coffeehouse_last_order', JSON.stringify(snapshot));

      setOrderCode(code);
      clearCart();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [canSubmit, form, items, subtotal, shipping, total, clearCart]
  );

  const handleWhatsApp = useCallback(() => {
    const cityEntry = getCityByValue(form.city);
    const msg = buildWhatsAppOrderMessage({
      orderCode,
      items: items.length
        ? items.map((i) => ({
            name: i.product.name,
            grind: i.selectedGrind,
            quantity: i.quantity,
            unitPrice: i.product.price,
          }))
        : (() => {
            // Items cleared after submit — read from localStorage
            try {
              const snap = JSON.parse(localStorage.getItem('coffeehouse_last_order') || '{}');
              return snap.items ?? [];
            } catch {
              return [];
            }
          })(),
      subtotal,
      shipping,
      total,
      fullName: form.fullName,
      address: form.quartierAddress,
      city: cityEntry?.name ?? form.city,
      whatsapp: form.phone,
    });

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encoded}`, '_blank', 'noopener');
  }, [form, orderCode, items, subtotal, shipping, total]);

  // ── Confirmed state ──
  if (submitted) {
    // Reconstitute items from localStorage for display (cart was cleared)
    const lastOrder = (() => {
      try {
        return JSON.parse(localStorage.getItem('coffeehouse_last_order') || '{}');
      } catch {
        return {};
      }
    })();

    return (
      <div className="min-h-screen bg-[#121421]">
        <OrderConfirmation
          orderCode={orderCode}
          form={form}
          items={lastOrder.items
            ? lastOrder.items.map((i: { name: string; grind: string; quantity: number; unitPrice: number }) => ({
                product: { id: i.name, name: i.name, price: i.unitPrice } as never,
                selectedGrind: i.grind as never,
                quantity: i.quantity,
              }))
            : []}
          subtotal={lastOrder.subtotal ?? subtotal}
          shipping={lastOrder.shipping ?? shipping}
          total={lastOrder.total ?? total}
          onWhatsApp={handleWhatsApp}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121421] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* ── Breadcrumb ── */}
        <Breadcrumb />

        {/* ── Page title ── */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Finaliser la Commande
          </h1>
          <p className="text-sm text-white/45 mt-1.5">
            Livraison Cash à la Livraison — Paiement après inspection de votre torréfaction.
          </p>
        </div>

        {/* ── Mobile summary accordion ── */}
        <MobileSummaryAccordion
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          itemCount={itemCount}
          selectedCityValue={form.city}
        />

        {/* ── Desktop two-column grid ── */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

            {/* ── LEFT: Delivery form + payment ── */}
            <div className="space-y-8">
              {/* Address form */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-6">
                <MoroccoAddressForm
                  values={form}
                  onChange={handleChange}
                  externalErrors={
                    submitAttempted && !isAddressFormValid(form)
                      ? {
                          fullName: !form.fullName ? 'Requis' : undefined,
                          phone: !form.phone ? 'Requis' : undefined,
                          city: !form.city ? 'Requis' : undefined,
                          quartierAddress: !form.quartierAddress ? 'Requis' : undefined,
                        }
                      : {}
                  }
                />
              </div>

              {/* Payment toggle */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-6">
                <PaymentMethodToggle
                  value={form.paymentMethod}
                  onChange={(method) => handleChange({ paymentMethod: method })}
                />
              </div>

              {/* ── Mobile submit CTA (inside form column on mobile) ── */}
              <div className="lg:hidden space-y-3">
                <SubmitCTA
                  canSubmit={canSubmit}
                  total={total}
                  isEmpty={items.length === 0}
                  onNavigateShop={() => navigate('/shop')}
                />
              </div>
            </div>

            {/* ── RIGHT: Sticky order summary (desktop only) ── */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <OrderSummaryCard selectedCityValue={form.city} />

                <SubmitCTA
                  canSubmit={canSubmit}
                  total={total}
                  isEmpty={items.length === 0}
                  onNavigateShop={() => navigate('/shop')}
                />
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

// ── Submit CTA (reused on desktop + mobile) ────────────────────────────────

function SubmitCTA({
  canSubmit,
  total,
  isEmpty,
  onNavigateShop,
}: {
  canSubmit: boolean;
  total: number;
  isEmpty: boolean;
  onNavigateShop: () => void;
}) {
  if (isEmpty) {
    return (
      <div className="space-y-3 text-center">
        <p className="text-sm text-white/45">Votre panier est vide.</p>
        <button
          type="button"
          onClick={onNavigateShop}
          className="w-full py-4 rounded-2xl border border-[#EFAE54]/40 text-[#EFAE54] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#EFAE54]/8 transition-colors"
        >
          <ShoppingBag size={16} />
          Découvrir nos cafés
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={!canSubmit}
        className={`
          w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5
          transition-all duration-200
          ${
            canSubmit
              ? 'bg-[#EFAE54] text-[#121421] hover:bg-[#DE9839] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#EFAE54]/20 cursor-pointer'
              : 'bg-white/8 text-white/30 cursor-not-allowed'
          }
        `}
      >
        <CheckCircle2 size={18} />
        Confirmer — Paiement Cash à la Livraison
        {canSubmit && <span className="ml-auto font-bold opacity-70">{total} MAD</span>}
      </button>

      <p className="text-center text-[11px] text-white/30 leading-relaxed">
        En confirmant, vous acceptez nos conditions.{' '}
        <span className="text-white/45">Aucun pré-paiement requis.</span>
      </p>
    </div>
  );
}

export default CheckoutPage;
