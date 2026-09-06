/**
 * moroccanCities.ts — Phase 8: Checkout Data Layer
 *
 * Provides:
 *  - MOROCCAN_CITIES: structured city list with SLA zone & delivery estimate
 *  - Phone validation helper for Moroccan mobiles
 *  - Shipping fee & subtotal calculation helpers
 */

// ── Types ──────────────────────────────────────────────────────────────────

/** Delivery SLA zone (mirrors MoroccoDeliveryMap.tsx zones) */
export type SlaZone = 1 | 2 | 3;

export interface MoroccanCityEntry {
  /** Display name shown in dropdown */
  name: string;
  /** Internal value used in form state */
  value: string;
  /** SLA zone: 1 = 24h, 2 = 48h, 3 = 48–72h */
  slaZone: SlaZone;
  /** Human-readable delivery estimate shown next to city name */
  deliveryEstimate: string;
}

// ── City Data ──────────────────────────────────────────────────────────────

/**
 * All major Moroccan cities grouped by delivery SLA zone.
 * Zone 1 → Zone 2 → Zone 3 ordering enables UX grouping via <optgroup>.
 */
export const MOROCCAN_CITIES: MoroccanCityEntry[] = [
  // ── Zone 1: Grand Casablanca–Settat & Rabat–Salé–Kénitra (24h) ──────────
  { name: 'Casablanca',  value: 'casablanca',  slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Rabat',       value: 'rabat',       slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Salé',        value: 'sale',        slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Témara',      value: 'temara',      slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Mohammedia',  value: 'mohammedia',  slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Kénitra',     value: 'kenitra',     slaZone: 1, deliveryEstimate: '24h' },
  { name: 'El Jadida',   value: 'el-jadida',   slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Berrechid',   value: 'berrechid',   slaZone: 1, deliveryEstimate: '24h' },
  { name: 'Settat',      value: 'settat',      slaZone: 1, deliveryEstimate: '24h' },

  // ── Zone 2: Major regional capitals (48h) ───────────────────────────────
  { name: 'Marrakech',   value: 'marrakech',   slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Tanger',      value: 'tanger',      slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Fès',         value: 'fes',         slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Meknès',      value: 'meknes',      slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Agadir',      value: 'agadir',      slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Oujda',       value: 'oujda',       slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Tétouan',     value: 'tetouan',     slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Nador',       value: 'nador',       slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Béni Mellal', value: 'beni-mellal', slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Khouribga',   value: 'khouribga',   slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Safi',        value: 'safi',        slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Essaouira',   value: 'essaouira',   slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Khémisset',   value: 'khemisset',   slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Taounate',    value: 'taounate',    slaZone: 2, deliveryEstimate: '48h' },
  { name: 'Ifrane',      value: 'ifrane',      slaZone: 2, deliveryEstimate: '48h' },

  // ── Zone 3: Southern provinces & remote areas (48–72h) ──────────────────
  { name: 'Laâyoune',    value: 'laayoune',    slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Dakhla',      value: 'dakhla',      slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Guelmim',     value: 'guelmim',     slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Errachidia',  value: 'errachidia',  slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Ouarzazate',  value: 'ouarzazate',  slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Zagora',      value: 'zagora',      slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Tiznit',      value: 'tiznit',      slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Tan-Tan',     value: 'tan-tan',     slaZone: 3, deliveryEstimate: '48–72h' },
  { name: 'Smara',       value: 'smara',       slaZone: 3, deliveryEstimate: '48–72h' },
];

/** Zones grouped for <optgroup> rendering */
export const CITY_ZONE_LABELS: Record<SlaZone, string> = {
  1: '⚡ Zone 1 — Livraison 24h',
  2: '🚚 Zone 2 — Livraison 48h',
  3: '📦 Zone 3 — Livraison 48–72h',
};

// ── Lookup Helpers ─────────────────────────────────────────────────────────

/** Find a city entry by its value string */
export function getCityByValue(value: string): MoroccanCityEntry | undefined {
  return MOROCCAN_CITIES.find((c) => c.value === value);
}

/** Get all cities for a specific SLA zone */
export function getCitiesByZone(zone: SlaZone): MoroccanCityEntry[] {
  return MOROCCAN_CITIES.filter((c) => c.slaZone === zone);
}

// ── Phone Validation ───────────────────────────────────────────────────────

/**
 * Moroccan mobile number validator.
 *
 * Accepts:
 *  - Local format:       06XXXXXXXX | 07XXXXXXXX  (10 digits)
 *  - International:   +2126XXXXXXXX | +2127XXXXXXXX
 *  - With spaces/dashes: 06 12 34 56 78 | 06-12-34-56-78
 */
export const MOROCCAN_MOBILE_REGEX =
  /^(?:\+212|0)(6|7)[\s\-]?(\d{2}[\s\-]?){4}$/;

export function isMoroccanMobile(phone: string): boolean {
  return MOROCCAN_MOBILE_REGEX.test(phone.trim());
}

/** Normalize a phone number to international format for WhatsApp links */
export function normalizeToWhatsApp(phone: string): string {
  const cleaned = phone.replace(/[\s\-]/g, '');
  if (cleaned.startsWith('+212')) return cleaned;
  if (cleaned.startsWith('0')) return `+212${cleaned.slice(1)}`;
  return cleaned;
}

// ── Shipping & Order Calculation Helpers ───────────────────────────────────

/** Free shipping threshold in MAD — orders at or above this value ship free */
export const FREE_SHIPPING_THRESHOLD_MAD = 300;

/** Standard shipping fee in MAD (applied below threshold) */
export const STANDARD_SHIPPING_FEE_MAD = 30;

/**
 * Calculate shipping fee based on order subtotal.
 * Returns 0 if subtotal meets or exceeds the free-shipping threshold.
 */
export function calculateShippingFee(subtotalMad: number): number {
  return subtotalMad >= FREE_SHIPPING_THRESHOLD_MAD ? 0 : STANDARD_SHIPPING_FEE_MAD;
}

/** Returns a human-readable shipping label for display in OrderSummaryCard */
export function getShippingLabel(subtotalMad: number): string {
  return subtotalMad >= FREE_SHIPPING_THRESHOLD_MAD
    ? 'Gratuit 🎉'
    : `${STANDARD_SHIPPING_FEE_MAD} MAD`;
}

/**
 * Calculate the full order total.
 * @param subtotal  Sum of (item.price × item.quantity) for all cart items
 * @returns         { shipping, total }
 */
export function calculateOrderTotals(subtotal: number): {
  shipping: number;
  total: number;
} {
  const shipping = calculateShippingFee(subtotal);
  return { shipping, total: subtotal + shipping };
}

/**
 * Build the pre-filled WhatsApp message body for order confirmation.
 * Each cart item line follows the pattern: "{qty}× {name} ({grind}) — {price} MAD"
 */
export interface OrderLineItem {
  name: string;
  grind: string;
  quantity: number;
  unitPrice: number;
}

export function buildWhatsAppOrderMessage(params: {
  orderCode: string;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  fullName: string;
  address: string;
  city: string;
  whatsapp: string;
}): string {
  const { orderCode, items, subtotal, shipping, total, fullName, address, city, whatsapp } = params;

  const itemLines = items
    .map(
      (item) =>
        `  • ${item.quantity}× ${item.name} (${item.grind}) — ${item.unitPrice * item.quantity} MAD`
    )
    .join('\n');

  const shippingLine = shipping === 0 ? 'Gratuit 🎉' : `${shipping} MAD`;

  return (
    `Salam NIDAM Coffee 👋,\n` +
    `Nouvelle commande #${orderCode} :\n\n` +
    `${itemLines}\n\n` +
    `Sous-total : ${subtotal} MAD\n` +
    `Livraison  : ${shippingLine}\n` +
    `Total      : ${total} MAD\n\n` +
    `📍 Livraison à :\n` +
    `  ${fullName}\n` +
    `  ${address}, ${city}\n` +
    `  WhatsApp : ${whatsapp}\n\n` +
    `💳 Paiement : Cash à la livraison ✅`
  );
}
