export type GrindOption =
  | 'Whole Bean'
  | 'Espresso'
  | 'Moka Pot (Fine)'
  | 'V60 / Filter'
  | 'French Press (Coarse)';

// Multi-Taxonomy Filter Engine Types
export type RoastProfile = 'Light' | 'Medium' | 'Medium-Dark';
export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';

export type ProcessMethod = 'Washed' | 'Natural' | 'Anaerobic Fermentation';

export type FlavorCategory = 'Chocolate & Nutty' | 'Fruity & Floral' | 'Sweet Caramel';

export type BrewMethodOption =
  | 'Whole Bean'
  | 'Espresso'
  | 'Moka Pot'
  | 'Drip / V60'
  | 'French Press';

export type ProductCategory = 'single-origin' | 'espresso' | 'starter-kit';

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface BrewRecipeGuide {
  recommendedMethod: string;
  ratioSpoons: string;
  ratioGrams: string;
  waterAmount: string;
  waterTemp: string;
  brewTime: string;
  grindRecommended: string;
  steps: RecipeStep[];
}

export interface AgronomySpecs {
  farm: string;
  farmName?: string;
  cooperative?: string;
  region?: string;
  varietal: string;
  harvestYear: string;
  harvestSeason?: string;
  altitude: string;
  scaScore: number;
  fermentationTime: string;
  dryingMethod?: string;
}

export interface CoffeeProduct {
  id: string;
  slug: string;
  name: string;
  subName: string;
  origin: string;
  region?: string;
  roastProfile: RoastProfile;
  roastLevel: RoastLevel;
  processingMethod: ProcessMethod;
  process: string;
  flavorCategory: FlavorCategory;
  flavorTags: string[];
  tastingNotes: string[];
  sensoryNotes: string;
  plainProfile: string;
  altitude: string;
  lotCode: string;
  farm: string;
  farmName?: string;
  varietal: string;
  harvestYear: string;
  harvestSeason?: string;
  scaScore: number;
  price1kg: number;
  availableGrinds: GrindOption[];
  recommendedMethods: BrewMethodOption[];
  roastDate: string;
  roastDay: string;
  price: number;
  weightGrams: number;
  category: ProductCategory;
  badge?: string;
  color: string;
  image?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  recipeGuide: BrewRecipeGuide;
  agronomySpecs?: AgronomySpecs;
}

export type CatalogSortOption = 'featured' | 'price-asc' | 'price-desc' | 'roast-date';

export interface CatalogFilterState {
  roastProfiles: RoastProfile[];
  processingMethods: ProcessMethod[];
  flavorCategories: FlavorCategory[];
  brewMethods: BrewMethodOption[];
  searchQuery: string;
  sortBy: CatalogSortOption;
}

export interface CartItem {
  product: CoffeeProduct;
  selectedGrind: GrindOption;
  quantity: number;
}

export interface StarterBundle {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  contents: string[];
  coffeeId: string;
  grind: GrindOption;
  tagline: string;
  color: string;
}

// ── Curated Equipment & Coffee Bundle Types (Task 18) ──
export type KitDifficulty = 'Débutant / Facile' | 'Intermédiaire' | 'Tous Niveaux';

export interface BundleBreakdownItem {
  name: string;
  detail: string;
  category: 'equipment' | 'coffee' | 'guide';
}

export interface BundleCoffeeOriginOption {
  id: string;
  name: string;
  origin: string;
  notes: string;
  roastProfile: string;
}

export interface Bundle {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  savingsAmount: number;
  savingsPercent: number;
  description: string;
  difficulty: KitDifficulty;
  equipmentIncluded: string[];
  coffeeIncluded: string;
  grindCalibration: string;
  image: string;
  badge?: string;
  tagline?: string;
  color?: string;
  whatsAppMessage?: string;
  inStock?: boolean;
  breakdown?: BundleBreakdownItem[];
  availableCoffeeOrigins?: BundleCoffeeOriginOption[];
}

export type CoffeeBundle = Bundle;

export type BrewMethod =
  | 'Italian Moka Pot'
  | 'French Press'
  | 'Pour-Over / Filter'
  | 'Espresso Machine'
  | "I don't have gear yet";

export type TastePreference =
  | 'Rich Dark Chocolate & Caramel (Low Acidity)'
  | 'Bright, Fruity & Floral'
  | 'Smooth Morning Balance';

export type GrindChoice = 'Pre-grind for my machine (Recommended)' | 'Whole Bean (I have a grinder)';

export interface FinderStep {
  step: 1 | 2 | 3;
  brewMethod?: BrewMethod;
  tastePreference?: TastePreference;
  grindChoice?: GrindChoice;
}

export type CategoryFilter = 'all' | ProductCategory;

export interface WholesaleFormData {
  cafeName: string;
  city: string;
  whatsapp: string;
  monthlyVolume: string;
}

// ── Phase 8: Checkout Types ────────────────────────────────────────────────

/**
 * Payment method options available at checkout.
 * 'cod'  = Cash on Delivery (default, always enabled)
 * 'cmi'  = Moroccan CMI card (coming soon, rendered disabled)
 */
export type PaymentMethod = 'cod' | 'cmi';

/**
 * All form fields captured during the Moroccan express checkout.
 * City value strings match MoroccanCityEntry.value in moroccanCities.ts.
 */
export interface CheckoutFormData {
  /** Full name of the recipient (Nom & Prénom) */
  fullName: string;
  /** Moroccan WhatsApp/mobile number, validated via isMoroccanMobile() */
  phone: string;
  /** MoroccanCityEntry.value string (slug format e.g. 'casablanca') */
  city: string;
  /** Street address, neighbourhood, landmark */
  quartierAddress: string;
  /** Optional instructions for the courier */
  deliveryNotes: string;
  /** Selected payment method; defaults to 'cod' */
  paymentMethod: PaymentMethod;
}

/**
 * Maps each CheckoutFormData field to an optional error message.
 * Undefined / empty string means the field is valid.
 */
export interface CheckoutFormErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  quartierAddress?: string;
  deliveryNotes?: string;
  paymentMethod?: string;
}

/** Factory that returns a blank, valid initial checkout form state */
export function createEmptyCheckoutForm(): CheckoutFormData {
  return {
    fullName: '',
    phone: '',
    city: '',
    quartierAddress: '',
    deliveryNotes: '',
    paymentMethod: 'cod',
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  tag: 'Connoisseur' | 'Beginner' | 'Cafe Partner';
}

// ── Phase 9: Order Tracking Types ──────────────────────────────────────────

/**
 * 4-stage forward-only Moroccan COD delivery pipeline.
 * Note: 'dispatched_hub' used in implementation (matches user spec);
 * PROJECT_MAP also references 'dispatched' — both are aliased here.
 */
export type DeliveryStage =
  | 'confirmed'         // Commande confirmée & torréfaction en cours
  | 'dispatched_hub'    // Remis au livreur / hub régional
  | 'out_for_delivery'  // En cours de livraison locale
  | 'delivered';        // Livré & COD encaissé

/** Ordered array of stages for stepper index lookups */
export const DELIVERY_STAGES: DeliveryStage[] = [
  'confirmed',
  'dispatched_hub',
  'out_for_delivery',
  'delivered',
];

/** Display metadata for each delivery stage */
export interface StageConfig {
  label: string;
  sublabel: string;
  /** Lucide icon name (string — component resolves at render time) */
  iconName: string;
  /** Tailwind color token class for active state */
  activeColor: string;
}

export const STAGE_CONFIG: Record<DeliveryStage, StageConfig> = {
  confirmed: {
    label: 'Commande Confirmée',
    sublabel: 'Torréfaction & mouture en cours au labo Casablanca',
    iconName: 'ClipboardCheck',
    activeColor: 'text-amber-400',
  },
  dispatched_hub: {
    label: 'Remis au Livreur',
    sublabel: 'Sachet scellé pris en charge par le coursier régional',
    iconName: 'PackageCheck',
    activeColor: 'text-blue-400',
  },
  out_for_delivery: {
    label: 'En Cours de Livraison',
    sublabel: 'Livreur en route vers votre adresse',
    iconName: 'Truck',
    activeColor: 'text-orange-400',
  },
  delivered: {
    label: 'Livré & Encaissé',
    sublabel: 'Paiement Cash à la livraison validé — Bon café !',
    iconName: 'BadgeCheck',
    activeColor: 'text-emerald-400',
  },
};

/** Moroccan courier company metadata */
export interface CourierInfo {
  /** Display name, e.g. 'Amana Express' */
  name: string;
  /** Courier's own parcel tracking reference (if available) */
  trackingId?: string;
  /** Deep link to courier's own tracking portal */
  trackingUrl?: string;
  /**
   * WhatsApp number for order coordination.
   * In production this is the store's dispatch number, not the driver's personal number.
   */
  whatsAppNumber: string;
  /** Tailwind background color class for the courier badge chip */
  logoColor: string;
}

/** Single line item inside a mock order */
export interface MockOrderItem {
  name: string;
  grind: string;
  quantity: number;
  unitPrice: number;
}

/** Full mock order record — the shape returned by lookupOrder() */
export interface MockOrder {
  /** App-generated order code, e.g. 'MA-1024' or 'CH-M7X4Q2-A3F' */
  id: string;
  orderId: string;
  /** Customer's Moroccan WhatsApp number (used as secondary lookup key) */
  phone: string;
  customerName: string;
  city: string;
  address: string;
  /** Current position in the 4-stage pipeline */
  currentStage: DeliveryStage;
  courier: CourierInfo;
  courierName: string;
  courierPhone: string;
  /** Human-readable ETA, e.g. "Aujourd'hui entre 14:00 et 18:00" */
  estimatedDelivery: string;
  /** ISO date string of the roast batch */
  roastedDate: string;
  items: MockOrderItem[];
  subtotal: number;
  shipping: number;
  /** Total COD amount due to the courier in MAD */
  totalMAD: number;
  /** ISO datetime when the order was placed */
  placedAt: string;
  /** Chronological log of completed stage transitions */
  statusHistory: { stage: DeliveryStage; timestamp: string }[];
}
