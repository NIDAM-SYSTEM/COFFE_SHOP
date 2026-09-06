import type { Bundle, CoffeeProduct, BundleCoffeeOriginOption } from '../types';
import type { CartProduct } from '../types/coffeeHouse';

export const WHATSAPP_CONTACT_PHONE = '212600000000';

/**
 * Curated Equipment & Coffee Bundles (Task 18)
 * Designed specifically for Mouna to eliminate equipment anxiety,
 * compatibility guesswork, and grind confusion.
 */
export const BUNDLES: Bundle[] = [
  {
    id: 'moka-starter-kit',
    title: 'The Moka Kit',
    slug: 'the-moka-kit',
    price: 220,
    originalPrice: 260,
    savingsAmount: 40,
    savingsPercent: 15,
    description:
      "L'essence du café à l'italienne sans amertume : cafetière Moka 3 tasses en aluminium alimentaire, notre café Salvador San Alberto moulu avec précision fine pour panier Moka, et la fiche recette avec ratios cuillères/eau.",
    difficulty: 'Débutant / Facile',
    equipmentIncluded: [
      'Cafetière Italienne 3 Tasses Aluminium (Qualité alimentaire)',
      'Panier filtre inox & joint d’étanchéité silicone haute durabilité',
      'Fiche Recette Plastifiée Ratios Cuillères & Température d’eau',
    ],
    coffeeIncluded: '250g Salvador San Alberto (Single Estate Bourbon)',
    grindCalibration: 'Mouture Fine Spéciale Moka (Pas de sur-extraction ni amertume)',
    image: '/images/products/moka-coffee.png',
    badge: 'Pack Éco -15%',
    tagline: 'Le rituel italien authentique sur votre plaque de cuisson',
    color: '#DE9839',
    whatsAppMessage:
      'Salam NIDAM Coffee, je souhaite commander The Moka Kit (220 MAD) avec paiement à la livraison (COD).',
    inStock: true,
    breakdown: [
      {
        name: 'Cafetière Moka 3 Tasses Aluminium',
        detail: 'Valeur 140 MAD',
        category: 'equipment',
      },
      {
        name: '250g Salvador San Alberto (Mouture Fine)',
        detail: 'Valeur 95 MAD',
        category: 'coffee',
      },
      {
        name: 'Fiche Guide & Ratios Cuillères NIDAM',
        detail: 'Valeur 25 MAD (Offert)',
        category: 'guide',
      },
    ],
  },
  {
    id: 'pour-over-starter-kit',
    title: 'The Pour-Over Kit',
    slug: 'the-pour-over-kit',
    price: 260,
    originalPrice: 310,
    savingsAmount: 50,
    savingsPercent: 16,
    description:
      'Pour les amateurs d’arômes purs et floraux : dripper conique Hario V60 Taille 02 en résine thermique, paquet de 40 filtres coniques non blanchis, et notre Éthiopie Sidamo Guji moulu médium pour un écoulement parfait en 3 minutes.',
    difficulty: 'Débutant / Facile',
    equipmentIncluded: [
      'Dripper Conique Hario V60 Plastique Taille 02 (Haute rétention thermique)',
      'Boîte de 40 filtres coniques en fibres naturelles non blanchies',
      'Fiche Guide Pas-à-Pas Pré-infusion & Spirale d’extraction',
    ],
    coffeeIncluded: '250g Éthiopie Sidamo Guji (Heirloom Bio)',
    grindCalibration: 'Mouture Médium Pour-Over (Écoulement fluide régulier en 3:00 min)',
    image: '/images/products/special-coffee.png',
    badge: 'Best-Seller -16%',
    tagline: 'Clarté aromatique exceptionnelle et arômes floraux sans amertume',
    color: '#EFAE54',
    whatsAppMessage:
      'Salam NIDAM Coffee, je souhaite commander The Pour-Over Kit (260 MAD) avec paiement à la livraison (COD).',
    inStock: true,
    breakdown: [
      {
        name: 'Dripper Hario V60 02 Plastique',
        detail: 'Valeur 130 MAD',
        category: 'equipment',
      },
      {
        name: '40 Filtres Papier Coniques Hario',
        detail: 'Valeur 45 MAD',
        category: 'equipment',
      },
      {
        name: '250g Éthiopie Sidamo Guji (Mouture Filtre)',
        detail: 'Valeur 110 MAD',
        category: 'coffee',
      },
      {
        name: 'Fiche Guide Spirale & Température',
        detail: 'Valeur 25 MAD (Offert)',
        category: 'guide',
      },
    ],
    availableCoffeeOrigins: [
      {
        id: 'ethiopia-sidamo-guji',
        name: 'Éthiopie Sidamo Guji',
        origin: 'Éthiopie (2,100 MASL)',
        notes: 'Bergamote, Pêche & Jasmin',
        roastProfile: 'Light Roast',
      },
      {
        id: 'salvador-san-alberto',
        name: 'Salvador San Alberto',
        origin: 'El Salvador (1,600 MASL)',
        notes: 'Chocolat Noir & Prune Rouge',
        roastProfile: 'Medium Roast',
      },
      {
        id: 'colombia-huila-supremo',
        name: 'Colombia Huila Supremo',
        origin: 'Colombie (1,750 MASL)',
        notes: 'Caramel Toffee & Pomme Rouge',
        roastProfile: 'Medium Roast',
      },
    ],
  },
  {
    id: 'home-barista-starter-kit',
    title: 'The Home Barista Kit',
    slug: 'the-home-barista-kit',
    price: 450,
    originalPrice: 530,
    savingsAmount: 80,
    savingsPercent: 15,
    description:
      'Le niveau supérieur du café fraîchement moulu : moulin manuel haute précision Timemore C2 à meules coniques acier inox, associé à 250g de café en grains Sélection du Torréfacteur et le guide de calibration des crans.',
    difficulty: 'Intermédiaire',
    equipmentIncluded: [
      'Moulin Manuel Timemore C2 (Meules coniques acier inox CNC 38mm)',
      'Pinceau de nettoyage double poil & pochette de transport voyage',
      'Fiche de Calibration des Clics (Moka, V60, Espresso, French Press)',
    ],
    coffeeIncluded: '250g Sélection du Torréfacteur (Grains Entiers Frais)',
    grindCalibration: 'Grains Entiers (Calibration libre au clic selon votre machine)',
    image: '/images/products/machine-burr-grinder.png',
    badge: 'Coup de Cœur -15%',
    tagline: 'La fraîcheur absolue du café moulu à la demande par vos soins',
    color: '#7C3AED',
    whatsAppMessage:
      'Salam NIDAM Coffee, je souhaite commander The Home Barista Kit (450 MAD) avec paiement à la livraison (COD).',
    inStock: true,
    breakdown: [
      {
        name: 'Moulin Manuel Timemore C2 Meules Inox',
        detail: 'Valeur 410 MAD',
        category: 'equipment',
      },
      {
        name: '250g Grains Entiers Sélection Torréfacteur',
        detail: 'Valeur 95 MAD',
        category: 'coffee',
      },
      {
        name: 'Guide Clics & Calibration Barista',
        detail: 'Valeur 25 MAD (Offert)',
        category: 'guide',
      },
    ],
  },
];

// Lookup Helpers
export function getAllBundles(): Bundle[] {
  return BUNDLES;
}

export function getBundleById(id: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === id || b.slug === id);
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug || b.id === slug);
}

/**
 * Converts a Bundle into a compliant CoffeeProduct payload
 * ensuring 100% type-safe interoperability with useCart.addItem().
 */
export function bundleToCartPayload(
  bundle: Bundle,
  selectedOrigin?: BundleCoffeeOriginOption
): CoffeeProduct {
  const customOriginId = selectedOrigin ? `-${selectedOrigin.id}` : '';
  const coffeeName = selectedOrigin ? selectedOrigin.name : bundle.coffeeIncluded;
  const originSubtitle = selectedOrigin
    ? `Kit Complet • 250g ${selectedOrigin.name} (${selectedOrigin.notes})`
    : 'Starter Kit Tout-en-Un (Matériel + Café + Recette)';

  return {
    id: `bundle-${bundle.id}${customOriginId}`,
    slug: bundle.slug,
    name: selectedOrigin
      ? `${bundle.title} (${selectedOrigin.name})`
      : `${bundle.title} (Starter Kit)`,
    subName: originSubtitle,
    origin: selectedOrigin ? selectedOrigin.origin : 'Kit Débutant Complet',
    roastProfile: selectedOrigin?.roastProfile === 'Light Roast' ? 'Light' : 'Medium',
    roastLevel: selectedOrigin?.roastProfile === 'Light Roast' ? 'Light' : 'Medium',
    processingMethod: 'Washed',
    process: 'Kit Matériel & Café',
    flavorCategory: 'Sweet Caramel',
    flavorTags: ['Starter Kit', 'Matériel Inclus', selectedOrigin ? selectedOrigin.name : 'Pack Éco'],
    tastingNotes: selectedOrigin ? [selectedOrigin.notes] : ['Équilibré', 'Idéal Débutant'],
    sensoryNotes: bundle.description,
    plainProfile: selectedOrigin
      ? `${selectedOrigin.name} (${selectedOrigin.notes}) • ${bundle.grindCalibration}`
      : bundle.grindCalibration,
    altitude: selectedOrigin ? selectedOrigin.origin : 'Sélection Spéciale NIDAM',
    lotCode: `KIT-${bundle.id.toUpperCase()}${selectedOrigin ? `-${selectedOrigin.id.substring(0, 4).toUpperCase()}` : ''}`,
    farm: 'NIDAM Roastery Curation',
    varietal: 'Arabica de Spécialité',
    harvestYear: '2024',
    scaScore: 86.5,
    price1kg: bundle.price,
    availableGrinds: ['Whole Bean', 'Moka Pot (Fine)', 'V60 / Filter'],
    recommendedMethods: ['Moka Pot', 'Drip / V60', 'French Press'],
    roastDate: 'Torréfié cette semaine',
    roastDay: 'MON',
    price: bundle.price,
    weightGrams: 250,
    category: 'starter-kit',
    badge: `Économisez ${bundle.savingsPercent}%`,
    color: bundle.color || '#EFAE54',
    image: bundle.image,
    recipeGuide: {
      recommendedMethod: bundle.title,
      ratioSpoons: '2 cuillères bombées = 15g',
      ratioGrams: '15g pour 250ml',
      waterAmount: '250ml',
      waterTemp: '92°C',
      brewTime: '3:00 - 4:00',
      grindRecommended: bundle.grindCalibration,
      steps: [
        {
          stepNumber: 1,
          title: 'Mise en place',
          instruction: "Installer le matériel et préchauffer à l'eau tiède.",
        },
        {
          stepNumber: 2,
          title: 'Dosage du café pré-calibré',
          instruction: 'Ajouter le café sans tasser dans le panier ou filtre.',
        },
        {
          stepNumber: 3,
          title: 'Extraction & Dégustation',
          instruction: 'Verser et déguster immédiatement dans une tasse préchauffée.',
        },
      ],
    },
  };
}

/**
 * Converts a Bundle into a CartProduct for global App.tsx / CartDrawer compatibility.
 */
export function bundleToCartProduct(
  bundle: Bundle,
  selectedOrigin?: BundleCoffeeOriginOption
): CartProduct {
  const customOriginId = selectedOrigin ? `-${selectedOrigin.id}` : '';
  const coffeeName = selectedOrigin ? selectedOrigin.name : bundle.coffeeIncluded;
  return {
    id: `bundle-${bundle.id}${customOriginId}`,
    name: selectedOrigin
      ? `${bundle.title} (${selectedOrigin.name})`
      : `${bundle.title} (Starter Kit)`,
    price: bundle.price,
    quantity: 1,
    image: bundle.image,
    sub: `${coffeeName} • ${bundle.grindCalibration}`,
  };
}

/**
 * Generates a pre-formatted direct WhatsApp deep link with COD order text.
 */
export function generateBundleWhatsAppUrl(
  bundle: Bundle,
  selectedOrigin?: BundleCoffeeOriginOption
): string {
  const originText = selectedOrigin ? ` (Café sélectionné: ${selectedOrigin.name})` : '';
  const message = `Salam NIDAM Coffee, je souhaite commander ${bundle.title}${originText} (${bundle.price} MAD) avec paiement cash à la livraison (COD). Contenu: ${bundle.coffeeIncluded}.`;
  return `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
}
