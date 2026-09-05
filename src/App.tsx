import { useState, useCallback } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ReassuranceBar } from './components/ReassuranceBar';
import { ProductGrid } from './components/ProductGrid';
import { CoffeeFinderModal } from './components/CoffeeFinderModal';
import { StarterBundles } from './components/StarterBundles';
import { WholesaleBanner } from './components/WholesaleBanner';
import { Testimonials } from './components/Testimonials';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { useCart } from './store/useCart';
import { PRODUCTS } from './data/catalog';
import type { CoffeeProduct, GrindOption } from './types';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();

  const handleAddToCart = useCallback(
    (product: CoffeeProduct, grind: GrindOption) => {
      addItem(product, grind);
      // Brief flash to open cart after adding
      setTimeout(() => setCartOpen(true), 250);
    },
    [addItem]
  );

  const handleOpenFinder = useCallback(() => setFinderOpen(true), []);
  const handleCloseFinder = useCallback(() => setFinderOpen(false), []);
  const handleOpenCart = useCallback(() => setCartOpen(true), []);
  const handleCloseCart = useCallback(() => setCartOpen(false), []);

  // Featured hero product is the best-seller Salvador San Alberto
  const featuredProduct = PRODUCTS.find((p) => p.id === 'salvador-san-alberto') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#1A1C23] text-white selection:bg-[#E89038] selection:text-[#121316]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navigation */}
      <Navigation
        cartCount={totalItems}
        onCartOpen={handleOpenCart}
        onFinderOpen={handleOpenFinder}
      />

      <main>
        {/* 3. Hero Section (Deep Charcoal, Sweeping Elliptical Curve, Overlapping Bag) */}
        <HeroSection
          featuredProduct={featuredProduct}
          onFinderOpen={handleOpenFinder}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Process / Trust Section (Dark Slate, Connected 3 Steps, Sweeping Curve into Cream) */}
        <ReassuranceBar />

        {/* 5. Menu / Shop Section (Warm Cream #F9F8F4, High Contrast, Barista Craft, Clean Rows) */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onOpenFinder={handleOpenFinder}
        />

        {/* 6. Starter Bundles (Dark Roastery Transition, Moka Pot Visual, Checklist, Amber Pill CTAs) */}
        <StarterBundles onAddToCart={handleAddToCart} />

        {/* 7. Testimonials (Deep Charcoal, Video Review Spotlight with Amber Play Button, Verified Cards) */}
        <Testimonials />

        {/* 8. Wholesale (B2B) Section (Moroccan Cafes, ICE + TVA, WhatsApp Concierge Form) */}
        <WholesaleBanner />
      </main>

      {/* 9. Footer (Deepest Charcoal #121316, "Ready for Better Coffee", Casablanca Atelier Hours) */}
      <Footer />

      {/* 10. Coffee Finder Modal (30s Taste Assistant, Dark Luxury Quiz) */}
      <CoffeeFinderModal
        isOpen={finderOpen}
        onClose={handleCloseFinder}
        onAddToCart={handleAddToCart}
      />

      {/* 11. Cart Drawer (Slide-in, Free Shipping Progress, Moroccan COD Checkout) */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={handleCloseCart}
        items={items}
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
}
