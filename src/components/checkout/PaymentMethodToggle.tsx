/**
 * PaymentMethodToggle.tsx — Phase 8: Checkout Payment Selector
 *
 * Two-option payment card selector:
 *  - COD  (Cash on Delivery): pre-selected default, always enabled
 *  - CMI  (Moroccan bank card): visible but disabled — "Bientôt disponible"
 *
 * Controlled component: parent manages `value` + `onChange`.
 */

import { Banknote, CreditCard, CheckCircle2, Lock, BadgeCheck } from 'lucide-react';
import type { PaymentMethod } from '../../types';

// ── Sub-component: individual option card ──────────────────────────────────

interface PaymentCardProps {
  id: string;
  value: PaymentMethod;
  selected: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: React.ReactNode;
  onClick: () => void;
}

function PaymentCard({
  id,
  selected,
  disabled = false,
  icon,
  title,
  subtitle,
  badge,
  onClick,
}: PaymentCardProps) {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative w-full text-left rounded-2xl border px-4 py-4 transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54]/50
        ${
          disabled
            ? 'border-white/8 bg-white/2 opacity-55 cursor-not-allowed'
            : selected
            ? 'border-[#EFAE54]/60 bg-[#EFAE54]/8 cursor-pointer'
            : 'border-white/10 bg-white/4 cursor-pointer hover:border-white/20 hover:bg-white/6'
        }
      `}
    >
      <div className="flex items-start gap-3.5">
        {/* Icon bubble */}
        <div
          className={`
            shrink-0 mt-0.5 p-2.5 rounded-xl transition-colors duration-200
            ${selected && !disabled ? 'bg-[#EFAE54]/15' : 'bg-white/6'}
          `}
        >
          <span className={selected && !disabled ? 'text-[#EFAE54]' : 'text-white/45'}>
            {icon}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-semibold leading-snug ${
                disabled ? 'text-white/35' : 'text-white'
              }`}
            >
              {title}
            </span>
            {badge}
          </div>
          <p
            className={`text-xs mt-1 leading-relaxed ${
              disabled ? 'text-white/25' : 'text-white/50'
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Selection indicator */}
        <div className="shrink-0 mt-0.5">
          {selected && !disabled ? (
            <CheckCircle2 size={18} className="text-[#EFAE54]" />
          ) : (
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 ${
                disabled ? 'border-white/15' : 'border-white/25'
              }`}
            />
          )}
        </div>
      </div>
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export interface PaymentMethodToggleProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export default function PaymentMethodToggle({ value, onChange }: PaymentMethodToggleProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 pb-1">
        <div className="p-2 rounded-lg bg-[#EFAE54]/10 border border-[#EFAE54]/20">
          <Banknote size={16} className="text-[#EFAE54]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Mode de Paiement</h2>
          <p className="text-xs text-white/40 mt-0.5">Sélectionnez votre mode de règlement</p>
        </div>
      </div>

      {/* Option A — Cash on Delivery (default, enabled) */}
      <PaymentCard
        id="payment-cod"
        value="cod"
        selected={value === 'cod'}
        icon={<Banknote size={18} />}
        title="Paiement Cash à la Livraison"
        subtitle="Payez en espèces directement au livreur. Vérifiez votre commande avant de régler. Zéro risque."
        badge={
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <BadgeCheck size={10} />
            Recommandé
          </span>
        }
        onClick={() => onChange('cod')}
      />

      {/* Option B — CMI Bank Card (disabled, coming soon) */}
      <PaymentCard
        id="payment-cmi"
        value="cmi"
        selected={value === 'cmi'}
        disabled
        icon={<CreditCard size={18} />}
        title="Carte Bancaire Marocaine (CMI)"
        subtitle="Paiement sécurisé par carte CIH, Attijariwafa, BMCE, etc."
        badge={
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/8 text-white/35 border border-white/12">
            <Lock size={9} />
            Bientôt disponible
          </span>
        }
        onClick={() => {}}
      />

      {/* COD trust reassurance strip */}
      {value === 'cod' && (
        <div className="flex items-start gap-3 rounded-xl bg-[#EFAE54]/6 border border-[#EFAE54]/18 px-4 py-3">
          <CheckCircle2 size={15} className="text-[#EFAE54] shrink-0 mt-0.5" />
          <p className="text-xs text-white/55 leading-relaxed">
            Le livreur encaisse uniquement{' '}
            <strong className="text-white/80">après inspection</strong> de votre sachet
            (valve de dégazage &amp; date de torréfaction).{' '}
            <span className="text-[#EFAE54] font-medium">Aucun pré-paiement requis.</span>
          </p>
        </div>
      )}
    </div>
  );
}
