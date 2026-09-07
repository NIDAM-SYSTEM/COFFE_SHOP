/**
 * mockOrders.ts — Phase 9: Order Tracking Data Layer
 *
 * Provides:
 *  - MOCK_ORDERS: 4 seed orders covering every delivery stage
 *  - Courier constants for Morocco's main parcel carriers
 *  - lookupOrder(): dual-key search by Order ID (exact) or phone (normalized)
 *  - normalizePhone(): strips spaces/dashes for consistent comparison
 */

import type { MockOrder, CourierInfo, DeliveryStage } from '../types';

// ── Courier Definitions ────────────────────────────────────────────────────

export const COURIERS: Record<string, CourierInfo> = {
  amana: {
    name: 'Amana Express',
    trackingUrl: 'https://www.amanaexpress.ma/suivi',
    whatsAppNumber: '212661245787', // Store dispatch number
    logoColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  ctm: {
    name: 'CTM Messagerie',
    trackingUrl: 'https://www.ctm.ma/messagerie/suivi',
    whatsAppNumber: '212661245787',
    logoColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  poste: {
    name: "Rib'al-Barid (Poste Maroc)",
    trackingUrl: 'https://www.poste.ma/suivi-colis',
    whatsAppNumber: '212661245787',
    logoColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
};

// ── Helper: stage timestamp builder ───────────────────────────────────────

/**
 * Build a mock statusHistory array up to (and including) the active stage.
 * All past stages get a plausible staggered timestamp; the active stage gets
 * "now"; future stages are omitted entirely (component shows "En attente").
 */
function buildHistory(
  activeStage: DeliveryStage,
  baseDateISO: string
): { stage: DeliveryStage; timestamp: string }[] {
  const stageOrder: DeliveryStage[] = [
    'confirmed',
    'dispatched_hub',
    'out_for_delivery',
    'delivered',
  ];
  const activeIdx = stageOrder.indexOf(activeStage);
  const base = new Date(baseDateISO);

  return stageOrder.slice(0, activeIdx + 1).map((stage, i) => {
    const dt = new Date(base);
    dt.setHours(dt.getHours() + i * 6); // +6h per stage for demo realism
    return { stage, timestamp: dt.toISOString() };
  });
}

// ── Mock Orders Dataset ────────────────────────────────────────────────────

/**
 * 4 seed orders — one per delivery stage.
 *
 * Lookup keys:
 *  - By Order ID:  exact string match (e.g. "MA-1024")
 *  - By Phone:     normalized full number or last-4-digit suffix match
 */
export const MOCK_ORDERS: MockOrder[] = [
  // ── Stage 1: confirmed ─────────────────────────────────────────────────
  {
    id: 'MA-1024',
    orderId: 'MA-1024',
    phone: '0661234567',
    customerName: 'Karim Benjelloun',
    city: 'Casablanca',
    address: '14 Rue Moulay Youssef, Appt 3, Maarif',
    currentStage: 'confirmed',
    courierName: 'Amana Express',
    courierPhone: '212661245787',
    courier: {
      ...COURIERS.amana,
      trackingId: 'AE-2024-88341',
    },
    estimatedDelivery: "Demain entre 09:00 et 13:00",
    roastedDate: '2026-09-06T08:00:00Z',
    items: [
      { name: 'Éthiopie Sidamo Guji', grind: 'V60 / Filter', quantity: 1, unitPrice: 95 },
      { name: 'Salvador San Alberto', grind: 'Moka Pot (Fine)', quantity: 2, unitPrice: 95 },
    ],
    subtotal: 285,
    shipping: 30,
    totalMAD: 315,
    placedAt: '2026-09-06T10:15:00Z',
    statusHistory: buildHistory('confirmed', '2026-09-06T10:15:00Z'),
  },

  // ── Stage 2: dispatched_hub ────────────────────────────────────────────
  {
    id: 'MA-1025',
    orderId: 'MA-1025',
    phone: '0672345678',
    customerName: 'Fatima Zahra El Idrissi',
    city: 'Rabat',
    address: '7 Avenue Hassan II, Résidence Al Wifaq, Agdal',
    currentStage: 'dispatched_hub',
    courierName: 'CTM Messagerie',
    courierPhone: '212661245787',
    courier: {
      ...COURIERS.ctm,
      trackingId: 'CTM-20240906-5512',
    },
    estimatedDelivery: "Aujourd'hui entre 15:00 et 19:00",
    roastedDate: '2026-09-05T08:00:00Z',
    items: [
      { name: 'Colombia Huila Supremo', grind: 'Espresso', quantity: 1, unitPrice: 110 },
      { name: 'Éthiopie Sidamo Guji', grind: 'French Press (Coarse)', quantity: 1, unitPrice: 95 },
    ],
    subtotal: 205,
    shipping: 30,
    totalMAD: 235,
    placedAt: '2026-09-05T14:30:00Z',
    statusHistory: buildHistory('dispatched_hub', '2026-09-05T14:30:00Z'),
  },

  // ── Stage 3: out_for_delivery ──────────────────────────────────────────
  {
    id: 'MA-1026',
    orderId: 'MA-1026',
    phone: '0651122334',
    customerName: 'Youssef Naciri',
    city: 'Marrakech',
    address: 'Quartier Guéliz, Rue de la Liberté, Appt 12, Imm. Ryad',
    currentStage: 'out_for_delivery',
    courierName: 'Amana Express',
    courierPhone: '212661245787',
    courier: {
      ...COURIERS.amana,
      trackingId: 'AE-2024-88402',
    },
    estimatedDelivery: "Aujourd'hui entre 14:00 et 18:00",
    roastedDate: '2026-09-04T08:00:00Z',
    items: [
      { name: 'Éthiopie Sidamo Guji', grind: 'Whole Bean', quantity: 2, unitPrice: 95 },
    ],
    subtotal: 190,
    shipping: 30,
    totalMAD: 220,
    placedAt: '2026-09-04T09:00:00Z',
    statusHistory: buildHistory('out_for_delivery', '2026-09-04T09:00:00Z'),
  },

  // ── Stage 4: delivered ─────────────────────────────────────────────────
  {
    id: 'MA-1027',
    orderId: 'MA-1027',
    phone: '0612987654',
    customerName: 'Nadia Cherkaoui',
    city: 'Tanger',
    address: '33 Bd Pasteur, Appt 8, Centre Ville',
    currentStage: 'delivered',
    courierName: "Rib'al-Barid (Poste Maroc)",
    courierPhone: '212661245787',
    courier: {
      ...COURIERS.poste,
      trackingId: 'MA-POST-2024-7741',
    },
    estimatedDelivery: 'Livré le 5 sept. à 11:20',
    roastedDate: '2026-09-03T08:00:00Z',
    items: [
      { name: 'Salvador San Alberto', grind: 'Espresso', quantity: 1, unitPrice: 95 },
      { name: 'Colombia Huila Supremo', grind: 'Moka Pot (Fine)', quantity: 1, unitPrice: 110 },
      { name: 'Éthiopie Sidamo Guji', grind: 'V60 / Filter', quantity: 1, unitPrice: 95 },
    ],
    subtotal: 300,
    shipping: 0,    // Free shipping — above 300 MAD threshold
    totalMAD: 300,
    placedAt: '2026-09-03T16:45:00Z',
    statusHistory: buildHistory('delivered', '2026-09-03T16:45:00Z'),
  },
];

// ── Lookup Helpers ─────────────────────────────────────────────────────────

/** Strip all spaces and dashes from a phone string for consistent comparison */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-]/g, '');
}

/**
 * Look up a mock order by Order ID (exact) or Moroccan phone number.
 *
 * Matching strategy for phone:
 *  1. Full normalized match (e.g. "0661234567" === "0661234567")
 *  2. Suffix match on last 8 digits (handles +212 prefix variants)
 *
 * @param query  Order ID string (e.g. "MA-1024") OR phone number
 * @returns      Matching MockOrder, or undefined if not found
 */
export function lookupOrder(query: string): MockOrder | undefined {
  const q = query.trim();
  if (!q) return undefined;

  // 1. Exact Order ID match (case-insensitive)
  const byId = MOCK_ORDERS.find(
    (o) => o.id.toLowerCase() === q.toLowerCase() || (o.orderId && o.orderId.toLowerCase() === q.toLowerCase())
  );
  if (byId) return byId;

  // 2. Phone number match
  const normalized = normalizePhone(q);
  return MOCK_ORDERS.find((o) => {
    const orderPhone = normalizePhone(o.phone);
    // Full match
    if (orderPhone === normalized) return true;
    // Suffix match — last 8 digits (handles +212 prefix)
    if (normalized.length >= 8 && orderPhone.endsWith(normalized.slice(-8))) return true;
    return false;
  });
}

/**
 * Attempt to auto-resolve an order from the browser's localStorage snapshot
 * (written by CheckoutPage on successful submission).
 *
 * @returns MockOrder-shaped partial from localStorage, or undefined
 */
export function resolveLastOrderFromStorage(): MockOrder | undefined {
  try {
    const raw = localStorage.getItem('coffeehouse_last_order');
    if (!raw) return undefined;
    const snap = JSON.parse(raw);

    // Try to find the matching mock order by generated code
    if (snap.orderCode) {
      const found = lookupOrder(snap.orderCode);
      if (found) return found;
    }

    // Fallback: try by phone from the stored form
    if (snap.form?.phone) {
      const found = lookupOrder(snap.form.phone);
      if (found) return found;
    }

    return undefined;
  } catch {
    return undefined;
  }
}
