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
