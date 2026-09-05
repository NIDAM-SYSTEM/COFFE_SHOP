export type GrindOption =
  | 'Whole Bean'
  | 'Moka Pot (Fine)'
  | 'V60 / Filter'
  | 'French Press (Coarse)';

export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';

export type ProductCategory = 'single-origin' | 'espresso' | 'starter-kit';

export interface CoffeeProduct {
  id: string;
  name: string;
  subName: string;
  origin: string;
  roastLevel: RoastLevel;
  tastingNotes: string[];
  plainProfile: string;
  altitude: string;
  process: string;
  roastDate: string;
  roastDay: string;
  price: number;
  weightGrams: number;
  recommendedMethods: string[];
  category: ProductCategory;
  badge?: string;
  color: string; // bag visual accent color for display
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

export type MoroccanCity =
  | 'Casablanca'
  | 'Rabat'
  | 'Marrakech'
  | 'Tangier'
  | 'Agadir'
  | 'Fes'
  | 'Meknes'
  | 'Oujda'
  | 'Other';

export interface CheckoutFormData {
  fullName: string;
  whatsapp: string;
  city: MoroccanCity | '';
  address: string;
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
