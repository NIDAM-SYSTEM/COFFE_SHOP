import { useState, useCallback, useMemo } from 'react';
import { X, Plus, Minus, Trash2, ChevronDown, ShoppingBag, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { CartItem, CheckoutFormData } from '../types';
import { MOROCCAN_CITIES, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (productId: string, grind: CartItem['selectedGrind'], qty: number) => void;
  onRemoveItem: (productId: string, grind: CartItem['selectedGrind']) => void;
  onClearCart: () => void;
}

const EMPTY_FORM: CheckoutFormData = {
  fullName: '',
  whatsapp: '',
  city: '',
  address: '',
};

export function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_FORM);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const freeShippingRemaining = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    [subtotal]
  );
  const shippingProgress = useMemo(
    () => Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100),
    [subtotal]
  );
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));
    },
    []
  );

  const handleOrder = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setOrderPlaced(true);
    },
    []
  );

  const handleReset = useCallback(() => {
    setOrderPlaced(false);
    setShowCheckout(false);
    setForm(EMPTY_FORM);
    onClearCart();
    onClose();
  }, [onClearCart, onClose]);

  const isFormValid =
    form.fullName.trim().length > 2 &&
    form.whatsapp.trim().length > 8 &&
    form.city !== '' &&
    form.address.trim().length > 5;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/70 backdrop-blur-sm drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="w-full max-w-md bg-[#1A1C23] text-white shadow-2xl flex flex-col animate-slide-in-right overflow-hidden border-l border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0 bg-[#121316]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E89038]/15 flex items-center justify-center text-[#E89038]">
              <ShoppingBag size={18} strokeWidth={2} />
            </div>
            <h2 id="cart-title" className="display-font font-bold text-lg text-white">
              Votre Panier
            </h2>
            {items.length > 0 && (
              <span className="font-mono text-[11px] bg-[#E89038] text-[#121316] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E89038]"
            aria-label="Fermer le panier"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">

          {/* ── Order placed screen ── */}
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5 h-full">
              <div className="w-20 h-20 rounded-full bg-[#2D6A4F]/20 border border-[#2D6A4F] flex items-center justify-center text-[#2D6A4F]">
                <CheckCircle2 size={40} />
              </div>
              <div>
                <h3 className="display-font font-bold text-2xl text-white mb-2">
                  Commande Confirmée !
                </h3>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-xs mx-auto">
                  Merci <strong>{form.fullName}</strong> ! Notre torréfacteur prépare votre lot.
                  Vous recevrez un message WhatsApp sur <strong>{form.whatsapp}</strong> pour confirmer l'heure de passage à <strong>{form.city}</strong>.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E89038]">
                  Paiement en espèces à la livraison (COD) · 48h express
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="btn-pill-amber mt-3"
              >
                <span>Continuer vers la boutique</span>
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty cart */
            <div className="flex flex-col items-center justify-center text-center py-20 px-6 gap-4 h-full">
              <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center text-zinc-600">
                <ShoppingBag size={32} strokeWidth={1.5} />
              </div>
              <p className="display-font font-bold text-lg text-white">Votre panier est vide</p>
              <p className="font-sans text-xs text-zinc-400 max-w-xs">
                Sélectionnez un café d'origine ou un kit starter pour profiter de la torréfaction fraîche de la semaine.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-pill-amber mt-2 text-xs py-2.5"
              >
                <span>Découvrir les cafés</span>
              </button>
            </div>
          ) : !showCheckout ? (
            /* ── Item list ── */
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Free shipping progress */}
              <div className="bg-[#2A2D34] rounded-2xl p-4 border border-white/10">
                <div className="flex justify-between mb-2 text-xs">
                  <p className="font-sans text-zinc-200">
                    {freeShippingRemaining > 0
                      ? `Plus que ${freeShippingRemaining} MAD pour livraison gratuite`
                      : '🎉 Livraison gratuite débloquée au Maroc !'}
                  </p>
                  <p className="font-mono text-zinc-400 font-medium">{FREE_SHIPPING_THRESHOLD} MAD</p>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E89038] rounded-full transition-all duration-500 shadow-amber-glow"
                    style={{ width: `${shippingProgress}%` }}
                    role="progressbar"
                    aria-valuenow={shippingProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progression vers la livraison gratuite"
                  />
                </div>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-3" aria-label="Articles dans le panier">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.selectedGrind}`}
                    className="flex gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    {/* Mini bag representation */}
                    <div
                      className="w-14 h-16 rounded-xl shrink-0 flex items-center justify-center shadow-md p-1 relative overflow-hidden"
                      style={{ background: `linear-gradient(145deg, ${item.product.color}, #121316)` }}
                      aria-hidden="true"
                    >
                      <span className="font-serif font-bold text-white text-base">N</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-white text-sm leading-snug truncate">
                        {item.product.name}
                      </p>
                      <p className="font-sans text-[11px] text-zinc-400 mt-0.5">{item.product.weightGrams}g</p>
                      <span className="inline-block font-mono text-[9px] text-[#E89038] bg-[#E89038]/15 border border-[#E89038]/30 px-2 py-0.5 rounded-full mt-1">
                        {item.selectedGrind}
                      </span>

                      {/* Controls row */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1 bg-[#121316] border border-white/10 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedGrind, item.quantity - 1)}
                            className="p-1.5 hover:bg-white/10 text-zinc-300 transition-colors"
                            aria-label={`Réduire la quantité de ${item.product.name}`}
                          >
                            <Minus size={11} strokeWidth={2.5} />
                          </button>
                          <span className="font-mono text-xs text-white w-6 text-center font-bold" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedGrind, item.quantity + 1)}
                            className="p-1.5 hover:bg-white/10 text-zinc-300 transition-colors"
                            aria-label={`Augmenter la quantité de ${item.product.name}`}
                          >
                            <Plus size={11} strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="font-serif font-bold text-white text-sm">
                            {item.product.price * item.quantity}{' '}
                            <span className="font-mono text-xs font-normal text-[#E89038]">MAD</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.selectedGrind)}
                            className="p-1 text-zinc-500 hover:text-red-400 rounded transition-colors"
                            aria-label={`Supprimer ${item.product.name} du panier`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* ── Checkout Form ── */
            <div className="px-6 py-5">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="flex items-center gap-1.5 text-xs text-[#E89038] hover:underline mb-4 font-mono"
              >
                ← Retour à la liste du panier
              </button>
              <h3 className="display-font font-bold text-xl text-white mb-1">
                Livraison Partout au Maroc
              </h3>
              <p className="font-mono text-xs text-[#E89038] mb-5">
                Paiement à la livraison en espèces (COD)
              </p>

              <form
                id="checkout-form"
                onSubmit={handleOrder}
                noValidate
                className="flex flex-col gap-4"
              >
                <div>
                  <label htmlFor="fullName" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                    Nom complet *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Ex: Yassine Benali"
                    className="input-dark"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                    WhatsApp (+212) *
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="+212 6XX-XXXXXX"
                    className="input-dark"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="checkoutCity" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                    Ville *
                  </label>
                  <div className="relative">
                    <select
                      id="checkoutCity"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="input-dark appearance-none pr-8 cursor-pointer"
                    >
                      <option value="" className="bg-[#1A1C23]">Sélectionner votre ville</option>
                      {MOROCCAN_CITIES.map((city) => (
                        <option key={city} value={city} className="bg-[#1A1C23]">{city}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                    Adresse de livraison exacte *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Quartier / Résidence / N° immeuble"
                    className="input-dark"
                    autoComplete="street-address"
                  />
                </div>

                {/* Mode de paiement */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-[#2D6A4F] flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-[#2D6A4F] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-white">Paiement à la Livraison (COD)</p>
                    <p className="font-mono text-[10px] text-zinc-400">Inspectez votre colis et payez le livreur</p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {!orderPlaced && items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 bg-[#121316] shrink-0">
            {/* Order summary */}
            <div className="flex flex-col gap-1.5 mb-4 text-xs font-sans">
              <div className="flex justify-between text-zinc-300">
                <span>Sous-total</span>
                <span className="font-mono text-white font-medium">{subtotal} MAD</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Livraison Maroc 48h</span>
                <span className={shippingCost === 0 ? 'text-[#2D6A4F] font-bold font-mono' : 'font-mono text-white'}>
                  {shippingCost === 0 ? 'Gratuite 🎉' : `${shippingCost} MAD`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="font-serif font-bold text-white text-base">Total</span>
                <span className="display-font font-bold text-white text-lg">
                  {total} <span className="font-mono text-xs text-[#E89038]">MAD</span>
                </span>
              </div>
            </div>

            {!showCheckout ? (
              <button
                type="button"
                onClick={() => setShowCheckout(true)}
                className="btn-pill-amber w-full justify-center"
                aria-label="Passer à la livraison"
              >
                <span>Procéder à la livraison</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                disabled={!isFormValid}
                className="btn-pill-amber w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Confirmer la commande — paiement en espèces"
              >
                <span>Confirmer la Commande (Payer en Espèces)</span>
              </button>
            )}

            <p className="font-mono text-[10px] text-zinc-500 text-center mt-2.5">
              Livraison 48h • COD • Inspection à la réception
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
