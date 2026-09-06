import { MenuItem, ProcessNode, ReviewItem } from '../types/coffeeHouse';

export const PROCESS_NODES: ProcessNode[] = [
  {
    id: 1,
    title: 'Dried Pure Instant Coffee',
    description: 'Carefully harvested high-elevation beans gently dried to lock in raw aromatic compounds.',
    image: '/images/process-step-1.jpg',
    badge: '01',
  },
  {
    id: 2,
    title: 'Roasted & Grounded Coffee',
    description: 'Master slow-batch drum roasting ground to micron-level precision for balanced extraction.',
    image: '/images/process-step-2.jpg',
    badge: '02',
  },
  {
    id: 3,
    title: 'Rich Aroma Instant Coffee',
    description: 'Freshly brewed and served with golden caramel crema and rich invigorating fragrance.',
    image: '/images/process-step-3.jpg',
    badge: '03',
  },
];

export const POPULAR_MENU_ITEMS: MenuItem[] = [
  // -------------------------------------------------------------
  // 1. COFFEE TAB (Specialty Roasted Bags - Matching Pic 02)
  // -------------------------------------------------------------
  {
    id: 'moka-coffee',
    name: 'Moka Specialty Roast',
    sub: '100% Arabica, Single Estate Heirloom, 250g Whole Bean',
    price: 52.0,
    category: 'Coffee',
    pastelColor: '#93B4F8', // Soft Blue
    image: '/images/products/moka-coffee.png',
    rating: 4.9,
  },
  {
    id: 'special-coffee',
    name: 'Special House Blend',
    sub: 'Master Roaster Private Reserve, 250g Whole Bean',
    price: 48.0,
    category: 'Coffee',
    pastelColor: '#7CD5A9', // Mint Green
    image: '/images/products/special-coffee.png',
    rating: 5.0,
  },
  {
    id: 'arabian-coffee',
    name: 'Arabian Heritage Roast',
    sub: 'Warm Cardamom Nuance & Velvet Crema, 250g Whole Bean',
    price: 50.0,
    category: 'Coffee',
    pastelColor: '#F7B58D', // Soft Peach
    image: '/images/products/arabian-coffee.png',
    rating: 4.8,
  },
  {
    id: 'salvador-coffee',
    name: 'Salvador San Alberto',
    sub: 'Single Estate Washed Bourbon, 250g Whole Bean (Pic 02)',
    price: 55.0,
    category: 'Coffee',
    pastelColor: '#6FE1EC', // Soft Cyan
    image: '/images/products/salvador-coffee.png',
    rating: 5.0,
  },
  {
    id: 'ethiopian-coffee',
    name: 'Ethiopian Yirgacheffe',
    sub: 'Floral Jasmine & Sweet Bergamot Citrus, 250g Whole Bean',
    price: 54.0,
    category: 'Coffee',
    pastelColor: '#FDEED9', // Champagne Warm
    image: '/images/products/ethiopian-coffee.png',
    rating: 4.9,
  },
  {
    id: 'colombian-coffee',
    name: 'Colombian Supremo',
    sub: 'Slow Drum Roasted Cacao & Toffee Notes, 250g Whole Bean',
    price: 46.0,
    category: 'Coffee',
    pastelColor: '#D8D3F8', // Soft Lavender
    image: '/images/products/colombian-coffee.png',
    rating: 4.9,
  },

  // -------------------------------------------------------------
  // 2. TEA TAB (Artisan Tea Tins & Canisters)
  // -------------------------------------------------------------
  {
    id: 'tea-jasmine',
    name: 'Royal Jasmine Green Tea',
    sub: 'Imperial Jade Reserve scented with fresh night jasmine, 100g',
    price: 38.0,
    category: 'Tea',
    pastelColor: '#7CD5A9',
    image: '/images/products/tea-jasmine.png',
    rating: 4.9,
  },
  {
    id: 'tea-earl-grey',
    name: 'Imperial Earl Grey Reserve',
    sub: 'Darjeeling First Flush with Italian Calabrian bergamot, 100g',
    price: 36.0,
    category: 'Tea',
    pastelColor: '#93B4F8',
    image: '/images/products/tea-earl-grey.png',
    rating: 4.8,
  },
  {
    id: 'tea-matcha',
    name: 'Ceremonial Uji Matcha',
    sub: 'First Harvest stone-ground Japanese ceremonial grade, 50g',
    price: 48.0,
    category: 'Tea',
    pastelColor: '#A8E6CF',
    image: '/images/products/tea-matcha.png',
    rating: 5.0,
  },
  {
    id: 'tea-moroccan-mint',
    name: 'Moroccan Spearmint Tea',
    sub: 'Organic Gunpowder green tea blended with sweet Nanah mint, 100g',
    price: 34.0,
    category: 'Tea',
    pastelColor: '#6FE1EC',
    image: '/images/products/tea-moroccan-mint.png',
    rating: 4.7,
  },

  // -------------------------------------------------------------
  // 3. COOKIES TAB (Fresh Artisan Gourmet Cookies)
  // -------------------------------------------------------------
  {
    id: 'cookie-dark-choco',
    name: 'Chunky Dark Chocolate Cookie',
    sub: 'Valrhona 70% dark chocolate pools with Maldon sea salt flakes',
    price: 18.0,
    category: 'Cookies',
    pastelColor: '#F7B58D',
    image: '/images/products/cookie-dark-choco.png',
    rating: 5.0,
  },
  {
    id: 'cookie-caramel-macadamia',
    name: 'Salted Caramel Macadamia',
    sub: 'Toasted Queensland macadamias and slow-simmered butter caramel',
    price: 20.0,
    category: 'Cookies',
    pastelColor: '#FDEED9',
    image: '/images/products/cookie-caramel-macadamia.png',
    rating: 4.9,
  },
  {
    id: 'cookie-double-fudge',
    name: 'Double Belgian Fudge Cookie',
    sub: 'Decadent molten dark fudge center with bittersweet Dutch cocoa',
    price: 19.0,
    category: 'Cookies',
    pastelColor: '#93B4F8',
    image: '/images/products/cookie-double-fudge.png',
    rating: 4.8,
  },
  {
    id: 'cookie-butter-shortbread',
    name: 'Artisan Butter Shortbread',
    sub: 'Traditional golden flaky Scottish recipe with Bourbon vanilla',
    price: 16.0,
    category: 'Cookies',
    pastelColor: '#7CD5A9',
    image: '/images/products/cookie-butter-shortbread.png',
    rating: 4.9,
  },

  // -------------------------------------------------------------
  // 4. COFFEE MACHINES TAB (Professional Equipment)
  // -------------------------------------------------------------
  {
    id: 'machine-barista-pro',
    name: 'Barista Pro Dual Boiler',
    sub: 'Stainless steel PID commercial dual boiler with wooden handles',
    price: 850.0,
    category: 'Coffee Machines',
    pastelColor: '#93B4F8',
    image: '/images/products/machine-barista-pro.png',
    rating: 5.0,
  },
  {
    id: 'machine-retro-lever',
    name: 'Retro Lever Espresso Machine',
    sub: 'Handcrafted spring-piston manual lever for artisan extraction',
    price: 920.0,
    category: 'Coffee Machines',
    pastelColor: '#F7B58D',
    image: '/images/products/machine-retro-lever.png',
    rating: 4.9,
  },
  {
    id: 'machine-burr-grinder',
    name: 'Precision Conical Burr Grinder',
    sub: '64mm hardened steel burrs with 60 micro-stepped grind settings',
    price: 320.0,
    category: 'Coffee Machines',
    pastelColor: '#6FE1EC',
    image: '/images/products/machine-burr-grinder.png',
    rating: 4.8,
  },
  {
    id: 'machine-cold-brew-tower',
    name: 'Cold Brew Artisan Tower',
    sub: 'Architectural borosilicate glassware with precision brass dripper',
    price: 280.0,
    category: 'Coffee Machines',
    pastelColor: '#D8D3F8',
    image: '/images/products/machine-cold-brew-tower.png',
    rating: 4.9,
  },
];

export const DISH_DETAILS: Record<string, { title: string; description: string; pairing: string }> = {
  'Black Forest': {
    title: 'Decadent Black Forest Gateau',
    description: 'Layers of rich dark cocoa sponge infused with Morello sour cherries and fresh whipped chantilly cream. The deep cocoa nuances pair harmoniously with our Italian Roasted espresso.',
    pairing: 'Best paired with: Italian Roasted Coffee or Cortado',
  },
  Creame: {
    title: 'Velvety Cream Puffs & Crepes',
    description: 'Delicate light choux pastry filled with artisanal Madagascar bourbon bean pastry cream and finished with a dusting of roasted cocoa powder.',
    pairing: 'Best paired with: Americano or Flat White',
  },
  Tiramisu: {
    title: 'Traditional Italian Tiramisu',
    description: 'Made fresh every morning using imported Italian mascarpone, house-roasted espresso soak, and Savoiardi ladyfingers topped with bittersweet Dutch cocoa powder.',
    pairing: 'Best paired with: Affogato or Double Shot Espresso',
  },
};

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Erin Riel Madsen',
    handle: '@erinriel',
    quote: 'The ambiance combined with their rich caramel espresso makes this my ultimate morning sanctuary. Their specialty brew transformed my work routine completely.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'rev-2',
    name: 'Chance Herwitz',
    handle: '@chance_h',
    quote: 'Best coffee house experience in the city. The Italian roasted coffee paired with their fresh tiramisu cake gives the perfect smooth boost every morning.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'rev-3',
    name: 'Sophia Laurent',
    handle: '@sophialaurent',
    quote: 'Exceptional hospitality and unmatched coffee quality. The private room facilities are also ideal for deep focus work and intimate client meetings.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];
