import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { VideoFooter } from './components/VideoFooter';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LandingPage } from './pages/LandingPage';
import { ContactPage } from './pages/ContactPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StarterKitsPage } from './pages/StarterKitsPage';
import { WholesalePage } from './pages/WholesalePage';
import { RoasteryFreshnessPage } from './pages/RoasteryFreshnessPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartProduct, MenuItem } from './types/coffeeHouse';
import type { CoffeeProduct, GrindOption } from './types';

import {
  subscribeToCartDrawer,
  syncCartItemQuantity,
  syncRemoveCartItem,
  syncClearCart,
} from './store/useCart';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: 'americano',
      name: 'Americano Coffee',
      price: 50.0,
      quantity: 1,
      image: '/images/iced-coffee-menu.jpg',
      sub: '100% Natural arabica or robusta, 50 Ml cup',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll to top on route change if no anchor hash is present
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Subscribe to CartDrawer open triggers from useCart hook
  useEffect(() => {
    return subscribeToCartDrawer((open) => {
      setIsCartOpen(open);
    });
  }, []);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          sub: item.sub,
        },
      ];
    });
  }, []);

  const handleAddToCartSpecialty = useCallback(
    (product: CoffeeProduct, grind: GrindOption, quantity: number = 1) => {
      const itemKey = `${product.id}-${grind}`;
      setCartItems((prev) => {
        const existing = prev.find((p) => p.id === itemKey);
        if (existing) {
          return prev.map((p) =>
            p.id === itemKey ? { ...p, quantity: p.quantity + quantity } : p
          );
        }
        return [
          ...prev,
          {
            id: itemKey,
            name: `${product.name} (${grind})`,
            price: product.price,
            quantity: quantity,
            image: product.image || '/images/products/salvador-coffee.png',
            sub: `${product.origin} • ${product.lotCode} • ${product.weightGrams}g`,
          },
        ];
      });
      // Automatically open CartDrawer without page reload
      setIsCartOpen(true);
    },
    []
  );

  const handleUpdateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      syncRemoveCartItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
      syncCartItemQuantity(id, qty);
    }
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    syncRemoveCartItem(id);
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
    syncClearCart();
  }, []);

  const scrollToMenu = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/#menu');
      setTimeout(() => {
        const el = document.getElementById('menu');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('menu');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421] font-body flex flex-col">
      {/* 0. Top Operational & Delivery SLA Announcement Bar */}
      <AnnouncementBar />

      {/* 1. Persistent Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* 2. Dynamic Route Content */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                onAddToCart={handleAddToCart}
                onOrderNowClick={scrollToMenu}
                onAddToCartSpecialty={handleAddToCartSpecialty}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCartSpecialty={handleAddToCartSpecialty}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route
            path="/shop/:slug"
            element={
              <ProductDetailPage
                onAddToCartSpecialty={handleAddToCartSpecialty}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route
            path="/starter-kits"
            element={
              <StarterKitsPage
                onAddToCartSpecialty={handleAddToCartSpecialty}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/roastery-freshness" element={<RoasteryFreshnessPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Persistent Video Highlight & Categorized Footer */}
      <VideoFooter />

      {/* 4. Global Interactive Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => {
          handleAddToCart(item);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
