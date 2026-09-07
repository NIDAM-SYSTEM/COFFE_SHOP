# Project Map: Coffee House Multi-Page Routing, Catalog Filter Engine & Dynamic PDP

## 1. Architectural Analysis & Routing Audit

### Current Stack
- **Framework**: React 19 (`^19.2.8`)
- **Build Tool**: Vite (`^8.2.2`)
- **Language**: TypeScript (`~6.0.2`)
- **Routing**: React Router DOM (`^7.18.3`) with `BrowserRouter` in `src/main.tsx`
- **Styling**: Tailwind CSS (`^3.4.19`) with custom theme tokens & Vanilla CSS (`src/index.css`)
- **Icons**: Lucide React (`^1.41.0`)

### Routing State
- **Active Routes**:
  - `/` $\rightarrow$ `LandingPage.tsx` (Hero, Featured Roasts, Feature Dishes, Popular Menu, Testimonials)
  - `/contact` $\rightarrow$ `ContactPage.tsx` (Responsive 2-column contact view with info cards & validated form)
  - `/shop` $\rightarrow$ `ShopPage.tsx` (Multi-Taxonomy Catalog & Origin Filter Engine)
  - `/shop/:slug` $\rightarrow$ `ProductDetailPage.tsx` (Dynamic Product Detail Page with Dual-Persona Resolution)
  - `/starter-kits` $\rightarrow$ `StarterKitsPage.tsx` (Curated Equipment & Coffee Bundles for Mouna with Origin Selector)
  - `/wholesale` $\rightarrow$ `WholesalePage.tsx` (B2B Cafe & Office Portal: Bulk Volume Tiers, Barista Calibration & Fiscal Compliance)
  - `/roastery-freshness` $\rightarrow$ `RoasteryFreshnessPage.tsx` (SLA & Roasting Schedule: Freshness Calendar, Delivery Map, COD Inspection Policy)
  - `/checkout` $\rightarrow$ `CheckoutPage.tsx` (Moroccan 1-Page Express Checkout: COD Delivery Form, Payment Selector, Order Summary & WhatsApp Dispatch)
  - `*` $\rightarrow$ Fallback redirect to `/`
- **Upcoming Route**:
  - `/order-tracking` $\rightarrow$ `OrderTrackingPage.tsx` (Live Moroccan Delivery Status: Frictionless lookup, 4-stage stepper, Courier WhatsApp coordination)
- **Navigation Architecture**:
  - `src/components/Navbar.tsx` provides persistent top navigation, synchronizing active indicators with route paths (`/`, `/contact`, `/shop`, `/shop/:slug`, `/starter-kits`, `/wholesale`, `/roastery-freshness`, `/checkout`, `/order-tracking`) and smooth anchor scrolls.

---

## 2. Current Directory Tree & Key Files

```text
coffe_shop/
├── index.html                     # HTML Entry Point
├── package.json                   # Dependencies (React 19, Vite, React Router 7, Tailwind, Lucide)
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind design tokens (accent, surface, canvas, typography)
├── tsconfig.json                  # TypeScript compiler options
├── tsconfig.node.json             # Vite TypeScript config
├── vite.config.ts                 # Vite bundler configuration
├── public/                        # Static public assets (images, coffee visuals)
└── src/
    ├── main.tsx                   # React root mount (StrictMode -> BrowserRouter -> App)
    ├── App.tsx                    # Root layout with Routes, global shell (Navbar, VideoFooter, CartDrawer, SearchModal)
    ├── index.css                  # Global Tailwind layers, typography, utility classes
    ├── vite-env.d.ts              # Vite environment typings
    ├── data/
    │   ├── bundles.ts             # [Phase 5] Curated Starter Kits mock records & equipment specs
    │   ├── catalog.ts             # Coffee catalog data, taxonomy constants & PDP specs (slug, agronomy, recipes)
    │   ├── coffeeHouseData.ts     # Menus, reviews, features data
    │   ├── moroccanCities.ts      # [Phase 8] Moroccan city list & SLA zones for checkout
    │   └── mockOrders.ts          # [Phase 9] Mock order lookup store with delivery status state machine
    ├── types/
    │   ├── coffeeHouse.ts         # Cart, menu item interfaces
    │   └── index.ts               # Core domain types (CoffeeProduct, CoffeeBundle, CheckoutFormData, OrderStatus, CourierInfo, etc.)
    ├── store/
    │   └── useCart.ts             # Shopping cart store with useSyncExternalStore & drawer trigger events
    ├── utils/
    │   └── roastSchedule.ts       # [Phase 7] Shared roast batch timing utility (getRoastScheduleStatus)
    ├── pages/
    │   ├── LandingPage.tsx        # Extracted landing page sections & Featured Roasts
    │   ├── ContactPage.tsx        # Responsive Contact Us view
    │   ├── ShopPage.tsx           # Multi-Taxonomy Catalog & Filter Engine
    │   ├── ProductDetailPage.tsx  # Dynamic PDP with dual-persona tabs
    │   ├── StarterKitsPage.tsx    # Curated Equipment & Coffee Bundles view with custom origin selector
    │   ├── WholesalePage.tsx      # B2B Cafe & Office Wholesale Portal
    │   ├── RoasteryFreshnessPage.tsx # [Phase 7] SLA & Roasting Schedule Portal
    │   ├── CheckoutPage.tsx       # [Phase 8] Moroccan 1-Page Express Checkout
    │   └── OrderTrackingPage.tsx  # [Phase 9] Live Moroccan Delivery Status & Order Lookup
    └── components/
        ├── AnnouncementBar.tsx    # Promo banner component
        ├── CartDrawer.tsx         # Slide-out shopping cart drawer (CTA links to /checkout)
        ├── CenterpieceCoffeeCup.tsx # Illustrated centerpiece coffee cup
        ├── CoffeeFinderModal.tsx  # Product recommendation quiz modal
        ├── CoffeeLogo.tsx         # SVG Coffee Shop Brand Logo
        ├── FeatureDishes.tsx      # Feature & food pairing section
        ├── Footer.tsx             # Standard footer
        ├── HeroSection.tsx        # Dual-tone concave hero section (CTA links to /shop & /shop/salvador-san-alberto)
        ├── Navbar.tsx             # Sticky header with logo, navigation links, search, cart
        ├── Navigation.tsx         # Alternative navigation component
        ├── PopularMenu.tsx        # Interactive product grid with category tabs
        ├── ProcessIcons.tsx       # Bottom process icons (Mug, Sack, Takeaway Cup)
        ├── ProductCard.tsx        # Standard product card
        ├── ProductGrid.tsx        # Grid listing for catalog products
        ├── ReassuranceBar.tsx     # Value props / trust badges
        ├── SearchModal.tsx        # Live product search modal overlay
        ├── StarterBundles.tsx     # Bundle offerings section
        ├── Testimonials.tsx       # Customer reviews section
        ├── VideoFooter.tsx        # Video highlight & bottom footer
        ├── WholesaleBanner.tsx    # Wholesale B2B banner
        ├── bundles/               # Curated Equipment & Coffee Bundle components
        │   ├── BundleCard.tsx     # Rich bundle card with origin selector, specs, savings & dual CTAs
        │   └── BundleItemSpecs.tsx # "What's Inside" itemized component with dynamic coffee override
        ├── wholesale/             # B2B Cafe & Office Portal components
        │   ├── WholesaleHero.tsx  # High-trust B2B hero banner & commercial value pillars
        │   ├── VolumeTiersGrid.tsx # 3-tier bulk monthly supply grid (10kg, 25kg, 50kg+)
        │   ├── B2BSampleForm.tsx  # Controlled B2B sample & rate card request form with validation
        │   └── FiscalComplianceBadge.tsx # Moroccan fiscal credentials badge (ICE, IF, RC, Patente)
        ├── freshness/             # [Phase 7] SLA & Roastery Freshness components
        │   ├── RoastCalendarCard.tsx # Weekly roasting schedule & next batch live timestamp
        │   ├── MoroccoDeliveryMap.tsx # 3-zone visual shipping SLA grid (24h/48h/72h)
        │   ├── CodInspectionPolicy.tsx # Cash on Delivery bag inspection & freshness guarantee
        │   └── RoastAlertModal.tsx  # WhatsApp/Email roast notification alert subscription modal
        ├── checkout/              # [Phase 8] Moroccan Express Checkout components
        │   ├── MoroccoAddressForm.tsx  # Delivery form: Full Name, WhatsApp, City Dropdown, Address, Notes
        │   ├── OrderSummaryCard.tsx    # Dynamic order summary panel linked to useCart (items, subtotal, shipping, total)
        │   └── PaymentMethodToggle.tsx # COD (default) vs. CMI Card payment selector
        ├── tracking/              # [Phase 9] Live Order Tracking components
        │   ├── TrackingSearchInput.tsx  # Phone / Order ID lookup with URL param sync
        │   ├── DeliveryStatusTimeline.tsx # 4-stage visual stepper (Confirmée → Livreur → En route → Livré)
        │   └── CourierContactCard.tsx   # Courier badge, ETA window & WhatsApp driver callout
        ├── contact/
        │   ├── ContactForm.tsx    # Controlled contact form with validation (no placeholders)
        │   └── ContactInfoCards.tsx # Location, hours, phone, email & social details
        ├── home/
        │   └── FeaturedRoasts.tsx # Featured micro-lots showcase with direct PDP jump links
        ├── shop/                  # Specialized Shop & Filter Engine components
        │   ├── FilterSidebar.tsx  # Desktop sticky sidebar + Mobile drawer filter component
        │   ├── ProductCardInline.tsx # Catalog card with grind selector & direct cart trigger
        │   └── ActiveFilters.tsx  # Active filter chips & quick-clear bar
        └── pdp/                   # Product Detail Page components
            ├── ProductHeroSection.tsx # Asymmetric split gallery + size/grind purchase engine + WhatsApp COD
            ├── TechnicalSpecsTab.tsx  # Nidal's expert agronomy specs (Elevation, Farm, Harvest, Fermentation)
            ├── HomeRecipeTab.tsx      # Mouna's sensory recipe guide (Kitchen spoon ratios, water temp, brew steps)
            └── DualPersonaTabs.tsx    # Tab switcher connecting Nidal & Mouna tabs
```

---

## 3. Updated Route Topology

| Path | Component | Description | Status |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` (`src/pages/LandingPage.tsx`) | Coffee House landing experience & story | **Active** |
| `/contact` | `ContactPage` (`src/pages/ContactPage.tsx`) | Responsive Contact Us page & inquiries | **Active** |
| `/shop` | `ShopPage` (`src/pages/ShopPage.tsx`) | Multi-Taxonomy Catalog & Origin Filter Engine | **Active** |
| `/shop/:slug` | `ProductDetailPage` (`src/pages/ProductDetailPage.tsx`) | Dynamic Product Detail Page with Dual-Persona UX | **Active** |
| `/starter-kits` | `StarterKitsPage` (`src/pages/StarterKitsPage.tsx`) | Curated Equipment & Coffee Bundles (Target Persona: Mouna) | **Active** |
| `/wholesale` | `WholesalePage` (`src/pages/WholesalePage.tsx`) | B2B Cafe & Office Portal (Target Persona: Cafe Owners & Office Managers) | **Active** |
| `/roastery-freshness` | `RoasteryFreshnessPage` (`src/pages/RoasteryFreshnessPage.tsx`) | SLA & Roasting Schedule (Target Persona: Nidal & Wholesale Partners) | **Active** |
| `/checkout` | `CheckoutPage` (`src/pages/CheckoutPage.tsx`) | Moroccan 1-Page Express Checkout — COD delivery form, order summary & WhatsApp dispatch (Target Persona: Nidal & Mouna) | **Active** |
| `/order-tracking` | `OrderTrackingPage` (`src/pages/OrderTrackingPage.tsx`) | Live Moroccan Delivery Status — order lookup, 4-stage stepper & courier coordination (Target Persona: Nidal & Mouna) | **Planned** |
| `*` | `<Navigate to="/" replace />` | Fallback route redirecting to Home | **Active** |

---

## 4. `/shop` Architecture & Taxonomy Specifications

### Target Audience & Persona
- **Primary Persona**: Coffee enthusiasts (e.g. Nidal) looking for origin traceability, roast dates, and brew gear compatibility.
- **Secondary Persona**: Wholesale & B2B buyers evaluating roast profiles, lot numbers, and bulk sizing.

### 4.1 Multi-Taxonomy Filter Engine
The catalog filtering engine handles 4 distinct facet dimensions simultaneously:
1. **Roast Profile**: `Light` (Filter/V60), `Medium` (Balanced), `Medium-Dark` (Espresso/Moka).
2. **Processing Method**: `Washed`, `Natural`, `Anaerobic Fermentation`.
3. **Flavor Category**: `Chocolate & Nutty`, `Fruity & Floral`, `Sweet Caramel`.
4. **Brew Method Compatibility**: `Whole Bean`, `Espresso`, `Moka Pot`, `Drip / V60`, `French Press`.

### 4.2 Data & State Strategy (URL Search Params Synchronization)
- Filter state is stored in URL query parameters using React Router's `useSearchParams` (`?roast=...&process=...&sort=...`).
- Fully bookmarkable, shareable, and responsive to browser back/forward navigation.

---

## 5. `/shop/:slug` Product Detail Page (PDP) Architecture & Dual-Persona Resolution

### Target Persona Resolution Matrix

| Dimension | Persona 1: Nidal (Expert / Data-Driven) | Persona 2: Mouna (Sensory / Practical Home Brewer) |
| :--- | :--- | :--- |
| **Core Motivation** | Origin authenticity, SCA cup score, terroir transparency, equipment tuning. | Simple morning coffee without bitterness, straightforward recipe, zero guesswork. |
| **Key Decision Driver** | Varietal (Bourbon, SL-28, Geisha), elevation (MASL), fermentation hours, lot code. | Accessible flavor notes ("Dark Chocolate & Plum"), visual spoon/water ratios, easy checkout. |
| **Packaging & Format** | 250g standard or 1kg bulk bag for continuous brewing & price advantage. | 250g pre-ground for Italian Moka pot or French Press. |
| **Conversion Channel** | Direct Cart addition (`useCart`) with exact grind calibration. | 1-Click WhatsApp Order with Cash on Delivery (COD) pre-filled with order details. |
| **Dedicated PDP Section** | **Tab A: Spécifications Agronomiques & Terroir** | **Tab B: Guide Recette & Préparation Maison** |

---

### 5.1 Dynamic Route Resolution Strategy
- **Path**: `/shop/:slug` in React Router DOM (`src/App.tsx`).
- **Hook**: `useParams<{ slug: string }>()`.
- **Lookup Engine**:
  - Searches `PRODUCTS.find((p) => p.slug === slug || p.id === slug)`.
  - If found: renders `<ProductDetailPage product={product} />`.
  - If not found: renders an elegant 404 state with a one-click button returning to `/shop`.
- **Breadcrumb Navigation**: `Accueil / Boutique / [Product Name]`.

---

### 5.2 Above-the-Fold Layout (Asymmetric Split Screen)

#### Left Column: Gallery & Quality Trust Anchors
- **Primary Bag Showcase**: High-res product pouch visual with radiant ambient glow matching `product.color`.
- **Dynamic Roast Freshness Stamp**: Live badge (*"Torréfié cette semaine"*) with pulsing green indicator.
- **Origin Badge & Terroir Chip**: Country tag (`ÉTHIOPIE`, `COLOMBIE`), Region, and Lot Code (`LOT #ET-2024-03`).
- **Thumbnail Switcher / Gallery**: Front bag visual, green bean / origin photo, and cup profile.

#### Right Column: Linear Purchase Engine
1. **Title & Sensory Badge**:
   - `<h1>`: Coffee Name in bold display typography (`font-display`).
   - Plain sensory note highlight (e.g. *"Chocolat Noir & Prune Mûre"*).
   - SCA Quality Score badge (e.g. `Score SCA: 87.5 / 100`).
2. **Variant Selectors**:
   - **Bag Size Selector**:
     - `250g` (Standard Sachet) $\rightarrow$ Base Price (e.g. `95 MAD`).
     - `1kg Bulk` (Format Pro & Passionnés) $\rightarrow$ Scaled price with built-in discount (e.g. `340 MAD` vs `380 MAD`, saving `-11%`).
   - **Grind Type Selector**:
     - Radio pills or inline select: `Whole Bean (Grains)`, `Moka Pot (Fine)`, `V60 / Filtre`, `French Press (Piston)`, `Espresso`.
3. **Dynamic Price Calculation**:
   - Real-time price display updating immediately when switching between 250g and 1kg.
4. **Dual Conversion CTAs**:
   - **CTA 1 (Primary)**: `[+ Ajouter au Panier]` button:
     - Wires directly to `useCart.addItem(product, selectedGrind, true)`.
     - Automatically slides out the persistent `CartDrawer` without page refresh.
   - **CTA 2 (Secondary)**: `[Commander via WhatsApp (COD)]` button:
     - Generates pre-formatted WhatsApp deep-link (`https://wa.me/2126XXXXXXXX?text=...`) containing:
       `"Bonjour NIDAM Coffee, je souhaite commander le lot [Nom] en format [250g/1kg], mouture [Mouture] au prix de [Prix] MAD avec paiement à la livraison."`

---

### 5.3 Below-the-Fold Dual-Persona Tabs

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [ Tab A: Agronomie & Terroir (Expert) ]  [ Tab B: Recette & Ratios (Maison) ] │
└────────────────────────────────────────────────────────────────────────┘
```

#### Tab A: Technical Agronomy (For Nidal) — `<TechnicalSpecsTab />`
- **Elevation (MASL)**: Exact growing altitude (e.g., `1,600 - 2,100 m`).
- **Farm / Cooperative**: Origin estate or washing station name (e.g., `Finca San Alberto`, `Guji Highlands Co-op`).
- **Botanical Varietal**: Genetic lineage (e.g., `Heirloom`, `Red Bourbon`, `Geisha`, `SL-28`).
- **Harvest Season**: Crop year & harvest window (e.g., `Novembre - Février 2024`).
- **Processing Specs**: Fermentation type, water usage, and drying duration (e.g., `72h Fermentation Anaérobie en fût sous vide, séchage 21 jours sur lits africains`).
- **Lot Code & Traceability**: Certificate / export lot code.

#### Tab B: Visual Home Brew Recipe Card (For Mouna) — `<HomeRecipeTab />`
- **Equipment Selector Tabs**: `Cafetière Italienne (Moka)` | `Filtre / Pour-Over (V60)` | `Piston (French Press)`.
- **Kitchen-Friendly Ratios (No Scale Required)**:
  - Table showing: Grams vs Kitchen Spoons (e.g. *"2 cuillères à soupe bombées = 15g"*).
  - Water Volume: *"250ml d'eau (1 grand verre d'eau)"*.
- **Water Temperature Guide**: Visual thermometer (*"Porter à ébullition, puis couper le feu et attendre 45 secondes ~ 92°C"*).
- **Step-by-Step Extraction Flow**:
  1. *Préparation & Mouture* (remplir le panier sans tasser pour la Moka).
  2. *Infusion & Chaleur* (feu doux, couvercle ouvert).
  3. *Dégustation* (servir immédiatement dans une tasse préchauffée).

---

### 5.4 Component Breakdown for `/shop/:slug`

#### 1. `src/pages/ProductDetailPage.tsx`
- Parent container extracting `:slug` param via `useParams()`.
- Fetches matching product from `PRODUCTS` in `src/data/catalog.ts`.
- Manages selected variants (`selectedSize: '250g' | '1kg'`, `selectedGrind: GrindOption`).
- Renders `<ProductHeroSection />`, `<TechnicalSpecsTab />`, `<HomeRecipeTab />`, and related origin recommendations.

#### 2. `src/components/pdp/ProductHeroSection.tsx`
- Asymmetric split view (visual gallery on left, linear purchase engine on right).
- Size variant toggles (`250g` vs `1kg`) and grind options.
- Direct integration with `useCart` (auto-opening `CartDrawer`) + WhatsApp COD link generator.

#### 3. `src/components/pdp/TechnicalSpecsTab.tsx`
- Grid of technical agronomy cards with icons (`Mountain`, `Trees`, `Calendar`, `Flame`, `ShieldCheck`, `Binary`).

#### 4. `src/components/pdp/HomeRecipeTab.tsx`
- Visual kitchen recipe card with brew method selector, spoon/water ratios, water temp guide, and 3-step extraction visual cards.

---

## 6. `/starter-kits` Architecture & Curated Equipment Bundles Specification

### 6.1 Target Persona Resolution (Mouna — The Practical Home Brewer)
- **Core Pain Point**: Equipment anxiety, fear of compatibility errors (e.g. buying the wrong grind size for a Moka pot, purchasing paper filters that don't fit the dripper, or ruining good specialty beans with incorrect brew ratios).
- **Value Proposition**: "Zéro Prise de Tête" — A complete, pre-calibrated, out-of-the-box brewing solution pairing authentic hardware, freshly roasted coffee ground to perfection, and an idiot-proof visual ratio card.
- **Key Psychology**:
  * Needs instant reassurance that everything in the box works together.
  * Rejection of technical jargon; desires spoon measurements and clear temperature tips.
  * Welcomes high-value bundles with visible savings compared to buying hardware and coffee separately.

---

### 6.2 Curated Bundles Specification

| Bundle Name | Hardware Included | Coffee Pairing & Grind | Guide & Extras | Target Price & Savings | Primary Persona Fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **The Moka Kit** | Bialetti-style 3-Cup Aluminum Italian Moka Pot | 250g Salvador San Alberto (*Mouture Moka Calibrée Fine*) | Water-to-Coffee Ratio Kitchen Guide Card (spoon ratios, flame control, anti-burn tips) | **220 MAD** *(Valeur 260 MAD — Économisez 15%)* | Everyday strong morning coffee lovers seeking Italian cafe richness on stove top. |
| **The Pour-Over Kit** | Hario V60 Plastic Dripper (Size 02) + 40 Unbleached Cone Paper Filters | 250g Ethiopia Sidamo Guji (*Mouture Filtre Medium*) | Step-by-Step Pouring Technique & Bloom Timing Card (30s bloom, spiral pour guide) | **260 MAD** *(Valeur 310 MAD — Économisez 16%)* | Clean, aromatic filter coffee lovers exploring floral & fruity notes without bitterness. |
| **The Home Barista Kit** | Timemore C2 Manual Conical Steel Burr Grinder | 250g Whole Bean Roaster's Choice (Fresh Batch) | Burr Click Calibration Cheat Sheet (Moka, V60, Espresso, French Press) | **450 MAD** *(Valeur 530 MAD — Économisez 15%)* | Aspiring home baristas ready to grind fresh on demand for ultimate flavor extraction. |

---

### 6.3 Layout & Bundle Anatomy

#### Header & Trust Anchors
- **Page Eyebrow**: `KITS TOUT-EN-UN & MATÉRIEL DÉBUTANT`
- **Main Heading**: `Démarrez le Café de Spécialité Sans Erreur de Débutant`
- **Subtitle**: `Matériel sélectionné, café fraîchement torréfié calibré pour votre machine, et guide recette inclus dans chaque pack.`
- **Reassurance Bar**:
  1. 🚚 **Livraison Gratuite** sur tous les Starter Kits au Maroc.
  2. ⚙️ **Mouture Calibrée sur Mesure** prête à l'extraction.
  3. 📖 **Guide Recette Pas-à-Pas** avec ratios cuillères/eau inclus.

#### Bundle Card Anatomy (`<BundleCard />`)
1. **Visual Showcase**: High-res pack photography featuring hardware, pouch, and accessories with ambient glow.
2. **Dynamic Savings Badge**: High-contrast pill (`Économisez 15%` / `Pack Économique`).
3. **Difficulty Level Tag**: Beginner-friendly indicator (`Niveau : Facile & Rapide` or `Niveau : Intermédiaire`).
4. **"What's Inside" Itemized Badge List (`<BundleItemSpecs />`)**:
   - `[Matériel]` e.g., Cafetière Italienne 3 Tasses Aluminium
   - `[Café Frais]` e.g., 250g Salvador San Alberto (Mouture Moka)
   - `[Guide Inclus]` e.g., Fiche Ratio & Température Cuisine
5. **Pricing Breakdown**:
   - Bundle Price in bold display type (`220 MAD`).
   - Crossed-out individual retail price (`260 MAD`).
6. **Dual Conversion CTAs**:
   - **Primary CTA 1**: `[Acheter le Starter Kit Complet — [Price] MAD]` integrating directly with `useCart` (with auto-opening `CartDrawer`, isolated unique bundle ID to prevent cart state collisions).
   - **Secondary CTA 2**: `[Commander via WhatsApp (COD)]` generating deep link with pre-filled message:
     `"Salam NIDAM Coffee, je souhaite commander le [Nom du Kit] au prix de [Prix] MAD avec paiement cash à la livraison."`

---

### 6.4 Component Breakdown for `/starter-kits`

#### 1. `src/pages/StarterKitsPage.tsx`
- Container page resolving bundle list from `src/data/bundles.ts`.
- Sticky breadcrumbs (`Accueil / Starter Kits`).
- Trust reassurance banner, 3-column bundle cards grid, and beginner equipment FAQ accordion (cleaning, induction compatibility, grind calibration).
- Wholesale / Custom Gift concierge banner linking to `/contact`.

#### 2. `src/components/bundles/BundleCard.tsx`
- Individual kit presentation card matching project tokens (`#121421`, `#161826`, `#EFAE54`).
- Handles dynamic price calculation, savings percentage, difficulty pill, and itemized specs.
- Directly wires `useCart` addition with automatic drawer trigger + WhatsApp deep link.

#### 3. `src/components/bundles/BundleItemSpecs.tsx`
- High-density visual checklist displaying equipment item, coffee bag spec, and guide card with icons (`Package`, `Coffee`, `BookOpen`).

#### 4. `src/data/bundles.ts`
- Data source exporting `BUNDLES: CoffeeBundle[]` with full metadata, itemized specifications, savings, and WhatsApp pre-filled templates.

---

## 7. Ordered Task Checklist

### Phase 1: Contact Us Route & Initial Setup (Completed)
- [x] **Task 1: Setup routing/navigation infrastructure**
  - Install `react-router-dom`.
  - Configure `BrowserRouter` in `src/main.tsx` and route layout in `src/App.tsx`.
  - Separate `LandingPage.tsx` from root `App.tsx` with shared global shell.
  - Verify zero regression on existing landing page functionality.

- [x] **Task 2: Build the new page component with Tailwind styling**
  - Create `src/pages/ContactPage.tsx`.
  - Create `src/components/contact/ContactForm.tsx` and `src/components/contact/ContactInfoCards.tsx`.
  - Implement full responsive layout matching the coffee shop theme (`#121421`, `#555555`, `#EFAE54`).

- [x] **Task 3: Link navigation between landing page and the new page**
  - Add "CONTACT" item to `Navbar.tsx` (`navItems`).
  - Update desktop and mobile drawer navigation to use React Router navigation.
  - Implement cross-page anchor routing (navigating from `/contact` to `/#menu` or `/#home`).
  - Add active link indicator for the active route.

- [ ] **Task 4: Responsive check and form input validation**
  - Implement client-side validation logic (Name, Email format, Message).
  - Handle submission event, error states, and success banner feedback.
  - Test across responsive breakpoints (Mobile: 375px/390px, Tablet: 768px, Desktop: 1024px/1440px).

### Phase 2: `/shop` Catalog & Multi-Taxonomy Filter Engine (Completed)
- [x] **Task 5: Define catalog filter state, types, and mock data extensions in `src/data/catalog.ts`**
  - Extend `CoffeeProduct` type in `src/types/index.ts` with lot codes, flavor categories, and processing methods.
  - Enrich `PRODUCTS` array in `src/data/catalog.ts` with diverse taxonomy data covering all filter options.
  - Export filter taxonomy constants and helper matching functions.

- [x] **Task 6: Build `FilterSidebar.tsx` and mobile filter drawer with responsive design**
  - Build responsive filter sidebar with facet groups (Roast, Process, Flavor, Brew Method).
  - Implement mobile sticky filter trigger button and responsive slide-out drawer.
  - Style using dark canvas tokens (`bg-[#121421]`, `border-white/10`, `#EFAE54` accent accents).

- [x] **Task 7: Build `ProductCardInline.tsx` with inline grind dropdown and direct `useCart` integration**
  - Construct card anatomy: bag thumbnail, lot code badge, origin flag, sensory pills, pricing.
  - Implement inline grind selector (`Whole Bean`, `Moka Pot`, `V60 / Filter`, `French Press`).
  - Connect `[+ Add to Cart]` CTA to cart state so item is added with selected grind and automatically triggers open `CartDrawer` without page refresh.

- [x] **Task 8: Assemble `ShopPage.tsx` with sorting, search, and active filter tags**
  - Build `ShopPage.tsx` container with search bar, sort dropdown (`Price: Low to High`, `Price: High to Low`, `Roast Date`), and `<ActiveFilters />` chip bar.
  - Implement URL query parameter synchronization (`useSearchParams`) for shareable filter states.
  - Handle empty state with one-click filter reset.

- [x] **Task 9: Wire `/shop` route and update Navbar & Home Hero split CTA links**
  - Add `/shop` route to `<Routes>` in `src/App.tsx`.
  - Add `"SHOP"` link to `Navbar.tsx` (desktop nav and mobile drawer).
  - Update Hero CTA buttons on `LandingPage.tsx` to link to `/shop`.
  - Validate TypeScript compilation (`npm run build`) and responsive cross-browser rendering.

### Phase 3: `/shop/:slug` Dynamic Product Detail Page (PDP) & Dual-Persona Engine (Completed)
- [x] **Task 10: Extend product schema in `src/types/` and `src/data/catalog.ts` to include slug, agronomy specs, and brewing recipe ratios**
  - Add `slug`, `farmName`, `varietal`, `harvestSeason`, `scaScore`, `price1kg`, and `brewRecipes` to `CoffeeProduct` type in `src/types/index.ts`.
  - Populate all 8 coffees in `src/data/catalog.ts` with complete agronomy specs (Nidal) and kitchen recipe ratios (Mouna).
  - Export lookup helper `getProductBySlug(slug: string): CoffeeProduct | undefined`.

- [x] **Task 11: Build `ProductHeroSection.tsx` with variant selectors, price computation, and dual CTAs**
  - Implement asymmetric split screen: high-res bag visual + dynamic roast freshness badge + origin flags on left.
  - Build right column: bag size variant toggle (`250g` vs `1kg Bulk` with dynamic discount multiplier `BULK_DISCOUNT_FACTOR = 0.8947`), grind selector, live price recalculation.
  - Implement dual CTAs: `[+ Add to Cart]` (wired to `useCart` with automatic `CartDrawer` slide-out and size-isolated item ID `${product.id}-1kg` to protect 250g cart state) + `[Commander via WhatsApp / COD]` with pre-filled order text.
  - Dynamic savings badge: shows exact percentage saved (`Pack Éco -11%`) and savings in MAD.

- [x] **Task 12: Build dual-tab system (`TechnicalSpecsTab.tsx` and `HomeRecipeTab.tsx`)**
  - Build Tab A (`TechnicalSpecsTab.tsx`) for Nidal: Elevation MASL, Farm/Coop, Varietal, Harvest year, Fermentation specs, Lot code, SCA score.
  - Build Tab B (`HomeRecipeTab.tsx`) for Mouna: Brew method switcher (Moka, V60, French Press), kitchen spoon/water ratios, water temp guide, and 3-step extraction visual cards.

- [x] **Task 13: Assemble `ProductDetailPage.tsx`, configure route `/shop/:slug` in `App.tsx`, and connect product card clicks from `/shop`**
  - Build `ProductDetailPage.tsx` assembling hero section, tabs, breadcrumbs, and fallback 404/redirect state.
  - Register dynamic route `/shop/:slug` in `src/App.tsx`.
  - Update `ProductCardInline.tsx` to make title and bag thumbnail clickable links routing to `/shop/${product.slug}`.
  - Verify build integrity with `npm run build` and validate zero-regression navigation.

### Phase 5: `/starter-kits` Curated Equipment & Coffee Bundles (Completed)
- [x] **Task 18: Define `Bundle` interface and create `src/data/bundles.ts` with the 3 curated kits (Moka, V60, Barista)**
  - Define `CoffeeBundle`, `BundleItem`, and `KitDifficulty` interfaces in `src/types/index.ts`.
  - Populate `BUNDLES` array in `src/data/bundles.ts` with the 3 curated kits:
    1. The Moka Kit (3-Cup Aluminum Pot + 250g Salvador Fine Moka Grind + Ratio Card, 220 MAD)
    2. The Pour-Over Kit (Hario V60 Plastic Dripper + 40 Filters + 250g Ethiopia Sidamo Medium Grind, 260 MAD)
    3. The Home Barista Kit (Timemore C2 Grinder + 250g Whole Bean, 450 MAD)
  - Specify retail prices, bundle prices, dynamic savings percentages, itemized contents, and pre-filled WhatsApp ordering messages.
  - Export lookup helpers `getBundleById(id: string): CoffeeBundle | undefined` and `getAllBundles()`.
  - Export type-safe cart conversion helpers `bundleToCartPayload()` and `bundleToCartProduct()`.

- [x] **Task 19: Build `BundleCard.tsx` with itemized contents, savings tags, and direct `useCart` integration**
  - Create `src/components/bundles/BundleCard.tsx` and `src/components/bundles/BundleItemSpecs.tsx`.
  - Construct card anatomy: bundle pack photography, ambient color glow, difficulty badge (`Niveau : Facile`), and "What's Inside" itemized badge list.
  - Add dynamic savings tag (`Économisez X MAD / -15%`) and pricing comparison.
  - Wire Primary CTA `[Acheter le Starter Kit Complet — [Price] MAD]` directly into `useCart` (auto-opening `CartDrawer`, isolated bundle ID to prevent state collisions).
  - Wire Secondary CTA `[Commander via WhatsApp (COD)]` generating pre-filled direct WhatsApp order message.

- [x] **Task 20: Assemble `StarterKitsPage.tsx` with reassurance badges (Free delivery, pre-calibrated grind guide included)**
  - Create `src/pages/StarterKitsPage.tsx` with breadcrumbs (`Accueil / Starter Kits`).
  - Feature 3 value anchors: 🚚 Livraison Gratuite, ⚙️ Mouture Calibrée sur Mesure, 📖 Guide Recette Inclus.
  - Assemble responsive 3-column bundle grid using `<BundleCard />`.
  - Add beginner equipment FAQ accordion resolving Mouna's hesitations (cleaning, heat source compatibility, grind calibration).
  - Add Pro/Gift concierge callout banner linking to `/contact`.

- [x] **Task 21: Register `/starter-kits` in `App.tsx` and connect links in `Navbar.tsx`**
  - Register route `/starter-kits` in `<Routes>` in `src/App.tsx`.
  - Add `"STARTER KITS"` link in `Navbar.tsx` (desktop navigation & mobile drawer) with active route indicator.
  - Link `/starter-kits` in footer navigation directory.
  - Validate TypeScript compilation with `npm run build` and ensure zero errors across all routes.

- [x] **Phase 5 Polish: Custom Origin Selector for "The Pour-Over Kit" & Cart Drawer Verification**
  - Perform impact analysis on `BundleCard.tsx` and bundle cart serialization.
  - Implement origin selector dropdown for "The Pour-Over Kit" (Éthiopie Sidamo Guji, Salvador San Alberto, Colombia Huila Supremo).
  - Dynamically synchronize bundle item checklist ("Café Frais") and WhatsApp COD order message.
  - Verify zero regressions across standard bundles (The Moka Kit, The Home Barista Kit) and CartDrawer state.

### Phase 6: `/wholesale` B2B Cafe & Office Portal (Completed)
**Target Persona**: B2B Specialty Café Owners, Head Baristas, Restaurant Operators & Office Managers.

#### Key Architectural Requirements:
1. **B2B Trust & Commercial Presentation**:
   - High-trust hero: *"Partenaire Café de Spécialité pour Cafés, Restaurants & Entreprises"*.
   - Commercial value pillars:
     * **Bulk Volume Tiers**: 10kg, 25kg, 50kg+ recurring monthly supply with tiered wholesale pricing.
     * **Equipment & Barista Calibration**: On-site extraction setup, grinder alignment, and staff training support.
     * **Moroccan Fiscal Compliance**: Official invoices with ICE, IF, RC, and Patente clearly stated for business accounting.
2. **Conversion Engine: B2B Lead & Sample Request Form**:
   - Form fields:
     * Contact Name & Professional Role (Owner, Head Barista, Office Manager).
     * Establishment / Cafe Name & City (Casablanca, Rabat, Marrakech, Tanger, etc.).
     * WhatsApp / Direct Phone Number.
     * Monthly Volume Estimate (Tier dropdown: 10-25kg, 25-50kg, 50kg+).
     * Current Espresso Machine model (text field for calibration context).
   - Form actions:
     * Submit CTA: `[Demander un Pack D'échantillons & Grille Tarifaire]`.
     * Direct B2B WhatsApp hotline button for immediate commercial inquiries.
3. **Component Hierarchy**:
   - `src/pages/WholesalePage.tsx`
   - `src/components/wholesale/WholesaleHero.tsx`
   - `src/components/wholesale/VolumeTiersGrid.tsx`
   - `src/components/wholesale/B2BSampleForm.tsx`
   - `src/components/wholesale/FiscalComplianceBadge.tsx`
4. **Global Navigation**:
   - Register route `/wholesale` in `App.tsx`.
   - Update `Navbar.tsx` (desktop & mobile drawer) and footer directory links in `VideoFooter.tsx`.

#### Ordered Task Checklist:
- [x] **Task 22: Build `WholesaleHero.tsx`, `VolumeTiersGrid.tsx`, and `FiscalComplianceBadge.tsx`**
  - Construct `WholesaleHero.tsx` with headline *"Partenaire Café de Spécialité pour Cafés, Restaurants & Entreprises"*, value proposition chips, and direct inquiry CTA.
  - Build `VolumeTiersGrid.tsx` detailing 3 bulk monthly supply tiers (10kg Discovery/Small Office, 25kg High-Volume Specialty Cafe, 50kg+ Multi-Location/Hospitality Group) with volume savings, roast cadence, and dedicated barista training support.
  - Build `FiscalComplianceBadge.tsx` showcasing Moroccan commercial credentials (ICE, IF, RC, Patente) and 100% tax-deductible invoice reassurance.

- [x] **Task 23: Build controlled `B2BSampleForm.tsx` with client-side validation and direct WhatsApp fallback dispatch**
  - Implement controlled form fields: Contact Name, Professional Role, Establishment Name, Moroccan City, WhatsApp/Phone, Monthly Volume Tier, and Espresso Machine Model.
  - Provide inline validation and error states without generic browser tooltips or empty placeholders.
  - Primary CTA: `[Demander un Pack D'échantillons & Grille Tarifaire]`.
  - Secondary CTA: Direct WhatsApp dispatch pre-filling all entered business requirements.

- [x] **Task 24: Assemble `WholesalePage.tsx` with responsive layout and B2B FAQs**
  - Assemble `WholesalePage.tsx` integrating breadcrumbs (`Accueil / Espace Professionnel B2B`), `WholesaleHero`, `VolumeTiersGrid`, `FiscalComplianceBadge`, and `B2BSampleForm`.
  - Add comprehensive B2B FAQ accordion (sample kit dispatch within 48h, equipment calibration support, 30-day payment facilities for verified accounts, emergency roast batches).

- [x] **Task 25: Register route `/wholesale` in `App.tsx` and wire links in `Navbar.tsx`**
  - Register route `/wholesale` in `<Routes>` in `src/App.tsx`.
  - Add `"WHOLESALE / B2B"` to navigation items in `Navbar.tsx` (desktop and mobile drawer) with active route indicator.
  - Ensure footer link in `VideoFooter.tsx` routes to `/wholesale`.
  - Run `npm run build` in the terminal to verify zero build errors.

- [x] **Phase 6 Polish: Direct B2B Pricing Catalog PDF Download in `WholesaleHero.tsx`**
  - Perform impact analysis on `WholesaleHero.tsx` button layout and public asset links.
  - Generate official valid PDF asset at `public/docs/grille-tarifaire-b2b-coffee-house.pdf` detailing Moroccan commercial identifiers (ICE, IF, RC, Patente), volume tiers (10-25kg, 25-50kg, 50kg+), and contract benefits.
  - Implement direct download CTA `[Télécharger la Grille Tarifaire B2B (PDF)]` with `FileDown` icon, `download` attribute, and instant user feedback toast without disrupting the `#sample-form` conversion funnel.
  - Ensure full responsiveness on desktop and mobile viewports (`390px` to `1280px+`).
  - Validate bundle and TypeScript integrity with `npm run build` (0 errors).

### Phase 7: `/roastery-freshness` — SLA & Roasting Schedule (Completed)
**Target Persona**: Nidal (Data-driven specialty enthusiast) & Wholesale Partners (Operational credibility & supply chain transparency).

#### Key Architectural Requirements:
1. **Operational Freshness Calendar**:
   - **Dynamic / Weekly Roasting Schedule**: Display designated roast batches (Casablanca roastery roasts every Monday & Thursday).
   - **Live Countdown or Next Batch Stamp**: *"Prochain Batch : Lundi à 08:00 (Expédition sous 24h)"*.
   - **Retention Action**: `[S'abonner au Planning de Torréfaction]` modal trigger for WhatsApp / Email batch notifications.
2. **Morocco Shipping SLA & Logistics Map**:
   - **Visual Geographic SLA Tiers**:
     * **Zone 1** (Casablanca / Rabat / Mohammedia): 24h Doorstep Delivery.
     * **Zone 2** (Marrakech / Tanger / Fès / Meknès / Agadir): 48h Delivery.
     * **Zone 3** (Provinces du Sud / Oujda / Zones éloignées): 48h–72h Delivery.
   - **Courier Partnership & Dispatch Timeline**: Visual tracking stages (Torréfaction du jour, Dégazage 24h sous valve, Prise en charge coursier, Livraison & contrôle).
3. **Cash on Delivery (COD) Inspection Policy**:
   - High-trust reassurance block: *"Garantie Fraîcheur & Inspection avant Paiement"*.
   - 3-step inspection protocol:
     1. Vérification de la valve de dégazage unidirectionnelle sur le sachet.
     2. Contrôle de la date de torréfaction manuscrite (roast date < 7 jours).
     3. Règlement en espèces (Cash on Delivery) sécurisé auprès du livreur uniquement après validation.
4. **Component Hierarchy**:
   - `src/pages/RoasteryFreshnessPage.tsx`
   - `src/components/freshness/RoastCalendarCard.tsx`
   - `src/components/freshness/MoroccoDeliveryMap.tsx`
   - `src/components/freshness/CodInspectionPolicy.tsx`
   - `src/components/freshness/RoastAlertModal.tsx`
5. **Global Navigation**:
   - Register route `/roastery-freshness` in `App.tsx`.
   - Wire links into `Navbar.tsx`, `AnnouncementBar.tsx` SLA link, and `VideoFooter.tsx` trust directory.

#### Ordered Task Checklist:
- [x] **Task 26: Build `RoastCalendarCard.tsx` with dynamic day indicators and schedule subscription CTA**
  - Construct `RoastCalendarCard.tsx` featuring weekly roast days (Lundi & Jeudi atelier Casablanca).
  - Next batch live countdown and timestamp ("Prochain Batch : Lundi à 08:00 • Expédition sous 24h").
  - Retention CTA `[S'abonner au Planning de Torréfaction]` triggering alert preferences modal.

- [x] **Task 27: Build `MoroccoDeliveryMap.tsx` visual SLA grid (24h/48h/72h Moroccan coverage)**
  - Construct visual SLA map and breakdown for 3 shipping zones: Zone 1 (Casablanca/Rabat/Mohammedia - 24h), Zone 2 (Marrakech/Tanger/Fès/Meknès/Agadir - 48h), Zone 3 (Provinces du Sud/Oujda/Zones éloignées - 48h-72h).
  - Integrate courier partnership logistics timeline (Pick & Pack, Dégazage 24h, Remise coursier, Remise en main propre).

- [x] **Task 28: Build `CodInspectionPolicy.tsx` trust banner and inspection guarantee steps**
  - Reassurance banner "Garantie Fraîcheur & Inspection avant Paiement".
  - Visual 3-step inspection protocol: 1. Vérification de la valve de dégazage unidirectionnelle, 2. Contrôle de la date de torréfaction manuscrite sur le sachet, 3. Paiement en espèces (Cash on Delivery) sécurisé auprès du livreur.
  - Zero-risk satisfaction guarantee with immediate courier refusal policy and 100% money-back / replacement guarantee if roasted > 14 days ago.

- [x] **Task 29: Assemble `RoasteryFreshnessPage.tsx`, register route `/roastery-freshness` in `App.tsx`, and connect Navbar/Footer links**
  - Assemble `RoasteryFreshnessPage.tsx` integrating breadcrumbs (`Accueil / Fraîcheur & Logistique`), `RoastCalendarCard`, `MoroccoDeliveryMap`, `CodInspectionPolicy`, and `RoastAlertModal`.
  - Register route `/roastery-freshness` in `src/App.tsx`.
  - Wire links in `Navbar.tsx` (top navigation and mobile drawer), `AnnouncementBar.tsx` (SLA link), and `VideoFooter.tsx` (Trust / Freshness directory link).
  - Run `npm run build` in the terminal to verify zero build errors.

- [x] **Phase 7 Polish: Shared Roast Schedule Utility & PDP Freshness Badge Embedding**
  - Perform impact analysis on PDP components and roastery scheduling.
  - Create shared utility `src/utils/roastSchedule.ts` exporting `getRoastScheduleStatus()` with unified batch countdowns, day indicators, and snippet strings.
  - Refactor `RoastCalendarCard.tsx` to consume the shared helper without code duplication.
  - Embed dynamic next batch snippet (`roastSchedule.pdpBadgeSnippet`) in `ProductHeroSection.tsx` freshness pill, linking directly to `/roastery-freshness`.
  - Verify zero regressions on PDP and Roastery Freshness pages with automated browser testing and clean production build (`npm run build`).

---

### Phase 8: `/checkout` — Moroccan 1-Page Express Checkout (Planned)
**Target Persona**: Nidal (repeat direct buyer, grind-aware) & Mouna (first-time home brewer, frictionless COD purchase).

#### Architectural Objectives
- Eliminate Western-style multi-step checkout friction with a single-column Moroccan-native layout.
- Surface Cash on Delivery (COD) as the default, trusted payment method.
- Provide a real-time order summary (items + grind, subtotal, 30 MAD shipping or free above threshold, total in MAD).
- Dispatch two parallel confirmation channels: internal order state + pre-filled WhatsApp message to the store.

#### Key Architectural Decisions
1. **Frictionless 1-Column Layout**:
   - Mobile-first single column; sticky order summary sidebar kicks in at `lg` breakpoint.
   - No registration gate — guest checkout only. Name + WhatsApp + City = minimum viable order identity.
2. **Moroccan Phone Validation**:
   - Accept `06XXXXXXXX` / `07XXXXXXXX` / `+2126XXXXXXXX` / `+2127XXXXXXXX` patterns.
   - Inline real-time validation without page submit (on `blur` + `onChange` after first blur).
3. **City Dropdown from `moroccanCities.ts`**:
   - Sorted alphabetically; grouped optionally by SLA zone (Zone 1 → Zone 2 → Zone 3).
   - Selection auto-updates the delivery estimate chip in `OrderSummaryCard`.
4. **Payment Method Toggle**:
   - Default: COD — pre-selected, green trust badge, zero friction.
   - CMI Card: Visible but labeled "Bientôt disponible" (disabled state) to build future expectation.
5. **Order Dispatch Engine**:
   - On submit: store order snapshot in `localStorage` under `coffeehouse_last_order`.
   - Navigate to `/order-tracking` (future Phase 9) or display an inline confirmation state with generated order code `CH-[timestamp]`.
   - Secondary: auto-generate WhatsApp deep-link pre-filled with full order summary and delivery address.
6. **Shipping Logic**:
   - Free shipping on orders ≥ 200 MAD.
   - Standard rate: 30 MAD below threshold.
   - Displayed dynamically in `OrderSummaryCard` with SLA zone (derived from selected city).

#### Component Hierarchy
```text
src/pages/CheckoutPage.tsx
├── src/components/checkout/MoroccoAddressForm.tsx   # Delivery details form
├── src/components/checkout/PaymentMethodToggle.tsx  # COD / CMI selector
├── src/components/checkout/OrderSummaryCard.tsx     # Live cart summary + shipping + total
└── src/data/moroccanCities.ts                       # City list with SLA zone metadata
```

#### Global Integration Points
- `src/App.tsx` — Register `/checkout` route.
- `src/components/CartDrawer.tsx` — Update primary CTA to `<Link to="/checkout">` and close drawer on navigation.

#### Ordered Task Checklist:
- [x] **Task 30: Create `src/data/moroccanCities.ts` and define Checkout form state & types**
  - Export `MOROCCAN_CITIES: MoroccanCity[]` with `{ name, slaZone: 1 | 2 | 3, deliveryEstimate }` for all major cities (Casablanca, Rabat, Marrakech, Tanger, Fès, Meknès, Agadir, Oujda, Kenitra, Salé, Témara, Mohammedia, Nador, El Jadida, Béni Mellal, Laâyoune, Dakhla, Guelmim, Errachidia, etc.).
  - Define `CheckoutFormState` interface in `src/types/index.ts`:
    ```typescript
    interface CheckoutFormState {
      fullName: string;
      whatsapp: string;
      city: string;
      address: string;
      deliveryNotes: string;
      paymentMethod: 'cod' | 'cmi';
    }
    ```
  - Define `CheckoutFormErrors` interface for inline validation error mapping.
  - Export Moroccan mobile phone regex validator `isMoroccanMobile(phone: string): boolean`.

- [x] **Task 31: Build `MoroccoAddressForm.tsx` with Moroccan phone validation and City dropdown**
  - Controlled component consuming `CheckoutFormState` via props + `onChange` callbacks.
  - Fields: Full Name (Nom & Prénom), WhatsApp Phone, City Dropdown (`MOROCCAN_CITIES`), Quartier / Adresse détaillée, Notes livreur (optional).
  - Validation: Moroccan mobile format on phone blur; non-empty on name/city/address.
  - Inline error states under each field (no browser tooltip interference).
  - Auto-fill city from URL param `?city=Casablanca` if present (deep-link from `MoroccoDeliveryMap`).
  - Style: dark canvas (`bg-white/5 border border-white/10`), `#EFAE54` focus rings, consistent with site tokens.

- [x] **Task 32: Build `PaymentMethodToggle.tsx` and `OrderSummaryCard.tsx` linked to `useCart`**
  - **`PaymentMethodToggle.tsx`**:
    - Two option cards: COD (default, pre-selected with green "✓ Recommandé" badge) and CMI (disabled with "Bientôt disponible" label).
    - Visual selection indicator: amber border + background tint on active card.
    - Explanatory micro-copy under COD: *"Payez en espèces directement au livreur. Zéro risque."*
  - **`OrderSummaryCard.tsx`**:
    - Consumes `useCart()` to list all items: product name, grind size, quantity, unit price.
    - Computes: Subtotal, Shipping fee (30 MAD if subtotal < 200 MAD, else "Gratuit 🎉"), Final Total in MAD.
    - Dynamic delivery SLA chip derived from selected city's `slaZone` (passed as prop).
    - Empty cart guard: if cart is empty, show redirect nudge to `/shop`.
    - On mobile: renders as a collapsible bottom-sheet-style accordion above the submit CTA.

- [x] **Task 33: Assemble `CheckoutPage.tsx`, wire `/checkout` in `App.tsx`, and connect `CartDrawer.tsx` checkout button**
  - **`CheckoutPage.tsx`**:
    - Manages top-level `CheckoutFormState` and validation state.
    - Layout: single column on mobile; `grid grid-cols-1 lg:grid-cols-[1fr_380px]` on desktop (form left, sticky summary right).
    - Breadcrumbs: `Accueil / Panier / Commande`.
    - Primary submit CTA: `[Confirmer la Commande — Paiement Cash à la Livraison]` (disabled if form invalid or cart empty).
    - On valid submit:
      1. Generate order code `CH-${Date.now()}`.
      2. Persist order snapshot to `localStorage` key `coffeehouse_last_order`.
      3. Display inline success confirmation block (order code, address summary, estimated delivery SLA).
      4. Secondary action button: `[Confirmer aussi via WhatsApp]` generating pre-filled message:
         ```
         Salam NIDAM Coffee 👋,
         Nouvelle commande #{code}:
         {items list}
         Sous-total: {subtotal} MAD
         Livraison: {shipping} MAD
         Total: {total} MAD
         Livraison à: {fullName}, {address}, {city}
         WhatsApp: {whatsapp}
         Paiement: Cash à la livraison ✅
         ```
  - **`App.tsx`**: Register `/checkout` in `<Routes>`.
  - **`CartDrawer.tsx`**: Replace checkout CTA with `<Link to="/checkout">` that closes the drawer on click.
  - Run `npm run build` to verify zero TypeScript and bundle errors.

- [x] **Phase 8 Polish: Free Delivery Progress Bar (300 MAD threshold)**
  - **Impact Analysis**: `FREE_SHIPPING_THRESHOLD_MAD` in `moroccanCities.ts` is the single source of truth consumed by `calculateShippingFee()`, `calculateOrderTotals()`, `getShippingLabel()`, and `ShippingProgressBar`. No item prices or cart state mutated.
  - Updated `FREE_SHIPPING_THRESHOLD_MAD` from 200 → **300 MAD** in `src/data/moroccanCities.ts`.
  - Rewrote `ShippingProgressBar` inside `OrderSummaryCard.tsx`:
    * Copy: *"Plus que X MAD pour la livraison gratuite partout au Maroc"*.
    * Animated amber bar with 50% milestone tick marker.
    * Amber glow shadow when ≥70% of threshold reached (`isClose` state).
    * Celebration copy when unlocked: *"Votre commande est expédiée gratuitement partout au Maroc !"*.
    * Bar turns emerald on unlock; `Truck` icon color tracks state.
  - Verified zero regressions on cart state, checkout totals, and WhatsApp dispatch message via `npm run build` (exit 0).

---

### Phase 9: `/order-tracking` — Live Moroccan Delivery Status (Planned)
**Target Personas**: Nidal (repeat buyer tracking high-value micro-lot) & Mouna (first-time buyer reducing post-purchase anxiety on Moroccan COD courier routes).

#### Architectural Objectives
- Eliminate post-purchase anxiety with a frictionless, account-free order status page.
- Surface the 4-stage Moroccan COD delivery pipeline with a clear visual stepper.
- Provide direct courier WhatsApp coordination so customers never feel abandoned.
- Auto-hydrate from URL params (`?orderId=` / `?phone=`) when redirected from `/checkout`.

#### Key Architectural Requirements
1. **Frictionless Lookup (No Password / No Account Required)**:
   - Fast Search Bar: Lookup via Moroccan WhatsApp Phone Number OR Order Reference (e.g., `#MA-8492` or `CH-XXXXXX-YYY`).
   - Auto-detection: Read `?orderId=` or `?phone=` directly from URL query parameters (for users redirected from `/checkout`).
2. **Moroccan Delivery Timeline & Step Progression**:
   - 4-Stage Visual Status Stepper:
     1. Commande Confirmée & En Préparation (Torréfaction & Mouture).
     2. Remis au Livreur / Hub Régional (Casablanca / Rabat / Marrakech).
     3. En Cours de Livraison Locale (Livreur en route vers votre adresse).
     4. Livré & Encaissé (Paiement Cash à la livraison validé).
   - Active courier dispatch details: Assigned Moroccan courier company badge (Amana Express, CTM Messagerie, Rib'al-Barid), Estimated arrival window (e.g., "Aujourd'hui entre 14:00 et 18:00"), and city destination.
3. **Post-Purchase Reassurance & Actions**:
   - Direct Courier Coordination: `[Contacter le Livreur sur WhatsApp]` button with pre-filled message.
   - Freshness & Inspection Reminder: *"N'oubliez pas : vérifiez la date de torréfaction avant de payer."*
   - Order Items Breakdown: List of beans, grinds, and total COD amount due to the courier in MAD.

#### Component Breakdown & Hierarchy
```text
src/pages/OrderTrackingPage.tsx
├── src/components/tracking/TrackingSearchInput.tsx   # Phone / Order ID form with URL search param sync
├── src/components/tracking/DeliveryStatusTimeline.tsx # 4-stage visual stepper (vertical mobile / horizontal desktop)
├── src/components/tracking/CourierContactCard.tsx     # Courier badge + ETA + WhatsApp driver callout + items list
└── src/data/mockOrders.ts                             # Mock lookup store for order statuses covering all 4 stages
```

#### TypeScript Interfaces (`src/types/index.ts`)
```typescript
export type DeliveryStage = 'confirmed' | 'dispatched_hub' | 'out_for_delivery' | 'delivered';

export interface CourierInfo {
  name: string;                    // e.g. 'Amana Express', 'CTM Messagerie', "Rib'al-Barid"
  trackingId?: string;             // Courier parcel tracking reference
  trackingUrl?: string;            // Deep link to courier tracking portal
  whatsAppNumber: string;          // Store dispatch WhatsApp contact for coordination
  logoColor: string;               // Tailwind brand color chip
}

export interface MockOrderItem {
  name: string;
  grind: string;
  quantity: number;
  unitPrice: number;
}

export interface MockOrder {
  id: string;                      // e.g. 'MA-1024' or 'CH-M7X4Q2-A3F'
  phone: string;                   // Moroccan mobile for secondary lookup
  customerName: string;
  city: string;
  address: string;
  currentStage: DeliveryStage;
  courier: CourierInfo;
  estimatedDelivery: string;        // e.g. "Aujourd'hui entre 14:00 et 18:00"
  roastedDate: string;             // ISO date string
  items: MockOrderItem[];
  subtotal: number;
  shipping: number;
  totalMAD: number;                // Total COD amount due to courier in MAD
  placedAt: string;                // ISO date string
  statusHistory: { stage: DeliveryStage; timestamp: string }[];
}
```

#### Global Integration Points
- `src/App.tsx` — Register route `/order-tracking`.
- `src/components/Navbar.tsx` & Utility Bar — Wire links into navigation for easy access.
- `src/components/VideoFooter.tsx` — Add "Suivre ma commande" to footer links.
- `src/pages/CheckoutPage.tsx` — Confirmation screen triggers / links to `/order-tracking?orderId={newOrderId}`.

#### Ordered Task Checklist:
- [x] **Task 34: Create `src/data/mockOrders.ts` and define `OrderStatus` interfaces (status stages, courier data, timeline steps)**
  - Define `DeliveryStage` union type and `CourierInfo`, `MockOrderItem`, `MockOrder` interfaces in `src/types/index.ts`.
  - Populate `MOCK_ORDERS: MockOrder[]` with 4 seed records covering all delivery stages:
    * Order 1 (`confirmed`): Casablanca, Amana Express — torréfaction & mouture en cours.
    * Order 2 (`dispatched_hub`): Rabat, CTM Messagerie — remis au hub régional.
    * Order 3 (`out_for_delivery`): Marrakech, Amana Express — livreur en route, ETA today.
    * Order 4 (`delivered`): Tanger, Rib'al-Barid — livré & COD encaissé.
  - Implement `lookupOrder(query: string): MockOrder | undefined` matching by Order ID (exact) or Moroccan phone number.
  - Define `STAGE_CONFIG` map with stage labels, sublabels, Lucide icons, and active color tokens.

- [x] **Task 35: Build `TrackingSearchInput.tsx` with Moroccan phone/order ID formatting and URL search param synchronization**
  - Controlled input accepting either Moroccan mobile (`06/07XXXXXXXX`) or Order ID (`MA-XXXX` / `CH-XXXXXX-YYY`).
  - Auto-read query params (`?orderId=` or `?phone=`) using `useSearchParams()` on mount.
  - Search trigger updating URL search parameters smoothly without full page reload.
  - Auto-format Moroccan phone numbers as typed (spacing after every 2 digits).
  - Validation styling matching project design tokens (`#121421`, `#EFAE54`).

- [x] **Task 36: Build `DeliveryStatusTimeline.tsx` and `CourierContactCard.tsx` with WhatsApp driver callout**
  - **`DeliveryStatusTimeline.tsx`**:
    * 4-step vertical (mobile) / horizontal (desktop ≥lg) stepper with active status lights and timestamps.
    * Completed: emerald checkmarks with solid connectors; Active: amber pulsing ring; Pending: muted dashed connectors.
    * Highlight COD total due in Moroccan Dirhams: *"Montant à préparer en Cash: [Total] MAD"*.
  - **`CourierContactCard.tsx`**:
    * Assigned regional courier company badge, ETA arrival window chip, and destination address.
    * Button: `[Coordonner avec le livreur via WhatsApp]` with pre-filled message:
      `Salam, je suis [Nom], je vous contacte concernant ma commande de café #[OrderId] pour la livraison à [Quartier].`
    * Inspection policy reminder banner: *"N'oubliez pas : vérifiez la date de torréfaction avant de payer."* with freshness seal reminder.

- [x] **Task 37: Assemble `OrderTrackingPage.tsx`, wire `/order-tracking` in `App.tsx`, and link navigation/footer tracking triggers**
  - **`OrderTrackingPage.tsx`**:
    * Combine search input, 4-stage delivery timeline, courier contact card, and items summary breakdown.
    * If no order matches, display a clear, helpful fallback (*"Aucune commande trouvée avec ce numéro"*) with WhatsApp support CTA.
    * "Ce n'est pas ma commande" link to reset and perform a new search.
  - Register `/order-tracking` route inside `src/App.tsx`.
  - Add "Suivi de Commande" link to the Footer (`VideoFooter.tsx`), Navbar (`Navbar.tsx`), and Utility Bar (`AnnouncementBar.tsx`).
  - Run `npm run build` to verify zero build or TypeScript errors across the entire project.

---

## 8. Current State
**All Core Architecture Routes Live**



