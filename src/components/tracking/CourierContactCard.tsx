/**
 * CourierContactCard.tsx — Phase 9: Courier Info & WhatsApp Coordination
 *
 * Displays:
 *  - Courier company badge (color chip + name + tracking ID)
 *  - ETA window chip
 *  - City & recipient info
 *  - [Coordonner avec le livreur via WhatsApp] CTA — pre-filled message
 *  - Order items breakdown table
 *  - Inspection policy reminder strip at the bottom
 */

import { MapPin, Clock, ExternalLink, MessageCircle, Package, ShieldCheck, Flame } from 'lucide-react';
import type { MockOrder } from '../../types';
import { DELIVERY_STAGES } from '../../types';

// ── WhatsApp message builder ───────────────────────────────────────────────

function buildCoordMessage(order: MockOrder): string {
  const orderRef = order.orderId || order.id;
  return `Salam, je suis ${order.customerName}, je vous contacte concernant ma commande de café #${orderRef} pour la livraison à ${order.address}.`;
}

// ── Stage-aware ETA display ────────────────────────────────────────────────

function EtaChip({ estimatedDelivery, isDelivered }: { estimatedDelivery: string; isDelivered: boolean }) {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
        <Clock size={11} />
        {estimatedDelivery}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFAE54]/12 text-[#EFAE54] border border-[#EFAE54]/25">
      <Clock size={11} />
      {estimatedDelivery}
    </span>
  );
}

// ── Order items breakdown ──────────────────────────────────────────────────

function ItemsBreakdown({ order }: { order: MockOrder }) {
  return (
    <div className="rounded-2xl bg-white/[0.025] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
        <Package size={14} className="text-[#EFAE54]" />
        <span className="text-xs font-semibold text-white/70">Contenu de la commande</span>
        <span className="ml-auto text-[10px] text-white/30 bg-white/6 px-2 py-0.5 rounded-full">
          {order.items.reduce((s, i) => s + i.quantity, 0)} article{order.items.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-white/6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 px-4 py-3">
            <div className="shrink-0 p-1.5 rounded-lg bg-[#EFAE54]/10 border border-[#EFAE54]/15">
              <Flame size={11} className="text-[#EFAE54]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{item.name}</p>
              <p className="text-[10px] text-white/35 mt-0.5">{item.grind}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-white">{item.quantity * item.unitPrice} MAD</p>
              {item.quantity > 1 && (
                <p className="text-[10px] text-white/30">×{item.quantity} · {item.unitPrice} MAD</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-4 py-3 border-t border-white/8 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-white/45">
          <span>Sous-total</span>
          <span>{order.subtotal} MAD</span>
        </div>
        <div className="flex items-center justify-between text-xs text-white/45">
          <span>Livraison</span>
          <span className={order.shipping === 0 ? 'text-emerald-400 font-semibold' : ''}>
            {order.shipping === 0 ? 'Gratuite 🎉' : `${order.shipping} MAD`}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
          <span className="text-sm font-bold text-white">Total COD</span>
          <span className="text-base font-bold text-[#EFAE54]">{order.totalMAD} MAD</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export interface CourierContactCardProps {
  order: MockOrder;
}

export default function CourierContactCard({ order }: CourierContactCardProps) {
  const { courier } = order;
  const isDelivered  = order.currentStage === 'delivered';
  const isOutForDel  = order.currentStage === 'out_for_delivery';
  const stageIdx     = DELIVERY_STAGES.indexOf(order.currentStage);
  const hasDispatched = stageIdx >= DELIVERY_STAGES.indexOf('dispatched_hub');

  const waMessage   = buildCoordMessage(order);
  const waUrl       = `https://wa.me/${courier.whatsAppNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="space-y-4">

      {/* ── Courier info card ── */}
      <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-5 space-y-4">

        {/* Courier badge row */}
        <div className="flex items-start gap-3">
          {/* Badge chip */}
          <div className={`shrink-0 px-2.5 py-1.5 rounded-xl border text-xs font-bold ${courier.logoColor}`}>
            {courier.name.split(' ')[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{courier.name}</p>
            <p className="text-xs text-[#EFAE54] font-medium">Livreur {order.city} Centre</p>
            {courier.trackingId && (
              <p className="text-[11px] text-white/35 mt-0.5 font-mono"># {courier.trackingId}</p>
            )}
          </div>
          {/* External tracking link */}
          {courier.trackingUrl && hasDispatched && (
            <a
              href={courier.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-2 rounded-lg bg-white/6 text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors"
              title={`Suivre sur le portail ${courier.name}`}
              aria-label={`Suivre sur ${courier.name}`}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* ETA + location row */}
        <div className="flex flex-wrap items-center gap-2">
          <EtaChip estimatedDelivery={order.estimatedDelivery} isDelivered={isDelivered} />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white/50 bg-white/5 border border-white/10">
            <MapPin size={11} className="text-white/30" />
            {order.city}
          </span>
        </div>

        {/* Recipient */}
        <div className="text-xs text-white/40 leading-relaxed">
          <span className="text-white/60 font-medium">{order.customerName}</span>
          {' — '}
          {order.address}
        </div>

        {/* ── WhatsApp CTA ── */}
        {!isDelivered ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`courier-whatsapp-cta-${order.id}`}
            className="
              w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5a]
              text-white font-bold text-sm
              flex items-center justify-center gap-2.5
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              shadow-lg shadow-emerald-900/20
            "
          >
            <MessageCircle size={17} />
            Coordonner avec le livreur via WhatsApp
          </a>
        ) : (
          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 px-4 py-3">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-400 font-semibold">
              Livraison effectuée — Merci pour votre confiance !
            </p>
          </div>
        )}

        {/* Pre-filled message preview (visible when out for delivery — highest anxiety moment) */}
        {isOutForDel && (
          <div className="rounded-xl bg-white/4 border border-white/8 px-3.5 py-2.5">
            <p className="text-[10px] text-white/30 mb-1">Message pré-rempli :</p>
            <p className="text-[11px] text-white/55 leading-relaxed italic">
              "{waMessage}"
            </p>
          </div>
        )}
      </div>

      {/* ── Order items breakdown ── */}
      <ItemsBreakdown order={order} />

      {/* ── Inspection policy reminder banner ── */}
      {!isDelivered && (
        <div className="rounded-2xl bg-white/[0.025] border border-white/10 px-4 py-4 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#EFAE54] shrink-0" />
            <span className="text-xs font-semibold text-white/70">
              Politique d'inspection à la livraison
            </span>
          </div>
          <ol className="space-y-1.5 ml-5 list-decimal text-[11px] text-white/45 leading-relaxed">
            <li>Le livreur arrive à votre porte avec le sachet scellé.</li>
            <li>
              Vérifiez la <strong className="text-white/65">valve de dégazage</strong> et la{' '}
              <strong className="text-white/65">date de torréfaction</strong> sur l'emballage.
            </li>
            <li>Payez uniquement si vous êtes satisfait(e).</li>
          </ol>
          <p className="ml-5 text-[10px] text-[#EFAE54] font-medium">
            🔄 Remplacement garanti si torréfié il y a plus de 14 jours.
          </p>
        </div>
      )}
    </div>
  );
}
