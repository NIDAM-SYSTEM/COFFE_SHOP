/**
 * DeliveryStatusTimeline.tsx — Phase 9: 4-Stage Order Status Stepper
 *
 * Layout:
 *   - Mobile  (<lg): vertical stepper (icon + connector line top-to-bottom)
 *   - Desktop (≥lg): horizontal stepper (icon + connector line left-to-right)
 *
 * Stage states:
 *   - completed: emerald checkmark + solid connector
 *   - active:    amber pulsing ring + animated label
 *   - pending:   white/15 muted icon + dashed connector
 *
 * COD total chip is rendered below the stepper.
 */

import { useMemo } from 'react';
import {
  ClipboardCheck,
  PackageCheck,
  Truck,
  BadgeCheck,
  Check,
  Clock,
  Banknote,
  AlertCircle,
} from 'lucide-react';
import { DELIVERY_STAGES, STAGE_CONFIG } from '../../types';
import type { MockOrder, DeliveryStage } from '../../types';

// ── Icon map (resolves STAGE_CONFIG.iconName strings to components) ─────────

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardCheck,
  PackageCheck,
  Truck,
  BadgeCheck,
};

// ── Timestamp formatter ────────────────────────────────────────────────────

/**
 * Format an ISO string as "Lun. 6 sept. à 10:34"
 * Returns "En attente" for pending stages (no timestamp).
 */
function formatTimestamp(iso: string | undefined): string {
  if (!iso) return 'En attente';
  try {
    const dt = new Date(iso);
    return dt.toLocaleString('fr-MA', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'En attente';
  }
}

// ── Step state derivation ──────────────────────────────────────────────────

type StepState = 'completed' | 'active' | 'pending';

function getStepState(stage: DeliveryStage, currentStage: DeliveryStage): StepState {
  const stageIdx   = DELIVERY_STAGES.indexOf(stage);
  const currentIdx = DELIVERY_STAGES.indexOf(currentStage);
  if (stageIdx < currentIdx) return 'completed';
  if (stageIdx === currentIdx) return 'active';
  return 'pending';
}

// ── Single step node ───────────────────────────────────────────────────────

interface StepNodeProps {
  stage: DeliveryStage;
  currentStage: DeliveryStage;
  timestamp: string | undefined;
  isLast: boolean;
}

function StepNode({ stage, currentStage, timestamp, isLast }: StepNodeProps) {
  const state  = getStepState(stage, currentStage);
  const config = STAGE_CONFIG[stage];
  const Icon   = ICON_MAP[config.iconName] ?? ClipboardCheck;

  // ── Icon circle styles ──
  const iconCircleClass =
    state === 'completed'
      ? 'bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400'
      : state === 'active'
      ? 'bg-[#EFAE54]/15 border-2 border-[#EFAE54]/60 text-[#EFAE54]'
      : 'bg-white/5 border-2 border-white/12 text-white/20';

  const labelClass =
    state === 'active'
      ? 'text-white font-bold'
      : state === 'completed'
      ? 'text-white/70 font-semibold'
      : 'text-white/25 font-medium';

  const sublabelClass =
    state === 'active'
      ? 'text-white/60'
      : state === 'completed'
      ? 'text-white/35'
      : 'text-white/15';

  const tsClass =
    state === 'active'
      ? 'text-[#EFAE54] font-semibold'
      : state === 'completed'
      ? 'text-emerald-400'
      : 'text-white/15';

  return (
    <>
      {/* ── VERTICAL LAYOUT (mobile default) ── */}
      <div className="lg:hidden flex items-start gap-4">
        {/* Left: icon + connector */}
        <div className="flex flex-col items-center shrink-0">
          {/* Icon circle */}
          <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${iconCircleClass}`}>
            {state === 'completed' ? (
              <Check size={16} strokeWidth={3} />
            ) : (
              <Icon size={16} />
            )}
            {/* Active pulse ring */}
            {state === 'active' && (
              <span className="absolute inset-0 rounded-full border-2 border-[#EFAE54]/40 animate-ping" aria-hidden />
            )}
          </div>

          {/* Connector line */}
          {!isLast && (
            <div
              className={`w-px flex-1 mt-1 min-h-[32px] transition-colors duration-300 ${
                state === 'completed' ? 'bg-emerald-500/30' : 'bg-white/8 border-l border-dashed border-white/10'
              }`}
            />
          )}
        </div>

        {/* Right: text */}
        <div className={`pb-8 ${isLast ? '' : ''}`}>
          <p className={`text-sm leading-snug ${labelClass}`}>{config.label}</p>
          <p className={`text-xs mt-0.5 leading-snug ${sublabelClass}`}>{config.sublabel}</p>
          <div className={`flex items-center gap-1 mt-1.5 text-[11px] ${tsClass}`}>
            {state !== 'pending' && <Clock size={10} className="shrink-0" />}
            <span>{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL LAYOUT (desktop ≥lg) ── */}
      <div className="hidden lg:flex flex-col items-center flex-1 min-w-0">
        {/* Icon + connector row */}
        <div className="flex items-center w-full">
          {/* Left connector half */}
          {!isLast && <div className="hidden" />}
          <div className="shrink-0 relative">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${iconCircleClass}`}>
              {state === 'completed' ? (
                <Check size={18} strokeWidth={3} />
              ) : (
                <Icon size={18} />
              )}
              {state === 'active' && (
                <span className="absolute inset-0 rounded-full border-2 border-[#EFAE54]/40 animate-ping" aria-hidden />
              )}
            </div>
          </div>
          {/* Right connector line */}
          {!isLast && (
            <div
              className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                state === 'completed' ? 'bg-emerald-500/30' : 'border-t border-dashed border-white/12'
              }`}
            />
          )}
        </div>

        {/* Text below icon */}
        <div className="mt-3 text-center px-1 w-full">
          <p className={`text-xs leading-snug ${labelClass}`}>{config.label}</p>
          <p className={`text-[10px] mt-0.5 leading-snug ${sublabelClass}`}>{config.sublabel}</p>
          <div className={`flex items-center justify-center gap-1 mt-1.5 text-[10px] ${tsClass}`}>
            {state !== 'pending' && <Clock size={9} className="shrink-0" />}
            <span>{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export interface DeliveryStatusTimelineProps {
  order: MockOrder;
}

export default function DeliveryStatusTimeline({ order }: DeliveryStatusTimelineProps) {
  // Build a map from stage → timestamp for efficient lookup
  const timestampMap = useMemo<Partial<Record<DeliveryStage, string>>>(() => {
    const map: Partial<Record<DeliveryStage, string>> = {};
    for (const entry of order.statusHistory) {
      map[entry.stage] = entry.timestamp;
    }
    return map;
  }, [order.statusHistory]);

  const isDelivered = order.currentStage === 'delivered';

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Suivi de livraison</h3>
        {isDelivered ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <BadgeCheck size={12} />
            Livré
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EFAE54]/10 text-[#EFAE54] border border-[#EFAE54]/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFAE54]" />
            En cours
          </span>
        )}
      </div>

      {/* ── Stepper card ── */}
      <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-5">
        {/* Vertical (mobile) */}
        <div className="lg:hidden space-y-0">
          {DELIVERY_STAGES.map((stage, i) => (
            <StepNode
              key={stage}
              stage={stage}
              currentStage={order.currentStage}
              timestamp={timestampMap[stage]}
              isLast={i === DELIVERY_STAGES.length - 1}
            />
          ))}
        </div>

        {/* Horizontal (desktop) */}
        <div className="hidden lg:flex items-start gap-0">
          {DELIVERY_STAGES.map((stage, i) => (
            <StepNode
              key={stage}
              stage={stage}
              currentStage={order.currentStage}
              timestamp={timestampMap[stage]}
              isLast={i === DELIVERY_STAGES.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── COD total due chip ── */}
      <div className="flex items-center gap-3 rounded-xl bg-[#EFAE54]/8 border border-[#EFAE54]/20 px-4 py-3.5">
        <div className="p-2 rounded-lg bg-[#EFAE54]/10 shrink-0">
          <Banknote size={16} className="text-[#EFAE54]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/50">
            {isDelivered ? 'Montant encaissé en Cash' : 'Paiement à la livraison (COD)'}
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#EFAE54]">
            Montant à préparer en Cash : {order.totalMAD} MAD
          </p>
          {!isDelivered && (
            <p className="text-[11px] text-white/35 mt-0.5">
              Payez directement au livreur après inspection — aucun pré-paiement requis.
            </p>
          )}
        </div>
        {isDelivered && (
          <div className="shrink-0">
            <BadgeCheck size={22} className="text-emerald-400" />
          </div>
        )}
      </div>

      {/* ── Freshness inspection reminder (only while not yet delivered) ── */}
      {!isDelivered && (
        <div className="flex items-start gap-3 rounded-xl bg-white/4 border border-white/10 px-4 py-3">
          <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/50 leading-relaxed">
            <span className="text-amber-400 font-semibold">Rappel :</span>{' '}
            Vérifiez la <strong className="text-white/70">date de torréfaction</strong> et la{' '}
            <strong className="text-white/70">valve de dégazage</strong> sur le sachet avant de payer.
            Garantie de remplacement si torréfié il y a plus de 14 jours.
          </p>
        </div>
      )}
    </div>
  );
}
